"use client";

import useCountries from "@/app/hooks/useContries";
import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingsInfoProps {
  user: SafeUser,
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  kitchenCount: number;
  acCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingsInfo: React.FC<ListingsInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  kitchenCount,
  acCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
          <div>{kitchenCount} kitchen</div>
          <div>{acCount} AC</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingsInfo;
