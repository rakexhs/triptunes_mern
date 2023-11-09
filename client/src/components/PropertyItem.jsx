import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function PropertyItem({ property }) {
  return (
    <div className='bg-white  shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]'>
      <Link to={`/property/${property._id}`}>
        <img
          src={
            property.imageUrls[0] ||
            'https://cdn.listingphotos.sierrastatic.com/pics2x/v1696255576/112/112_H6245695_02.jpg '
          }
          alt='property cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {property.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {property.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {property.description}
          </p>
          <p className='text-slate-800 mt-2 font-semibold '>
            Rs{' '}
            {property.offer
              ? property.discountPrice.toLocaleString('en-US')
              : property.regularPrice.toLocaleString('en-US')}
              {property.type === 'rent' && ' / Day'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {property.bedrooms > 1
                ? `${property.bedrooms} beds `
                : `${property.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {property.bathrooms > 1
                ? `${property.bathrooms} baths `
                : `${property.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}