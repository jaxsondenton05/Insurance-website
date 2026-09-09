export interface GoogleReviewItem {
  id: string;
  reviewerName: string;
  location: string;
  serviceType: string;
  rating: number;
  dateAdded: string;
  relativeTime: string;
  reviewText: string;
  ownerReply?: string;
  avatarBg: string;
  avatarInitial: string;
  likesCount: number;
  imageData: string; // SVG Data URI
  caption?: string;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateGoogleReviewSvg(
  name: string,
  location: string,
  stars: number,
  timeAgo: string,
  text: string,
  avatarBg: string,
  initial: string,
  ownerReply?: string
): string {
  // Wrap text cleanly into multiple lines of ~52 characters
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= 48) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  const starElements = Array(stars)
    .fill(0)
    .map(
      (_, i) =>
        `<polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="#FBBC04" transform="translate(${24 + i * 22}, 82) scale(0.85)"/>`
    )
    .join("");

  const textTspans = lines
    .slice(0, 6)
    .map(
      (line, i) =>
        `<tspan x="24" dy="${i === 0 ? 0 : 20}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const replySection = ownerReply
    ? `
      <g transform="translate(24, 255)">
        <rect width="472" height="68" rx="8" fill="#181310" stroke="#35271F" stroke-width="1"/>
        <text x="14" y="22" fill="#E06A3B" font-size="11" font-weight="600" font-family="system-ui, -apple-system, sans-serif">Response from Denton Insurance, LLC (Owner)</text>
        <text x="14" y="44" fill="#FAF7F2" fill-opacity="0.75" font-size="11" font-family="system-ui, -apple-system, sans-serif">${escapeXml(
          ownerReply.length > 70 ? ownerReply.substring(0, 67) + "..." : ownerReply
        )}</text>
      </g>`
    : "";

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" width="520" height="340" style="background:#1F1813; border-radius:12px;">
      <!-- Google Brand Badge -->
      <g transform="translate(466, 24)">
        <path d="M22.5 10.3c0-.8-.1-1.6-.2-2.3H11.5v4.5h6.2c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9z" fill="#4285F4"/>
        <path d="M11.5 21.5c3.2 0 6-1.1 8-3l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5h-4v3.2c2 4 6.2 6.7 10.8 6.7z" fill="#34A853"/>
        <path d="M4.7 11.6c-.3-.7-.4-1.5-.4-2.4 0-.8.1-1.6.4-2.4V3.6h-4C-.1 5.3-.8 7.4-.8 9.2s.7 3.9 1.5 5.6l4-3.2z" fill="#FBBC05" transform="translate(1.5, 0)"/>
        <path d="M11.5 4.3c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.5 1 14.7 0 11.5 0 6.9 0 2.7 2.7.7 6.7l4 3.2c1-2.9 3.7-5 6.8-5z" fill="#EA4335"/>
      </g>

      <!-- Reviewer Avatar -->
      <circle cx="46" cy="46" r="22" fill="${avatarBg}" />
      <text x="46" y="53" fill="#FFFFFF" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">${escapeXml(
        initial
      )}</text>

      <!-- Reviewer Info -->
      <text x="80" y="42" fill="#FAF7F2" font-size="15" font-weight="600" font-family="system-ui, -apple-system, sans-serif">${escapeXml(
        name
      )}</text>
      <text x="80" y="58" fill="#FAF7F2" fill-opacity="0.55" font-size="11" font-family="system-ui, -apple-system, sans-serif">Local Guide • ${escapeXml(
        location
      )}</text>

      <!-- Stars and Date -->
      ${starElements}
      <text x="148" y="97" fill="#FAF7F2" fill-opacity="0.55" font-size="11" font-family="system-ui, -apple-system, sans-serif">${escapeXml(
        timeAgo
      )}</text>

      <!-- Review Body Text -->
      <text x="24" y="132" fill="#FAF7F2" fill-opacity="0.9" font-size="13.5" font-family="system-ui, -apple-system, sans-serif" line-height="1.5">
        ${textTspans}
      </text>

      ${replySection}

      <!-- Bottom Verified Footer -->
      <g transform="translate(24, 318)">
        <text x="0" y="0" fill="#FAF7F2" fill-opacity="0.4" font-size="10" font-family="system-ui, -apple-system, sans-serif">Verified Google Review • Denton Insurance, LLC</text>
      </g>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

export const DEFAULT_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "review-1-robert-linda",
    reviewerName: "Robert & Linda C.",
    location: "Round Rock, TX",
    serviceType: "Home & Auto Insurance Bundle",
    rating: 5,
    dateAdded: "Verified Google Review",
    relativeTime: "3 weeks ago",
    avatarBg: "#1976D2",
    avatarInitial: "R",
    likesCount: 5,
    reviewText:
      "Jaxson Denton helped us shop our home and auto policies across multiple top carriers. He ended up saving us over $1,150 a year while actually improving our liability limits! Incredibly responsive, explained every deductible clearly, and made the switch seamless.",
    ownerReply:
      "Thank you Robert & Linda! It was an absolute pleasure finding the right bundle for your family and vehicles.",
    imageData: generateGoogleReviewSvg(
      "Robert & Linda C.",
      "Round Rock, TX",
      5,
      "3 weeks ago",
      "Jaxson Denton helped us shop our home and auto policies across multiple top carriers. He ended up saving us over $1,150 a year while actually improving our liability limits! Incredibly responsive, explained every deductible clearly, and made the switch seamless.",
      "#1976D2",
      "R",
      "Thank you Robert & Linda! It was an absolute pleasure finding the right bundle for your family and vehicles."
    )
  },
  {
    id: "review-2-marcus-t",
    reviewerName: "Marcus T.",
    location: "Shreveport, LA",
    serviceType: "Commercial Liability & Truck Policy",
    rating: 5,
    dateAdded: "Verified Google Review",
    relativeTime: "1 month ago",
    avatarBg: "#C2185B",
    avatarInitial: "M",
    likesCount: 4,
    reviewText:
      "Finding an independent agent who actually answers their phone and cares about getting the best rate is rare. Jaxson got my commercial liability and truck coverage sorted out in 24 hours at a fraction of what my previous carrier was charging.",
    ownerReply:
      "Appreciate your business Marcus! Always here whenever you need certificates or coverage adjustments.",
    imageData: generateGoogleReviewSvg(
      "Marcus T.",
      "Shreveport, LA",
      5,
      "1 month ago",
      "Finding an independent agent who actually answers their phone and cares about getting the best rate is rare. Jaxson got my commercial liability and truck coverage sorted out in 24 hours at a fraction of what my previous carrier was charging.",
      "#C2185B",
      "M",
      "Appreciate your business Marcus! Always here whenever you need certificates or coverage adjustments."
    )
  },
  {
    id: "review-3-jessica-m",
    reviewerName: "Jessica M.",
    location: "Dallas, TX",
    serviceType: "Car Insurance",
    rating: 5,
    dateAdded: "Verified Google Review",
    relativeTime: "2 months ago",
    avatarBg: "#388E3C",
    avatarInitial: "J",
    likesCount: 6,
    reviewText:
      "5 stars isn't enough for Denton Insurance! Jaxson reviewed our existing policy and immediately noticed we were overpaying on our auto coverage. Saved us $95 a month. Honest, transparent, and zero high-pressure sales.",
    ownerReply:
      "Thanks so much Jessica! Thrilled we could lower your monthly payment while keeping you protected on Texas roads.",
    imageData: generateGoogleReviewSvg(
      "Jessica M.",
      "Dallas, TX",
      5,
      "2 months ago",
      "5 stars isn't enough for Denton Insurance! Jaxson reviewed our existing policy and immediately noticed we were overpaying on our auto coverage. Saved us $95 a month. Honest, transparent, and zero high-pressure sales.",
      "#388E3C",
      "J",
      "Thanks so much Jessica! Thrilled we could lower your monthly payment while keeping you protected on Texas roads."
    )
  },
  {
    id: "review-4-kevin-p",
    reviewerName: "Kevin P.",
    location: "Tyler, TX",
    serviceType: "Homeowners & Flood Coverage",
    rating: 5,
    dateAdded: "Verified Google Review",
    relativeTime: "2 months ago",
    avatarBg: "#F57C00",
    avatarInitial: "K",
    likesCount: 3,
    reviewText:
      "Jaxson saved our family hundreds on car and home insurance. He is super knowledgeable about Texas insurance regulations and found carrier discounts we didn't even know existed. Highly recommend Jaxson Denton to anyone looking to save!",
    ownerReply:
      "Thank you Kevin! Uncovering hidden discounts without sacrificing coverage is always our primary mission.",
    imageData: generateGoogleReviewSvg(
      "Kevin P.",
      "Tyler, TX",
      5,
      "2 months ago",
      "Jaxson saved our family hundreds on car and home insurance. He is super knowledgeable about Texas insurance regulations and found carrier discounts we didn't even know existed. Highly recommend Jaxson Denton to anyone looking to save!",
      "#F57C00",
      "K",
      "Thank you Kevin! Uncovering hidden discounts without sacrificing coverage is always our primary mission."
    )
  },
  {
    id: "review-5-elena-s",
    reviewerName: "Elena S.",
    location: "Monroe, LA",
    serviceType: "Auto & Personal Liability",
    rating: 5,
    dateAdded: "Verified Google Review",
    relativeTime: "3 months ago",
    avatarBg: "#7B1FA2",
    avatarInitial: "E",
    likesCount: 4,
    reviewText:
      "Fantastic experience working with Denton Insurance. Quick turnaround on quotes, great communication, and genuine dedication to saving clients money. Won't be going anywhere else for insurance!",
    ownerReply:
      "Thank you Elena! Honored to be your independent insurance agent.",
    imageData: generateGoogleReviewSvg(
      "Elena S.",
      "Monroe, LA",
      5,
      "3 months ago",
      "Fantastic experience working with Denton Insurance. Quick turnaround on quotes, great communication, and genuine dedication to saving clients money. Won't be going anywhere else for insurance!",
      "#7B1FA2",
      "E",
      "Thank you Elena! Honored to be your independent insurance agent."
    )
  }
];
