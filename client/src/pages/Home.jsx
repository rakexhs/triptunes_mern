import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { AiOutlineUser, AiOutlineTeam } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import PropertyItem from "../components/PropertyItem";

export default function Home() {
  const [offerProperties, setOfferProperties] = useState([]);
  const [saleProperties, setSaleProperties] = useState([]);
  const [rentProperties, setRentProperties] = useState([]);
  const [searchData, setSearchData] = useState({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    beds: 1,
  });

  console.log(searchData);
  const navigate = useNavigate();
  SwiperCore.use([Navigation]);

  const Submitsearch = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (
      !searchData.city ||
      !searchData.checkInDate ||
      !searchData.checkOutDate ||
      searchData.adults < 1 ||
      searchData.children < 0
    ) {
      alert("Please fill in all fields");
      return;
    }
    const checkInDate = new Date(searchData.checkInDate);
    const checkOutDate = new Date(searchData.checkOutDate);

    if (checkOutDate <= checkInDate) {
      alert("Check-out date should be after the check-in date");
      return;
    }
    // Your navigation logic here
    // navigate("/search?searchTerm=&type=rent");
    const searchQuery = `?searchTerm=&type=rent&city=${searchData.city}&beds=${searchData.beds}&adults=${searchData.adults}&children=${searchData.children}`;
    navigate(`/search${searchQuery}`);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setSearchData((prevData) => {
      switch (id) {
        case "city":
        case "searchTerm":
          return {
            ...prevData,
            [id]: value,
          };
        case "checkInDate":
        case "checkOutDate":
          return {
            ...prevData,
            [id]: value,
          };
        case "adults":
        case "children":
          const intValue = parseInt(value, 10) || 0;
          const bedsValue = Math.ceil((prevData.adults + intValue) / 2);
          return {
            ...prevData,
            [id]: intValue,
            beds: bedsValue,
          };
        default:
          return prevData;
      }
    });
  };

  console.log(searchData);

  console.log(offerProperties);
  useEffect(() => {
    const fetchOfferProperties = async () => {
      try {
        const res = await fetch("/api/property/get?offer=true&limit=4");
        const data = await res.json();
        setOfferProperties(data);
        fetchRentProperties();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentProperties = async () => {
      try {
        const res = await fetch("/api/property/get?type=rent&limit=4");
        const data = await res.json();
        setRentProperties(data);
        fetchSaleProperties();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleProperties = async () => {
      try {
        const res = await fetch("/api/property/get?type=sale&limit=4");
        const data = await res.json();
        setSaleProperties(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferProperties();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Tune in to the <span className="text-slate-500">India&apos;s</span>
          <br />
          best travel homes
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Travel living made easy.
          <br />
          Whether you’re looking for a cozy apartment, a spacious villa, or a
          luxury penthouse, we have it all.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let the adventure begin!
        </Link>
      </div>
      <div className="w-full flex justify-center">
      <div className=" w-64 sm:w-full p-4 pb-4  mb-20 flex flex-col sm:flex-row gap-4 items-center justify-center bg-gradient-to-r from-orange-200 to-orange-400  shadow-md">
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-1">
            <MdLocationOn className="text-white" />
            <p htmlFor="city" className="text-white">
              City:
            </p>
          </div>
          <input
            type="text"
            id="city"
            placeholder="Where are you going?"
            value={searchData.city}
            onChange={handleChange}
            className="p-3 mt-1 bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <FaCalendarDays className="text-white" />
            <label htmlFor="checkInDate" className="text-white">
              Check-in date:
            </label>
          </div>
          <input
            type="date"
            id="checkInDate"
            value={searchData.checkInDate}
            onChange={handleChange}
            className="p-3 mt-1 bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300  px-8 sm:px-3 "
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <FaCalendarDays className="text-white" />
            <label htmlFor="checkOutDate" className="text-white">
              Check-out date:
            </label>
          </div>
          <input
            type="date"
            id="checkOutDate"
            value={searchData.checkOutDate}
            onChange={handleChange}
            className="py-3 sm:py-3 mt-1 bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300  px-8 sm:px-3"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-1">
            <AiOutlineUser className="text-white" />
            <label htmlFor="adults" className="text-white">
              Number of adults:
            </label>
          </div>
          <input
            type="number"
            id="adults"
            placeholder="Adults"
            value={searchData.adults}
            onChange={handleChange}
            className="p-3 mt-1 bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-1">
            <AiOutlineTeam className="text-white" />
            <label htmlFor="adults" className="text-white">
              Number of children:
            </label>
          </div>
          <input
            type="number"
            id="children"
            placeholder="Children"
            value={searchData.children}
            onChange={handleChange}
            className="p-3 mt-1 bg-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={Submitsearch}
          className="p-4 pr-10 pl-10 sm:mt-0 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition-all"
        >
          Search
        </button>
      </div>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerProperties &&
          offerProperties.length > 0 &&
          offerProperties.map((property) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${property.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={property._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* property results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerProperties && offerProperties.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerProperties.map((property) => (
                <PropertyItem property={property} key={property._id} />
              ))}
            </div>
          </div>
        )}
        {rentProperties && rentProperties.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentProperties.map((property) => (
                <PropertyItem property={property} key={property._id} />
              ))}
            </div>
          </div>
        )}
        {saleProperties && saleProperties.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleProperties.map((property) => (
                <PropertyItem property={property} key={property._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
