import IconMoon from '@assets/icon-moon.svg';
import IconSun from '@assets/icon-sun.svg';
import useTheme from '@hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const navLinkClassName =
    'text-lg font-bold hover:cursor-pointer inline-flex rounded-full px-3 py-1.5 ' +
    ' text-blue-900 hover:bg-blue-300 dark:hover:bg-blue-700 dark:text-white';

  const isLinkActive = 'bg-blue-100 dark:bg-blue-500 dark:text-blue-100';

  return (
    <header className="z-40 sticky top-0 h-14 bg-blue-400 dark:bg-blue-600 drop-shadow-xl drop-shadow-blue-500 dark:drop-shadow-blue-950 flex flex-wrap gap-2 items-center justify-center ">
      <h1 className={navLinkClassName + isLinkActive}>Performance</h1>
      <button className={navLinkClassName + ' px-0'} onClick={toggleTheme}>
        <img
          src={theme === 'dark' ? IconSun : IconMoon}
          className="h-8 w-8 "
          alt={theme === 'dark' ? 'Light theme' : 'Dark theme'}
        />
      </button>
    </header>
  );
}
