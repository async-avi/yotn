import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
  mainImageUrl: string;
  createdAt: string;
}

function BlogCard({ title, description, mainImageUrl, createdAt }: Props) {
  const displayDate = new Date(createdAt).toLocaleDateString("en-us", {
    // day: "2-digit",
    // month: "long",
    // year: "numeric",
  });
  return (
    <>
      <div className="flex flex-col my-4 w-full h-fit gap-4">
        <div className="w-full h-full gap-12 lg:gap-20 items-center flex">
          <h1 className="font-semibold text-sm md:text-md">{displayDate}</h1>
          <div className="flex flex-col">
            <h1 className="font-bold underline text-xl">
              {title.toUpperCase()}
            </h1>
            <h2>{description}</h2>
          </div>
        </div>
        <Image
          className="w-full aspect-video md:w-1/2 self-center"
          src={mainImageUrl}
          alt=""
          width={300}
          height={200}
        />
      </div>
    </>
  );
}

export default BlogCard;
