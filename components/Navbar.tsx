'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setShowNavbar(scrollPosition > window.innerHeight);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setShowNavbar(true);
    }
  }, [pathname]);

  if (pathname === '/' && !showNavbar) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Voting App
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/vote">
            <Button variant="ghost">Vote</Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost">Profile</Button>
          </Link>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;