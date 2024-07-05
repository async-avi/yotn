import AnnouncementBar from "@/components/AnnouncementBar";
import Image from "next/image";
import homeBg from "../../public/home bg.jpg";
import NavBar from "@/components/NavBar/index";

function page() {
  return (
    <main>
      <nav>
        <AnnouncementBar />
        <NavBar />
      </nav>
    </main>
  );
}

export default page;
