"use client";

import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import UserMenu from "./UserMenu";
import Search from "./Search";
import Container from "../Container";
import Logo from "./Logo";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold text-red-800">CozyQuarter</span>
            </div>
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
