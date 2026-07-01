// ─── Enums / Union Types ────────────────────────────────────────────────────

export type Category = 'Hardware' | 'Academic' | 'Lab';

export type TransactionType = 'Permanent Swap' | 'Temporary Borrow' | 'Free Giveaway';

export type ListingStatus = 'available' | 'requested' | 'unavailable';

export type Condition = 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';

// ─── Core Entities ──────────────────────────────────────────────────────────

export interface Listing {
  id: string;
  title: string;
  category: Category;
  /** Transaction type label (replaces old "state") */
  transactionType: TransactionType;
  owner: string;
  description: string;
  condition: Condition;
  /** URL or empty string — ItemCard renders a placeholder when empty */
  image: string;
  status: ListingStatus;
}

export interface Request {
  id: string;
  listingId: string;
  listingTitle: string;
  requestedBy: string;
  message: string;
  createdAt: string; // ISO date string
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string; // ISO date string
}
