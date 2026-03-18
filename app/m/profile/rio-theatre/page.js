"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UpsellBottomSheet from "../../../../components/mobile/UpsellBottomSheet";
import EndOfFeedUpsell from "../../../../components/mobile/EndOfFeedUpsell";
import ReviewsSheet from "../../../../components/mobile/ReviewsSheet";
import RelatedPostsUnit from "../../../../components/mobile/RelatedPostsUnit";
import ShareSheet from "../../../../components/mobile/ShareSheet";
import { IconInline } from "../../../../components/Icon";

// Profile data for Webster Hall
const profileData = {
  name: "Webster Hall",
  verified: true,
  username: "websterhall",
  description: "NYC's legendary live music venue since 1886. Concerts, DJ nights, and unforgettable live events in the East Village. See website for upcoming shows!",
  recommendedPercent: "94",
  priceRange: "$$",
  followers: "180K",
  following: "312",
  coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
  profileImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&h=200&fit=crop",
};

// Concert/venue photo gallery for the Photos grid
const photoGalleryImages = [
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop",
];

// Sample posts data
const postsData = [
  {
    id: "stranger-things-finale",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "2h",
    },
    text: "🎤 SABRINA CARPENTER LIVE AT WEBSTER HALL - NYC! 🎤\n\nWe're thrilled to announce a special intimate show with Sabrina Carpenter at NYC's legendary Webster Hall!\n\n📅 Date: March 28, 2026\n🎟️ Doors open: 7:00 PM\n🎤 Show starts: 8:30 PM\n✨ VIP Meet & Greet: 6:00 PM",
    image: "/images/sabrina-carpenter-live.jpg",
    reactions: { count: "5.2K", like: true, love: true },
    comments: "6",
    shares: "1.2K",
    commentPreviews: [
      { name: "Jessica M.", avatar: "https://i.pravatar.cc/40?img=1", text: "just got two VIP Meet & Greet tix and my hands are literally shaking rn 😭", time: "1h", likes: 24 },
      { name: "Dan Ortiz", avatar: "https://i.pravatar.cc/40?img=3", text: "1,500 cap for Sabrina?? I saw her at MSG and it was great but this is going to be on another level. Scrambling for tickets.", time: "45m", likes: 18 },
      { name: "Rachel K.", avatar: "https://i.pravatar.cc/40?img=9", text: "Quick question - is there an age limit for this show? My 12-year-old is obsessed and I'd love to surprise her", time: "30m", likes: 5 },
      { name: "Nate V.", avatar: "https://i.pravatar.cc/40?img=11", text: "@Rachel K. I brought my niece to the last all-ages show here, no issues at all! There's a balcony section that's way less crowded too", time: "25m", likes: 31 },
      { name: "Tom B.", avatar: "https://i.pravatar.cc/40?img=13", text: "Birthday is the 28th. Girlfriend just handed me an envelope with two tickets in it. I am not okay 🥲", time: "20m", likes: 12 },
      { name: "Allie Tran", avatar: "https://i.pravatar.cc/40?img=16", text: "Anyone know what time the line usually starts forming for GA? Trying to get barrier and willing to camp out lol", time: "15m", likes: 27 },
    ],
  },
  {
    id: "post-2",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "1d",
    },
    text: "Last night was ELECTRIC! 🔥 Thank you NYC for making Chappell Roan's show a SOLD OUT success! The energy in the room was unreal.\n\nNext up: Sabrina Carpenter on March 28th. Don't sleep on tickets!",
    image: "/images/chappell-roan-live.jpg",
    reactions: { count: "1.8K", like: true, love: true },
    comments: "5",
    shares: "234",
    commentPreviews: [
      { name: "Alex Rivera", avatar: "https://i.pravatar.cc/40?img=7", text: "Somehow ended up third row and she pointed at me during Good Luck, Babe! I have not recovered and it's been 14 hours", time: "22h", likes: 45 },
      { name: "Sam Okeke", avatar: "https://i.pravatar.cc/40?img=8", text: "Not exaggerating when I say the entire floor was singing every word to Pink Pony Club. The balcony was shaking.", time: "20h", likes: 31 },
      { name: "Megan T.", avatar: "https://i.pravatar.cc/40?img=20", text: "I was fully sobbing during Naked in Manhattan and the girl next to me handed me a tissue 😂 we're friends now", time: "18h", likes: 52 },
      { name: "Jordan Reyes", avatar: "https://i.pravatar.cc/40?img=26", text: "Did anyone grab the setlist? She played something I didn't recognize and I can't stop thinking about it", time: "16h", likes: 19 },
      { name: "David L.", avatar: "https://i.pravatar.cc/40?img=14", text: "@Jordan Reyes pretty sure it was an unreleased track! she teased it on TikTok last week. Sounded like a slower ballad?", time: "14h", likes: 28 },
    ],
  },
  {
    id: "post-3",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "3d",
    },
    text: "Behind the scenes at our legendary Grand Ballroom! 🎸 From the Ramones to Billie Eilish, this stage has seen it all. Who do you want to see here next?",
    image: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&h=450&fit=crop",
    reactions: { count: "892", like: true, love: true },
    comments: "6",
    shares: "45",
    commentPreviews: [
      { name: "Matt K.", avatar: "https://i.pravatar.cc/40?img=33", text: "Hozier in this room would be life-changing. The ceiling alone would add so much to the vibe 🙏", time: "2d", likes: 67 },
      { name: "Priya Nair", avatar: "https://i.pravatar.cc/40?img=52", text: "My mom saw the Ramones here in '96 and now I'm seeing Sabrina Carpenter. Honestly both iconic in their own way.", time: "2d", likes: 42 },
      { name: "Amy C.", avatar: "https://i.pravatar.cc/40?img=25", text: "OK hear me out — Mitski, solo spotlight, Grand Ballroom, nothing else. Just her and that stage. BOOK IT.", time: "2d", likes: 55 },
      { name: "Leo Huang", avatar: "https://i.pravatar.cc/40?img=56", text: "Fun fact: the chandeliers in the ballroom are original from the 1920s. They've survived renovations, closures, everything. They just don't build things like this anymore.", time: "1d", likes: 33 },
      { name: "Jake R.", avatar: "https://i.pravatar.cc/40?img=58", text: "@Amy C. add Phoebe Bridgers to that list and you've got my dream double bill", time: "1d", likes: 48 },
      { name: "Nina Ferris", avatar: "https://i.pravatar.cc/40?img=59", text: "I work in live sound and the room mix here is genuinely one of the best in the city. Wherever you stand, it sounds balanced.", time: "1d", likes: 21 },
    ],
  },
  {
    id: "post-4",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "5d",
    },
    text: "Concert night essentials: good vibes, great music, and your crew! 🎶 What's your go-to pre-show ritual? Drop it in the comments!",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=450&fit=crop",
    reactions: { count: "567", like: true, love: true },
    comments: "5",
    shares: "34",
    commentPreviews: [
      { name: "Sarah J.", avatar: "https://i.pravatar.cc/40?img=32", text: "Veselka → Webster Hall pipeline is undefeated. Pierogies, then crying to live music. Peak NYC honestly.", time: "4d", likes: 28 },
      { name: "Marco Diaz", avatar: "https://i.pravatar.cc/40?img=12", text: "Controversial take: I actually prefer the balcony. You can see everything and there's room to dance without getting elbowed in the ribs", time: "4d", likes: 15 },
      { name: "Priya S.", avatar: "https://i.pravatar.cc/40?img=34", text: "My friend and I always coordinate outfits for shows here. Last time we went full sparkle and got so many compliments in line 😂✨", time: "3d", likes: 22 },
      { name: "Carlos M.", avatar: "https://i.pravatar.cc/40?img=53", text: "@Marco Diaz respectfully, GA floor when it's packed and everyone's jumping > everything else. The balcony is for recovering afterward", time: "3d", likes: 11 },
      { name: "Kai Bennett", avatar: "https://i.pravatar.cc/40?img=60", text: "There's something about walking down E 11th and seeing the marquee lit up with whoever you're about to see. Gets me hyped before I even walk in.", time: "3d", likes: 17 },
    ],
  },
  {
    id: "post-5",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "1w",
    },
    text: "Throwback to last week's sold-out show! 📸 Thank you to everyone who came out to make it unforgettable. NYC, you never disappoint!",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=450&fit=crop",
    reactions: { count: "1.1K", like: true, love: true },
    comments: "2",
    shares: "56",
    commentPreviews: [
      { name: "Daniel Kwon", avatar: "https://i.pravatar.cc/40?img=51", text: "Haven't been out in months but this dragged me off my couch and honestly? Needed that. Sound was crisp even from the back.", time: "6d", likes: 33 },
      { name: "Emma W.", avatar: "https://i.pravatar.cc/40?img=39", text: "Any word on the April lineup? My friend's visiting from Chicago and I'm trying to plan something before she books flights", time: "5d", likes: 19 },
    ],
  },
  {
    id: "post-6",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "1w",
    },
    text: "Our iconic marquee lit up for another legendary night in the East Village! ✨ There's nothing like live music at Webster Hall.",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=450&fit=crop",
    reactions: { count: "743", like: true, love: true },
    comments: "1",
    shares: "28",
    commentPreviews: [
      { name: "Mike Adler", avatar: "https://i.pravatar.cc/40?img=62", text: "I photograph venues all over NYC for a living and this marquee is hands down the most photogenic. Something about the neon against those old bricks.", time: "6d", likes: 22 },
    ],
  },
  {
    id: "post-7",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "2w",
    },
    text: "Pre-show vibes at Webster Hall! 🍸 Our bars are fully stocked and the energy is building. Doors open at 7 - come early and soak it in!",
    image: "/images/chappell-roan-live.jpg",
    reactions: { count: "456", like: true, love: true },
    comments: "1",
    shares: "15",
    commentPreviews: [
      { name: "Layla Ross", avatar: "https://i.pravatar.cc/40?img=68", text: "Pro tip: get the espresso martini at the upstairs bar, the line's way shorter and the bartender up there doesn't skimp on the espresso 🍸", time: "1w", likes: 17 },
    ],
  },
  {
    id: "post-8",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "2w",
    },
    text: "Music lovers unite! 🎵 We're so grateful for this incredible community. Every show at Webster Hall feels like a family reunion.",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&h=450&fit=crop",
    reactions: { count: "623", like: true, love: true },
    comments: "2",
    shares: "41",
    commentPreviews: [
      { name: "Ava Torres", avatar: "https://i.pravatar.cc/40?img=50", text: "Went alone for the first time last Friday because none of my friends were free. Made three new friends in the crowd by the second song. This place just does that.", time: "1w", likes: 29 },
      { name: "Tommy Cheng", avatar: "https://i.pravatar.cc/40?img=57", text: "@Ava Torres that's the Webster Hall way! Went to my first show here in 2016, now I'm a regular. Some of my best friendships started in that GA line.", time: "1w", likes: 21 },
    ],
  },
  {
    id: "post-9",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "3w",
    },
    text: "Another packed house! 🙌 New York, you always bring the energy. Thank you for keeping live music alive!",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=450&fit=crop",
    reactions: { count: "934", like: true, love: true },
    comments: "2",
    shares: "67",
    commentPreviews: [
      { name: "Zoe Nakamura", avatar: "https://i.pravatar.cc/40?img=65", text: "Not a single person sitting down the entire night. Even the couple who looked like they accidentally wandered in were moshing by the end 😂", time: "2w", likes: 38 },
      { name: "Chris Okafor", avatar: "https://i.pravatar.cc/40?img=29", text: "Moved here from Atlanta two years ago and was worried I wouldn't find a live music scene that hit the same. Then I found Webster Hall. Worry over.", time: "2w", likes: 25 },
    ],
  },
  {
    id: "post-10",
    author: {
      name: "Webster Hall",
      verified: true,
      date: "3w",
    },
    text: "Webster Hall: Where legends are made and music comes alive. 🌟 What's your favorite Webster Hall memory? Share in the comments!",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=450&fit=crop",
    reactions: { count: "512", like: true, love: true },
    comments: "2",
    shares: "38",
    commentPreviews: [
      { name: "Ryan Sato", avatar: "https://i.pravatar.cc/40?img=47", text: "Saw The Strokes here in '06. Barely got in, fake ID, snuck past security. Absolutely life-changing. Don't do what I did but the show was worth it lol", time: "2w", likes: 56 },
      { name: "Jennifer L.", avatar: "https://i.pravatar.cc/40?img=43", text: "NYE here last year was genuinely one of the best nights of my life. Confetti falling, strangers hugging at midnight, and the band played an extra 30 min encore. Nothing tops it.", time: "2w", likes: 34 },
    ],
  },
];

// Events data for the Events Unit
const eventsData = [
  {
    id: "event-1",
    date: "Fri, Mar 28 at 7:00 PM EST",
    title: "Sabrina Carpenter Live at Webster Hall",
    responded: 2847,
    image: "/images/sabrina-carpenter-live.jpg",
  },
  {
    id: "event-2",
    date: "Sat, Apr 5 at 8:00 PM EST",
    title: "Wallows - Tell Me That It's Over Tour at Webster Hall",
    responded: 1234,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=200&h=200&fit=crop",
  },
  {
    id: "event-3",
    date: "Fri, Apr 11 at 9:00 PM EST",
    title: "Tate McRae - Think Later World Tour at Webster Hall",
    responded: 983,
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=200&fit=crop",
  },
  {
    id: "event-4",
    date: "Sat, Apr 19 at 8:00 PM EST",
    title: "Gracie Abrams Live at Webster Hall",
    responded: 756,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop",
  },
  {
    id: "event-5",
    date: "Fri, May 2 at 9:00 PM EST",
    title: "Beabadoobee - This Is How Tomorrow Moves at Webster Hall",
    responded: 542,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
  },
];

// Similar Pages data for the Similar Pages Unit
const similarPagesData = [
  { id: 'sp1', name: 'Brooklyn Steel', followers: '95K', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop' },
  { id: 'sp2', name: 'Irving Plaza', followers: '120K', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop' },
  { id: 'sp3', name: 'Terminal 5', followers: '85K', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop' },
];

// Icons - Badge Checkmark (blueprint token icon)
const BadgeCheckmarkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="#0866ff"/>
    <path d="M3.5 6L5.25 7.75L8.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.41667 0.5C8.35812 0.5 7.5 1.35812 7.5 2.41667V3.02899C7.5 4.18278 7.18643 5.31488 6.5928 6.30425L5.7887 7.64443C5.62445 7.91818 5.48486 8.2045 5.37087 8.5H2.5C1.39543 8.5 0.5 9.39543 0.5 10.5V17C0.5 18.1046 1.39543 19 2.5 19H14.75C16.1617 19 17.3249 17.9363 17.482 16.5667C18.2439 16.0784 18.75 15.2239 18.75 14.25C18.75 14.1349 18.7429 14.0212 18.729 13.9093C19.2056 13.4153 19.5 12.742 19.5 12C19.5 11.4887 19.3599 11.009 19.1164 10.5985C19.2032 10.3308 19.25 10.0454 19.25 9.75C19.25 8.23122 18.0188 7 16.5 7H12.5V3.58333C12.5 1.88046 11.1195 0.5 9.41667 0.5ZM5 17.5V10H2.5C2.22386 10 2 10.2239 2 10.5V17C2 17.2761 2.22386 17.5 2.5 17.5H5ZM6.5 17.5H14.75C15.4404 17.5 16 16.9404 16 16.25C16 16.2195 15.9989 16.1894 15.9968 16.1596C15.9738 15.8347 16.1632 15.5321 16.4654 15.4107C16.9266 15.2255 17.25 14.7746 17.25 14.25C17.25 14.1144 17.2287 13.9852 17.1898 13.8649C17.0888 13.5527 17.2025 13.2112 17.4704 13.0218C17.7923 12.7941 18 12.4213 18 12C18 11.6872 17.8861 11.4029 17.6965 11.1835C17.4935 10.9485 17.4563 10.6127 17.603 10.339C17.6966 10.1643 17.75 9.96448 17.75 9.75C17.75 9.05964 17.1904 8.5 16.5 8.5H12.1365C11.5088 8.5 11 7.99118 11 7.36351V3.58333C11 2.70888 10.2911 2 9.41667 2C9.18655 2 9 2.18655 9 2.41667V3.02899C9 4.45465 8.61254 5.85351 7.87904 7.076L7.07494 8.41617C6.69873 9.04319 6.5 9.76066 6.5 10.4919V17.5Z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 13.9218 23.0278 15.7363 22.1922 17.3308C22.105 17.4973 22.092 17.6559 22.1233 17.7765L23.0047 21.1762C23.2918 22.2835 22.2835 23.2918 21.1762 23.0047L17.7765 22.1233C17.6559 22.092 17.4973 22.105 17.3308 22.1922C15.7363 23.0278 13.9218 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.7533 21.5 12 21.5C13.5908 21.5 15.0875 21.1098 16.4025 20.4207C16.9511 20.1333 17.6177 20.016 18.2785 20.1873L20.8554 20.8554L20.1873 18.2785C20.016 17.6177 20.1333 16.9511 20.4207 16.4025C21.1098 15.0875 21.5 13.5908 21.5 12Z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.8628 3.15582C12.5462 2.83512 12 3.05932 12 3.50998V8.00248C12 8.55476 11.5523 9.00248 11 9.00248H10.5C7.58095 9.00248 5.50274 10.222 4.12357 12.0953C2.91318 13.7395 2.21242 15.9327 2.04135 18.3301C2.81703 17.3939 3.76238 16.6319 4.93033 16.075C6.44545 15.3526 8.27778 15.0025 10.5 15.0025H11C11.5523 15.0025 12 15.4502 12 16.0025V20.4901C12 20.9408 12.5462 21.165 12.8628 20.8443L21.2451 12.3543C21.4389 12.1579 21.4389 11.8423 21.2451 11.6459L12.8628 3.15582ZM10 3.50998C10 1.27134 12.7132 0.157623 14.286 1.75067L22.6683 10.2408C23.6312 11.216 23.6312 12.7842 22.6683 13.7594L14.286 22.2494C12.7132 23.8425 10 22.7288 10 20.4901V17.0092C8.22692 17.058 6.86408 17.3687 5.79111 17.8803C4.63182 18.433 3.75465 19.2468 3.04864 20.3333C2.59207 21.0359 1.78571 21.1208 1.2696 21.0032C0.755147 20.8861 0 20.429 0 19.5025C0 16.3518 0.789377 13.2508 2.51296 10.9096C4.17987 8.6454 6.68372 7.14917 10 7.01268V3.50998Z" />
  </svg>
);

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#65676b">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

// Horizontal 3 dots icon
const Dots3HorizontalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#65676b">
    <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
  </svg>
);

export default function RioTheatreProfile() {
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showEventPrompt, setShowEventPrompt] = useState(false);
  const [showFollowPrompt, setShowFollowPrompt] = useState(false);
  const [showMessagePrompt, setShowMessagePrompt] = useState(false);
  const [showReviewsSheet, setShowReviewsSheet] = useState(false);
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [showCommentSheet, setShowCommentSheet] = useState(false);
  const [commentSheetCount, setCommentSheetCount] = useState(0);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [likeSheetReactionCount, setLikeSheetReactionCount] = useState(0);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [activeTab, setActiveTab] = useState("All");

  // Prefetch post detail pages for instant navigation
  useEffect(() => {
    postsData.forEach(post => {
      router.prefetch(`/m/profile/rio-theatre/posts/${post.id}`);
    });
  }, [router]);

  // Parse reaction count string (e.g., "2.4K") to number
  const parseReactionCount = (countStr) => {
    if (!countStr) return 0;
    const str = countStr.toString();
    if (str.includes('K')) {
      return parseFloat(str.replace('K', '')) * 1000;
    }
    if (str.includes('M')) {
      return parseFloat(str.replace('M', '')) * 1000000;
    }
    return parseInt(str.replace(/,/g, ''), 10) || 0;
  };

  // Handle like button click - show reactions upsell
  const handleLikePost = (reactionCount) => {
    setLikeSheetReactionCount(parseReactionCount(reactionCount));
    setShowLikeSheet(true);
  };

  // Toggle post text expansion
  const togglePostExpanded = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Handle share button
  const handleShare = () => {
    setShowShareSheet(true);
  };

  // Handle click on similar post - navigate to that post's permalink
  const handleSimilarPostClick = (post) => {
    sessionStorage.setItem('similarPost', JSON.stringify(post));
    router.push(`/m/profile/similar-post/${post.id}`);
  };

  const tabs = ["All", "Photos", "Reels", "Events"];

  return (
    <div style={{ 
      background: '#fff', 
      minHeight: '100vh',
      maxWidth: '500px',
      margin: '0 auto',
      paddingBottom: '100px', // Space for FloatingTabBar
    }}>

      {/* Main content - removed paddingTop to eliminate space above cover */}
      <main>
        {/* Cover Photo Container */}
        <div style={{ 
          position: 'relative',
          paddingTop: '0px', // No space above cover photo
        }}>
          {/* Cover Photo */}
          <div style={{ 
            height: '180px',
            background: '#e0e0e0',
          }}>
            <img 
              src={profileData.coverImage}
              alt="Cover"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
              }}
            />
          </div>
          
          {/* White rounded corner background overlaid on cover photo */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '24px',
            background: '#fff',
            borderRadius: '16px 16px 0 0',
          }} />
          
          {/* Profile Photo - overlaid on cover photo */}
          <div style={{
            position: 'absolute',
            bottom: '-44px',
            left: '12px',
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            border: '4px solid #fff',
            overflow: 'hidden',
            background: '#e0e0e0',
            zIndex: 10,
          }}>
            <img 
              src={profileData.profileImage}
              alt={profileData.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Profile Info Section */}
        <div style={{ 
          background: '#fff',
          padding: '0 12px',
          position: 'relative',
          zIndex: 5,
        }}>
          {/* Name and Stats Row - positioned next to profile photo */}
          <div style={{ 
            display: 'flex',
            gap: '12px',
            marginBottom: '8px',
          }}>
            {/* Spacer for profile photo */}
            <div style={{ width: '88px', flexShrink: 0 }} />
            
            {/* Name and Stats - moved up by 12px */}
            <div style={{ marginTop: '-12px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <h1 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: '#080809', 
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  {profileData.name}
                </h1>
                {profileData.verified && <BadgeCheckmarkIcon />}
              </div>
              {/* Meta 2 style: fontSize: 13px, numbers bold, labels regular */}
              <p style={{ 
                fontSize: '13px', 
                fontWeight: '400',
                color: '#080809', 
                margin: '2px 0 0',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                <span style={{ fontWeight: '600' }}>{profileData.followers}</span> followers · <span style={{ fontWeight: '600' }}>{profileData.following}</span> following
              </p>
            </div>
          </div>
          
          {/* Description */}
          <p style={{ 
            fontSize: '15px', 
            color: '#080809', 
            margin: '16px 0 4px',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            lineHeight: '1.4',
          }}>
            {profileData.description}
          </p>

          {/* Pinned Items Row */}

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            padding: '4px 0 12px',
          }}>
            <button 
              onClick={() => setShowFollowPrompt(true)}
              style={{
                flex: 1,
                height: '36px',
                padding: '0 16px',
                background: '#0866ff',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <IconInline name="follow-filled" size={16} color="#fff" />
              Follow
            </button>
            <button 
              onClick={() => setShowMessagePrompt(true)}
              style={{
                flex: 1,
                height: '36px',
                padding: '0 16px',
                background: '#e4e6eb',
                border: 'none',
                borderRadius: '6px',
                color: '#080809',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <IconInline name="app-messenger-filled" size={16} color="primary" />
              Message
            </button>
          </div>

        </div>

        {/* Sub-Nav Tabs (Pill-like) */}
        <div style={{ 
          display: 'flex',
          gap: '8px',
          padding: '4px 12px 12px',
          background: '#fff',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                background: activeTab === tab ? '#ebf5ff' : 'transparent',
                border: 'none',
                borderRadius: '20px',
                color: activeTab === tab ? '#0064d1' : '#080809', // Unselected tabs still black
                fontSize: '15px',
                fontWeight: activeTab === tab ? '600' : '400', // Not bold when unselected
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "All" && (
          <>
            {/* Directory Sections */}
            <div style={{ background: '#fff' }}>
              {/* Details Section */}
              <div style={{ padding: '12px' }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  letterSpacing: 'normal',
                  color: '#080809', 
                  margin: '0 0 8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  Details
                </h2>
                
                {/* Reviews - FDS List Cell */}
                <div 
                  onClick={() => setShowReviewsSheet(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0', cursor: 'pointer' }}
                >
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="star-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    94% recommend (3,456 reviews)
                  </span>
                </div>

                {/* Hours - FDS List Cell */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="clock-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Open now
                  </span>
                </div>
                
                {/* Address - FDS List Cell */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="pin-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingTop: '10px' }}>
                    125 E 11th St, New York, NY 10003
                  </span>
                </div>
              </div>

              {/* Links Section */}
              <div style={{ padding: '12px' }}>
            <h2 style={{ 
              fontSize: '17px', 
              fontWeight: '700', 
                  lineHeight: '22px',
                  letterSpacing: 'normal',
              color: '#080809', 
                  margin: '0 0 8px',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
                  Links
            </h2>
                
                {/* Website - FDS List Cell */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="link-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    websterhall.com
                  </span>
                </div>
          </div>

              {/* Offers Section */}
              <div style={{ padding: '12px' }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  letterSpacing: 'normal',
              color: '#080809', 
                  margin: '0 0 8px',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
                  Offers
                </h2>
                
                {/* Promotion - FDS List Cell with text pairing */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="coupon-outline" size={24} color="primary" /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                      15% off tickets for students
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '400', lineHeight: '16px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Show valid student ID at the box office
                    </span>
                  </div>
            </div>
          </div>

              {/* Contact info Section */}
              <div style={{ padding: '12px' }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  letterSpacing: 'normal',
              color: '#080809', 
                  margin: '0 0 8px',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
                  Contact info
                </h2>
                
                {/* Social Media - FDS List Cell */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="at-sign-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    websterhall + 1
                  </span>
            </div>

                {/* Phone - FDS List Cell */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="phone-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    +1 (212) 353-1600
                  </span>
          </div>

                {/* Messenger - FDS List Cell */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="app-messenger-swish-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Webster Hall
                  </span>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div style={{ background: '#fff', marginTop: '8px' }}>
              <div style={{ 
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  letterSpacing: 'normal',
              color: '#080809', 
                  margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
                  Photos
                </h2>
                <span 
                  onClick={() => setActiveTab("Photos")}
                  style={{ 
                    fontSize: '15px', 
                    fontWeight: '400', 
                    lineHeight: '20px',
                    letterSpacing: 'normal',
                    color: '#0866ff', 
                    cursor: 'pointer',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  See all
                </span>
              </div>
              <div style={{ padding: '0 12px 12px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '4px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}>
                  {photoGalleryImages.map((src, idx) => (
                    <img 
                      key={idx}
                      src={src}
                      alt={`Photo ${idx + 1}`}
                      style={{
                        aspectRatio: '1',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
              ))}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div style={{ 
          background: '#fff',
              padding: '12px 12px 4px',
              marginTop: '8px',
        }}>
          <h2 style={{ 
            fontSize: '17px', 
            fontWeight: '700', 
                lineHeight: '22px',
                letterSpacing: 'normal',
            color: '#080809', 
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            Posts
          </h2>
        </div>
          </>
        )}

        {activeTab === "Photos" && (
          <div style={{ background: '#fff' }}>
            {/* Photos Header */}
            <div style={{ padding: '12px' }}>
              <h2 style={{ 
                fontSize: '17px', 
                fontWeight: '700', 
                lineHeight: '22px',
                letterSpacing: 'normal',
                color: '#080809', 
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                Webster Hall's photos
              </h2>
            </div>
            
            {/* Full Width Photo Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '4px',
            }}>
              {photoGalleryImages.map((src, idx) => (
                <div 
                  key={idx}
                  style={{
                    aspectRatio: '1',
                    background: '#000',
                  }}
                >
                  <img 
                    src={src}
                    alt={`Photo ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Reels" && (
          <div style={{ background: '#fff' }}>
            {/* Reels Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '2px',
            }}>
              {[
                { views: '66', image: photoGalleryImages[0] },
                { views: '596', image: photoGalleryImages[1] },
                { views: '1.6K', image: photoGalleryImages[2] },
                { views: '234', image: photoGalleryImages[3] },
                { views: '1.2K', image: photoGalleryImages[4] },
                { views: '89', image: photoGalleryImages[5] },
                { views: '456', image: photoGalleryImages[6] },
                { views: '2.1K', image: photoGalleryImages[7] },
                { views: '178', image: photoGalleryImages[8] },
              ].map((reel, index) => (
                <div 
                  key={index}
                  style={{
                    position: 'relative',
                    aspectRatio: '9/16',
                    background: '#000',
                    cursor: 'pointer',
                  }}
                >
                  <img 
                    src={reel.image}
                    alt={`Reel ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* View count overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '8px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <IconInline name="play-filled" size={12} color="onMedia" />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#fff',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {reel.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Events" && (
          <div style={{ background: '#fff' }}>
            {/* Events Header - matches Photos tab spacing */}
            <div style={{ padding: '12px' }}>
              <h2 style={{ 
                fontSize: '17px', 
                fontWeight: '700', 
                lineHeight: '22px',
                letterSpacing: 'normal',
                color: '#080809', 
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                Upcoming events
              </h2>
            </div>
            
            {/* Events List - matches "Upcoming events at Webster Hall" unit */}
            <div style={{ paddingBottom: '8px' }}>
              {eventsData.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => setShowEventPrompt(true)}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  {/* Event Image - 60px square */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    <img 
                      src={event.image}
                      alt={event.title}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  
                  {/* Event Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Date - Meta 4 */}
                    <p style={{
                      fontSize: '12px',
                      fontWeight: '400',
                      lineHeight: '16px',
                      letterSpacing: 'normal',
                      color: '#65686c',
                      margin: '0 0 2px 0',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {event.date}
                    </p>
                    
                    {/* Title - Headline 4 */}
                    <p style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      lineHeight: '20px',
                      letterSpacing: 'normal',
                      color: '#080809',
                      margin: '0 0 2px 0',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {event.title}
                    </p>
                    
                    {/* Responded - Body 4 */}
                    <p style={{
                      fontSize: '13px',
                      fontWeight: '400',
                      lineHeight: '18px',
                      letterSpacing: 'normal',
                      color: '#65686c',
                      margin: 0,
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {event.responded} responded
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts - only show on All tab */}
        {activeTab === "All" && (
        <div style={{ background: '#f0f2f5' }}>
            {postsData.map((post, index) => (
              <React.Fragment key={post.id}>
            <div 
              style={{ 
                background: '#fff',
                marginBottom: '4px',
              }}
            >
              {/* Post Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={profileData.profileImage}
                    alt={post.author.name}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <p style={{ 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: '#080809', 
                        margin: 0,
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        {post.author.name}
                      </p>
                      {post.author.verified && <BadgeCheckmarkIcon />}
                    </div>
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#65676b', 
                      margin: 0,
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      {post.author.date} · <IconInline name="globe-americas-filled" size={12} color="secondary" />
                    </p>
                  </div>
                </div>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '8px',
                }}>
                  <DotsIcon />
                </button>
              </div>

                {/* Post Text - truncated to 2 lines */}
                <div style={{ 
                  padding: '0 12px 12px',
                }}>
              <p style={{ 
                fontSize: '15px', 
                color: '#080809', 
                margin: 0,
                lineHeight: '1.4',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                whiteSpace: 'pre-wrap',
                  }}>
                    {expandedPosts[post.id] ? (
                      post.text
                    ) : (
                      <>
                        {post.text.substring(0, 120)}...
                        <span 
                          onClick={() => togglePostExpanded(post.id)}
                          style={{ 
                            color: '#65676b', 
                            fontWeight: '600',
                            cursor: 'pointer',
                          }}
                        > See more</span>
                      </>
                    )}
                  </p>
                </div>

              {/* Post Image - 16:9 aspect ratio per Figma */}
              {post.image && (
                <img 
                  src={post.image}
                  alt=""
                  style={{ 
                    width: '100%', 
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                  }}
                />
              )}

              {/* UFI Buttons - Like, Comment, Share with counts on left, Reactions on right */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                background: '#fff',
              }}>
                {/* Left side - Action buttons with counts */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Like */}
                  <button
                    onClick={() => handleLikePost(post.reactions.count)}
                    style={{
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#65676b',
                    }}
                  >
                    <LikeIcon />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#65686c',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {post.reactions.count}
                    </span>
                  </button>
                  
                  {/* Comment */}
                  <button
                    onClick={() => {
                      setCommentSheetCount(parseReactionCount(post.comments));
                      setShowCommentSheet(true);
                    }}
                    style={{
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#65676b',
                    }}
                  >
                    <CommentIcon />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#65686c',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {post.comments}
                    </span>
                  </button>
                  
                  {/* Share */}
                  <button
                    onClick={() => handleShare(post)}
                    style={{
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#65676b',
                    }}
                  >
                    <ShareIcon />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#65686c',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {post.shares}
                    </span>
                  </button>
                </div>
                
                {/* Right side - Reactions */}
                <div style={{ 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-end',
                  padding: '0 12px',
                  gap: '8px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {post.reactions.like && (
                      <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '18px', height: '18px' }} />
                    )}
                    {post.reactions.wow && (
                      <img src="/images/reactions/wow_default_40.png" alt="Wow" style={{ width: '18px', height: '18px', marginLeft: '-4px' }} />
                    )}
                    {post.reactions.love && (
                      <img src="/images/reactions/love_default_40.png" alt="Love" style={{ width: '18px', height: '18px', marginLeft: '-4px' }} />
                    )}
                  </div>
                </div>
                </div>
              </div>

              {/* Comment Previews */}
              {post.commentPreviews && post.commentPreviews.length > 0 && (() => {
                const isExpanded = expandedComments[post.id];
                const visibleComments = isExpanded ? post.commentPreviews : post.commentPreviews.slice(0, 2);
                return (
                <div style={{ padding: '0 12px 12px', background: '#fff' }}>
                  <div style={{ borderTop: '1px solid #e4e6eb', paddingTop: '8px' }}>
                    {visibleComments.map((comment, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <img src={comment.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ background: '#f0f2f5', borderRadius: '12px', padding: '8px 12px' }}>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#050505', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{comment.name}</p>
                            <p style={{ fontSize: '15px', fontWeight: '400', lineHeight: '20px', color: '#050505', margin: '2px 0 0', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{comment.text}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 4px 0' }}>
                            <span style={{ fontSize: '12px', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{comment.time}</span>
                            <button onClick={() => { setCommentSheetCount(parseReactionCount(post.comments)); setShowCommentSheet(true); }} style={{ background: 'none', border: 'none', padding: 0, fontSize: '12px', fontWeight: '600', color: '#65686c', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Like</button>
                            <button onClick={() => { setCommentSheetCount(parseReactionCount(post.comments)); setShowCommentSheet(true); }} style={{ background: 'none', border: 'none', padding: 0, fontSize: '12px', fontWeight: '600', color: '#65686c', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Reply</button>
                            {comment.likes > 0 && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                                <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '14px', height: '14px' }} />
                                <span style={{ fontSize: '12px', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{comment.likes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {!isExpanded && post.commentPreviews.length > 2 && (
                      <button
                        onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: true }))}
                        style={{ background: 'none', border: 'none', padding: '8px 12px', fontSize: '13px', fontWeight: '600', lineHeight: '16px', color: '#080809', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                      >
                        View {post.commentPreviews.length} {post.commentPreviews.length === 1 ? 'comment' : 'comments'}
                      </button>
                    )}
                  </div>
                </div>
                );
              })()}
              
              {/* Events Unit - shown after the 3rd post */}
              {index === 2 && (
                <div style={{ 
                  background: '#fff',
                  marginBottom: '4px',
                }}>
                  {/* Events Unit Header */}
                  <div style={{ 
                    padding: '12px 12px 4px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <h2 style={{ 
                      fontSize: '17px',
                      fontWeight: '700',
                      lineHeight: '22px',
                      letterSpacing: 'normal',
                      color: '#080809',
                      margin: 0,
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      Upcoming events at Webster Hall
                    </h2>
                    <button
                      onClick={() => setShowEventPrompt(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontSize: '15px',
                        fontWeight: '400',
                        lineHeight: '20px',
                        letterSpacing: 'normal',
                        color: '#0866ff',
                        cursor: 'pointer',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      See all
                    </button>
                  </div>
                  
                  {/* Events List - only show first 3 */}
                  <div style={{ paddingBottom: '8px' }}>
                    {eventsData.slice(0, 3).map((event, eventIndex) => (
                      <div 
                        key={event.id}
                        onClick={() => setShowEventPrompt(true)}
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                        }}
                      >
                        {/* Event Image - 60px square */}
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}>
                          <img 
                            src={event.image}
                            alt={event.title}
                            style={{ 
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        
                        {/* Event Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Date - Meta 4 */}
                          <p style={{
                            fontSize: '12px',
                            fontWeight: '400',
                            lineHeight: '16px',
                            letterSpacing: 'normal',
                            color: '#65686c',
                            margin: '0 0 2px 0',
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          }}>
                            {event.date}
                          </p>
                          
                          {/* Title - Headline 4 */}
                          <p style={{
                            fontSize: '15px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            letterSpacing: 'normal',
                            color: '#080809',
                            margin: '0 0 2px 0',
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          }}>
                            {event.title}
                          </p>
                          
                          {/* Responded - Body 4 */}
                          <p style={{
                            fontSize: '13px',
                            fontWeight: '400',
                            lineHeight: '18px',
                            letterSpacing: 'normal',
                            color: '#65686c',
                            margin: 0,
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          }}>
                            {event.responded} responded
                          </p>
              </div>
            </div>
          ))}
        </div>
                </div>
              )}
              
              {/* Similar Posts - shown after the 8th post */}
              {index === 7 && (
                <RelatedPostsUnit title="Similar posts" showBottomDivider={true} onPostClick={handleSimilarPostClick} />
              )}
              
              {/* Similar Pages - shown after the 5th post */}
              {index === 4 && (
                <div style={{ 
                  background: '#fff',
                  marginTop: '4px',
                  paddingBottom: '12px',
                }}>
                  {/* Similar Pages Header - same as Events Unit */}
                  <div style={{ 
                    padding: '12px 12px 8px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <h2 style={{ 
                      fontSize: '17px',
                      fontWeight: '700',
                      lineHeight: '22px',
                      letterSpacing: 'normal',
                      color: '#080809',
                      margin: 0,
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      Similar Pages
                    </h2>
                    <button
                      onClick={() => setShowLoginPrompt(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontSize: '15px',
                        fontWeight: '400',
                        lineHeight: '20px',
                        letterSpacing: 'normal',
                        color: '#0866ff',
                        cursor: 'pointer',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      See all
                    </button>
                  </div>
                  
                  {/* H-scroll - same as marketplace groups */}
                  <div 
                    className="hide-scrollbar"
                    style={{
                      display: 'flex',
                      gap: '8px',
                      overflowX: 'auto',
                      padding: '0 12px',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    {similarPagesData.map((page) => (
                      <div 
                        key={page.id}
                        style={{
                          flex: '0 0 auto',
                          width: '164px',
                          background: '#fff',
                          borderRadius: '8px',
                          border: '1px solid #E2E5E9',
                          overflow: 'hidden',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        {/* Page Image at top of card */}
                        <div style={{
                          width: '100%',
                          height: '156px',
                          overflow: 'hidden',
                        }}>
                          <img 
                            src={page.image} 
                            alt={page.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        {/* Card Content */}
                        <div style={{
                          padding: '8px 12px 12px',
                        }}>
                          {/* Page Name - Headline 4 Emphasized */}
                          <p style={{
                            fontSize: '15px',
                            fontWeight: '700',
                            color: '#050505',
                            margin: '0 0 4px',
                            lineHeight: '20px',
                            letterSpacing: 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            height: '40px',
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          }}>
                            {page.name}
                          </p>
                          {/* Followers - Meta 4 */}
                          <p style={{
                            fontSize: '12px',
                            fontWeight: '400',
                            color: '#65686c',
                            margin: '0 0 12px',
                            lineHeight: '16px',
                            letterSpacing: 'normal',
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          }}>
                            {page.followers} followers
                          </p>
                          {/* View Button - Primary Deemphasized, Medium, Full Width */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const slug = page.name.toLowerCase().replace(/\s+/g, '-');
                              router.push(`/m/profile/${slug}`);
                            }}
                            style={{
                              width: '100%',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              border: 'none',
                              background: '#ebf5ff',
                              color: '#0866ff',
                              fontSize: '15px',
                              fontWeight: '600',
                              lineHeight: '20px',
                              letterSpacing: 'normal',
                              cursor: 'pointer',
                              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Divider */}
                  <div style={{
                    height: '4px',
                    background: '#f0f2f5',
                    marginTop: '12px',
                  }} />
                </div>
              )}
              </React.Fragment>
            ))}

            <EndOfFeedUpsell hideWordmark={true} />
            
          </div>
        )}
      </main>

      {/* Login Prompt Sheet */}
      <UpsellBottomSheet 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        type="generic"
      />

      {/* Event Prompt Sheet */}
      <UpsellBottomSheet 
        isOpen={showEventPrompt}
        onClose={() => setShowEventPrompt(false)}
        type="event"
      />

      {/* Follow Prompt Sheet */}
      <UpsellBottomSheet 
        isOpen={showFollowPrompt}
        onClose={() => setShowFollowPrompt(false)}
        type="follow"
        entityName="Webster Hall"
      />

      {/* Message Prompt Sheet */}
      <UpsellBottomSheet 
        isOpen={showMessagePrompt}
        onClose={() => setShowMessagePrompt(false)}
        type="message"
        entityName="Webster Hall"
      />

      {/* Reviews Sheet */}
      <ReviewsSheet 
        isOpen={showReviewsSheet}
        onClose={() => setShowReviewsSheet(false)}
        businessName="Webster Hall"
        recommendedPercent="94"
        reviewCount="3,456"
        onLoginPrompt={() => setShowLoginPrompt(true)}
      />

      {/* Like Sheet */}
      <UpsellBottomSheet
        isOpen={showLikeSheet}
        onClose={() => setShowLikeSheet(false)}
        type="like"
        count={likeSheetReactionCount}
      />

      {/* Comment Sheet */}
      <UpsellBottomSheet
        isOpen={showCommentSheet}
        onClose={() => setShowCommentSheet(false)}
        type="comment"
        count={commentSheetCount}
      />

      {/* Share Sheet */}
      <ShareSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
      />

    </div>
  );
}
