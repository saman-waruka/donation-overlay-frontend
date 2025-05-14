# Donation Overlay for Live Streams

A simple, customizable donation overlay built with Next.js and TypeScript. This project allows you to display real-time donation messages on your livestream, supporting queueing, message display, and easy integration.

## Features

- Real-time donation queue display
- Customizable overlay UI
- Easy setup with environment variables
- Built with Next.js App Router

## Getting Started (Development Mode)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/donation-overlay.git
   cd donation-overlay
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env.local` and fill in the required values.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the overlay.

6. **Usage:**
   - Add `?token=YOUR_TOKEN` to the URL to authenticate and start receiving donations.
     example: [http://localhost:3000?token=YOUR_TOKEN](http://localhost:3000?token=YOUR_TOKEN)

### Customizing the Port

By default, the app runs at `http://localhost:3000`.  
If you want to change the port, set the `PORT` environment variable in your `.env.local` file, for example:

---

For more details, see the documentation below.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
