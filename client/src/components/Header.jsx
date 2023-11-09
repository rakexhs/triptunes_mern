import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-white shadow-md border-slate-400">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-red-400 text-4xl">Trip</span>
          <span className="text-red-600 uppercase text-4xl">Tunes</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit}
        className='bg-white p-3 rounded-lg flex items-center shadow-md border'>
          <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            />
        <button>
          <FaSearch className='text-slate-600'/>
          </button>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='hidden sm:inline text-blb hover:underline hover:text-red-500'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-blb hover:underline hover:text-red-500'>About</li>
            </Link>
            <Link to='/profile' className='border-black border rounded-2xl'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-blb hover:underline hover:text-red-500'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
