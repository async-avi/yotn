export const testBlogData = [
  {
    id: "64b6e893e59d3e6a1c6c001",
    title: "First Blog Post",
    slug: "first-blog-post",
    mainImageUrl: "https://picsum.photos/id/237/200/200",
    description: "This is the description of the first blog post.",
    sections: [
      {
        subHeading: "Introduction",
        content: "This is the introduction to the first blog post.",
        products: [
          {
            id: 1,
            url: "https://example.com/product-1",
            imageUrl: "https://example.com/product-1.jpg",
            hikedPrice: "$30.00",
            actualPrice: "$25.00",
          },
        ],
      },
    ],
    stars: 5,
    active: true,
    author: {
      authorId: "64b6e893e59d3e6a1c6c002",
    },
    createdAt: "2024-07-26T10:00:00Z",
  },
  {
    id: "64b6e893e59d3e6a1c6c002",
    title: "Second Blog Post",
    slug: "second-blog-post",
    mainImageUrl: "https://picsum.photos/id/237/200/200",
    description: "This is the description of the second blog post.",
    sections: [
      {
        subHeading: "Overview",
        content: "This is the overview of the second blog post.",
        products: [
          {
            id: 2,
            url: "https://example.com/product-2",
            imageUrl: "https://example.com/product-2.jpg",
            hikedPrice: "$40.00",
            actualPrice: "$35.00",
          },
        ],
      },
    ],
    stars: 4,
    active: true,
    author: {
      authorId: "64b6e893e59d3e6a1c6c003",
    },
    createdAt: "2024-07-25T10:00:00Z",
  },
  {
    id: "64b6e893e59d3e6a1c6c003",
    title: "Third Blog Post",
    slug: "third-blog-post",
    mainImageUrl: "https://picsum.photos/id/237/200/200",
    description: "This is the description of the third blog post.",
    sections: [
      {
        subHeading: "Introduction",
        content: "This is the introduction to the third blog post.",
        products: [
          {
            id: 3,
            url: "https://example.com/product-3",
            imageUrl: "https://example.com/product-3.jpg",
            hikedPrice: "$20.00",
            actualPrice: "$18.00",
          },
        ],
      },
    ],
    stars: 3,
    active: false,
    author: {
      authorId: "64b6e893e59d3e6a1c6c004",
    },
    createdAt: "2024-07-24T10:00:00Z",
  },
];
