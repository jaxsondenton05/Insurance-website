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
    try {
      const { name, email, phone, address, coverageTypes, fileName } = req.body;
      let rawSheetId = process.env.GOOGLE_SHEET_ID;
      // Fallback for older variable naming
      const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

      if (!rawSheetId) {
        console.error("GOOGLE_SHEET_ID is missing from environment.");
        return res.status(200).json({ success: false, error: "GOOGLE_SHEET_ID missing" });
      }

      // Sanitize Sheet ID: Extract from URL if necessary or just trim
      let sheetId = rawSheetId.trim();
      const idMatch = sheetId.match(/\/d\/([a-zA-Z0-9-_]{15,})/);
      if (idMatch) {
        sheetId = idMatch[1];
        console.log(`Extracted Sheet ID from URL: ${sheetId}`);
      } else {
        // If it's a long string without /d/, just use it
        sheetId = sheetId.split("?")[0].split("/")[0];
      }

      console.log(`Syncing quote for ${email} to Google Sheets ID: ${sheetId}...`);

      if (!serviceAccountJson) {
        console.error("Service account credentials missing (checked GOOGLE_SERVICE_ACCOUNT_KEY and JSON).");
        return res.status(200).json({ success: false, error: "Service account key missing" });
      }

      let credentials;
      try {
        credentials = JSON.parse(serviceAccountJson);
      } catch (parseError) {
        console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY JSON:", parseError);
        return res.status(200).json({ success: false, error: "Invalid JSON in service account key" });
      }

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
        }
      } catch (getSpreadsheetError: any) {
        console.error("Could not fetch spreadsheet metadata:", getSpreadsheetError.message);
        return res.status(200).json({ 
          success: false, 
          error: `Spreadsheet not found or inaccessible. Did you share it with ${credentials.client_email}? (Error: ${getSpreadsheetError.message})`
        });
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

      console.log(`Appending values to range: ${targetRange}`);

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: targetRange,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values,
        },
      });

      console.log("Successfully synced to Google Sheets.");
      res.status(200).json({ success: true });
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
