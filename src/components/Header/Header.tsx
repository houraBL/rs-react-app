import { NavLink } from 'react-router-dom';

export default function Header() {
  const navLinkClassName =
    'px-2 text-lg text-white font-bold hover:cursor-pointer inline-flex rounded-full px-3 py-1.5 ' +
    ' hover:text-blue-200 hover:bg-blue-600 ';

  const isLinkActive =
    ' [&.active]:bg-blue-100 [&.active]:text-blue-600 [&.active]:cursor-default';

  return (
    <header className="z-40 sticky top-0 h-14 bg-blue-500 drop-shadow-xl drop-shadow-blue-950 flex flex-wrap gap-2 items-center justify-center">
      <NavLink to={'/'} className={navLinkClassName + isLinkActive}>
        Home
      </NavLink>
      <NavLink to={'about'} className={navLinkClassName + isLinkActive}>
        About
      </NavLink>
    </header>
  );
}
