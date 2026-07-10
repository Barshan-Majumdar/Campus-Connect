# Campus Connect

**Campus Connect** is a modern, beautifully designed web application built to facilitate seamless peer-to-peer item swapping, borrowing, and giving away among college students. It provides a secure, organized, and trust-based platform for students to exchange academic resources, hardware components, and lab equipment.

---

## 🌟 Key Features

### 1. 🛒 Advanced Marketplace
- **Categorized Listings**: Easily browse items by categories such as *Hardware*, *Academic*, and *Lab*.
- **Transaction Types**: Support for flexible trading mechanisms including *Permanent Swaps*, *Temporary Borrows*, and *Free Giveaways*.
- **Item Details**: View comprehensive details including item condition, owner information, and what the owner is "Looking For" in exchange.

### 2. 🤝 Smart Matching System
- **Pairwise Matching**: Automatically pairs users who have items the other person wants.
- **Chain Swaps**: Advanced multi-way matching algorithm that connects three or more students in a loop (e.g., A gives to B, B gives to C, C gives to A) to maximize successful trades.
- **Match Scoring**: Intelligent percentage-based score indicating the quality and fairness of a proposed match.

### 3. 🔄 Transaction Management
- **Lifecycle Tracking**: Track the status of every trade from `Requested` → `Accepted` → `In Transit` → `Completed`.
- **Handover Points**: Integrated designated campus handover locations (e.g., Library Desk, Canteen Entrance) for secure physical exchanges.
- **Deadlines & Overdue Alerts**: Clear tracking of return dates for borrowed items, with overdue warnings.

### 4. 🛡️ Trust & Reputation System
- **Dynamic Trust Score**: Every user has a public Trust Score (0-100) calculated based on their platform behavior.
- **Score Breakdown**: Reputation is transparently divided into metrics like *On-time Returns*, *Condition Ratings*, and *Completed Trades*.
- **Campus Network**: Browse public profiles of other students to verify their reliability and history before agreeing to a trade.

### 5. 📅 Deadlines Calendar
- **Event Tracking**: Integrated calendar view to keep track of upcoming item return dates, scheduled pickups, and handovers.
- **Color-Coded Alerts**: Visual indicators for urgent actions (e.g., red for overdue items, blue for handovers).

### 6. 📊 Interactive Dashboard
- **Analytics Overview**: High-level statistics of campus trading activity (total trades, active listings).
- **Activity Charts**: Beautifully rendered data visualizations tracking marketplace activity and trends over time.

### 7. 📱 Premium, Responsive UI/UX
- **Modern Aesthetics**: Built with a sleek, glassmorphism design language using Tailwind CSS.
- **Fluid Animations**: High-quality micro-interactions, spring animations, and page transitions powered by Framer Motion.
- **Fully Responsive**: Flawless experience across desktop, tablet, and mobile devices featuring an animated off-canvas drawer navigation.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React (via Vite or Next.js)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

---

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` (or the port specified by Vite) to view the application.

---

*Designed and built for a smarter, more connected campus ecosystem.*