import IconAPI from '@assets/icon-api.svg';
import IconGit from '@assets/icon-github.svg';
import IconRSS from '@assets/icon-rss.svg';
import Image from 'next/image';
import Link from 'next/link';

export const API_LINK = 'https://rickandmortyapi.com/';
export const RSS_LINK = 'https://rs.school/courses/reactjs';
export const GIT_LINK = 'https://github.com/houraBL';

export default function AboutPage() {
  const linkClass =
    'flex gap-2 p-2 px-4 items-center justify-center hover:bg-blue-700 rounded-full';
  return (
    <div className="p-4 flex flex-col gap-2 items-center justify-center">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="text-xl p-4">
        This is the About page. <br />
        This app was possible thanks to Rick and Morty API
      </p>
      <Link
        href={API_LINK}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        <Image
          src={IconAPI.src}
          className="h-6"
          alt="Rick and Morty API logo"
          width={32}
          height={32}
        />
        Rick and Morty API
      </Link>
      <Link
        href={RSS_LINK}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
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
        className={linkClass}
      >
        <Image
          src={IconGit.src}
          className="h-6"
          alt="GitHub logo"
          width={32}
          height={32}
        />
        hourabl
      </Link>
    </div>
  );
}
