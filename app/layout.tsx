import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nitin Choudhary - Full-Stack Developer Portfolio',
  description: 'Professional portfolio showcasing full-stack development skills with secure resume purchase functionality.',
  keywords: ['portfolio', 'full-stack developer', 'react', 'nodejs', 'resume'],
  authors: [{ name: 'Nitin Choudhary' }],
  openGraph: {
    title: 'Nitin Choudhary - Full-Stack Developer',
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
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`font-sans ${inter.className}`}>{children}</body>
    </html>
  );
}