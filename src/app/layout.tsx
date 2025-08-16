import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';

import '../index.css';
import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Rick and Morty Characters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="../assets/icon-api.svg" />
      </head>
      <body>
        <div id="root">
          <Providers>
            <div className="min-h-screen flex flex-col relative w-full text-blue-900 dark:text-white">
              <Header />
              <main className="bg-blue-300 dark:bg-blue-900 flex-grow flex items-center justify-center text-xl">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
