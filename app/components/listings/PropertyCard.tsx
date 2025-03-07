'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiHeart } from 'react-icons/hi';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  rating: number;
  isFavorite?: boolean;
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  imageUrl,
  rating,
  isFavorite = false,
}: PropertyCardProps) {
  const router = useRouter();

  return (
    <div
      className="group cursor-pointer"
      onClick={() => router.push(`/listings/${id}`)}
    >
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <Image
          fill
          className="object-cover group-hover:scale-110 transition"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute top-3 right-3">
          <HiHeart
            className={`h-6 w-6 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'fill-white text-white'
            }`}
          />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{location}</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-semibold">${price} / night</p>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 