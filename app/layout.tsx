import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Aegean Prime Elite | Global Real Estate',description:'Discover extraordinary properties worldwide. A global property marketplace.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
