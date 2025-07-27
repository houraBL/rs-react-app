import Search from '../../components/Search/Search';
import CharacterList from '../../components/CharacterList/CharacterList';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function HomePage() {
  const [localSearchTerm, setLocalSearchTerm] = useLocalStorage('search', '');

  return (
    <div className="h-full min-h-[400px] flex flex-col relative w-full">
      <Search
        onSearchSubmit={setLocalSearchTerm}
        searchQuery={localSearchTerm}
      />
      <CharacterList searchedTerm={localSearchTerm} />
    </div>
  );
}
