import Image from "next/image";
import modelBg from "../../public/modelBg.jpg";
// import axios from "axios";
// import Card from "@repo/ui/card";
// import { testBlogData } from "../test/testBlogData";
// import BlogCard from "@repo/ui/blogCard";

// async function getAllBlogs() {
//   try {
//     const response = await axios.get("http://localhost:3001/api/v0/blog/all");

//     return response.data;
//   } catch (error: any) {
//     console.error(error.message);
//     return null;
//   }
// }

async function BlogRender() {
  // const data = await getAllBlogs();
  return <></>;
}

function page() {
  return (
    <>
      <main className="w-screen h-lvh flex flex-col md:flex-row gap-6">
        <section className="w-fit relative">
          <div className="w-full h-full bg-black absolute opacity-60"></div>
          <div className="absolute text-white px-8 py-4 bottom-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">YOTN INSIGHTS</h1>
              <h3>
                UNCOVER THE LATEST TRENDS AND STYLING TIPS, EXPERTLY CURATED BY
                OUR STYLISTS.
              </h3>
            </div>
          </div>
          <Image
            className="w-auto h-full aspect-[1.414:1]"
            alt="model image"
            src={modelBg}
            width={1080}
            height={1920}
          />
        </section>
        <section className="p-4">
          <h1 className="font-bold text-center">RECENT POSTS</h1>
          <BlogRender />
        </section>
      </main>
    </>
  );
}

export default page;
