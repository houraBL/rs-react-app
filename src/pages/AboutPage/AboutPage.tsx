import RSSchoolLogo from '../../assets/rss-logo.svg';
import githubLogo from '../../assets/github.svg';
import APILogo from '../../assets/rick-and-morti.svg';

export default function AboutPage() {
  const linkClass =
    'flex gap-2 p-2 px-4 items-center justify-center hover:bg-blue-700 rounded-full';
  return (
    <div className="p-4 flex flex-col gap-2 items-center justify-center">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="text-xl p-4">
        This is the About page. <br />
        This app was possible thanks to Rick and Morti API
      </p>
      <a
        href="https://rickandmortyapi.com/"
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        <img src={APILogo} className="h-6" alt="Rick and Morti API logo" />
        Rick and Morti API
      </a>
      <a
        href="https://rs.school/"
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        <img src={RSSchoolLogo} className="h-6" alt="RS School logo" />
        RS School
      </a>
      <a
        href="https://github.com/houraBL"
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        <img src={githubLogo} className="h-6" alt="GitHub logo" />
        hourabl
      </a>
    </div>
  );
}
