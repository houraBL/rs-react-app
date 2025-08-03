import Search from '../../components/Search/Search';
import CharacterList from '../../components/CharacterList/CharacterList';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import FlyoutDownload from '../../components/FlyoutDownload/FlyoutDownload';

export default function HomePage() {
  const [localSearchTerm, setLocalSearchTerm] = useLocalStorage('search', '');
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [, setSearchParams] = useSearchParams();

  const page = Number(pageId ?? '1');

  useEffect(() => {
    if (pageId && isNaN(Number(pageId))) {
      navigate('/not-found', { replace: true });
    }
  }, [navigate, pageId]);

  const handlePageChange = (newPage: number) => {
    navigate(`/${newPage}`);
    if (localSearchTerm.trim() !== '') {
      setSearchParams({ name: localSearchTerm });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="h-full min-h-[400px] flex flex-col relative w-full">
      <Search
        onSearchSubmit={setLocalSearchTerm}
        searchQuery={localSearchTerm}
      />
      <div className="flex flex-grow justify-between">
        <CharacterList
          searchedTerm={localSearchTerm}
          setTotalPages={setTotalPages}
        />
        <Outlet />
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <FlyoutDownload />
    </div>
  );
}
