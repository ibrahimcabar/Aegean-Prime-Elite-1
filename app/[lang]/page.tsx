
import { notFound } from "next/navigation";

const languages = ["en", "tr", "de", "ru", "ar"];

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!languages.includes(lang)) {
    notFound();
  }

  return (
    <main>
      <h1>Velora Prime Elite</h1>
      <p>Multilingual pages are being prepared.</p>
    </main>
  );
}
