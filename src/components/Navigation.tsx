import { FC } from 'react';
import { Link } from 'react-router-dom';

const Navigation: FC = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-violet-700 text-white">
      <h3 className="font-bold">
        <Link to="/">Github Search</Link>
      </h3>
      <span>
        <Link to="/" className="mr-2 hover:text-teal-300 ease-in-out duration-200">
          Home
        </Link>
        <Link to="/favourites" className="hover:text-teal-300 ease-in-out duration-200">
          Favourites
        </Link>
      </span>
    </nav>
  );
};

export default Navigation;
