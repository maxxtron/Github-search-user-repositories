import { IRepo } from '../models/models';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useRedux';
import React, { useEffect, useState } from 'react';

type userRepoType = string[];

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.favouriteRepos);
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));
  const userRepo: userRepoType = [];

  useEffect(() => {
    // console.log(repo.html_url);
    userRepo.push(repo.html_url);
    // localStorage.setItem('repos', userRepo: userRepoType);
  }, [repo]);

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setIsFav(true);
  };
  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false);
  };
  return (
    <div className="border py-3 px-5 rounded mb-1 mt-1 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p>
          Forks: <span className="font-bold mr-4">{repo.forks}</span>
          Watchers: <span className="font-bold mr-4">{repo.watchers}</span>
          Language: <span className="font-bold">{repo.language}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
      </a>
      {!isFav && (
        <button
          className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
          onClick={addToFavourite}
        >
          Add to favourite
        </button>
      )}
      {isFav && (
        <button
          className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          onClick={removeFromFavourite}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default RepoCard;
