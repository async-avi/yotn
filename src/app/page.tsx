import AnnouncementBar from "@/components/AnnouncementBar";
import React from "react";
import NavBar from "@/components/NavBar";

function page() {
  return (
    <div className="h-lvh w-screen">
      <AnnouncementBar />
      <nav>
        <NavBar />
      </nav>
    </div>
  );
}

export default page;
