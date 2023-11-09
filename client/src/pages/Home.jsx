import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import PropertyItem from '../components/PropertyItem';

export default function Home() {
  const [offerProperties, setOfferProperties] = useState([]);
  const [saleProperties, setSaleProperties] = useState([]);
  const [rentProperties, setRentProperties] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerProperties);
  useEffect(() => {
    const fetchOfferProperties = async () => {
      try {
        const res = await fetch('/api/property/get?offer=true&limit=4');
        const data = await res.json();
        setOfferProperties(data);
        fetchRentProperties();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentProperties = async () => {
      try {
        const res = await fetch('/api/property/get?type=rent&limit=4');
        const data = await res.json();
        setRentProperties(data);
        fetchSaleProperties();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleProperties = async () => {
      try {
        const res = await fetch('/api/property/get?type=sale&limit=4');
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
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
         Tune in to the   <span className='text-slate-500'>world&apos;s</span>
          <br />
          best travel homes
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
        Travel living made easy. 
          <br />
          Whether you’re looking for a cozy apartment, a spacious villa, or a luxury penthouse, we have it all.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
         Let the adventure begin!
        </Link>
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
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={property._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* property results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerProperties && offerProperties.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerProperties.map((property) => (
                <PropertyItem property={property} key={property._id} />
              ))}
            </div>
          </div>
        )}
        {rentProperties && rentProperties.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentProperties.map((property) => (
                <PropertyItem property={property} key={property._id} />
              ))}
            </div>
          </div>
        )}
        {saleProperties && saleProperties.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
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