import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'JobBoard - Find Your Next Opportunity',
  description: 'Browse and apply for the latest job openings',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-100 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            © {new Date().getFullYear()} JobBoard. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}