import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://veloraprimeelite.com'),
  openGraph: {
  title: 'Velora Prime Elite | Luxury Global Real Estate',
  description: 'Discover luxury villas, premium properties and international real estate investment opportunities with Velora Prime Elite.',
  siteName: 'Velora Prime Elite',
},
  twitter: {
  card: 'summary_large_image',
  title: 'Velora Prime Elite | Luxury Global Real Estate',
  description: 'Discover luxury villas, premium properties and international real estate opportunities with Velora Prime Elite.',
},
  title: 'Velora Prime Elite | Luxury Global Real Estate',
  description: 'Explore exceptional luxury properties, villas, apartments and real estate investment opportunities worldwide with Velora Prime Elite.',
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
