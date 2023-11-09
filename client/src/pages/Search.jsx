import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyItem from '../components/PropertyItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    city:'',
    adults: 1,
    children: 0,
    beds: 1,
    type: 'all',
    parking: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [propertys, setProperties] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Calculate beds based on adults and children
    const totalBeds = Math.ceil((parseInt(sidebardata.adults, 10) + parseInt(sidebardata.children, 10)) / 2);
    setSidebardata({ ...sidebardata, beds: totalBeds });
  }, [sidebardata.adults, sidebardata.children]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const cityFromUrl = urlParams.get('city');
    const adultsFromUrl = urlParams.get('adults');
    const childrenFromUrl = urlParams.get('children');
    const bedsFromUrl = urlParams.get('beds');
    const parkingFromUrl = urlParams.get('parking');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      cityFromUrl ||
      adultsFromUrl ||
      childrenFromUrl ||
      bedsFromUrl ||
      parkingFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        city: cityFromUrl || '',
        adults: adultsFromUrl || 1,
        children: childrenFromUrl || 0,
        beds: bedsFromUrl || 1,
        parking: parkingFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchProperties = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/property/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
  
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === 'city') {
        setSidebardata({ ...sidebardata, city: e.target.value });
      }
    if (e.target.id === 'parking' || e.target.id === 'offer') {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }
  
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  
    if (e.target.id === 'adults') {
      setSidebardata({ ...sidebardata, adults: parseInt(e.target.value, 10) || 0 });
    }
    
    if (e.target.id === 'children') {
      setSidebardata({ ...sidebardata, children: parseInt(e.target.value, 10) || 0 });
    }
  
    if (e.target.id === 'beds') {
      // Calculate beds based on adults and children
      const totalBeds = Math.ceil((parseInt(sidebardata.adults, 10) + parseInt(sidebardata.children, 10)) / 2);
      setSidebardata({ ...sidebardata, beds: totalBeds });
    }
  };
  
   console.log(sidebardata);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('city', sidebardata.city);
    urlParams.set('adults', sidebardata.adults);
    urlParams.set('children', sidebardata.children); // Fix the typo here
    urlParams.set('beds', sidebardata.beds);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfProperties = propertys.length;
    const startIndex = numberOfProperties;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/property/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setProperties([...propertys, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search :
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border border-slate-300  rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              City :
            </label>
            <input
              type='text'
              id='city'
              placeholder='City'
              className='border border-slate-300  rounded-lg p-3 w-full'
              value={sidebardata.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">          
            <label htmlFor="adults" className="text-black whitespace-nowrap font-semibold">
              Adults:
            </label>
          <input
            type="number"
            id="adults"
            placeholder="Adults"
            value={sidebardata.adults}
            onChange={handleChange}
            className="border border-slate-300  rounded-lg p-3 w-full"
          />
        </div>
        <div className="flex gap-2 items-center"> 
            <label htmlFor="adults" className="text-black whitespace-nowrap font-semibold">
              Children:
            </label>
          <input
            type="number"
            id="children"
            placeholder="Adults"
            value={sidebardata.children}
            onChange={handleChange}
            className="border border-slate-300  rounded-lg p-3 w-full"
          />
        </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
          </div>
          <div className='flex items-center gap-2 '>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3 '
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Property results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && propertys.length === 0 && (
            <p className='text-xl text-slate-700'>No property found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            propertys &&
            propertys.map((property) => (
              <PropertyItem key={property._id} property={property} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}