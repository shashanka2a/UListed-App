# UListed - University Marketplace

A production-ready Next.js application for university students to buy and sell items on campus.

## Features

- 🏠 **Home Feed** - Browse listings with category filters
- 🔍 **Search & Categories** - Find items by category
- 💬 **Chat** - Message sellers directly
- 📝 **Create Listings** - Sell your items easily
- 👤 **Profile** - Manage your account and listings
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- ⚡ **Next.js 15** - App Router with TypeScript
- 🎭 **Animations** - Smooth transitions with Framer Motion

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx          # Main page component
│   ├── globals.css       # Global styles
│   ├── providers.tsx     # Context providers
│   └── types.ts          # TypeScript type definitions
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...
│   ├── pages/           # Page components
│   └── assets/          # Static assets
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Features

### App Router Structure
- Uses Next.js 15 App Router
- Server and Client Components properly separated
- SEO-optimized with metadata

### State Management
- React Context API for global state
- Local state for component-specific data

### Image Optimization
- Next.js Image component for optimized images
- Support for remote images (Unsplash)
- Fallback handling for broken images

### Animations
- Framer Motion for smooth page transitions
- Component-level animations
- Performance-optimized animations

## Development

### Code Style
- ESLint configured with Next.js rules
- TypeScript strict mode enabled
- Prettier recommended for formatting

### Environment Variables
Create a `.env.local` file for environment-specific variables:

```env
# Add your environment variables here
```

## Deployment

This app is ready to deploy on platforms like:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## License

Private - All rights reserved
