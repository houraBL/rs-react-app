'use client';

import IconMoon from '@assets/icon-moon.svg';
import IconSun from '@assets/icon-sun.svg';
import useTheme from '@hooks/useTheme';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const navLinkClassName =
    'text-lg font-bold hover:cursor-pointer inline-flex rounded-full px-3 py-1.5 ' +
    ' text-blue-900 hover:bg-blue-300 dark:hover:bg-blue-700 dark:text-white';

  const isLinkActive =
    ' [&.active]:bg-blue-100 [&.active]:cursor-default  [&.active]:dark:bg-blue-500 [&.active]:dark:text-blue-100';

  return (
    <header className="z-40 sticky top-0 h-14 bg-blue-400 dark:bg-blue-600 drop-shadow-xl drop-shadow-blue-500 dark:drop-shadow-blue-950 flex flex-wrap gap-2 items-center justify-center ">
      <Link href={'/1'} className={navLinkClassName + isLinkActive}>
        Home
      </Link>
      <Link href={'about'} className={navLinkClassName + isLinkActive}>
        About
      </Link>
      <button className={navLinkClassName + ' px-0'} onClick={toggleTheme}>
        <Image
          src={theme === 'dark' ? IconSun.src : IconMoon.src}
          width={32}
          height={32}
          className="h-8 w-8 "
          alt={theme === 'dark' ? 'Light theme' : 'Dark theme'}
        />
      </button>
    </header>
  );
}
