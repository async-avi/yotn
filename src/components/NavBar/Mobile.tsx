"use client";
import { sideBarAtom } from "@/atoms/atom";
import React from "react";
import { useRecoilState } from "recoil";
import { FaBars } from "react-icons/fa6";

function Mobile() {
  const [sideBar, setSideBar] = useRecoilState(sideBarAtom);
  return (
    <div>
      <button onClick={() => setSideBar(!sideBar)}>
        <FaBars />
      </button>
    </div>
  );
}

export default Mobile;
