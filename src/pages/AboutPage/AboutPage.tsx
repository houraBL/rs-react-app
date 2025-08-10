import IconAPI from '@assets/icon-api.svg';
import IconGit from '@assets/icon-github.svg';
import IconRSS from '@assets/icon-rss.svg';

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
      <a href={API_LINK} target="_blank" rel="noreferrer" className={linkClass}>
        <img src={IconAPI} className="h-6" alt="Rick and Morty API logo" />
        Rick and Morty API
      </a>
      <a href={RSS_LINK} target="_blank" rel="noreferrer" className={linkClass}>
        <img src={IconRSS} className="h-6" alt="RS School logo" />
        RS School
      </a>
      <a href={GIT_LINK} target="_blank" rel="noreferrer" className={linkClass}>
        <img src={IconGit} className="h-6" alt="GitHub logo" />
        hourabl
      </a>
    </div>
  );
}
