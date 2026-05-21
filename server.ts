import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: Date.now() });
  });

  // Main API Route
  app.post("/api/sync-to-sheet", async (req, res) => {
    const { name, email, phone, address, coverageTypes, fileName } = req.body || {};
    const quoteEmail = email || "Unknown";
    console.log(`[SYNC] Incoming request for: ${quoteEmail}`);
    
    try {
      const rawSheetId = process.env.GOOGLE_SHEET_ID;
      const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
      const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

      let sheetSyncSuccess = false;
      let zapierSyncSuccess = false;
      const errors: string[] = [];
      const servicesAttempted: string[] = [];

      const coverageStr = Array.isArray(coverageTypes) ? coverageTypes.join(", ") : (coverageTypes || "None");

      // 1. Sync to Zapier if configured
      if (zapierWebhookUrl) {
        servicesAttempted.push("Zapier Webhook");
        try {
          console.log(`[SYNC] Sending to Zapier Webhook...`);
          
          const zapierRes = await fetch(zapierWebhookUrl, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              timestamp: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
              name: name || "Unknown",
              email: email || "No Email",
              phone: phone || "No Phone",
              address: address || "No Address",
              coverageTypes: coverageStr,
              fileName: fileName || "None",
              status: "New"
            }),
          });

          if (zapierRes.ok) {
            console.log("[SYNC] Zapier sync successful.");
            zapierSyncSuccess = true;
          } else {
            const bodyText = await zapierRes.text();
            console.error(`[SYNC] Zapier webhook failed with status ${zapierRes.status}: ${bodyText}`);
            errors.push(`Zapier Webhook details: Status ${zapierRes.status} - ${bodyText.slice(0, 100)}`);
          }
        } catch (zapierError: any) {
          console.error("[SYNC] Zapier submission failure:", zapierError.message);
          errors.push(`Zapier trigger error: ${zapierError.message}`);
        }
      }

      // 2. Sync to Google Sheets if credentials are set
      if (rawSheetId && serviceAccountJson) {
        servicesAttempted.push("Google Sheets");
        try {
          // Sanitize Sheet ID
          let sheetId = rawSheetId.trim();
          const idMatch = sheetId.match(/\/d\/([a-zA-Z0-9-_]{15,})/);
          if (idMatch) {
            sheetId = idMatch[1];
          } else {
            sheetId = sheetId.split("?")[0].split("/").filter(Boolean).pop() || sheetId;
          }

          let credentials;
          try {
            const trimmed = serviceAccountJson.trim();
            const unquoted = trimmed.replace(/^['"]|['"]$/g, '');
            
            try {
              credentials = JSON.parse(unquoted);
            } catch (e1) {
              const unescaped = unquoted.replace(/\\n/g, '\n').replace(/\\"/g, '"');
              try {
                credentials = JSON.parse(unescaped);
              } catch (e2) {
                if (unquoted.startsWith("{")) throw e1;
                credentials = JSON.parse(JSON.parse(JSON.stringify(unquoted)));
              }
            }

            if (typeof credentials === "string") {
              credentials = JSON.parse(credentials);
            }
          } catch (parseError: any) {
            console.error("[SYNC] JSON Parse Failed:", parseError.message);
            throw new Error(`Google service account JSON parse failed: ${parseError.message}`);
          }

          if (credentials && credentials.private_key && typeof credentials.private_key === "string") {
            if (!credentials.private_key.includes("\n") && credentials.private_key.includes("\\n")) {
              credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
            }
          }

          console.log(`[SYNC] Authenticating Google Sheets API as ${credentials.client_email}...`);

          const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
          });

          const sheets = google.sheets({ version: "v4", auth });
          
          let targetRange = "Sheet1!A:H";
          try {
            const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
            const firstSheetName = spreadsheet.data.sheets?.[0]?.properties?.title;
            if (firstSheetName) {
              targetRange = `${firstSheetName}!A:H`;
            }
          } catch (getSpreadsheetError: any) {
            console.warn("[SYNC] Could not fetch sheet name:", getSpreadsheetError.message);
          }
          
          const values = [
            [
              new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
              name || "Unknown",
              email || "No Email",
              phone || "No Phone",
              address || "No Address",
              coverageStr,
              fileName || "None",
              "New"
            ],
          ];

          const appendResponse = await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: targetRange,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: { values },
          });
          
          console.log(`[SYNC] Google Sheets success. Row appended.`);
          sheetSyncSuccess = true;
        } catch (sheetError: any) {
          console.error("[SYNC] Google Sheets API Error:", sheetError.message);
          errors.push(`Google Sheets details: ${sheetError.message}`);
        }
      }

      // Check configured integrations
      if (servicesAttempted.length === 0) {
        return res.status(500).json({ 
          success: false, 
          error: "No syncing integrations are configured. Please define ZAPIER_WEBHOOK_URL or Google Sheets credentials in your environments." 
        });
      }

      // If any of the integrations succeeded, we return success so the client flow doesn't crash.
      const eitherSynced = zapierSyncSuccess || sheetSyncSuccess;
      if (eitherSynced) {
        return res.status(200).json({ 
          success: true, 
          message: "Lead synced successfully",
          zapierSynced: zapierSyncSuccess,
          sheetsSynced: sheetSyncSuccess,
          warnings: errors.length > 0 ? errors : undefined
        });
      } else {
        // Failing both
        return res.status(500).json({
          success: false,
          error: `Lead synchronization failed across all configured channels. Attempted: ${servicesAttempted.join(", ")}. Details: ${errors.join("; ")}`
        });
      }

    } catch (error: any) {
      console.error("[SYNC] Unexpected Server Error:", error);
      return res.status(500).json({ 
        success: false, 
        error: error.message || "Internal Server Error" 
      });
    }
  });

  // Logger
  app.use((req, res, next) => {
    console.log(`[SERVER] ${req.method} ${req.path}`);
    next();
  });

  // Global error handler to ensure we always return JSON during crashes
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("[GLOBAL ERROR]", err);
    res.status(500).json({ 
      success: false, 
      error: "A critical server error occurred. Check server logs." 
    });
  });

  // Vite middleware for development
  const isProd = process.env.NODE_ENV === "production";
  console.log(`[SERVER] Starting in ${isProd ? "production" : "development"} mode`);

  if (!isProd) {
    console.log("[SERVER] Initializing Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    console.log(`[SERVER] Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Running at http://0.0.0.0:${PORT}`);
    console.log(`[SERVER] Health check: http://0.0.0.0:${PORT}/api/health`);
  });
}

startServer();
