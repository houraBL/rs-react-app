import Search from '../../components/Search/Search';
import CharacterList from '../../components/CharacterList/CharacterList';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Outlet } from 'react-router-dom';

export default function HomePage() {
  const [localSearchTerm, setLocalSearchTerm] = useLocalStorage('search', '');

  return (
    <div className="h-full min-h-[400px] flex flex-col relative w-full">
      <Search
        onSearchSubmit={setLocalSearchTerm}
        searchQuery={localSearchTerm}
      />
      <div className="flex flex-grow">
        <CharacterList searchedTerm={localSearchTerm} />
        <Outlet />
      </div>
    </div>
  );
}
