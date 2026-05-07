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

  // API Routes
  app.post("/api/sync-to-sheet", async (req, res) => {
    const timestamp = new Date().toISOString();
    console.log(`[SYNC][${timestamp}] --- NEW REQUEST ---`);
    console.log(`[SYNC][${timestamp}] Headers:`, JSON.stringify(req.headers));
    console.log(`[SYNC][${timestamp}] Body Keys:`, Object.keys(req.body || {}));
    
    try {
      const { name, email, phone, address, coverageTypes, fileName } = req.body;
      const rawSheetId = process.env.GOOGLE_SHEET_ID;
      const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

      if (!rawSheetId) {
        console.error("[SYNC] GOOGLE_SHEET_ID is missing.");
        return res.status(500).json({ success: false, error: "Missing GOOGLE_SHEET_ID env var" });
      }

      if (!serviceAccountJson) {
        console.error("[SYNC] GOOGLE_SERVICE_ACCOUNT_KEY is missing.");
        return res.status(500).json({ success: false, error: "Missing service account key env var" });
      }

      console.log(`[SYNC] Raw Key Length: ${serviceAccountJson.length}`);

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
        // Remove wrapping quotes if they exist (common in some env setups)
        const unquoted = trimmed.replace(/^['"]|['"]$/g, '');
        
        try {
          credentials = JSON.parse(unquoted);
        } catch (e1) {
          // Try to handle escaped control characters if it was double-stringified
          const unescaped = unquoted.replace(/\\n/g, '\n').replace(/\\"/g, '"');
          try {
            credentials = JSON.parse(unescaped);
          } catch (e2) {
            // Last ditch: maybe it IS a stringified string
            if (unquoted.startsWith("{")) {
               throw e1; // Rethrow original parse error
            }
            credentials = JSON.parse(JSON.parse(JSON.stringify(unquoted)));
          }
        }

        if (typeof credentials === "string") {
          credentials = JSON.parse(credentials);
        }
      } catch (parseError: any) {
        console.error("[SYNC] JSON Parse Failed:", parseError.message);
        return res.status(500).json({ 
          success: false, 
          error: `JSON Parse Failed: ${parseError.message}. Check formatting of GOOGLE_SERVICE_ACCOUNT_KEY.`
        });
      }

      // Fix private key formatting (essential for RSA keys from JSON)
      if (credentials && credentials.private_key && typeof credentials.private_key === "string") {
        if (!credentials.private_key.includes("\n") && credentials.private_key.includes("\\n")) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
        }
      }

      console.log(`[SYNC] Authenticating as ${credentials.client_email} for sheet ${sheetId.substring(0, 8)}...`);

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
        console.warn("[SYNC] Could not fetch sheet name, defaulting to Sheet1!A:H:", getSpreadsheetError.message);
      }
      
      const coverageStr = Array.isArray(coverageTypes) ? coverageTypes.join(", ") : "None";
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

      try {
        const appendResponse = await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: targetRange,
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          requestBody: { values },
        });
        
        console.log(`[SYNC] Success. Row appended to ${appendResponse.data.updates?.updatedRange}`);
        return res.status(200).json({ 
          success: true, 
          updatedRange: appendResponse.data.updates?.updatedRange 
        });
      } catch (appendError: any) {
        console.error("[SYNC] Google Sheets API Error:", appendError.message);
        let userMessage = appendError.message.includes("403") 
          ? `Permission denied. Share your sheet with: ${credentials.client_email} as an 'Editor'.`
          : `Google Sheets Error: ${appendError.message}`;
        
        return res.status(200).json({ success: false, error: userMessage });
      }
    } catch (error: any) {
      console.error("[SYNC] Unexpected Server Error:", error);
      return res.status(500).json({ 
        success: false, 
        error: `Internal Server Error: ${error.message || "Unknown error"}` 
      });
    }
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
