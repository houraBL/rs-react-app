import IconGithub from '@assets/icon-github.svg';
import IconRSS from '@assets/icon-rss.svg';

export const API_LINK = 'https://rickandmortyapi.com/';
export const RSS_LINK = 'https://rs.school/courses/reactjs';
export const GIT_LINK = 'https://github.com/houraBL';

export default function Footer() {
  return (
    <footer className="h-12 flex gap-4 items-center justify-center bg-blue-400 dark:bg-blue-600 font-bold">
      <a
        href={RSS_LINK}
        target="_blank"
        rel="noreferrer"
        className="flex gap-2 items-center justify-center"
      >
        <img src={IconRSS} className="h-6" alt="RS School logo" />
        RS School
      </a>
      <a
        href={GIT_LINK}
        target="_blank"
        rel="noreferrer"
        className="flex gap-2 items-center justify-center"
      >
        <img src={IconGithub} className="h-6" alt="GitHub logo" />
        hourabl
      </a>
    </footer>
  );
}
