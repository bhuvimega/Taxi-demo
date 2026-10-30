import type { Post } from "../blog";

export const post: Post = {
  slug: "kochi-to-munnar-road-trip-guide",
  title: "Kochi to Munnar: Distance, Travel Time & What to See on the Way",
  excerpt: "Tea gardens, waterfalls and cool air await. Munnar is about 130 km from Kochi and the drive takes around 4 hours.",
  date: "2026-07-12",
  category: "hill-stations",
  cover: {
    src: "/images/blog/fleet-premium-suv.jpg",
    alt: "Traveller enjoying the open road",
  },
  body: [
    {
      type: "p",
      text: "The road from Kochi to Munnar slowly turns greener and cooler. Plan stops along the way, because the scenery deserves more than a straight drive.",
    },
    {
      type: "facts",
      items: [
        {
          label: "Distance",
          value: "About 130 km",
        },
        {
          label: "Drive time",
          value: "3.5 to 4.5 hours",
        },
        {
          label: "Best time",
          value: "September to March",
        },
      ],
    },
    {
      type: "h2",
      text: "Good places to pause",
    },
    {
      type: "list",
      items: [
        "Cheeyappara and Valara waterfalls, which are close to the road.",
        "A roadside tea or spice stall once the hills begin.",
        "Viewpoints just before Munnar town, for photos in the morning light.",
      ],
    },
  ],
};
