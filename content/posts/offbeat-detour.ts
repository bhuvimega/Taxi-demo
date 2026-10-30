import type { Post } from "../blog";

export const post: Post = {
  slug: "plan-an-offbeat-detour",
  title: "How to Add an Offbeat Detour to Any Road Trip",
  excerpt: "The best parts of a drive are often unplanned. Here is how to add a detour without losing your schedule.",
  date: "2026-06-25",
  category: "offbeat",
  cover: {
    src: "/images/blog/about-travellers.jpg",
    alt: "A family taking a selfie at the open boot of their cab",
  },
  body: [
    {
      type: "p",
      text: "Detours turn a transfer into a trip. With a little planning, you can add a short stop without missing your check-in.",
    },
    {
      type: "h2",
      text: "A simple way to plan it",
    },
    {
      type: "list",
      items: [
        "Pick one stop within 20 to 30 minutes of your main route.",
        "Leave early so the detour does not cut into your arrival time.",
        "Ask your driver. Local drivers often know quiet viewpoints and good food stops.",
      ],
    },
    {
      type: "tip",
      text: "Tell your driver about the detour when you book so it can be planned into the trip.",
    },
  ],
};
