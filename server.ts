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
      console.log(`Syncing quote for ${email} to Google Sheets...`);

      const sheetId = process.env.GOOGLE_SHEET_ID;
      const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

      if (!sheetId) {
        console.error("GOOGLE_SHEET_ID is missing from environment.");
        return res.status(200).json({ success: false, error: "GOOGLE_SHEET_ID missing" });
      }

      if (!serviceAccountJson) {
        console.error("GOOGLE_SERVICE_ACCOUNT_KEY is missing from environment.");
        return res.status(200).json({ success: false, error: "GOOGLE_SERVICE_ACCOUNT_KEY missing" });
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
      
      const coverageStr = Array.isArray(coverageTypes) ? coverageTypes.join(", ") : "None";
      
      const values = [
        [
          new Date().toLocaleString(),
          name || "Unknown",
          email || "No Email",
          phone || "No Phone",
          address || "No Address",
          coverageStr,
          fileName || "None",
          "New"
        ],
      ];

      console.log("Appending values to sheet:", values[0]);

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:H",
        valueInputOption: "RAW",
        requestBody: {
          values,
        },
      });

      console.log("Successfully synced to Google Sheets.");
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error syncing to Google Sheets:", error);
      res.status(200).json({ success: false, error: error instanceof Error ? error.message : "Unknown error" });
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
