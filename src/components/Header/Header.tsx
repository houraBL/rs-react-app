import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme/useTheme';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const navLinkClassName =
    'text-lg font-bold hover:cursor-pointer inline-flex rounded-full px-3 py-1.5 ' +
    ' text-blue-900 hover:bg-blue-300 dark:hover:bg-blue-700 dark:text-white';

  const isLinkActive =
    ' [&.active]:bg-blue-100 [&.active]:cursor-default  [&.active]:dark:bg-blue-500 [&.active]:dark:text-blue-100';

  return (
    <header className="z-40 sticky top-0 h-14 bg-blue-400 dark:bg-blue-600 drop-shadow-xl drop-shadow-blue-500 dark:drop-shadow-blue-950 flex flex-wrap gap-2 items-center justify-center ">
      <NavLink to={'/1'} className={navLinkClassName + isLinkActive}>
        Home
      </NavLink>
      <NavLink to={'about'} className={navLinkClassName + isLinkActive}>
        About
      </NavLink>
      <button className={navLinkClassName + ' px-0'} onClick={toggleTheme}>
        <img
          src={theme === 'dark' ? sun : moon}
          className="h-8 w-8 "
          alt={theme === 'dark' ? 'Light theme' : 'Dark theme'}
        />
      </button>
    </header>
  );
}
