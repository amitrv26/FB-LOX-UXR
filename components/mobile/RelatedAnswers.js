"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  AISparkleIcon, 
  ChevronUpIcon as ChevronUpIconBase, 
  ChevronDownIcon as ChevronDownIconBase 
} from "../icons";

// Wrapper components with local styling
const GenAiStarIcon = () => <AISparkleIcon size={12} color="currentColor" className="related-answers__ai-icon" />;
const ChevronUpIcon = () => <ChevronUpIconBase size={20} className="related-answers__chevron" />;
const ChevronDownIcon = () => <ChevronDownIconBase size={20} className="related-answers__chevron" />;

// Unique group data for each source - different avatars and names
const sourceGroups = {
  coffee: [
    { avatar: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=40&h=40&fit=crop", name: "Portland Coffee Lovers" },
    { avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=40&h=40&fit=crop", name: "Maine Cafe Society" },
    { avatar: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=40&h=40&fit=crop", name: "East End Coffee Club" },
    { avatar: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=40&h=40&fit=crop", name: "Portland Remote Workers" },
    { avatar: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=40&h=40&fit=crop", name: "Old Port Foodies" },
    { avatar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=40&h=40&fit=crop", name: "Munjoy Hill Neighbors" },
    { avatar: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=40&h=40&fit=crop", name: "Portland Freelancers" },
    { avatar: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=40&h=40&fit=crop", name: "Maine Espresso Enthusiasts" },
  ],
  turkey: [
    { avatar: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=40&h=40&fit=crop", name: "Home Cooking Enthusiasts" },
    { avatar: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=40&h=40&fit=crop", name: "Thanksgiving Recipes" },
    { avatar: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=40&h=40&fit=crop", name: "Holiday Feast Ideas" },
    { avatar: "https://images.unsplash.com/photo-1547592180-85f173990554?w=40&h=40&fit=crop", name: "Family Dinner Club" },
    { avatar: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=40&h=40&fit=crop", name: "Southern Cooking Tips" },
    { avatar: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=40&h=40&fit=crop", name: "Roasting Perfection" },
    { avatar: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=40&h=40&fit=crop", name: "Kitchen Confidence" },
    { avatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=40&h=40&fit=crop", name: "Home Chef Community" },
  ],
  nfl: [
    { avatar: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=40&h=40&fit=crop", name: "NFL Fans & Fantasy" },
    { avatar: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=40&h=40&fit=crop", name: "Cord Cutters Club" },
    { avatar: "https://images.unsplash.com/photo-1461896836934-bbe910f067d8?w=40&h=40&fit=crop", name: "Sports Streaming Tips" },
    { avatar: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=40&h=40&fit=crop", name: "Sunday Ticket Fans" },
    { avatar: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop", name: "Fantasy Football League" },
    { avatar: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=40&h=40&fit=crop", name: "Game Day Group" },
    { avatar: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=40&h=40&fit=crop", name: "Football Watch Party" },
    { avatar: "https://images.unsplash.com/photo-1515621061946-ced43ce8e0f0?w=40&h=40&fit=crop", name: "NFL RedZone Addicts" },
  ],
  pinecone: [
    { avatar: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=40&h=40&fit=crop", name: "DIY Home Decor Ideas" },
    { avatar: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=40&h=40&fit=crop", name: "Fall Crafts & Decor" },
    { avatar: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=40&h=40&fit=crop", name: "Rustic Decorating" },
    { avatar: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=40&h=40&fit=crop", name: "Thanksgiving Tablescape" },
    { avatar: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=40&h=40&fit=crop", name: "Nature Crafts Club" },
    { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", name: "Pinterest Crafters" },
    { avatar: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=40&h=40&fit=crop", name: "Holiday Centerpieces" },
    { avatar: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=40&h=40&fit=crop", name: "Budget Decor Tips" },
  ],
  strangerthings: [
    { avatar: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=40&h=40&fit=crop", name: "Stranger Things Fans" },
    { avatar: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=40&h=40&fit=crop", name: "Hawkins Residents" },
    { avatar: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=40&h=40&fit=crop", name: "Upside Down Theories" },
    { avatar: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=40&h=40&fit=crop", name: "Netflix Bingers" },
    { avatar: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=40&h=40&fit=crop", name: "80s Nostalgia Club" },
    { avatar: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=40&h=40&fit=crop", name: "Sci-Fi TV Fans" },
    { avatar: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=40&h=40&fit=crop", name: "Duffer Bros Appreciation" },
    { avatar: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=40&h=40&fit=crop", name: "Season 5 Countdown" },
  ],
  tokyohotels: [
    { avatar: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=40&h=40&fit=crop", name: "Japan Travel Tips & Planning" },
    { avatar: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=40&h=40&fit=crop", name: "TOKYO travel TIPS" },
    { avatar: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=40&h=40&fit=crop", name: "Family Travel Japan" },
    { avatar: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=40&h=40&fit=crop", name: "Tokyo Hotel Reviews" },
    { avatar: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=40&h=40&fit=crop", name: "Japan with Kids" },
    { avatar: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=40&h=40&fit=crop", name: "Shinjuku Travelers" },
    { avatar: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=40&h=40&fit=crop", name: "Tokyo Bay Area Guide" },
    { avatar: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=40&h=40&fit=crop", name: "Budget Japan Travel" },
  ],
  riotheatre: [
    { avatar: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=40&h=40&fit=crop", name: "Vancouver Events & Happenings" },
    { avatar: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=40&h=40&fit=crop", name: "Stranger Things Fans" },
    { avatar: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=40&h=40&fit=crop", name: "Vancouver Film Lovers" },
    { avatar: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=40&h=40&fit=crop", name: "Rio Theatre Regulars" },
    { avatar: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=40&h=40&fit=crop", name: "80s Nostalgia Club" },
    { avatar: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=40&h=40&fit=crop", name: "Netflix Watch Parties YVR" },
    { avatar: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=40&h=40&fit=crop", name: "Commercial Drive Community" },
    { avatar: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=40&h=40&fit=crop", name: "Finn Wolfhard Fan Club" },
  ],
};

// Default related answers data for Portland coffee (fallback) - uses sourceGroups
const coffeeGroups = sourceGroups.coffee;
const defaultRelatedAnswersData = [
  {
    id: "qa-1",
    question: "What are the best cafes in Portland, Maine?",
    answer: "Portland, Maine, has a vibrant coffee scene with numerous cafes offering great coffee and atmosphere.",
    bullets: [
      "Coveside, Proper Cup, Yordprom, Uncharted, Coffee by Design on Diamond St",
      "LB Kitchen!",
      "Coffee Me Up, Commercial Street",
      "Bard Coffee, Tandem, and Coffee Me Up",
    ],
    sources: [
      { avatar: coffeeGroups[0].avatar, groupName: coffeeGroups[0].name, llmTitle: "What are the best cafes in Portland, Maine?", title: "What are the best cafes in Portland, Maine?", time: "4h", postId: "source-coffee-0-0", quote: "Coveside, Proper Cup, Yordprom, Uncharted, Coffee by Design on Diamond St" },
      { avatar: coffeeGroups[1].avatar, groupName: coffeeGroups[1].name, llmTitle: "Where can I find great coffee shops in Portland?", title: "Where can I find great coffee shops in Portland?", time: "3h", postId: "source-coffee-0-1", quote: "LB Kitchen!" },
      { avatar: coffeeGroups[2].avatar, groupName: coffeeGroups[2].name, llmTitle: "Top rated cafes near downtown Portland, ME?", title: "Top rated cafes near downtown Portland, ME?", time: "2h", postId: "source-coffee-0-2", quote: "Coffee Me Up, Commercial Street" },
      { avatar: coffeeGroups[3].avatar, groupName: coffeeGroups[3].name, llmTitle: "Best spots for coffee in the Old Port area?", title: "Best spots for coffee in the Old Port area?", time: "1h", postId: "source-coffee-0-3", quote: "Bard Coffee, Tandem, and Coffee Me Up" },
    ],
  },
  {
    id: "qa-2",
    question: "What are the top coworking spaces in Portland, Maine?",
    answer: "The top coworking spaces in Portland, Maine, include Cloudport, CoworkHERS, Centrl, VIDA Coworking, and Rize CoWorking & Collaboration Space.",
    bullets: [
      "Cloudport is great. Can get day passes for desks or rent a small conference room.",
      "CoworkHERS is amazing!!!",
      "Centrl they have multiple locations in the Portland area and beyond.",
      "VIDA Coworking - they have two locations",
    ],
    sources: [
      { avatar: coffeeGroups[4].avatar, groupName: coffeeGroups[4].name, llmTitle: "What are the top coworking spaces in Portland?", title: "What are the top coworking spaces in Portland?", time: "2h", postId: "source-coffee-1-0", quote: "Cloudport is great." },
      { avatar: coffeeGroups[5].avatar, groupName: coffeeGroups[5].name, llmTitle: "Best places to work remotely in Portland, Maine?", title: "Best places to work remotely in Portland, Maine?", time: "5h", postId: "source-coffee-1-1", quote: "CoworkHERS is amazing!!!" },
      { avatar: coffeeGroups[6].avatar, groupName: coffeeGroups[6].name, llmTitle: "Coworking options with day passes in Portland?", title: "Coworking options with day passes in Portland?", time: "4h", postId: "source-coffee-1-2", quote: "Centrl they have multiple locations." },
      { avatar: coffeeGroups[7].avatar, groupName: coffeeGroups[7].name, llmTitle: "Where to find shared office space in Portland?", title: "Where to find shared office space in Portland?", time: "3h", postId: "source-coffee-1-3", quote: "VIDA Coworking - they have two locations" },
    ],
  },
  {
    id: "qa-3",
    question: "What are the best places to work remotely in Portland, Maine?",
    answer: "Popular remote work spots in Portland, Maine, include coworking spaces, coffee shops, and breweries with good WiFi and amenities.",
    bullets: [
      "Cloudport is great. Can get day passes for desks or rent a small conference room.",
      "Rigby Yard has a million tables and cozy corners to camp out in during the day and great coffee",
      "Coveside Coffee, Uncharted, and Coffee by Design on Diamond Street are great spots.",
      "Rising Tide Brewing has free WiFi, good food, and non-alcoholic options.",
    ],
    sources: [
      { avatar: coffeeGroups[0].avatar, groupName: coffeeGroups[0].name, llmTitle: "Best remote work spots in Portland, Maine?", title: "Best remote work spots in Portland, Maine?", time: "3h", postId: "source-coffee-2-0", quote: "Cloudport is great." },
      { avatar: coffeeGroups[1].avatar, groupName: coffeeGroups[1].name, llmTitle: "Cafes with good wifi for working in Portland?", title: "Cafes with good wifi for working in Portland?", time: "6h", postId: "source-coffee-2-1", quote: "Rigby Yard has a million tables and cozy corners." },
      { avatar: coffeeGroups[2].avatar, groupName: coffeeGroups[2].name, llmTitle: "Where do digital nomads work in Portland?", title: "Where do digital nomads work in Portland?", time: "4h", postId: "source-coffee-2-2", quote: "Coveside Coffee, Uncharted, and Coffee by Design on Diamond Street are great spots." },
      { avatar: coffeeGroups[3].avatar, groupName: coffeeGroups[3].name, llmTitle: "Work-friendly coffee shops in Portland?", title: "Work-friendly coffee shops in Portland?", time: "1d", postId: "source-coffee-2-3", quote: "Rising Tide Brewing has free WiFi, good food, and non-alcoholic options." },
    ],
  },
  {
    id: "qa-4",
    question: "What are the best breakfast spots in Portland, Maine?",
    answer: "Portland has amazing breakfast spots ranging from classic diners to trendy brunch cafes.",
    bullets: [
      "Hot Suppa is incredible - their biscuits and gravy are legendary!",
      "Bayside American Cafe has the best eggs benedict in town.",
      "Becky's Diner on the waterfront is a Portland institution. Classic diner vibes!",
      "Blue Spoon for a more upscale brunch experience. Worth the wait!",
    ],
    sources: [
      { avatar: coffeeGroups[4].avatar, groupName: coffeeGroups[4].name, llmTitle: "Best breakfast spots in Portland, Maine?", title: "Best breakfast spots in Portland, Maine?", time: "5h", postId: "source-coffee-3-0", quote: "Hot Suppa is incredible - their biscuits and gravy are legendary!" },
      { avatar: coffeeGroups[5].avatar, groupName: coffeeGroups[5].name, llmTitle: "Where to get brunch in Portland?", title: "Where to get brunch in Portland?", time: "4h", postId: "source-coffee-3-1", quote: "Bayside American Cafe has the best eggs benedict in town." },
      { avatar: coffeeGroups[6].avatar, groupName: coffeeGroups[6].name, llmTitle: "Classic diners in Portland, ME?", title: "Classic diners in Portland, ME?", time: "6h", postId: "source-coffee-3-2", quote: "Becky's Diner on the waterfront is a Portland institution." },
      { avatar: coffeeGroups[7].avatar, groupName: coffeeGroups[7].name, llmTitle: "Upscale brunch recommendations in Portland?", title: "Upscale brunch recommendations in Portland?", time: "2h", postId: "source-coffee-3-3", quote: "Blue Spoon for a more upscale brunch experience." },
    ],
  },
  {
    id: "qa-5",
    question: "What are the best bakeries in Portland, Maine?",
    answer: "Portland has a thriving bakery scene with options ranging from French pastries to artisan breads.",
    bullets: [
      "Standard Baking Co. is hands down the best. Their morning buns are 🔥",
      "Two Fat Cats for pies and whoopie pies. So good!",
      "Rose Foods has amazing bagels - NYC quality right here in Maine.",
      "Scratch Baking in South Portland is worth the drive for their pastries.",
    ],
    sources: [
      { avatar: coffeeGroups[0].avatar, groupName: coffeeGroups[0].name, llmTitle: "Best bakeries in Portland, Maine?", title: "Best bakeries in Portland, Maine?", time: "3h", postId: "source-coffee-4-0", quote: "Standard Baking Co. is hands down the best." },
      { avatar: coffeeGroups[1].avatar, groupName: coffeeGroups[1].name, llmTitle: "Where to find great pastries in Portland?", title: "Where to find great pastries in Portland?", time: "5h", postId: "source-coffee-4-1", quote: "Two Fat Cats for pies and whoopie pies." },
      { avatar: coffeeGroups[2].avatar, groupName: coffeeGroups[2].name, llmTitle: "Best bagels in Portland, ME?", title: "Best bagels in Portland, ME?", time: "4h", postId: "source-coffee-4-2", quote: "Rose Foods has amazing bagels - NYC quality right here in Maine." },
      { avatar: coffeeGroups[3].avatar, groupName: coffeeGroups[3].name, llmTitle: "Artisan bread shops in Portland area?", title: "Artisan bread shops in Portland area?", time: "6h", postId: "source-coffee-4-3", quote: "Scratch Baking in South Portland is worth the drive." },
    ],
  },
  {
    id: "qa-6",
    question: "What are the best seafood restaurants in Portland, Maine?",
    answer: "Portland is famous for its fresh seafood, with restaurants ranging from casual lobster shacks to fine dining.",
    bullets: [
      "Eventide Oyster Co. has the best brown butter lobster roll I've ever had!",
      "J's Oyster Bar on the waterfront is a classic. Cash only but so worth it.",
      "Scales for upscale seafood with amazing harbor views.",
      "Highroller Lobster Co. for creative lobster dishes - try the lobster tacos!",
    ],
    sources: [
      { avatar: coffeeGroups[4].avatar, groupName: coffeeGroups[4].name, llmTitle: "Best seafood restaurants in Portland, Maine?", title: "Best seafood restaurants in Portland, Maine?", time: "2h", postId: "source-coffee-5-0", quote: "Eventide Oyster Co. has the best brown butter lobster roll!" },
      { avatar: coffeeGroups[5].avatar, groupName: coffeeGroups[5].name, llmTitle: "Where to get lobster rolls in Portland?", title: "Where to get lobster rolls in Portland?", time: "4h", postId: "source-coffee-5-1", quote: "J's Oyster Bar on the waterfront is a classic." },
      { avatar: coffeeGroups[6].avatar, groupName: coffeeGroups[6].name, llmTitle: "Fine dining seafood in Portland, ME?", title: "Fine dining seafood in Portland, ME?", time: "3h", postId: "source-coffee-5-2", quote: "Scales for upscale seafood with amazing harbor views." },
      { avatar: coffeeGroups[7].avatar, groupName: coffeeGroups[7].name, llmTitle: "Creative lobster dishes in Portland?", title: "Creative lobster dishes in Portland?", time: "5h", postId: "source-coffee-5-3", quote: "Highroller Lobster Co. for creative lobster dishes." },
    ],
  },
  {
    id: "qa-7",
    question: "What are the best craft breweries in Portland, Maine?",
    answer: "Portland has an incredible craft beer scene with numerous breweries offering unique local brews.",
    bullets: [
      "Allagash Brewing is a must-visit. Their White is iconic and the tour is free!",
      "Bissell Brothers in Thompson's Point - always crowded but the beer is incredible.",
      "Foundation Brewing has great IPAs and a nice outdoor space.",
      "Austin Street Brewery for more experimental and unique brews.",
    ],
    sources: [
      { avatar: coffeeGroups[0].avatar, groupName: coffeeGroups[0].name, llmTitle: "Best craft breweries in Portland, Maine?", title: "Best craft breweries in Portland, Maine?", time: "4h", postId: "source-coffee-6-0", quote: "Allagash Brewing is a must-visit. Their White is iconic!" },
      { avatar: coffeeGroups[1].avatar, groupName: coffeeGroups[1].name, llmTitle: "Top IPAs in Portland breweries?", title: "Top IPAs in Portland breweries?", time: "3h", postId: "source-coffee-6-1", quote: "Bissell Brothers in Thompson's Point - always crowded but the beer is incredible." },
      { avatar: coffeeGroups[2].avatar, groupName: coffeeGroups[2].name, llmTitle: "Brewery tours in Portland, ME?", title: "Brewery tours in Portland, ME?", time: "5h", postId: "source-coffee-6-2", quote: "Foundation Brewing has great IPAs and a nice outdoor space." },
      { avatar: coffeeGroups[3].avatar, groupName: coffeeGroups[3].name, llmTitle: "Unique craft beers in Portland?", title: "Unique craft beers in Portland?", time: "2h", postId: "source-coffee-6-3", quote: "Austin Street Brewery for more experimental and unique brews." },
    ],
  },
  {
    id: "qa-8",
    question: "What are the best date night restaurants in Portland, Maine?",
    answer: "Portland offers romantic dining options from cozy Italian spots to upscale farm-to-table experiences.",
    bullets: [
      "Fore Street is THE special occasion spot. Make reservations way in advance!",
      "Piccolo is intimate Italian with an amazing wine list. Perfect for anniversaries.",
      "Central Provisions for creative small plates in a cozy atmosphere.",
      "Hugo's for a tasting menu experience that's truly memorable.",
    ],
    sources: [
      { avatar: coffeeGroups[4].avatar, groupName: coffeeGroups[4].name, llmTitle: "Best date night restaurants in Portland?", title: "Best date night restaurants in Portland?", time: "6h", postId: "source-coffee-7-0", quote: "Fore Street is THE special occasion spot." },
      { avatar: coffeeGroups[5].avatar, groupName: coffeeGroups[5].name, llmTitle: "Romantic restaurants in Portland, Maine?", title: "Romantic restaurants in Portland, Maine?", time: "4h", postId: "source-coffee-7-1", quote: "Piccolo is intimate Italian with an amazing wine list." },
      { avatar: coffeeGroups[6].avatar, groupName: coffeeGroups[6].name, llmTitle: "Small plates restaurants in Portland?", title: "Small plates restaurants in Portland?", time: "3h", postId: "source-coffee-7-2", quote: "Central Provisions for creative small plates in a cozy atmosphere." },
      { avatar: coffeeGroups[7].avatar, groupName: coffeeGroups[7].name, llmTitle: "Tasting menu experiences in Portland?", title: "Tasting menu experiences in Portland?", time: "5h", postId: "source-coffee-7-3", quote: "Hugo's for a tasting menu experience that's truly memorable." },
    ],
  },
];

// Unique LLM titles for each source - rephrased versions of the main question
const sourceTitles = {
  coffee: {
    "qa-1": [
      "What are the best cafes in Portland, Maine?",
      "Where can I find great coffee shops in Portland?",
      "Top rated cafes near downtown Portland, ME?",
      "Best spots for coffee in the Old Port area?",
    ],
    "qa-2": [
      "What are the top coworking spaces in Portland?",
      "Best places to work remotely in Portland, Maine?",
      "Coworking options with day passes in Portland?",
      "Where to find shared office space in Portland?",
    ],
    "qa-3": [
      "Best remote work spots in Portland, Maine?",
      "Cafes with good wifi for working in Portland?",
      "Where do digital nomads work in Portland?",
      "Work-friendly coffee shops in Portland?",
    ],
    "qa-4": [
      "Best breakfast spots in Portland, Maine?",
      "Where to get brunch in Portland?",
      "Classic diners in Portland, ME?",
      "Upscale brunch recommendations in Portland?",
    ],
    "qa-5": [
      "Best bakeries in Portland, Maine?",
      "Where to find great pastries in Portland?",
      "Best bagels in Portland, ME?",
      "Artisan bread shops in Portland area?",
    ],
    "qa-6": [
      "Best seafood restaurants in Portland, Maine?",
      "Where to get lobster rolls in Portland?",
      "Fine dining seafood in Portland, ME?",
      "Creative lobster dishes in Portland?",
    ],
    "qa-7": [
      "Best craft breweries in Portland, Maine?",
      "Top IPAs in Portland breweries?",
      "Brewery tours in Portland, ME?",
      "Unique craft beers in Portland?",
    ],
    "qa-8": [
      "Best date night restaurants in Portland?",
      "Romantic restaurants in Portland, Maine?",
      "Small plates restaurants in Portland?",
      "Tasting menu experiences in Portland?",
    ],
  },
  turkey: {
    "qa-1": [
      "How long to cook a 30lb turkey?",
      "Turkey cooking time per pound guide?",
      "Best timing for roasting a large turkey?",
      "How many hours for a big Thanksgiving turkey?",
    ],
    "qa-2": [
      "Best oven temperature for turkey?",
      "What temp should I roast my turkey at?",
      "High heat vs low heat for turkey roasting?",
      "Optimal turkey roasting temperature tips?",
    ],
    "qa-3": [
      "How to keep turkey moist while cooking?",
      "Tips for a juicy Thanksgiving turkey?",
      "Best brining methods for turkey?",
      "Secrets to moist turkey every time?",
    ],
  },
  nfl: {
    "qa-1": [
      "Where can I stream NFL games online?",
      "Best apps for watching NFL games?",
      "How to watch NFL without cable?",
      "Legal streaming options for NFL?",
    ],
    "qa-2": [
      "Best alternatives to StreamEast?",
      "Free NFL streaming sites that work?",
      "What streaming apps have NFL games?",
      "Reliable sports streaming alternatives?",
    ],
    "qa-3": [
      "Free ways to watch NFL games?",
      "How to watch football without paying?",
      "Best free sports streaming services?",
      "Cord cutting options for NFL fans?",
    ],
  },
  pinecone: {
    "qa-1": [
      "DIY pinecone decoration ideas?",
      "What can I make with pinecones?",
      "Creative pinecone craft projects?",
      "Easy pinecone decorations for beginners?",
    ],
    "qa-2": [
      "How to make a pinecone centerpiece?",
      "Fall centerpiece ideas with pinecones?",
      "Rustic table decor using pinecones?",
      "Thanksgiving centerpiece with natural elements?",
    ],
    "qa-3": [
      "What decorations pair well with pinecones?",
      "Fall decor ideas using pinecones?",
      "Thanksgiving table decorations with pinecones?",
      "Natural elements for holiday decorating?",
    ],
  },
  strangerthings: {
    "qa-1": [
      "What's the plot of Stranger Things S5?",
      "Stranger Things season 5 storyline?",
      "What happens in the final season?",
      "Season 5 plot details and theories?",
    ],
    "qa-2": [
      "When does Stranger Things S5 come out?",
      "Stranger Things final season release dates?",
      "Netflix release schedule for S5?",
      "When can I watch the finale?",
    ],
    "qa-3": [
      "Who are the main Stranger Things characters?",
      "Best characters in Stranger Things?",
      "Character guide for Stranger Things?",
      "Fan favorite characters from the show?",
    ],
  },
  tokyohotels: {
    "qa-1": [
      "What are the best family-friendly hotels in Tokyo?",
      "Best Tokyo hotels for families with kids?",
      "Hotel recommendations near Tokyo attractions?",
      "Where to stay in Tokyo with children?",
    ],
    "qa-2": [
      "How to avoid bad hotels when booking in Tokyo?",
      "What to check before booking Tokyo hotels?",
      "Red flags when booking accommodation in Japan?",
      "Tips for finding reliable Tokyo hotels?",
    ],
    "qa-3": [
      "What should families expect from Japanese hotel rooms?",
      "Are Tokyo hotel rooms smaller than Western hotels?",
      "Family room expectations in Japan?",
      "Japanese hotel norms for families?",
    ],
  },
  riotheatre: {
    "qa-1": [
      "What makes the Rio Theatre's Stranger Things event unique?",
      "Why is this event special for Vancouver fans?",
      "What's the vibe like at Rio Theatre events?",
      "What exclusive items are available at the event?",
    ],
    "qa-2": [
      "How do I get tickets to the Rio Theatre Stranger Things event?",
      "Are tickets still available for the finale screening?",
      "Tips for securing sold-out Rio Theatre tickets?",
      "How to get notified about ticket releases?",
    ],
    "qa-3": [
      "What should I know before attending Rio Theatre events?",
      "Best food spots near the Rio Theatre?",
      "How to get to Rio Theatre on Commercial Drive?",
      "Parking and transit tips for Rio Theatre?",
    ],
    "qa-4": [
      "Who is Finn Wolfhard and why is he special to Vancouver?",
      "What other projects has Finn Wolfhard been in?",
      "Finn Wolfhard's Vancouver connection?",
      "Why is Finn Wolfhard doing this hometown event?",
    ],
    "qa-5": [
      "What do fans expect from Stranger Things Season 5?",
      "Will there be major character deaths in the finale?",
      "Fan theories for Stranger Things ending?",
      "What has the cast said about the final season?",
    ],
  },
};

// Helper to generate sources for topic data
function generateSourcesForTopic(topicRelatedAnswers, topicId) {
  const groups = sourceGroups[topicId] || sourceGroups.coffee;
  const titles = sourceTitles[topicId] || {};
  
  return topicRelatedAnswers.map((item, qaIndex) => {
    const qaKey = `qa-${qaIndex + 1}`;
    const qaTitles = titles[qaKey] || [item.question, item.question, item.question, item.question];
    
    return {
      ...item,
      sources: item.bullets.map((bullet, idx) => {
        const groupInfo = groups[idx % groups.length];
        return {
          avatar: groupInfo.avatar,
          groupName: groupInfo.name,
          llmTitle: qaTitles[idx] || item.question,
          title: qaTitles[idx] || item.question, // Show LLM title in the sheet
          time: `${idx + 1}h`,
          postId: `source-${topicId}-${qaIndex}-${idx}`,
          quote: bullet,
        };
      }),
    };
  });
}

const RelatedAnswers = ({ onOpenSources, relatedAnswersData: propRelatedAnswersData, currentTopic }) => {
  const router = useRouter();
  // Track multiple expanded items - first item expanded by default
  const [expandedIds, setExpandedIds] = useState(new Set(["qa-1"]));

  // Use prop data if provided, otherwise use default
  let answersData = propRelatedAnswersData 
    ? generateSourcesForTopic(propRelatedAnswersData, currentTopic || 'coffee')
    : defaultRelatedAnswersData;

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSourcesClick = (item) => {
    // Map sources with unique LLM titles, quotes, postIds, group names, and times
    const sourcesData = item.sources.map((source) => ({
      avatar: source.avatar,
      title: source.llmTitle || source.title, // Show the unique LLM title in the sheet
      llmTitle: source.llmTitle || source.title, // The unique LLM-generated question becomes the post title
      quote: source.quote, // The bullet point becomes the first comment
      postId: source.postId,
      groupName: source.groupName || 'Community Group',
      time: source.time || '4h',
    }));
    onOpenSources?.(sourcesData);
  };

  const handleBulletClick = (e, item, bulletIndex) => {
    e.preventDefault();
    // Find the corresponding source for this bullet
    const source = item.sources[bulletIndex] || item.sources[0];
    if (source?.postId) {
      // Get the fake name that was shown on the card
      const fakeNames = ['Sarah', 'Mike', 'Emma', 'James', 'Olivia', 'Noah', 'Ava', 'Liam'];
      const fakeName = fakeNames[bulletIndex % fakeNames.length];
      
      // Generate a post body that describes what the user is asking about
      // Use the answer summary from the related answer item
      const postBody = item.answer || `Looking for advice and recommendations about this topic. Would love to hear your experiences and tips!`;
      
      // Pass all the relevant data to match the card content on the permalink
      // Include keepSearchExpanded=true to keep the search bar expanded without hiding sections
      const params = new URLSearchParams({
        topic: currentTopic || 'coffee',
        sourceTitle: source.llmTitle || source.title || '',
        firstComment: source.quote || item.bullets[bulletIndex] || '',
        groupName: source.groupName || 'Community Group',
        authorName: fakeName,
        authorAvatar: source.avatar || '',
        postBody: postBody,
        keepSearchExpanded: 'true',
      });
      router.push(`/m/groups/123/posts/${source.postId}?${params.toString()}`);
    }
  };

  return (
    <section className="related-answers">
      {/* Header */}
      <div className="related-answers__header">
        <div className="related-answers__header-left">
          <h2 className="related-answers__title">Related answers</h2>
          <div className="related-answers__meta">
            <GenAiStarIcon />
            <span>Summarized by AI from Meta</span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="related-answers__list">
        {answersData.map((item, index) => {
          const itemId = item.id || `qa-${index + 1}`;
          const isExpanded = expandedIds.has(itemId);
          
          return (
            <div key={itemId} className="related-answers__item">
              {/* Question Row (always visible) */}
              <button
                className="related-answers__question-row"
                onClick={() => toggleExpand(itemId)}
              >
                <h3 className="related-answers__question">{item.question}</h3>
                {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>

                {/* Expanded Content */}
              {isExpanded && (
                <div className="related-answers__content">
                  {/* Horizontal scroll quote cards */}
                  <div className="related-answers__cards-scroll">
                        {item.sources && item.sources.map((source, idx) => {
                        const fakeNames = ['Sarah', 'Mike', 'Emma', 'James', 'Olivia', 'Noah', 'Ava', 'Liam'];
                        const fakeName = fakeNames[idx % fakeNames.length];
                        return (
                          <button 
                            key={idx}
                            className="related-answers__quote-card"
                            onClick={(e) => handleBulletClick(e, item, idx)}
                          >
                            {/* Group name at top */}
                            <div className="related-answers__card-header">
                              <img 
                                src={source.avatar} 
                                alt="" 
                                className="related-answers__card-group-avatar"
                              />
                              <span className="related-answers__card-group-name">{source.groupName}</span>
                            </div>
                            
                            {/* Quote text */}
                            <p className="related-answers__card-quote">{item.bullets[idx]}</p>
                            
                            {/* Card Footer - Like icon and count */}
                            <div className="related-answers__card-footer">
                              <div className="related-answers__card-action">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="related-answers__card-icon">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M10.999 0.5C9.61831 0.5 8.49902 1.61929 8.49902 3V3.81449C8.49902 5.0965 8.20054 6.3609 7.62721 7.50757L6.73803 9.28591C6.62168 9.51861 6.51869 9.75703 6.42932 10H3C1.61929 10 0.5 11.1193 0.5 12.5V20.5C0.5 21.8807 1.61929 23 3 23L6.99902 23C6.99968 23 7.00132 23 7.00197 23H13.4582L13.5 23.0002H17.75C19.5287 23.0002 20.9975 21.6734 21.2207 19.9555C22.0005 19.3146 22.5 18.3412 22.5 17.2502C22.5 17.0763 22.4872 16.905 22.4625 16.7372C23.1022 16.1037 23.5 15.2236 23.5 14.2502C23.5 13.6479 23.3472 13.0799 23.0785 12.5842C23.1899 12.2422 23.25 11.8775 23.25 11.5C23.25 9.567 21.683 8 19.75 8H14.999V4.5C14.999 2.29086 13.2082 0.5 10.999 0.5ZM8 21H13.4785L13.5 21.0002H17.75C18.5784 21.0002 19.25 20.3287 19.25 19.5002C19.25 19.4833 19.2497 19.4663 19.2492 19.4495C19.237 19.0807 19.429 18.7352 19.7484 18.5507C20.1999 18.2899 20.5 17.8045 20.5 17.2502C20.5 17.0609 20.4654 16.8819 20.403 16.7177C20.2344 16.2739 20.4011 15.7727 20.802 15.5182C21.2237 15.2506 21.5 14.7823 21.5 14.2502C21.5 13.8943 21.3773 13.5697 21.171 13.3126C20.9193 12.999 20.88 12.5652 21.0711 12.2114C21.185 12.0007 21.25 11.7594 21.25 11.5C21.25 10.6716 20.5784 10 19.75 10L14.4902 10C13.6671 10 12.999 9.33273 12.999 8.50961V4.5C12.999 3.39543 12.1036 2.5 10.999 2.5C10.7229 2.5 10.499 2.72386 10.499 3V3.81449C10.499 5.40699 10.1282 6.97762 9.41606 8.40199L8.52689 10.1803C8.19449 10.8451 8.01467 11.5753 8 12.3176V21ZM6 12.2995C5.99935 12.3384 5.99902 12.3774 5.99902 12.4164V21H3C2.72386 21 2.5 20.7761 2.5 20.5V12.5C2.5 12.2239 2.72386 12 3 12H6V12.2995Z" />
                                </svg>
                                <span className="related-answers__card-count">{20 + idx * 11}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                </div>
              )}

              {/* Divider */}
              <div className="related-answers__divider" />
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default RelatedAnswers;
