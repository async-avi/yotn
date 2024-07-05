"use client";
import React from "react";
import { FaBars } from "react-icons/fa6";
import { RecoilRoot } from "recoil";
import Mobile from "../Mobile";
import NavLinks from "./NavLinks";

function NavBarLeft() {
  return (
    <>
      <RecoilRoot>
        <div className="hidden md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <Mobile />
        </div>
      </RecoilRoot>
    </>
  );
}

export default NavBarLeft;
