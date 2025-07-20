import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'John Doe - Full-Stack Developer Portfolio',
  description: 'Professional portfolio showcasing full-stack development skills with secure resume purchase functionality.',
  keywords: ['portfolio', 'full-stack developer', 'react', 'nodejs', 'resume'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'John Doe - Full-Stack Developer',
    description: 'Professional portfolio with secure resume purchase',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}