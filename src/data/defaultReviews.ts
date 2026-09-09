import persistedScreenshots from "./persistedScreenshots.json";

export interface GoogleReviewItem {
  id: string;
  imageData: string;
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

// User's verified Google Review screenshots uploaded to the website
export const DEFAULT_GOOGLE_REVIEWS: GoogleReviewItem[] = (
  Array.isArray(persistedScreenshots) && persistedScreenshots.length > 0
    ? (persistedScreenshots as unknown as GoogleReviewItem[])
    : []
);
