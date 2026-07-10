// ============================================================
// CampusConnect — Centralized Mock Data
// ============================================================
// All mock data lives here. When the backend is ready, replace
// these exports with API fetch calls in the hooks layer.
// ============================================================

export type TransactionType = 'Permanent Swap' | 'Temporary Borrow' | 'Free Giveaway';
export type ItemCategory = 'Hardware' | 'Academic' | 'Lab';
export type TransactionStatus = 'requested' | 'accepted' | 'in_transit' | 'completed' | 'cancelled' | 'overdue';
export type ConditionGrade = 'Excellent' | 'Good' | 'Fair' | 'Poor';

export interface ListingItem {
  id: string;
  title: string;
  category: ItemCategory;
  transactionType: TransactionType;
  owner: string;
  ownerAvatar: string;
  ownerTrustScore: number;
  description: string;
  condition: ConditionGrade;
  listedDate: string; // ISO date
  wantedCount: number; // how many people want this
  lookingFor?: string; // What the user wants in exchange
}

export interface Transaction {
  id: string;
  itemId: string;
  itemTitle: string;
  itemCategory: ItemCategory;
  transactionType: TransactionType;
  otherParty: string;
  otherPartyAvatar: string;
  status: TransactionStatus;
  handoverPoint: string | null;
  createdDate: string;
  dueDate: string | null;
  completedDate: string | null;
  overdueDays: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarSeed: string;
  branch: string;
  semester: number;
  trustScore: number;
  trustBreakdown: {
    onTimeReturns: number;    // 0-100
    conditionRatings: number; // 0-100
    completedTrades: number;  // 0-100
  };
  totalTrades: number;
  itemsListed: number;
  memberSince: string;
}

export interface HandoverPoint {
  id: string;
  name: string;
  description: string;
}

// ── Handover Points ──────────────────────────────────────────
export const handoverPoints: HandoverPoint[] = [
  { id: 'hp-1', name: 'Library Desk', description: 'Main Library, Ground Floor Reception' },
  { id: 'hp-2', name: 'Hostel A Common Room', description: 'Hostel A, Ground Floor Lounge' },
  { id: 'hp-3', name: 'Canteen Entrance', description: 'Central Canteen, Main Gate' },
  { id: 'hp-4', name: 'Lab Building Lobby', description: 'Engineering Lab Block, Ground Floor' },
  { id: 'hp-5', name: 'Sports Complex Gate', description: 'Sports Complex, Main Entrance' },
];

// ── Current User ─────────────────────────────────────────────
export const currentUser: UserProfile = {
  id: 'user-1',
  name: 'Jayesh Deshmukh',
  email: 'jayesh.d@campus.edu',
  avatarSeed: 'JD',
  branch: 'Computer Science',
  semester: 5,
  trustScore: 87,
  trustBreakdown: {
    onTimeReturns: 92,
    conditionRatings: 85,
    completedTrades: 84,
  },
  totalTrades: 23,
  itemsListed: 8,
  memberSince: '2025-08-15',
};

// ── Listings ─────────────────────────────────────────────────
export const mockListings: ListingItem[] = [
  {
    id: 'item-1',
    title: 'Arduino Uno R3 Kit',
    category: 'Hardware',
    transactionType: 'Temporary Borrow',
    owner: 'Alex M.',
    ownerAvatar: 'AM',
    ownerTrustScore: 91,
    description: 'Genuine Arduino Uno R3. Used for one semester in Embedded Systems lab. Works perfectly, includes USB cable.',
    condition: 'Excellent',
    listedDate: '2026-07-08',
    wantedCount: 12,
    lookingFor: 'Raspberry Pi 4 (will add cash) or a decent Soldering Station',
  },
  {
    id: 'item-2',
    title: 'Calculus Early Transcendentals',
    category: 'Academic',
    transactionType: 'Permanent Swap',
    owner: 'Sarah J.',
    ownerAvatar: 'SJ',
    ownerTrustScore: 78,
    description: 'James Stewart 8th Edition. Slightly worn edges but no internal highlighting. Essential for Math 101/102.',
    condition: 'Good',
    listedDate: '2026-07-09',
    wantedCount: 34,
    lookingFor: 'TI-84 Plus Calculator or Engineering Drawing Kit',
  },
  {
    id: 'item-3',
    title: 'Organic Chemistry Model Kit',
    category: 'Lab',
    transactionType: 'Free Giveaway',
    owner: 'Dr. Smith',
    ownerAvatar: 'DS',
    ownerTrustScore: 95,
    description: 'Molecular model kit with 200+ atoms and bonds. Used for organic chemistry lab demonstrations. All pieces present.',
    condition: 'Good',
    listedDate: '2026-07-05',
    wantedCount: 15,
  },
  {
    id: 'item-4',
    title: 'Raspberry Pi 4 (4GB)',
    category: 'Hardware',
    transactionType: 'Permanent Swap',
    owner: 'Tech Club',
    ownerAvatar: 'TC',
    ownerTrustScore: 88,
    description: 'Raspberry Pi 4 Model B with 4GB RAM. Includes official case and power supply. Perfect for IoT projects.',
    condition: 'Excellent',
    listedDate: '2026-07-03',
    wantedCount: 22,
  },
  {
    id: 'item-5',
    title: 'Physics 101 Notes (A+)',
    category: 'Academic',
    transactionType: 'Free Giveaway',
    owner: 'Elena V.',
    ownerAvatar: 'EV',
    ownerTrustScore: 82,
    description: 'Complete handwritten notes for PH101. Covers mechanics, thermodynamics, and waves. Scored A+ using these.',
    condition: 'Good',
    listedDate: '2026-07-07',
    wantedCount: 31,
  },
  {
    id: 'item-6',
    title: 'Digital Multimeter',
    category: 'Hardware',
    transactionType: 'Temporary Borrow',
    owner: 'EE Dept',
    ownerAvatar: 'ED',
    ownerTrustScore: 96,
    description: 'Fluke 117 True RMS multimeter. Department-owned, available for student projects. Return within 2 weeks.',
    condition: 'Excellent',
    listedDate: '2026-06-20',
    wantedCount: 9,
  },
  {
    id: 'item-7',
    title: 'Lab Coat (Size M)',
    category: 'Lab',
    transactionType: 'Permanent Swap',
    owner: 'Chem Lab',
    ownerAvatar: 'CL',
    ownerTrustScore: 90,
    description: 'White lab coat, size Medium. Washed and pressed. Minor pen mark on left pocket — barely visible.',
    condition: 'Fair',
    listedDate: '2026-07-02',
    wantedCount: 5,
  },
  {
    id: 'item-8',
    title: 'TI-84 Plus Calculator',
    category: 'Hardware',
    transactionType: 'Temporary Borrow',
    owner: 'Ravi K.',
    ownerAvatar: 'RK',
    ownerTrustScore: 74,
    description: 'Texas Instruments TI-84 Plus graphing calculator. Batteries included. Perfect for exams and assignments.',
    condition: 'Good',
    listedDate: '2026-07-06',
    wantedCount: 18,
  },
  {
    id: 'item-9',
    title: 'Data Structures & Algorithms Textbook',
    category: 'Academic',
    transactionType: 'Permanent Swap',
    owner: 'Priya S.',
    ownerAvatar: 'PS',
    ownerTrustScore: 89,
    description: 'Cormen CLRS 4th Edition. No markings, like new. Essential for CS201 and placement prep.',
    condition: 'Excellent',
    listedDate: '2026-07-04',
    wantedCount: 27,
  },
  {
    id: 'item-10',
    title: 'Soldering Iron Station',
    category: 'Lab',
    transactionType: 'Temporary Borrow',
    owner: 'Robotics Club',
    ownerAvatar: 'RC',
    ownerTrustScore: 93,
    description: 'Hakko FX-888D soldering station with multiple tips. Available for project use — return after hackathon.',
    condition: 'Good',
    listedDate: '2026-07-08',
    wantedCount: 7,
  },
];

// ── Transactions ─────────────────────────────────────────────
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    itemId: 'item-1',
    itemTitle: 'Arduino Uno R3 Kit',
    itemCategory: 'Hardware',
    transactionType: 'Temporary Borrow',
    otherParty: 'Alex M.',
    otherPartyAvatar: 'AM',
    status: 'in_transit',
    handoverPoint: 'Library Desk',
    createdDate: '2026-07-02',
    dueDate: '2026-07-16',
    completedDate: null,
    overdueDays: 0,
  },
  {
    id: 'txn-2',
    itemId: 'item-2',
    itemTitle: 'Calculus Early Transcendentals',
    itemCategory: 'Academic',
    transactionType: 'Permanent Swap',
    otherParty: 'Sarah J.',
    otherPartyAvatar: 'SJ',
    status: 'completed',
    handoverPoint: 'Canteen Entrance',
    createdDate: '2026-06-20',
    dueDate: null,
    completedDate: '2026-06-25',
    overdueDays: 0,
  },
  {
    id: 'txn-3',
    itemId: 'item-4',
    itemTitle: 'Raspberry Pi 4 (4GB)',
    itemCategory: 'Hardware',
    transactionType: 'Permanent Swap',
    otherParty: 'Tech Club',
    otherPartyAvatar: 'TC',
    status: 'requested',
    handoverPoint: null,
    createdDate: '2026-07-08',
    dueDate: null,
    completedDate: null,
    overdueDays: 0,
  },
  {
    id: 'txn-4',
    itemId: 'item-6',
    itemTitle: 'Digital Multimeter',
    itemCategory: 'Hardware',
    transactionType: 'Temporary Borrow',
    otherParty: 'EE Dept',
    otherPartyAvatar: 'ED',
    status: 'overdue',
    handoverPoint: 'Lab Building Lobby',
    createdDate: '2026-06-15',
    dueDate: '2026-06-29',
    completedDate: null,
    overdueDays: 11,
  },
  {
    id: 'txn-5',
    itemId: 'item-3',
    itemTitle: 'Organic Chemistry Model Kit',
    itemCategory: 'Lab',
    transactionType: 'Free Giveaway',
    otherParty: 'Dr. Smith',
    otherPartyAvatar: 'DS',
    status: 'accepted',
    handoverPoint: 'Hostel A Common Room',
    createdDate: '2026-07-06',
    dueDate: null,
    completedDate: null,
    overdueDays: 0,
  },
  {
    id: 'txn-6',
    itemId: 'item-9',
    itemTitle: 'Data Structures & Algorithms Textbook',
    itemCategory: 'Academic',
    transactionType: 'Permanent Swap',
    otherParty: 'Priya S.',
    otherPartyAvatar: 'PS',
    status: 'completed',
    handoverPoint: 'Library Desk',
    createdDate: '2026-06-25',
    dueDate: null,
    completedDate: '2026-06-30',
    overdueDays: 0,
  },
  {
    id: 'txn-7',
    itemId: 'item-8',
    itemTitle: 'TI-84 Plus Calculator',
    itemCategory: 'Hardware',
    transactionType: 'Temporary Borrow',
    otherParty: 'Ravi K.',
    otherPartyAvatar: 'RK',
    status: 'cancelled',
    handoverPoint: null,
    createdDate: '2026-07-05',
    dueDate: null,
    completedDate: null,
    overdueDays: 0,
  },
  {
    id: 'txn-8',
    itemId: 'item-10',
    itemTitle: 'Soldering Iron Station',
    itemCategory: 'Lab',
    transactionType: 'Temporary Borrow',
    otherParty: 'Robotics Club',
    otherPartyAvatar: 'RC',
    status: 'in_transit',
    handoverPoint: 'Sports Complex Gate',
    createdDate: '2026-07-09',
    dueDate: '2026-07-23',
    completedDate: null,
    overdueDays: 0,
  },
];

// ── Category Counts (for charts) ─────────────────────────────
export function getCategoryCounts(): { category: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const item of mockListings) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }
  return Object.entries(counts).map(([category, count]) => ({ category, count }));
}

// ── Transaction Status Counts (for pie chart) ────────────────
export function getTransactionStatusCounts(): { status: string; count: number; color: string }[] {
  const statusColorMap: Record<TransactionStatus, string> = {
    requested: '#0EA5E9',   // sky-500
    accepted: '#8B5CF6',    // brand-accent
    in_transit: '#F59E0B',  // amber-500
    completed: '#10B981',   // emerald-500
    overdue: '#F87171',     // red-400
    cancelled: '#94A3B8',   // slate-400
  };
  const counts: Record<string, number> = {};
  for (const txn of mockTransactions) {
    counts[txn.status] = (counts[txn.status] || 0) + 1;
  }
  return Object.entries(counts).map(([status, count]) => ({
    status: status.replace('_', ' '),
    count,
    color: statusColorMap[status as TransactionStatus] || '#94A3B8',
  }));
}

// ── Weekly Activity (for area chart) ─────────────────────────
export const weeklyActivity = [
  { day: 'Mon', listings: 3, swaps: 1, borrows: 2 },
  { day: 'Tue', listings: 5, swaps: 2, borrows: 1 },
  { day: 'Wed', listings: 2, swaps: 3, borrows: 4 },
  { day: 'Thu', listings: 7, swaps: 1, borrows: 2 },
  { day: 'Fri', listings: 4, swaps: 4, borrows: 3 },
  { day: 'Sat', listings: 6, swaps: 2, borrows: 5 },
  { day: 'Sun', listings: 1, swaps: 1, borrows: 1 },
];

// ── Trust Score History (for line chart) ─────────────────────
export const trustScoreHistory = [
  { month: 'Jan', score: 62 },
  { month: 'Feb', score: 65 },
  { month: 'Mar', score: 71 },
  { month: 'Apr', score: 68 },
  { month: 'May', score: 75 },
  { month: 'Jun', score: 82 },
  { month: 'Jul', score: 87 },
];

// ── Calendar Events ──────────────────────────────────────────
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'return_due' | 'pickup' | 'handover' | 'overdue';
  relatedItem: string;
  otherParty: string;
}

export const calendarEvents: CalendarEvent[] = [
  { id: 'ev-1', title: 'Return Arduino Kit', date: '2026-07-16', type: 'return_due', relatedItem: 'Arduino Uno R3 Kit', otherParty: 'Alex M.' },
  { id: 'ev-2', title: 'Pickup Chemistry Kit', date: '2026-07-12', type: 'pickup', relatedItem: 'Organic Chemistry Model Kit', otherParty: 'Dr. Smith' },
  { id: 'ev-3', title: 'Return Soldering Station', date: '2026-07-23', type: 'return_due', relatedItem: 'Soldering Iron Station', otherParty: 'Robotics Club' },
  { id: 'ev-4', title: 'Multimeter OVERDUE', date: '2026-06-29', type: 'overdue', relatedItem: 'Digital Multimeter', otherParty: 'EE Dept' },
  { id: 'ev-5', title: 'Handover Raspberry Pi', date: '2026-07-14', type: 'handover', relatedItem: 'Raspberry Pi 4 (4GB)', otherParty: 'Tech Club' },
];

// ── Most Wanted Items (for dashboard table) ──────────────────
export function getMostWantedItems() {
  return [...mockListings]
    .sort((a, b) => b.wantedCount - a.wantedCount)
    .slice(0, 5);
}

// ── Matches ──────────────────────────────────────────────────
export type MatchType = 'pairwise' | 'chain';
export type MatchStatus = 'pending' | 'partially_accepted' | 'ready';

export interface MatchParticipant {
  name: string;
  avatar: string;
  gives: string;
  receives: string;
  trustScore: number;
}

export interface Match {
  id: string;
  type: MatchType;
  matchScore: number; // 0-100
  participants: MatchParticipant[];
  status: MatchStatus;
  actionRequired: boolean; // Does the current user need to act?
  createdDate: string;
}

export const mockMatches: Match[] = [
  {
    id: 'm-1',
    type: 'pairwise',
    matchScore: 95,
    status: 'pending',
    actionRequired: true,
    createdDate: '2026-07-09T10:00:00Z',
    participants: [
      {
        name: 'You',
        avatar: 'JD',
        gives: 'Arduino Uno R3 Kit',
        receives: 'Raspberry Pi 4 (4GB)',
        trustScore: 87,
      },
      {
        name: 'Tech Club',
        avatar: 'TC',
        gives: 'Raspberry Pi 4 (4GB)',
        receives: 'Arduino Uno R3 Kit',
        trustScore: 88,
      },
    ],
  },
  {
    id: 'm-2',
    type: 'chain',
    matchScore: 88,
    status: 'partially_accepted',
    actionRequired: true,
    createdDate: '2026-07-08T14:30:00Z',
    participants: [
      {
        name: 'You',
        avatar: 'JD',
        gives: 'Calculus Early Transcendentals',
        receives: 'Physics 101 Notes (A+)',
        trustScore: 87,
      },
      {
        name: 'Sarah J.',
        avatar: 'SJ',
        gives: 'Physics 101 Notes (A+)',
        receives: 'TI-84 Plus Calculator',
        trustScore: 78,
      },
      {
        name: 'Ravi K.',
        avatar: 'RK',
        gives: 'TI-84 Plus Calculator',
        receives: 'Calculus Early Transcendentals',
        trustScore: 74,
      },
    ],
  },
  {
    id: 'm-3',
    type: 'pairwise',
    matchScore: 92,
    status: 'ready',
    actionRequired: false,
    createdDate: '2026-07-07T09:15:00Z',
    participants: [
      {
        name: 'You',
        avatar: 'JD',
        gives: 'Lab Coat (Size M)',
        receives: 'Organic Chemistry Model Kit',
        trustScore: 87,
      },
      {
        name: 'Dr. Smith',
        avatar: 'DS',
        gives: 'Organic Chemistry Model Kit',
        receives: 'Lab Coat (Size M)',
        trustScore: 95,
      },
    ],
  },
  {
    id: 'm-4',
    type: 'chain',
    matchScore: 85,
    status: 'pending',
    actionRequired: true,
    createdDate: '2026-07-09T18:45:00Z',
    participants: [
      {
        name: 'You',
        avatar: 'JD',
        gives: 'Digital Multimeter',
        receives: 'Soldering Iron Station',
        trustScore: 87,
      },
      {
        name: 'Robotics Club',
        avatar: 'RC',
        gives: 'Soldering Iron Station',
        receives: 'Data Structures & Algorithms Textbook',
        trustScore: 93,
      },
      {
        name: 'Priya S.',
        avatar: 'PS',
        gives: 'Data Structures & Algorithms Textbook',
        receives: 'Digital Multimeter',
        trustScore: 89,
      },
    ],
  },
];

// ── Network Connections ───────────────────────────────────────
export interface NetworkUser {
  id: string;
  name: string;
  avatarSeed: string;
  trustScore: number;
  totalTrades: number;
  itemsListed: number;
  memberSince: string;
  trustBreakdown: {
    onTimeReturns: number;
    conditionRatings: number;
    completedTrades: number;
  };
}

export const mockNetworkUsers: NetworkUser[] = [
  {
    id: 'u-1',
    name: 'Alex M.',
    avatarSeed: 'AM',
    trustScore: 92,
    totalTrades: 14,
    itemsListed: 5,
    memberSince: '2025-08-15',
    trustBreakdown: {
      onTimeReturns: 95,
      conditionRatings: 90,
      completedTrades: 92,
    }
  },
  {
    id: 'u-2',
    name: 'Tech Club',
    avatarSeed: 'TC',
    trustScore: 98,
    totalTrades: 45,
    itemsListed: 12,
    memberSince: '2024-01-10',
    trustBreakdown: {
      onTimeReturns: 99,
      conditionRatings: 98,
      completedTrades: 96,
    }
  },
  {
    id: 'u-3',
    name: 'Sarah K.',
    avatarSeed: 'SK',
    trustScore: 65,
    totalTrades: 4,
    itemsListed: 2,
    memberSince: '2026-02-20',
    trustBreakdown: {
      onTimeReturns: 55,
      conditionRatings: 70,
      completedTrades: 60,
    }
  },
  {
    id: 'u-4',
    name: 'Ravi K.',
    avatarSeed: 'RK',
    trustScore: 74,
    totalTrades: 8,
    itemsListed: 1,
    memberSince: '2025-11-05',
    trustBreakdown: {
      onTimeReturns: 70,
      conditionRatings: 80,
      completedTrades: 72,
    }
  },
  {
    id: 'u-5',
    name: 'Priya S.',
    avatarSeed: 'PS',
    trustScore: 89,
    totalTrades: 21,
    itemsListed: 4,
    memberSince: '2025-09-01',
    trustBreakdown: {
      onTimeReturns: 90,
      conditionRatings: 95,
      completedTrades: 85,
    }
  },
  {
    id: 'u-6',
    name: 'Dr. Smith',
    avatarSeed: 'DS',
    trustScore: 95,
    totalTrades: 30,
    itemsListed: 8,
    memberSince: '2023-05-12',
    trustBreakdown: {
      onTimeReturns: 100,
      conditionRatings: 95,
      completedTrades: 90,
    }
  }
];
