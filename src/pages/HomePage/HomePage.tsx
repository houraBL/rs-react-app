import Search from '../../components/Search/Search';
import CharacterList from '../../components/CharacterList/CharacterList';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useLocalStorage('search', '');

  return (
    <div className="h-full min-h-[400px] flex flex-col relative w-full">
      <Search onSearchSubmit={setSearchQuery} searchQuery={searchQuery} />
      <CharacterList searchedTerm={searchQuery} />
    </div>
  );
}
