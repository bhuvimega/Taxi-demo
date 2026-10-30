import type { Post } from "../blog";

export const post: Post = {
  slug: "monsoon-road-trip-tips",
  title: "Monsoon Road Trip Tips: How to Travel Safely in the Rains",
  excerpt: "Rain makes the countryside beautiful and the roads trickier. These simple tips keep a long drive comfortable and safe.",
  date: "2026-06-28",
  category: "adventure",
  cover: {
    src: "/images/blog/fleet-premium-suv.jpg",
    alt: "A traveller enjoying the road",
  },
  body: [
    {
      type: "p",
      text: "A monsoon drive can be the best trip of the year if you plan for it. Slower speeds, extra time and a good driver make all the difference.",
    },
    {
      type: "h2",
      text: "Before you leave",
    },
    {
      type: "list",
      items: [
        "Check the weather and any road advisories for your route.",
        "Add 20 to 30 percent extra time to your normal journey.",
        "Keep your phone charged and carry a small umbrella and snacks.",
      ],
    },
    {
      type: "tip",
      title: "Safety first",
      text: "If the road ahead is flooded, wait or take another route. Never try to cross water you cannot see the bottom of.",
    },
  ],
};
