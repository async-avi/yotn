import Image from "next/image";
import modelBg from "../../public/modelBg.jpg";
import modelBg2 from "../../public/modelBg2.jpg";
// import axios from "axios";
// import Card from "@repo/ui/card";
import { testBlogData } from "@/components/test/testBlog";
import BlogCard from "@/components/BlogCard";
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
  return (
    <div className="w-full flex flex-col gap-3 h-screen overflow-y-scroll">
      {testBlogData.map((post) => (
        <BlogCard
          createdAt={post.createdAt}
          description={post.description}
          mainImageUrl={post.mainImageUrl}
          title={post.title}
          key={post.id}
        />
      ))}
    </div>
  );
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
            className="w-full h-full aspect-[1.414:1]"
            alt="model image"
            src={modelBg2}
            width={1080}
            height={1920}
          />
        </section>
        <section className="w-full p-4 md:w-1/2 md:p-0">
          <BlogRender />
        </section>
      </main>
    </>
  );
}

export default page;
