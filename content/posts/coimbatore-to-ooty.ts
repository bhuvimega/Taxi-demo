import type { Post } from "../blog";

export const post: Post = {
  slug: "coimbatore-to-ooty-road-trip-guide",
  title: "Coimbatore to Ooty: A Road Trip Guide to the Queen of Hill Stations",
  excerpt: "The drive from Coimbatore to Ooty is about 85 to 90 km and climbs through winding ghat roads. Here is how to plan it.",
  date: "2026-07-21",
  category: "hill-stations",
  cover: {
    src: "/images/blog/fleet-suv.jpg",
    alt: "A car on a mountain road",
  },
  body: [
    {
      type: "p",
      text: "Ooty is a classic escape from the plains. The route climbs steadily through forested hills, so the journey is as enjoyable as the destination.",
    },
    {
      type: "facts",
      items: [
        {
          label: "Distance",
          value: "About 85–90 km",
        },
        {
          label: "Drive time",
          value: "Around 3 hours",
        },
        {
          label: "Road",
          value: "Winding ghat road",
        },
        {
          label: "Best time",
          value: "March to June, and September to November",
        },
      ],
    },
    {
      type: "h2",
      text: "Driving the ghat road",
    },
    {
      type: "p",
      text: "The hairpin bends are best handled by a driver who knows them. A local, experienced chauffeur is worth it, especially in fog or rain.",
    },
    {
      type: "tip",
      text: "Carry a light jacket. Even in summer, Ooty is noticeably cooler than Coimbatore.",
    },
  ],
};
