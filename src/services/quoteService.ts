import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocFromServer,
  doc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  coverageTypes: string[];
  fileName: string | null;
}

export async function submitQuote(quoteData: QuoteRequest) {
  const path = 'quotes';
  try {
    // 1. Write to Firestore (as before)
    const docRef = await addDoc(collection(db, path), {
      ...quoteData,
      createdAt: serverTimestamp(),
      status: 'new',
      adminContact: 'jaxson@crgia.com'
    });

    // 2. Sync to Google Sheets via backend
    try {
      console.log(`[SYNC] Attempting Google Sheets sync for ${quoteData.email}`);
      
      const response = await fetch('/api/sync-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      });
      
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("[SYNC] Non-JSON response received:", responseText);
        throw new Error(`Server returned a non-JSON response (Status: ${response.status}). This often means the server encountered a crash or returned an error page.`);
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || `Sheet sync failed with status ${response.status}`);
      }
      
      console.log("[SYNC] Google Sheets sync successful:", result.updatedRange);
    } catch (sheetError: any) {
      console.error("[SYNC] Google Sheets sync failure:", sheetError);
      throw new Error(sheetError.message);
    }

    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Critical directive: test connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
