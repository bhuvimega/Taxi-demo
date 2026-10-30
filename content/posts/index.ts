import type { Post } from "../blog";
import { post as chennaiToBangalore } from "./chennai-to-bangalore";
import { post as bangaloreToMysore } from "./bangalore-to-mysore";
import { post as puneToMumbai } from "./pune-to-mumbai";
import { post as rameshwaramToMadurai } from "./rameshwaram-to-madurai";
import { post as coimbatoreToOoty } from "./coimbatore-to-ooty";
import { post as kochiToMunnar } from "./kochi-to-munnar";
import { post as monsoonRoadTripTips } from "./monsoon-road-trip-tips";
import { post as offbeatDetour } from "./offbeat-detour";

/**
 * REGISTER EVERY POST HERE (one import + one line in the list).
 * Order does not matter — the blog sorts by date, newest first.
 */
export const allPosts: Post[] = [
  chennaiToBangalore,
  bangaloreToMysore,
  puneToMumbai,
  rameshwaramToMadurai,
  coimbatoreToOoty,
  kochiToMunnar,
  monsoonRoadTripTips,
  offbeatDetour,
];
