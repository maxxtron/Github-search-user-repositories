import { FC, useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import Preloader from '../utils/Preloader';
import { useDebounce } from '../hooks/useDebounce';
import RepoCard from '../components/RepoCard';
const HomePage: FC = () => {
  const [search, setSearch] = useState('');
  const [dropDown, setDropDown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    //не показывать если меньше 3 символов
    skip: debounced.length < 3,
    //отправляет запрос при возвращении на вкладку
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();
  useEffect(() => {
    setDropDown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);
  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropDown(false);
    setSearch('');
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb2 outline-none border-violet-700 border-2 rounded-md"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isError && (
          <p className="text-center text-red-600 mt-4 font-bold">Something went wrong...</p>
        )}
        {dropDown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <Preloader />}
            {data?.map((user) => {
              return (
                <li
                  key={user.id}
                  onClick={() => clickHandler(user.login)}
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-color cursor-pointer"
                >
                  {user.login}
                </li>
              );
            })}
          </ul>
        )}
        <div className="container">
          {areReposLoading && <Preloader />}
          {repos?.length === 0 && (
            <h2 className="text-lg font-bold text-center mt-4">Repositories not found</h2>
          )}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
