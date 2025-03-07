'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { HiUpload } from 'react-icons/hi';

interface CreateListingFormData {
  title: string;
  description: string;
  location: string;
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  images: FileList;
}

export default function CreateListingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CreateListingFormData>();

  const onSubmit = async (data: CreateListingFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images') {
          Array.from(value as FileList).forEach((file) => {
            formData.append('images', file);
          });
        } else {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      toast.success('Listing created successfully');
      router.push('/dashboard/listings');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          {...register('location', { required: 'Location is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price per night</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Guests</label>
          <input
            type="number"
            {...register('guests', { required: 'Number of guests is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.guests && (
            <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <input
            type="number"
            {...register('bedrooms', { required: 'Number of bedrooms is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.bedrooms && (
            <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <input
            type="number"
            {...register('bathrooms', { required: 'Number of bathrooms is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.bathrooms && (
            <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <HiUpload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                <span>Upload files</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  {...register('images', { required: 'At least one image is required' })}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Listing'}
      </button>
    </form>
  );
} 