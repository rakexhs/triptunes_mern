import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(""); // Reset the search term to an empty string
  }, [location.pathname]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-white shadow-md border-slate-400">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold flex flex-wrap">
            <span className="text-red-400 sm:text-2xl md:text-3xl lg:text-3xl ">
              Trip
            </span>
            <span className="text-red-600 uppercase sm:text-2xl md:text-3xl lg:text-3xl ">
              Tunes
            </span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 rounded-lg flex items-center shadow-md border"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-20 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex items-center gap-2 sm:gap-4 ">
          <Link to="/">
            <li className="hidden sm:inline text-blb hover:underline hover:text-red-500">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-blb hover:underline hover:text-red-500">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="border-black border rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <div className="text-center ">
                <li className="text-blb hover:underline ml-0 hover:opacity-90 bg-red-500 text-white rounded-lg p-2 whitespace-nowrap">
                  Sign In
                </li>
              </div>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
