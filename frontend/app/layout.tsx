import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import dynamicImport from 'next/dynamic';

const Navbar = dynamicImport(() => import('@/components/Navbar'), { ssr: false });

export const dynamic = 'force-dynamic';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'E-Waste Locator - Sustainable E-Waste Management in India',
  description:
    'Connect with government-certified e-waste recyclers across India. Dispose of your electronic waste safely and track your environmental impact.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
