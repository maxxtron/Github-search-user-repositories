import React, { FC } from 'react';
import { useAppSelector } from '../hooks/useRedux';
import { useActions } from '../hooks/useActions';

const FavouritesPage: FC = () => {
  const { favourites } = useAppSelector((state) => state.favouriteRepos);
  const { removeFavourite } = useActions();
  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>, fav: string) => {
    event.preventDefault();
    removeFavourite(fav);
  };
  if (favourites.length === 0) return <p className="text-center font-bold">No items.</p>;

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favourites.map((fav) => (
          <li
            key={fav}
            className="border py-3 px-5 rounded mb-1 mt-1 hover:shadow-md hover:bg-gray-100 transition-all"
          >
            <a href={fav} target="_blank">
              {fav}
            </a>
            <button
              className="ml-2 py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
              onClick={(event) => removeFromFavourite(event, fav)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
