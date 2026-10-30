import type { Post } from "../blog";

export const post: Post = {
  slug: "chennai-to-bangalore-distance-travel-time-best-route",
  title: "Chennai to Bangalore: Distance, Travel Time & the Best Route by Road",
  excerpt: "Chennai to Bangalore is one of South India's busiest routes. The road distance is around 350 km and the drive usually takes 6 to 7 hours.",
  date: "2026-09-07",
  category: "travel-guide",
  route: {
    from: "Chennai",
    to: "Bangalore",
    distance: "350 km",
    duration: "6–7 hrs",
  },
  body: [
    {
      type: "p",
      text: "Chennai and Bangalore are linked by a fast, well-maintained highway, which makes this one of the easiest intercity drives in the south. Most travellers leave early in the morning and reach Bangalore by lunch.",
    },
    {
      type: "facts",
      items: [
        {
          label: "Distance",
          value: "Around 350 km",
        },
        {
          label: "Drive time",
          value: "6 to 7 hours",
        },
        {
          label: "Main road",
          value: "NH48 via Vellore and Krishnagiri",
        },
        {
          label: "Best time",
          value: "Early morning departure",
        },
      ],
    },
    {
      type: "h2",
      text: "The usual route",
    },
    {
      type: "p",
      text: "Most cabs take the national highway through Sriperumbudur, Vellore and Krishnagiri before entering Bangalore from the east. The road is mostly four to six lanes, so the drive is smooth and predictable.",
    },
    {
      type: "h2",
      text: "Where to stop",
    },
    {
      type: "list",
      items: [
        "Around Vellore for breakfast, about 2 hours from Chennai.",
        "Near Krishnagiri for a quick break before the final stretch.",
        "Avoid arriving in Bangalore between 5 PM and 8 PM, when city traffic is heaviest.",
      ],
    },
    {
      type: "tip",
      title: "Travel tip",
      text: "Book a one-way cab so you pay only for the distance you travel, not for the driver's empty return.",
    },
  ],
};
