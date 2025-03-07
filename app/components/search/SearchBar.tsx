'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { HiSearch, HiUsers, HiCalendar } from 'react-icons/hi';

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    const params = new URLSearchParams({
      location,
      startDate: dateRange[0].startDate.toISOString(),
      endDate: dateRange[0].endDate.toISOString(),
      guests: guests.toString(),
    });
    router.push(`/search?${params.toString()}`);
  };

  const handleDateChange = (ranges: any) => {
    if (ranges.selection?.startDate && ranges.selection?.endDate) {
      setDateRange([{
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
        key: 'selection',
      }]);
    }
  };

  return (
    <div className="border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <HiSearch className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="ml-2 outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <HiCalendar className="h-5 w-5 text-gray-500" />
            <DateRange
              ranges={dateRange}
              onChange={handleDateChange}
              minDate={new Date()}
            />
          </div>
          <div className="flex items-center">
            <HiUsers className="h-5 w-5 text-gray-500" />
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="ml-2 w-12 outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
} 