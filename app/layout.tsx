import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Velora Prime Elite | Luxury Global Real Estate',
  description: 'Explore exceptional luxury properties, villas, apartments and real estate investment opportunities worldwide with Velora Prime Elite.',
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
