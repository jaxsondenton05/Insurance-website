// Client-side persistent storage for Google Review Screenshots using IndexedDB with localStorage fallback

import { DEFAULT_GOOGLE_REVIEWS } from "../data/defaultReviews";
import persistedScreenshots from "../data/persistedScreenshots.json";

export interface ReviewScreenshot {
  id: string;
  imageData: string; // Base64 Data URL or SVG Data URL
  caption?: string;
  reviewerName?: string;
  dateAdded: string;
  isSample?: boolean;
  location?: string;
  serviceType?: string;
  rating?: number;
  relativeTime?: string;
  reviewText?: string;
  ownerReply?: string;
  avatarBg?: string;
  avatarInitial?: string;
}

const DB_NAME = "DentonInsuranceReviewsDB";
const STORE_NAME = "screenshots";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllScreenshots(): Promise<ReviewScreenshot[]> {
  try {
    const db = await openDB();
    const idbResult = await new Promise<ReviewScreenshot[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        resolve(req.result || []);
      };
      req.onerror = () => reject(req.error);
    });

    if (idbResult && idbResult.length > 0) {
      // Filter out any legacy synthetic sample reviews
      const valid = idbResult.filter(
        (item) => !item.id?.startsWith("review-") && !item.isSample && Boolean(item.imageData)
      );
      if (valid.length > 0) {
        return valid;
      }
    }
  } catch {
    // Proceed to localStorage check
  }

  // Fallback to localStorage
  try {
    const raw = localStorage.getItem("denton_google_screenshots");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid = parsed.filter(
          (item: any) => !item.id?.startsWith("review-") && !item.isSample && Boolean(item.imageData)
        );
        if (valid.length > 0) {
          return valid;
        }
      }
    }
  } catch {
    // ignore
  }

  // Fallback to persistedScreenshots from repo
  if (Array.isArray(persistedScreenshots) && persistedScreenshots.length > 0) {
    return persistedScreenshots as ReviewScreenshot[];
  }

  // If user has no custom uploads yet, return the built-in verified reviews
  return DEFAULT_GOOGLE_REVIEWS;
}

export async function saveScreenshot(screenshot: ReviewScreenshot): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(screenshot);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Fallback to localStorage
    try {
      const current = await getAllScreenshots();
      const updated = [screenshot, ...current.filter((s) => s.id !== screenshot.id)];
      localStorage.setItem("denton_google_screenshots", JSON.stringify(updated.slice(0, 15)));
    } catch {
      // Storage error ignored
    }
  }

  // Also sync to server backend so it gets committed to GitHub
  try {
    const all = await getAllScreenshots();
    fetch("/api/save-review-screenshots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ screenshots: all.length > 0 ? all : [screenshot] }),
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export async function deleteScreenshot(id: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    try {
      const current = await getAllScreenshots();
      const updated = current.filter((s) => s.id !== id);
      localStorage.setItem("denton_google_screenshots", JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
}
