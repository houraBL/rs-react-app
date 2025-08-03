import RSSchoolLogo from '../../assets/rss-logo.svg';
import githubLogo from '../../assets/github.svg';

export default function Footer() {
  return (
    <footer className="h-12 flex gap-4 items-center justify-center bg-blue-400 dark:bg-blue-600 font-bold">
      <a
        href="https://rs.school/"
        target="_blank"
        rel="noreferrer"
        className="flex gap-2 items-center justify-center"
      >
        <img src={RSSchoolLogo} className="h-6" alt="RS School logo" />
        RS School
      </a>
      <a
        href="https://github.com/houraBL"
        target="_blank"
        rel="noreferrer"
        className="flex gap-2 items-center justify-center"
      >
        <img src={githubLogo} className="h-6" alt="GitHub logo" />
        hourabl
      </a>
    </footer>
  );
}
