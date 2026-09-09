import reviewImage1 from "../assets/images/reviews/review-1.jpg";
import reviewImage2 from "../assets/images/reviews/review-2.jpg";
import reviewImage3 from "../assets/images/reviews/review-3.jpg";

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

// User's verified Google Review screenshots bundled as permanent static assets
export const DEFAULT_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "screenshot-1788975220724",
    imageData: reviewImage1,
    dateAdded: "Sep 9, 2026",
    caption: "Verified Google Review",
    rating: 5,
  },
  {
    id: "screenshot-1788975234739",
    imageData: reviewImage2,
    dateAdded: "Sep 9, 2026",
    caption: "Verified Google Review",
    rating: 5,
  },
  {
    id: "screenshot-1788975247395",
    imageData: reviewImage3,
    dateAdded: "Sep 9, 2026",
    caption: "Verified Google Review",
    rating: 5,
  },
];
