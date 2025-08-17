import IconGithub from '@assets/icon-github.svg';
import IconRSS from '@assets/icon-rss.svg';
import { GIT_LINK, RSS_LINK } from '@pages/AboutPage/AboutPage';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="h-12 flex gap-4 items-center justify-center bg-blue-400 dark:bg-blue-600 font-bold">
      <Link
        href={RSS_LINK}
        target="_blank"
        rel="noreferrer"
        className="flex gap-2 items-center justify-center"
      >
        <Image
          src={IconRSS.src}
          className="h-6"
          alt="RS School logo"
          width={32}
          height={32}
        />
        RS School
      </Link>
      <Link
        href={GIT_LINK}
        target="_blank"
        rel="noreferrer"
        className="flex gap-2 items-center justify-center"
      >
        <Image
          src={IconGithub.src}
          className="h-6"
          alt="GitHub logo"
          width={32}
          height={32}
        />
        hourabl
      </Link>
    </footer>
  );
}
