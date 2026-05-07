import express from "express";
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

  app.use(express.json());

  // API Routes
  app.post("/api/sync-to-sheet", async (req, res) => {
    const quoteEmail = req.body?.email || "Unknown";
    console.log(`[SYNC] Starting sync request for: ${quoteEmail}`);
    
    try {
      const { name, email, phone, address, coverageTypes, fileName } = req.body;
      let rawSheetId = process.env.GOOGLE_SHEET_ID;
      const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

      if (!rawSheetId) {
        console.error("[SYNC] GOOGLE_SHEET_ID is missing from environment.");
        return res.status(200).json({ success: false, error: "GOOGLE_SHEET_ID missing" });
      }

      // Sanitize Sheet ID: Extract from URL if necessary or just trim
      let sheetId = rawSheetId.trim();
      const idMatch = sheetId.match(/\/d\/([a-zA-Z0-9-_]{15,})/);
      if (idMatch) {
        sheetId = idMatch[1];
        console.log(`[SYNC] Extracted Sheet ID: ${sheetId}`);
      } else {
        // Fallback for cases where only the ID is provided or it's a weird format
        sheetId = sheetId.split("?")[0].split("/").filter(Boolean).pop() || sheetId;
        console.log(`[SYNC] Cleaned up Sheet ID: ${sheetId}`);
      }

      if (!serviceAccountJson) {
        console.error("Service account credentials missing.");
        return res.status(200).json({ success: false, error: "Service account key missing" });
      }

      let credentials;
      try {
        const rawJson = serviceAccountJson.trim();
        // Try direct parse first
        credentials = JSON.parse(rawJson);
      } catch (parseError) {
        try {
          // Try to handle double-stringified JSON (common in env vars sometimes)
          const step1 = JSON.parse(serviceAccountJson.trim());
          credentials = typeof step1 === "string" ? JSON.parse(step1) : step1;
        } catch (secondError) {
          console.error("[SYNC] Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY JSON:", secondError);
          return res.status(200).json({ success: false, error: "Invalid JSON in service account key" });
        }
      }

      if (credentials && credentials.private_key && typeof credentials.private_key === "string") {
        // Fix common escaping issues from manual copy-pasting
        if (!credentials.private_key.includes("\n") && credentials.private_key.includes("\\n")) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
        }
      }

      console.log(`[SYNC] Connecting to sheet: ${sheetId} as: ${credentials.client_email}`);

      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });
      
      // Attempt to find the name of the first sheet to be more flexible
      let targetRange = "Sheet1!A:H";
      try {
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
        const firstSheetName = spreadsheet.data.sheets?.[0]?.properties?.title;
        if (firstSheetName) {
          targetRange = `${firstSheetName}!A:H`;
          console.log(`[SYNC] Using detected sheet name: ${targetRange}`);
        }
      } catch (getSpreadsheetError: any) {
        console.error("[SYNC] Could not fetch spreadsheet metadata. Falling back to Sheet1!A:H", getSpreadsheetError.message);
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
        console.log(`[SYNC] Appending values to range: ${targetRange}`);
        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: targetRange,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values,
          },
        });
        console.log("[SYNC] Successfully synced to Google Sheets.");
        res.status(200).json({ success: true });
      } catch (appendError: any) {
        console.error("[SYNC] Append failed:", appendError.message);
        const errorMsg = appendError.message.includes("403") 
          ? `Permission denied. Please ensure your Google Sheet is shared with: ${credentials.client_email} as an Editor.`
          : appendError.message.includes("404")
          ? `Spreadsheet not found. Please check your sheet ID or URL.`
          : `Failed to write to sheet: ${appendError.message}`;
        
        res.status(200).json({ success: false, error: errorMsg });
      }
    } catch (error) {
      console.error("Error syncing to Google Sheets:", error);
      res.status(200).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
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
