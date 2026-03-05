"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import OthersSearchedFor from "../../../../components/mobile/OthersSearchedFor";
import Icon from "../../../../components/Icon";
import UpsellBottomSheet from "../../../../components/mobile/UpsellBottomSheet";

// Product data mapping - all locations set to Seattle, all prices under $100
const productData = {
  't1': { id: 't1', price: '$25', title: 'Funko Pop Eleven with Eggos #421', location: 'Seattle, WA', distance: '1 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg', condition: 'New', brand: 'Funko', category: 'Toys & Games', subcategory: 'LEGO', theme: 'Stranger Things', description: 'Funko Pop Eleven holding Eggos waffles. Mint condition, never removed from box. A must-have for any Stranger Things collector! This is the #421 vinyl figure from the popular Netflix series.' },
  't2': { id: 't2', price: '$89', title: 'LEGO The Upside Down 75810', location: 'Seattle, WA', distance: '2 mi', image: '/images/stranger-things-assets/images/marketplace/lego.jpg', condition: 'Like new', brand: 'LEGO', category: 'Toys & Games', subcategory: 'LEGO', theme: 'Stranger Things', description: 'Complete LEGO Stranger Things set featuring the Byers house in both dimensions. All 2,287 pieces included, built once and displayed in smoke-free home. Includes all 8 minifigures.' },
  't3': { id: 't3', price: '$85', title: 'Demogorgon Chase Edition RARE', location: 'Seattle, WA', distance: '5 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg', condition: 'New', brand: 'Funko', category: 'Collectibles', subcategory: 'Funko', theme: 'Stranger Things', description: 'Rare chase edition Demogorgon Funko Pop #428. Glow in the dark variant. Box in pristine condition. Serious collectors only! Limited edition release.' },
  't4': { id: 't4', price: '$79', title: 'LEGO Creel House Custom MOC', location: 'Seattle, WA', distance: '3 mi', image: '/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg', condition: 'New', brand: 'Custom MOC', category: 'Toys & Games', subcategory: 'LEGO', theme: 'Stranger Things', description: 'Custom LEGO Creel House from Season 4. Incredible detail including the grandfather clock and attic. Over 2,500 pieces! Instructions included for rebuilding.' },
  't5': { id: 't5', price: '$69', title: 'Funko Pop Hawkins Gang Set (6)', location: 'Seattle, WA', distance: '8 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg', condition: 'New', brand: 'Funko', category: 'Collectibles', subcategory: 'Funko', theme: 'Stranger Things', description: 'Complete set of 6 Funko Pops: Mike, Dustin, Lucas, Will, Eleven, and Max. All mint in box. Selling as set only. Perfect for starting your collection!' },
  't6': { id: 't6', price: '$35', title: 'Stranger Things PEZ Set', location: 'Seattle, WA', distance: '1 mi', image: '/images/stranger-things-assets/images/marketplace/pez-set.jpg', condition: 'New', brand: 'PEZ', category: 'Collectibles', subcategory: 'Collectibles', theme: 'Stranger Things', description: 'Stranger Things PEZ Dispensers Collector Set. Features characters from the show. New in packaging, never opened. Great gift for any fan!' },
  't7': { id: 't7', price: '$75', title: 'Steve Harrington Autographed Card', location: 'Seattle, WA', distance: '2 mi', image: '/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg', condition: 'Like new', brand: 'Topps', category: 'Collectibles', subcategory: 'Cards', theme: 'Stranger Things', description: 'Authentic autographed trading card signed by Joe Keery (Steve Harrington). Comes with certificate of authenticity. Card is in excellent condition, stored in protective sleeve.' },
  't8': { id: 't8', price: '$45', title: 'Funko Pop Eddie Munson #1250', location: 'Seattle, WA', distance: '4 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg', condition: 'New', brand: 'Funko', category: 'Toys & Games', subcategory: 'Funko', theme: 'Stranger Things', description: 'Eddie Munson Funko Pop #1250 from Stranger Things Season 4. The fan-favorite character in his iconic Hellfire Club shirt. Never removed from box.' },
};

// Similar items for recommendations - all under $100 with full numbers
const similarItems = [
  { id: 's1', price: '$20', title: 'Dustin Funko Pop', location: 'Kirkland, WA', distance: '3 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg' },
  { id: 's2', price: '$23', title: 'Max Funko Pop', location: 'Seattle, WA', distance: '1 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg' },
  { id: 's3', price: '$89', title: 'LEGO Set Used', location: 'Bellevue, WA', distance: '5 mi', image: '/images/stranger-things-assets/images/marketplace/lego.jpg' },
  { id: 's4', price: '$30', title: 'Vecna Funko Pop', location: 'Redmond, WA', distance: '8 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg' },
  { id: 's5', price: '$35', title: 'Eleven Funko Pop', location: 'Tacoma, WA', distance: '12 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg' },
  { id: 's6', price: '$25', title: 'Steve Funko Pop', location: 'Everett, WA', distance: '15 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg' },
  { id: 's7', price: '$79', title: 'Upside Down LEGO', location: 'Renton, WA', distance: '6 mi', image: '/images/stranger-things-assets/images/marketplace/lego.jpg' },
  { id: 's8', price: '$28', title: 'Demogorgon Pop', location: 'Kent, WA', distance: '10 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg' },
  { id: 's9', price: '$19', title: 'Lucas Funko Pop', location: 'Burien, WA', distance: '7 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg' },
  { id: 's10', price: '$22', title: 'Will Funko Pop', location: 'Auburn, WA', distance: '14 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg' },
  { id: 's11', price: '$18', title: 'Mike Funko Pop', location: 'Federal Way, WA', distance: '18 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg' },
  { id: 's12', price: '$24', title: 'Hopper Funko Pop', location: 'Lynnwood, WA', distance: '11 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg' },
  { id: 's13', price: '$21', title: 'Nancy Funko Pop', location: 'Issaquah, WA', distance: '9 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg' },
  { id: 's14', price: '$17', title: 'Jonathan Pop', location: 'Bothell, WA', distance: '13 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg' },
];

// Blueprint Icons - OUTLINE versions from public/icons folder
// Messenger icon - primary text color
const MessengerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#050505">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 13.6405 2.9175 15.1851 3.65326 16.5359C3.9179 17.0217 4.01879 17.5892 3.87305 18.1533L3.1582 20.8418L5.84668 20.127C6.41079 19.9812 6.9783 20.0821 7.46406 20.3467C8.8149 21.0825 10.3595 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5ZM0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C10.0782 23.5 8.26351 23.0279 6.66895 22.1924C6.50263 22.1053 6.34422 22.0918 6.22363 22.123L2.82422 23.0049C1.71693 23.292 0.708044 22.2831 0.995117 21.1758L1.87695 17.7764C1.90815 17.6558 1.89474 17.4974 1.80762 17.3311C0.97205 15.7365 0.5 13.9218 0.5 12ZM18.5068 9.28223C18.8742 8.71443 18.1934 8.05362 17.6367 8.4375L13.8203 11.0693C13.6918 11.1581 13.5226 11.1608 13.3916 11.0762L10.0039 8.88477C9.7172 8.6995 9.33478 8.78169 9.14941 9.06836L5.49316 14.7178C5.12555 15.2856 5.80655 15.9466 6.36328 15.5625L10.1807 12.9307C10.3092 12.8419 10.4782 12.8392 10.6094 12.9238L13.9961 15.1152C14.2828 15.3006 14.6652 15.2184 14.8506 14.9316L18.5068 9.28223Z" fill="#050505" />
  </svg>
);

// Notifications outline icon
const NotificationsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#050505">
    <g clipPath="url(#clip_notif)">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.52746 19.5H2.90181C1.72366 19.5 1.00539 18.2041 1.62982 17.205C2.5248 15.773 2.99935 14.1184 2.99935 12.4297V9.5C2.99935 4.52944 7.02878 0.5 11.9993 0.5C16.9699 0.5 20.9993 4.52944 20.9993 9.5V12.4273C20.9993 14.1168 21.4741 15.7723 22.3696 17.205C22.994 18.2041 22.2757 19.5 21.0976 19.5H16.4725C16.2238 21.75 14.3163 23.5 12 23.5C9.68372 23.5 7.77619 21.75 7.52746 19.5ZM4.99935 9.5C4.99935 5.63401 8.13335 2.5 11.9993 2.5C15.8653 2.5 18.9993 5.63401 18.9993 9.5V12.4273C18.9993 14.1972 19.4258 15.9366 20.237 17.5H3.76239C4.57314 15.9373 4.99935 14.1988 4.99935 12.4297V9.5ZM9.55001 19.5C9.78164 20.6411 10.7905 21.5 12 21.5C13.2095 21.5 14.2184 20.6411 14.45 19.5H9.55001Z" fill="#050505" />
    </g>
  </svg>
);

// Hand-coin outline icon
const HandCoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#050505">
    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 1C14.7386 1 12.5 3.23858 12.5 6C12.5 8.76142 14.7386 11 17.5 11C20.2614 11 22.5 8.76142 22.5 6C22.5 3.23858 20.2614 1 17.5 1ZM14.5 6C14.5 4.34315 15.8431 3 17.5 3C19.1569 3 20.5 4.34315 20.5 6C20.5 7.65685 19.1569 9 17.5 9C15.8431 9 14.5 7.65685 14.5 6Z" fill="#050505" />
    <path fillRule="evenodd" clipRule="evenodd" d="M6.7134 11.1288C5.8658 11.0347 5.00819 11.0924 4.18084 11.2992C2.01758 11.84 0.5 13.7837 0.5 16.0135V16.1496C0.5 18.8692 2.37716 21.2289 5.02713 21.8404L5.9973 22.0643C11.5506 23.3458 17.3864 22.3021 22.1512 19.1752L22.2816 19.0896C23.042 18.5906 23.5 17.7422 23.5 16.8327C23.5 14.7948 21.3283 13.4918 19.5301 14.4508L18.9473 14.7616C17.6686 15.4436 16.3044 15.9298 14.9001 16.2117C15.2768 15.7464 15.5 15.1549 15.5 14.5167C15.5 13.1438 14.4677 11.9904 13.1032 11.8388L6.7134 11.1288ZM4.66591 13.2395C5.26265 13.0903 5.8812 13.0487 6.49254 13.1166L12.8823 13.8266C13.234 13.8657 13.5 14.1629 13.5 14.5167C13.5 14.8647 13.2424 15.159 12.8974 15.205L9.8963 15.6052C8.27585 15.8212 8.2855 18.1686 9.90763 18.3714C13.3453 18.8011 16.8317 18.1566 19.8885 16.5263L20.4713 16.2155C20.9373 15.967 21.5 16.3046 21.5 16.8327C21.5 17.0684 21.3813 17.2882 21.1843 17.4175L21.0539 17.5031C16.7454 20.3305 11.4685 21.2743 6.44702 20.1155L5.47685 19.8916C3.73434 19.4895 2.5 17.9379 2.5 16.1496V16.0135C2.5 14.7014 3.39299 13.5577 4.66591 13.2395Z" fill="#050505" />
  </svg>
);

// Bookmark outline icon
const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#050505">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 3.5C3 1.84314 4.34315 0.5 6 0.5H18C19.6569 0.5 21 1.84315 21 3.5V20.9996C21 23.0597 18.6482 24.2356 17.0001 22.9997L12.3 19.4749C12.1222 19.3416 11.8778 19.3416 11.7 19.4749L6.99991 22.9997C5.35181 24.2356 3 23.0597 3 20.9996V3.5ZM6 2.5C5.44771 2.5 5 2.94771 5 3.5V20.9996C5 21.4116 5.47036 21.6468 5.79998 21.3996L10.5001 17.8749C11.3889 17.2083 12.6111 17.2083 13.4999 17.8749L18.2 21.3996C18.5296 21.6468 19 21.4116 19 20.9996V3.5C19 2.94772 18.5523 2.5 18 2.5H6Z" fill="#050505" />
  </svg>
);

// Share outline icon
const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#050505">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.8628 3.15582C12.5462 2.83512 12 3.05932 12 3.50998V8.00248C12 8.55476 11.5523 9.00248 11 9.00248H10.5C7.58095 9.00248 5.50274 10.222 4.12357 12.0953C2.91318 13.7395 2.21242 15.9327 2.04135 18.3301C2.81703 17.3939 3.76238 16.6319 4.93033 16.075C6.44545 15.3526 8.27778 15.0025 10.5 15.0025H11C11.5523 15.0025 12 15.4502 12 16.0025V20.4901C12 20.9408 12.5462 21.165 12.8628 20.8443L21.2451 12.3543C21.4389 12.1579 21.4389 11.8423 21.2451 11.6459L12.8628 3.15582ZM10 3.50998C10 1.27134 12.7132 0.157623 14.286 1.75067L22.6683 10.2408C23.6312 11.216 23.6312 12.7842 22.6683 13.7594L14.286 22.2494C12.7132 23.8425 10 22.7288 10 20.4901V17.0092C8.22692 17.058 6.86408 17.3687 5.79111 17.8803C4.63182 18.433 3.75465 19.2468 3.04864 20.3333C2.59207 21.0359 1.78571 21.1208 1.2696 21.0032C0.755147 20.8861 0 20.429 0 19.5025C0 16.3518 0.789377 13.2508 2.51296 10.9096C4.17987 8.6454 6.68372 7.14917 10 7.01268V3.50998Z" fill="#050505" />
  </svg>
);

// Star icon for ratings - Nucleus star-filled at 12dp
const StarFilledIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0866ff" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M14.2699 1.92408C13.3764 -0.0131012 10.6231 -0.0131055 9.72962 1.92408L7.58308 6.57776L2.49385 7.18117C0.375363 7.43235 -0.475431 10.0508 1.09082 11.4992L4.85342 14.9788L3.85464 20.0054C3.43888 22.0978 5.66627 23.7161 7.52781 22.6741L11.9998 20.1709L16.4717 22.6741C18.3332 23.7161 20.5606 22.0978 20.1449 20.0054L19.1461 14.9788L22.9087 11.4992C24.4749 10.0508 23.6242 7.43235 21.5057 7.18117L16.4164 6.57776L14.2699 1.92408Z" fill="#0866ff" />
  </svg>
);

// Avatar URLs for marketplace related questions
const marketplaceAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=faces',
];

// Related questions data for marketplace items
const getRelatedQuestionsData = (product) => {
  const isFunko = product?.brand === 'Funko' || product?.title?.toLowerCase().includes('funko');
  const isLego = product?.brand === 'LEGO' || product?.title?.toLowerCase().includes('lego');
  
  if (isFunko) {
    return [
      {
        id: 'mq-1',
        question: 'How do I know if a Funko Pop is authentic?',
        cards: [
          { quote: 'Check the box for official Funko branding and the item number. Real ones have clean paint jobs and the feet should have the Funko logo stamped.', author: 'Alex', group: 'Funko Pop Collectors', likes: 42, avatar: marketplaceAvatars[0] },
          { quote: 'Always look for the official sticker on exclusive items. The box quality is usually a giveaway - fakes have blurry text and cheap cardboard.', author: 'Jordan', group: 'Pop Culture Traders', likes: 38, avatar: marketplaceAvatars[1] },
          { quote: 'The paint quality on authentic Funkos is consistent. Compare photos to the official Funko website before buying.', author: 'Sam', group: 'Stranger Things Fans', likes: 31, avatar: marketplaceAvatars[2] },
        ],
      },
      {
        id: 'mq-2',
        question: "What's the best way to ship Funko Pops safely?",
        cards: [
          { quote: 'Double box method is the safest! Put the Funko in a snug box, then put that box inside a larger one with padding.', author: 'Casey', group: 'Funko Pop Collectors', likes: 56, avatar: marketplaceAvatars[3] },
          { quote: 'Use soft protectors and never ship without protection. Bubble wrap the entire thing and mark the package as fragile.', author: 'Morgan', group: 'Pop Culture Traders', likes: 44, avatar: marketplaceAvatars[4] },
        ],
      },
      {
        id: 'mq-3',
        question: 'Are Stranger Things Funko Pops worth collecting?',
        cards: [
          { quote: 'Absolutely! The chase editions and exclusives have great resale value. The Demogorgon and Eleven pops are especially popular.', author: 'Riley', group: 'Stranger Things Fans', likes: 67, avatar: marketplaceAvatars[5] },
          { quote: 'With Season 5 coming out, expect values to increase. I\'ve seen some rare ones go for 3-4x retail already!', author: 'Taylor', group: 'Netflix Collectors', likes: 52, avatar: marketplaceAvatars[6] },
          { quote: 'Start with the main characters and watch for Comic-Con exclusives. Those tend to appreciate the most.', author: 'Jamie', group: 'Funko Pop Collectors', likes: 48, avatar: marketplaceAvatars[7] },
        ],
      },
      {
        id: 'mq-4',
        question: 'How should I store my Funko Pop collection?',
        cards: [
          { quote: 'Keep them out of direct sunlight - UV rays will fade the boxes and figures over time. A cool, dry place is best.', author: 'Chris', group: 'Funko Pop Collectors', likes: 63, avatar: marketplaceAvatars[0] },
          { quote: 'Get hard plastic protectors for your valuable ones. They prevent shelf wear and keep dust out. Worth every penny!', author: 'Dana', group: 'Pop Culture Traders', likes: 51, avatar: marketplaceAvatars[1] },
        ],
      },
      {
        id: 'mq-5',
        question: 'Where can I find rare Funko Pops?',
        cards: [
          { quote: 'Facebook Marketplace and collector groups are goldmines. Also check Mercari and OfferUp for local deals.', author: 'Pat', group: 'Funko Pop Collectors', likes: 72, avatar: marketplaceAvatars[2] },
          { quote: 'Comic conventions are great for exclusives. Get there early on day one for the best selection!', author: 'Quinn', group: 'Stranger Things Fans', likes: 58, avatar: marketplaceAvatars[3] },
          { quote: 'Follow @FunkoPopNews on social media - they announce restocks and new releases before anyone else.', author: 'Robin', group: 'Netflix Collectors', likes: 45, avatar: marketplaceAvatars[4] },
        ],
      },
    ];
  }
  
  if (isLego) {
    return [
      {
        id: 'mq-1',
        question: 'How do I verify a LEGO set is complete?',
        cards: [
          { quote: 'Count the bags and check them against the instruction manual. LEGO also has a replacement parts service if anything is missing.', author: 'Chris', group: 'LEGO Builders Club', likes: 45, avatar: marketplaceAvatars[0] },
          { quote: 'Most sellers will inventory minifigures separately since those are the most valuable. Always ask for photos of the figs!', author: 'Pat', group: 'Brick Traders', likes: 39, avatar: marketplaceAvatars[1] },
          { quote: 'For used sets, ask if they were built once or multiple times. Sets built once and displayed are usually in better condition.', author: 'Drew', group: 'LEGO Collectors', likes: 33, avatar: marketplaceAvatars[2] },
        ],
      },
      {
        id: 'mq-2',
        question: 'Is the LEGO Stranger Things set worth the price?',
        cards: [
          { quote: 'The Upside Down set is amazing - it actually flips to show both dimensions! One of the most creative LEGO sets ever made.', author: 'Quinn', group: 'LEGO Builders Club', likes: 78, avatar: marketplaceAvatars[3] },
          { quote: 'It\'s retired now so prices are only going up. If you find one near retail price, grab it immediately!', author: 'Avery', group: 'Stranger Things Fans', likes: 61, avatar: marketplaceAvatars[4] },
        ],
      },
      {
        id: 'mq-3',
        question: 'What should I look for in used LEGO sets?',
        cards: [
          { quote: 'Check for yellowing on white pieces, missing stickers, and verify all minifigures are included with their accessories.', author: 'Blake', group: 'Brick Traders', likes: 54, avatar: marketplaceAvatars[5] },
          { quote: 'Ask if it was a smoke-free home. LEGO absorbs odors easily and it\'s nearly impossible to get rid of smoke smell.', author: 'Sage', group: 'LEGO Collectors', likes: 47, avatar: marketplaceAvatars[6] },
          { quote: 'Original box and instructions add value. Even if you\'re opening it, having those can increase resale by 20-30%.', author: 'Reese', group: 'LEGO Builders Club', likes: 41, avatar: marketplaceAvatars[7] },
        ],
      },
      {
        id: 'mq-4',
        question: 'How do I clean LEGO bricks safely?',
        cards: [
          { quote: 'Warm soapy water works best. Avoid hot water as it can warp pieces. Let them air dry completely before storing.', author: 'Morgan', group: 'LEGO Builders Club', likes: 59, avatar: marketplaceAvatars[0] },
          { quote: 'For stubborn dirt, use a soft toothbrush. Never use harsh chemicals or put LEGO in the dishwasher!', author: 'Casey', group: 'Brick Traders', likes: 44, avatar: marketplaceAvatars[1] },
        ],
      },
      {
        id: 'mq-5',
        question: 'Are retired LEGO sets a good investment?',
        cards: [
          { quote: 'Licensed themes like Star Wars and Harry Potter appreciate the most. The Stranger Things set has already doubled since retiring!', author: 'Jordan', group: 'LEGO Collectors', likes: 81, avatar: marketplaceAvatars[2] },
          { quote: 'Keep sets sealed if you\'re investing. Opened sets lose about 30-40% of their potential value even if complete.', author: 'Alex', group: 'Brick Traders', likes: 67, avatar: marketplaceAvatars[3] },
          { quote: 'Check BrickLink price guides to track trends. Some sets take years to appreciate, so patience is key.', author: 'Taylor', group: 'LEGO Builders Club', likes: 53, avatar: marketplaceAvatars[4] },
        ],
      },
    ];
  }
  
  // Default collectibles questions
  return [
    {
      id: 'mq-1',
      question: 'How do I verify authenticity of collectibles?',
      cards: [
        { quote: 'Ask for proof of purchase or certificate of authenticity. For autographed items, a COA from a reputable company is essential.', author: 'Morgan', group: 'Collectors Hub', likes: 52, avatar: marketplaceAvatars[0] },
        { quote: 'Research the seller\'s history and reviews. Established collectors usually have a track record you can verify.', author: 'Casey', group: 'Pop Culture Traders', likes: 44, avatar: marketplaceAvatars[1] },
        { quote: 'Compare to known authentic examples. Many collectors groups have reference photos for spotting fakes.', author: 'Jordan', group: 'Stranger Things Fans', likes: 38, avatar: marketplaceAvatars[2] },
      ],
    },
    {
      id: 'mq-2',
      question: 'What\'s a fair price for this type of collectible?',
      cards: [
        { quote: 'Check eBay sold listings for the exact item. That shows what people actually paid, not just asking prices.', author: 'Alex', group: 'Collectors Hub', likes: 61, avatar: marketplaceAvatars[3] },
        { quote: 'Condition matters a lot. Mint in box can be worth 2-3x more than loose or damaged items.', author: 'Riley', group: 'Pop Culture Traders', likes: 49, avatar: marketplaceAvatars[4] },
      ],
    },
    {
      id: 'mq-3',
      question: 'Is Stranger Things merchandise a good investment?',
      cards: [
        { quote: 'Limited editions and exclusive items tend to hold value best. Avoid mass-produced stuff from big retailers.', author: 'Taylor', group: 'Stranger Things Fans', likes: 73, avatar: marketplaceAvatars[5] },
        { quote: 'With the final season dropping soon, expect a surge in interest. Now is a good time to buy before prices spike!', author: 'Jamie', group: 'Netflix Collectors', likes: 58, avatar: marketplaceAvatars[6] },
        { quote: 'Autographed items from main cast members are the safest bet. Joe Keery and Millie Bobby Brown signatures are always in demand.', author: 'Sam', group: 'Collectors Hub', likes: 51, avatar: marketplaceAvatars[7] },
      ],
    },
    {
      id: 'mq-4',
      question: 'How do I protect collectibles during shipping?',
      cards: [
        { quote: 'Always use rigid mailers or boxes - never ship collectibles in envelopes. Add corner protectors for boxed items.', author: 'Chris', group: 'Collectors Hub', likes: 64, avatar: marketplaceAvatars[0] },
        { quote: 'Insurance is worth it for anything over $50. Take photos before shipping as proof of condition.', author: 'Dana', group: 'Pop Culture Traders', likes: 52, avatar: marketplaceAvatars[1] },
      ],
    },
    {
      id: 'mq-5',
      question: 'What are red flags when buying collectibles online?',
      cards: [
        { quote: 'Stock photos instead of actual item photos is a huge red flag. Always ask for timestamped pics with your username.', author: 'Pat', group: 'Collectors Hub', likes: 79, avatar: marketplaceAvatars[2] },
        { quote: 'Prices too good to be true usually are. If a rare item is way below market value, it\'s probably fake or a scam.', author: 'Quinn', group: 'Stranger Things Fans', likes: 65, avatar: marketplaceAvatars[3] },
        { quote: 'New accounts with no history or feedback are risky. Stick to established sellers with positive reviews.', author: 'Robin', group: 'Pop Culture Traders', likes: 57, avatar: marketplaceAvatars[4] },
      ],
    },
  ];
};

// Chevron icons for Related Questions
const ChevronUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#080809">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.2929 8.29289C11.6834 7.90237 12.3166 7.90237 12.7071 8.29289L18.7071 14.2929C19.0976 14.6834 19.0976 15.3166 18.7071 15.7071C18.3166 16.0976 17.6834 16.0976 17.2929 15.7071L12 10.4142L6.70711 15.7071C6.31658 16.0976 5.68342 16.0976 5.29289 15.7071C4.90237 15.3166 4.90237 14.6834 5.29289 14.2929L11.2929 8.29289Z" fill="#080809"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#080809">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#080809"/>
  </svg>
);

// AI Sparkle icon - matches the one from components/icons
const AISparkleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#65686c', flexShrink: 0 }}>
    <path d="M10.3137 9.16065C9.59548 7.62174 7.40721 7.62175 6.689 9.16065L6.3031 9.98752C5.62186 11.4472 4.44855 12.6205 2.98886 13.3018L2.16199 13.6877C0.623084 14.4059 0.623089 16.5941 2.16199 17.3123L2.98886 17.6982C4.44855 18.3795 5.62186 19.5528 6.3031 21.0125L6.689 21.8394C7.40721 23.3783 9.59548 23.3783 10.3137 21.8394L10.6996 21.0125C11.3808 19.5528 12.5541 18.3795 14.0138 17.6982L14.8407 17.3123C16.3796 16.5941 16.3796 14.4059 14.8407 13.6877L14.0138 13.3018C12.5541 12.6205 11.3808 11.4472 10.6996 9.98752L10.3137 9.16065Z" />
    <path d="M12.002 1C10.3451 1 9.00195 2.34315 9.00195 4C9.00195 5.65685 10.3451 7 12.002 7C13.6588 7 15.002 5.65685 15.002 4C15.002 2.34315 13.6588 1 12.002 1Z" />
    <path d="M20.9417 13.0532C22.4288 13.4517 23.7896 12.0908 23.3911 10.6037L22.0463 5.5846C21.6478 4.09745 19.7889 3.59936 18.7002 4.68802L15.026 8.36226C13.9373 9.45092 14.4354 11.3098 15.9226 11.7083L20.9417 13.0532Z" />
  </svg>
);

// Thumbs up icon for cards
const ThumbsUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#65676b">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.999 0.5C9.61831 0.5 8.49902 1.61929 8.49902 3V3.81449C8.49902 5.0965 8.20054 6.3609 7.62721 7.50757L6.73803 9.28591C6.62168 9.51861 6.51869 9.75703 6.42932 10H3C1.61929 10 0.5 11.1193 0.5 12.5V20.5C0.5 21.8807 1.61929 23 3 23L6.99902 23C6.99968 23 7.00132 23 7.00197 23H13.4582L13.5 23.0002H17.75C19.5287 23.0002 20.9975 21.6734 21.2207 19.9555C22.0005 19.3146 22.5 18.3412 22.5 17.2502C22.5 17.0763 22.4872 16.905 22.4625 16.7372C23.1022 16.1037 23.5 15.2236 23.5 14.2502C23.5 13.6479 23.3472 13.0799 23.0785 12.5842C23.1899 12.2422 23.25 11.8775 23.25 11.5C23.25 9.567 21.683 8 19.75 8H14.999V4.5C14.999 2.29086 13.2082 0.5 10.999 0.5ZM8 21H13.4785L13.5 21.0002H17.75C18.5784 21.0002 19.25 20.3287 19.25 19.5002C19.25 19.4833 19.2497 19.4663 19.2492 19.4495C19.237 19.0807 19.429 18.7352 19.7484 18.5507C20.1999 18.2899 20.5 17.8045 20.5 17.2502C20.5 17.0609 20.4654 16.8819 20.403 16.7177C20.2344 16.2739 20.4011 15.7727 20.802 15.5182C21.2237 15.2506 21.5 14.7823 21.5 14.2502C21.5 13.8943 21.3773 13.5697 21.171 13.3126C20.9193 12.999 20.88 12.5652 21.0711 12.2114C21.185 12.0007 21.25 11.7594 21.25 11.5C21.25 10.6716 20.5784 10 19.75 10L14.4902 10C13.6671 10 12.999 9.33273 12.999 8.50961V4.5C12.999 3.39543 12.1036 2.5 10.999 2.5C10.7229 2.5 10.499 2.72386 10.499 3V3.81449C10.499 5.40699 10.1282 6.97762 9.41606 8.40199L8.52689 10.1803C8.19449 10.8451 8.01467 11.5753 8 12.3176V21ZM6 12.2995C5.99935 12.3384 5.99902 12.3774 5.99902 12.4164V21H3C2.72386 21 2.5 20.7761 2.5 20.5V12.5C2.5 12.2239 2.72386 12 3 12H6V12.2995Z" fill="#65676b"/>
  </svg>
);

export default function MarketplaceProductPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set(['mq-1']));
  const [showMessagePrompt, setShowMessagePrompt] = useState(false);
  
  // Check if coming from aggregation page
  const isFromAggregation = searchParams?.get('fromAggregation') === 'true';
  
  // Animation state for expand transition from aggregation
  const sourceRectRef = useRef(null);
  const hasReadSourceRect = useRef(false);
  
  // Read source rect from sessionStorage synchronously on first render
  if (isFromAggregation && typeof window !== 'undefined' && !hasReadSourceRect.current) {
    hasReadSourceRect.current = true;
    const storedRect = sessionStorage.getItem('marketplaceSourceRect');
    if (storedRect) {
      try {
        sourceRectRef.current = JSON.parse(storedRect);
        sessionStorage.removeItem('marketplaceSourceRect');
      } catch (e) {
        console.error('Failed to parse marketplace source rect:', e);
      }
    }
  }
  
  const sourceRect = sourceRectRef.current;
  
  // Calculate initial transform for expand animation
  // Uses transformOrigin at tile position so it expands FROM the tile
  const getInitialTransform = () => {
    if (!sourceRect) {
      return { scale: 1, hasSourceRect: false, originX: '50%', originY: '50%' };
    }
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 812;
    
    // Calculate center of the source tile as percentage of viewport
    const sourceCenterX = sourceRect.left + sourceRect.width / 2;
    const sourceCenterY = sourceRect.top + sourceRect.height / 2;
    
    // Transform origin should be at the tile's center position
    const originX = `${sourceCenterX}px`;
    const originY = `${sourceCenterY}px`;
    
    // Calculate scale based on tile size vs viewport
    const scaleX = sourceRect.width / viewportWidth;
    const scaleY = sourceRect.height / viewportHeight;
    const scale = Math.max(scaleX, scaleY, 0.25);
    
    return { scale, hasSourceRect: true, originX, originY };
  };
  
  const initialTransform = getInitialTransform();
  
  // Animation variants - expand FROM tile position using transformOrigin
  const pageVariants = {
    initial: { 
      opacity: initialTransform.hasSourceRect ? 0.9 : 0, 
      scale: initialTransform.scale,
      borderRadius: initialTransform.hasSourceRect ? 16 : 0,
    },
    enter: {
      opacity: 1,
      scale: 1,
      borderRadius: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out curve, no overshoot
      },
    },
  };

  useEffect(() => {
    const productId = params.id;
    
    if (productData[productId]) {
      setProduct(productData[productId]);
    } else {
      const stored = sessionStorage.getItem('marketplaceProduct');
      if (stored) {
        setProduct(JSON.parse(stored));
      } else {
        setProduct(productData['t1']);
      }
    }
  }, [params.id]);

  // Handle click on related question card - navigate to groups permalink
  const handleCardClick = (questionItem, card, cardIdx) => {
    // Generate a unique post ID based on question and card index
    const postId = `source-marketplace-${questionItem.id}-${cardIdx}`;
    
    // Build URL params similar to RelatedAnswers component
    const params = new URLSearchParams({
      topic: 'marketplace',
      sourceTitle: questionItem.question,
      firstComment: card.quote,
      groupName: card.group,
      authorName: card.author,
      authorAvatar: card.avatar,
      postBody: `Looking for advice about ${product?.title || 'this item'}. Would love to hear your experiences and tips!`,
      keepSearchExpanded: 'true',
    });
    
    router.push(`/m/groups/123/posts/${postId}?${params.toString()}`);
  };

  // Handle click on similar listing - navigate to PDP with that item
  const handleSimilarItemClick = (item) => {
    // Determine brand and category based on title
    const isLego = item.title.toLowerCase().includes('lego');
    const isFunko = item.title.toLowerCase().includes('funko') || item.title.toLowerCase().includes('pop');
    
    // Build full product data for the PDP
    const productData = {
      id: item.id,
      price: item.price,
      title: item.title,
      location: item.location,
      distance: item.distance,
      image: item.image,
      condition: 'Like new',
      brand: isLego ? 'LEGO' : isFunko ? 'Funko' : 'Collectible',
      category: isLego ? 'Toys & Games' : 'Collectibles',
      subcategory: isLego ? 'LEGO' : 'Funko',
      theme: 'Stranger Things',
      description: `${item.title} - Stranger Things collectible in great condition. ${isLego ? 'Complete set with all pieces and instructions.' : 'Mint condition, stored in a smoke-free home. Perfect for any Stranger Things fan!'}`
    };
    
    // Store in sessionStorage for the PDP to read
    sessionStorage.setItem('marketplaceProduct', JSON.stringify(productData));
    
    // Navigate to the PDP
    router.push(`/m/marketplace/listing-${item.id}`);
  };

  if (!product) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  // Use motion wrapper for expand animation from aggregation
  const PageWrapper = isFromAggregation && sourceRect ? motion.div : 'div';
  const wrapperProps = isFromAggregation && sourceRect ? {
    variants: pageVariants,
    initial: "initial",
    animate: "enter",
    style: { 
      transformOrigin: `${initialTransform.originX} ${initialTransform.originY}`,
      willChange: 'transform, opacity',
    },
  } : {};

  return (
    <PageWrapper {...wrapperProps} style={{
      ...wrapperProps.style,
      minHeight: '100vh',
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    }}>
      {/* Global style to hide scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Main Content */}
      <main>
        {/* Image Carousel */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: 'calc(100% - 120px)',
          background: '#f0f2f5',
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* FDS Pagination dots */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 8px',
            borderRadius: '100px',
            background: 'rgba(28, 28, 29, 0.8)',
          }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i === currentImageIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                  transition: 'background 0.2s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Price and Title */}
        <div style={{ padding: '12px' }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#050505',
            margin: '0 0 4px',
            lineHeight: '24px',
            letterSpacing: '0.38px',
          }}>
            {product.title}
          </h1>
          <p style={{
            fontSize: '17px',
            fontWeight: '400',
            color: '#050505',
            margin: '0 0 4px',
            lineHeight: '20px',
            letterSpacing: '-0.41px',
          }}>
            {product.price}
          </p>
        </div>

        {/* UFI Buttons - Like, Comment, Share with reactions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          height: '40px',
          background: '#fff',
          marginTop: '-12px',
          marginBottom: '4px',
        }}>
          {/* Left side - Like, Comment, Share */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* Like */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 12px 10px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#65686c" style={{ display: 'block', flexShrink: 0 }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.999 0.5C9.61831 0.5 8.49902 1.61929 8.49902 3V3.81449C8.49902 5.0965 8.20054 6.3609 7.62721 7.50757L6.73803 9.28591C6.62168 9.51861 6.51869 9.75703 6.42932 10H3C1.61929 10 0.5 11.1193 0.5 12.5V20.5C0.5 21.8807 1.61929 23 3 23L6.99902 23C6.99968 23 7.00132 23 7.00197 23H13.4582L13.5 23.0002H17.75C19.5287 23.0002 20.9975 21.6734 21.2207 19.9555C22.0005 19.3146 22.5 18.3412 22.5 17.2502C22.5 17.0763 22.4872 16.905 22.4625 16.7372C23.1022 16.1037 23.5 15.2236 23.5 14.2502C23.5 13.6479 23.3472 13.0799 23.0785 12.5842C23.1899 12.2422 23.25 11.8775 23.25 11.5C23.25 9.567 21.683 8 19.75 8H14.999V4.5C14.999 2.29086 13.2082 0.5 10.999 0.5ZM8 21H13.4785L13.5 21.0002H17.75C18.5784 21.0002 19.25 20.3287 19.25 19.5002C19.25 19.4833 19.2497 19.4663 19.2492 19.4495C19.237 19.0807 19.429 18.7352 19.7484 18.5507C20.1999 18.2899 20.5 17.8045 20.5 17.2502C20.5 17.0609 20.4654 16.8819 20.403 16.7177C20.2344 16.2739 20.4011 15.7727 20.802 15.5182C21.2237 15.2506 21.5 14.7823 21.5 14.2502C21.5 13.8943 21.3773 13.5697 21.171 13.3126C20.9193 12.999 20.88 12.5652 21.0711 12.2114C21.185 12.0007 21.25 11.7594 21.25 11.5C21.25 10.6716 20.5784 10 19.75 10L14.4902 10C13.6671 10 12.999 9.33273 12.999 8.50961V4.5C12.999 3.39543 12.1036 2.5 10.999 2.5C10.7229 2.5 10.499 2.72386 10.499 3V3.81449C10.499 5.40699 10.1282 6.97762 9.41606 8.40199L8.52689 10.1803C8.19449 10.8451 8.01467 11.5753 8 12.3176V21ZM6 12.2995C5.99935 12.3384 5.99902 12.3774 5.99902 12.4164V21H3C2.72386 21 2.5 20.7761 2.5 20.5V12.5C2.5 12.2239 2.72386 12 3 12H6V12.2995Z" fill="#65686c"/>
              </svg>
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#65686c',
                lineHeight: '20px',
                letterSpacing: '-0.08px',
              }}>99</span>
            </button>

            {/* Comment */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#65686c" style={{ display: 'block', flexShrink: 0 }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 13.6405 2.9175 15.1851 3.65326 16.5359C3.9179 17.0217 4.01879 17.5892 3.87305 18.1533L3.1582 20.8418L5.84668 20.127C6.41079 19.9812 6.9783 20.0821 7.46406 20.3467C8.8149 21.0825 10.3595 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5ZM0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C10.0782 23.5 8.26351 23.0279 6.66895 22.1924C6.50263 22.1053 6.34422 22.0918 6.22363 22.123L2.82422 23.0049C1.71693 23.292 0.708044 22.2831 0.995117 21.1758L1.87695 17.7764C1.90815 17.6558 1.89474 17.4974 1.80762 17.3311C0.97205 15.7365 0.5 13.9218 0.5 12Z" fill="#65686c"/>
              </svg>
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#65686c',
                lineHeight: '20px',
                letterSpacing: '-0.08px',
              }}>2.1K</span>
            </button>

            {/* Share */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#65686c" style={{ display: 'block', flexShrink: 0 }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M12.8628 3.15582C12.5462 2.83512 12 3.05932 12 3.50998V8.00248C12 8.55476 11.5523 9.00248 11 9.00248H10.5C7.58095 9.00248 5.50274 10.222 4.12357 12.0953C2.91318 13.7395 2.21242 15.9327 2.04135 18.3301C2.81703 17.3939 3.76238 16.6319 4.93033 16.075C6.44545 15.3526 8.27778 15.0025 10.5 15.0025H11C11.5523 15.0025 12 15.4502 12 16.0025V20.4901C12 20.9408 12.5462 21.165 12.8628 20.8443L21.2451 12.3543C21.4389 12.1579 21.4389 11.8423 21.2451 11.6459L12.8628 3.15582ZM10 3.50998C10 1.27134 12.7132 0.157623 14.286 1.75067L22.6683 10.2408C23.6312 11.216 23.6312 12.7842 22.6683 13.7594L14.286 22.2494C12.7132 23.8425 10 22.7288 10 20.4901V17.0092C8.22692 17.058 6.86408 17.3687 5.79111 17.8803C4.63182 18.433 3.75465 19.2468 3.04864 20.3333C2.59207 21.0359 1.78571 21.1208 1.2696 21.0032C0.755147 20.8861 0 20.429 0 19.5025C0 16.3518 0.789377 13.2508 2.51296 10.9096C4.17987 8.6454 6.68372 7.14917 10 7.01268V3.50998Z" fill="#65686c"/>
              </svg>
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#65686c',
                lineHeight: '20px',
                letterSpacing: '-0.08px',
              }}>367</span>
            </button>
          </div>

          {/* Right side - Inline Reactions (same as groups permalink) */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 4px 0 12px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
            }}>
              <img 
                src="/images/reactions/like_default_40.png" 
                alt="Like" 
                style={{ width: '18px', height: '18px', borderRadius: '50%' }}
              />
              <img 
                src="/images/reactions/wow_default_40.png" 
                alt="Wow" 
                style={{ width: '18px', height: '18px', borderRadius: '50%' }}
              />
              <img 
                src="/images/reactions/love_default_40.png" 
                alt="Love" 
                style={{ width: '18px', height: '18px', borderRadius: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Item information */}
        <div style={{ padding: '12px' }}>
          {/* Headline 3 Emphasized - matching Related questions */}
          <h2 style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', 
            fontSize: '17px', 
            fontWeight: '700', 
            color: '#080809', 
            margin: '0 0 4px', 
            lineHeight: '22px', 
            letterSpacing: 'normal' 
          }}>
            Item information
          </h2>
          {/* Body 3 - Description */}
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '15px',
            fontWeight: '400',
            color: '#080809',
            margin: 0,
            lineHeight: '20px',
            letterSpacing: 'normal',
          }}>
            {product.description}
          </p>
          
          {/* List cells with icons */}
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '12px' }}>
            {/* Condition */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              paddingTop: '12px',
              paddingBottom: '12px',
            }}>
              <Icon name="brush-paint-outline" size={24} color="#080809" />
              <span style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '15px', 
                fontWeight: '600',
                color: '#080809',
                lineHeight: '20px',
                letterSpacing: 'normal',
              }}>
                Condition: {product.condition}
              </span>
            </div>
            {/* Brand */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              paddingTop: '12px',
              paddingBottom: '12px',
            }}>
              <Icon name="tag-stack-outline" size={24} color="#080809" />
              <span style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '15px', 
                fontWeight: '600',
                color: '#080809',
                lineHeight: '20px',
                letterSpacing: 'normal',
              }}>
                Brand: {product.brand}
              </span>
            </div>
          </div>
        </div>

        {/* Seller - List Cell style matching Figma */}
        <div style={{ padding: '12px' }}>
          {/* Seller header - Headline 3 Emphasized */}
          <h2 style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '17px', 
            fontWeight: '700', 
            color: '#080809', 
            margin: '0 0 8px',
            lineHeight: '22px',
            letterSpacing: 'normal',
          }}>
            Seller
          </h2>
          
          {/* Profile list cell */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            paddingTop: '4px',
            paddingBottom: '12px',
          }}>
            {/* Profile Photo 24dp */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#e4e6eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#65686c">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Name - Body 3 Link: 15px, 600 weight */}
              <p style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '15px', 
                fontWeight: '600', 
                color: '#080809', 
                margin: 0,
                lineHeight: '20px',
                letterSpacing: 'normal',
              }}>
                Maya
              </p>
              {/* Star Rating Display + Joined date in row */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                marginTop: '2px',
              }}>
                <StarFilledIcon />
                <StarFilledIcon />
                <StarFilledIcon />
                <StarFilledIcon />
                <StarFilledIcon />
                {/* Rating value - Body 4 Link: 13px, 600 weight */}
                <span style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '13px', 
                  color: '#050505', 
                  fontWeight: '600',
                  lineHeight: '16px',
                  letterSpacing: 'normal',
                }}>
                  5
                </span>
                {/* Review count - Body 4: 13px, 400 weight, secondary text */}
                <span style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '13px', 
                  color: '#65676B',
                  fontWeight: '400',
                  lineHeight: '16px',
                  letterSpacing: 'normal',
                }}>
                  (236)
                </span>
              </div>
              {/* Joined date - Meta 4: 12px, 400 weight */}
              <p style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '12px', 
                fontWeight: '400',
                color: '#65686c', 
                margin: 0,
                marginTop: '2px',
                lineHeight: '16px',
                letterSpacing: 'normal',
              }}>
                Joined 2021
              </p>
            </div>
          </div>
          
          {/* Location list cell */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            paddingTop: '12px',
            paddingBottom: '4px',
          }}>
            <Icon name="pin-outline" size={24} color="#65686c" />
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Location - Body 3 Link: 15px, 600 weight */}
              <p style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '15px', 
                fontWeight: '600', 
                color: '#080809', 
                margin: 0,
                lineHeight: '20px',
                letterSpacing: 'normal',
              }}>
                {product.location.split(',')[0]}, {product.location.split(',')[1]?.trim() || 'WA'}
              </p>
              {/* Distance - Body 4: 13px, 400 weight */}
              <p style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '13px', 
                fontWeight: '400',
                color: '#65686c', 
                margin: 0,
                marginTop: '2px',
                lineHeight: '16px',
                letterSpacing: 'normal',
              }}>
                {product.distance} away
              </p>
            </div>
          </div>
        </div>

        {/* Send Message Card - Elevated with border and shadow */}
        <div style={{
          margin: '8px 12px 16px',
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid #e2e5e9',
          boxShadow: '0px 2px 16px 0px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '12px 12px 8px',
          }}>
            {/* Messenger icon - 16px */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#080809">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 13.6405 2.9175 15.1851 3.65326 16.5359C3.9179 17.0217 4.01879 17.5892 3.87305 18.1533L3.1582 20.8418L5.84668 20.127C6.41079 19.9812 6.9783 20.0821 7.46406 20.3467C8.8149 21.0825 10.3595 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5ZM0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C10.0782 23.5 8.26351 23.0279 6.66895 22.1924C6.50263 22.1053 6.34422 22.0918 6.22363 22.123L2.82422 23.0049C1.71693 23.292 0.708044 22.2831 0.995117 21.1758L1.87695 17.7764C1.90815 17.6558 1.89474 17.4974 1.80762 17.3311C0.97205 15.7365 0.5 13.9218 0.5 12ZM18.5068 9.28223C18.8742 8.71443 18.1934 8.05362 17.6367 8.4375L13.8203 11.0693C13.6918 11.1581 13.5226 11.1608 13.3916 11.0762L10.0039 8.88477C9.7172 8.6995 9.33478 8.78169 9.14941 9.06836L5.49316 14.7178C5.12555 15.2856 5.80655 15.9466 6.36328 15.5625L10.1807 12.9307C10.3092 12.8419 10.4782 12.8392 10.6094 12.9238L13.9961 15.1152C14.2828 15.3006 14.6652 15.2184 14.8506 14.9316L18.5068 9.28223Z" fill="#080809" />
            </svg>
            {/* Headline 4 - 15px, 500 weight */}
            <span style={{ fontSize: '15px', fontWeight: '500', color: '#080809', lineHeight: '20px', letterSpacing: 'normal' }}>
              Send seller a message
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            padding: '0 12px 16px',
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              background: '#f0f2f5',
              borderRadius: '24px',
              padding: '8px 12px',
              minHeight: '40px',
            }}>
              {/* Body 3 - 15px */}
              <span style={{ 
                flex: 1,
                fontSize: '15px', 
                color: '#080809',
                lineHeight: '20px',
                letterSpacing: 'normal',
              }}>
                Good morning, is this still available?
              </span>
            </div>
            {/* Blueprint FDS Nucleus Filled Send Icon */}
            <button 
              onClick={() => setShowMessagePrompt(true)}
              style={{
                width: '24px',
                height: '24px',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0866ff">
                <path d="M1.68791 9.33183C-0.843349 6.81538 0.938748 2.49512 4.50803 2.49512H19.4969C22.5755 2.49512 24.5001 5.8272 22.9618 8.49386L15.4716 21.478C13.6882 24.5696 9.05567 23.9547 8.14054 20.5048L6.90124 15.833L12.5439 11.6508C12.9524 11.348 13.0687 10.7869 12.8142 10.3468C12.5596 9.90663 12.0154 9.72754 11.5492 9.93056L5.11076 12.7347L1.68791 9.33183Z" fill="#0866ff" />
              </svg>
            </button>
          </div>
        </div>

        {/* Related Questions - same design as Related Answers from groups permalink */}
        <div style={{
          background: '#fff',
          paddingTop: '16px',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingBottom: '4px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {/* Headline 3 Emphasized */}
              <h2 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '17px',
                fontWeight: '700',
                lineHeight: '22px',
                letterSpacing: 'normal',
                color: '#080809',
                margin: 0,
              }}>
                Related answers
              </h2>
              {/* Meta line with AI icon */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                fontWeight: '400',
                lineHeight: '16px',
                color: '#65686c',
              }}>
                <AISparkleIcon />
                <span>Summarized by AI from Meta</span>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {getRelatedQuestionsData(product).map((item, index) => {
              const isExpanded = expandedQuestions.has(item.id);
              
              return (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Question Row (clickable) */}
                  <button
                    onClick={() => {
                      setExpandedQuestions(prev => {
                        const newSet = new Set(prev);
                        if (newSet.has(item.id)) {
                          newSet.delete(item.id);
                        } else {
                          newSet.add(item.id);
                        }
                        return newSet;
                      });
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    {/* Headline 3 typography */}
                    <h3 style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '17px',
                      fontWeight: '500',
                      lineHeight: '22px',
                      letterSpacing: 'normal',
                      color: '#080809',
                      margin: 0,
                      flex: 1,
                    }}>
                      {item.question}
                    </h3>
                    {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </button>

                  {/* Expanded Content - Horizontal scroll cards */}
                  {isExpanded && (
                    <div style={{
                      paddingBottom: '12px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '15px',
                      fontWeight: '400',
                      lineHeight: '20px',
                      letterSpacing: '-0.24px',
                    }}>
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          overflowX: 'auto',
                          overflowY: 'hidden',
                          paddingTop: 0,
                          paddingBottom: '4px',
                          paddingLeft: '12px',
                          paddingRight: '12px',
                          WebkitOverflowScrolling: 'touch',
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                          scrollSnapType: 'x mandatory',
                          scrollPaddingInlineStart: '12px',
                        }}
                        className="hide-scrollbar"
                      >
                        {item.cards.map((card, cardIdx) => (
                          <button
                            key={cardIdx}
                            onClick={() => handleCardClick(item, card, cardIdx)}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              flexShrink: 0,
                              width: '200px',
                              height: '184px',
                              padding: '12px',
                              background: '#fff',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              textAlign: 'left',
                              WebkitTapHighlightColor: 'transparent',
                              scrollSnapAlign: 'start',
                              fontFamily: 'inherit',
                            }}
                          >
                            {/* Card Header - Group avatar and name */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px',
                            }}>
                              <img 
                                src={card.avatar} 
                                alt=""
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '6px',
                                  objectFit: 'cover',
                                  flexShrink: 0,
                                }}
                              />
                              <span style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                lineHeight: '16px',
                                letterSpacing: 'normal',
                                color: '#080809',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}>
                                {card.group}
                              </span>
                            </div>
                            
                            {/* Quote text - Body 3 */}
                            <p style={{
                              fontSize: '15px',
                              fontWeight: '400',
                              lineHeight: '20px',
                              letterSpacing: 'normal',
                              color: '#080809',
                              margin: 0,
                              flex: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              {card.quote}
                            </p>
                            
                            {/* Card Footer - Like icon and count */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              marginTop: '12px',
                            }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}>
                                <ThumbsUpIcon />
                                <span style={{
                                  fontSize: '13px',
                                  fontWeight: '400',
                                  lineHeight: '16px',
                                  letterSpacing: 'normal',
                                  color: '#65676b',
                                }}>
                                  {card.likes}
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  {index < getRelatedQuestionsData(product).length - 1 && (
                    <div style={{
                      height: '1px',
                      background: '#e4e6eb',
                      margin: '0 12px',
                    }} />
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* People Also Searched For - above Similar Listings */}
        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
          <OthersSearchedFor 
            queries={[
              "Stranger Things Funko Pop",
              "LEGO Stranger Things",
              "Rare Funko Pop chase",
              "Vintage collectibles",
              "Funko Pop display",
              "Stranger Things poster",
              "Netflix merch deals",
              "Vinyl price guide",
              "Eleven Funko Pop",
              "Demogorgon figure",
              "Hawkins High merch",
              "Pop protectors",
              "Chase edition Funko",
              "Collectible toys",
              "Stranger Things gifts",
              "Limited edition Pop",
            ]}
            noDivider
          />
        </div>

        {/* Similar Listings - Media Tile Grid matching Figma */}
        <div style={{ background: '#fff', paddingTop: '8px' }}>
          {/* Unit Header */}
          <div style={{
            padding: '12px',
            paddingBottom: '12px',
          }}>
            {/* Headline 3 Emphasized */}
            <h2 style={{ 
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '17px', 
              fontWeight: '700', 
              color: '#050505', 
              margin: 0,
              lineHeight: '20px',
              letterSpacing: '-0.41px',
            }}>
              Similar listings
            </h2>
          </div>
          {/* Media Tile Grid - 2 rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Row 1 */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#fff',
            }}>
              {similarItems.slice(0, 2).map((item, index) => (
                <button 
                  key={`listing-${item.id}`} 
                  onClick={() => handleSimilarItemClick(item)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  {/* Media - 1:1 aspect ratio, no border radius */}
                  <div style={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {/* Content - matching marketplace landing page grid */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '8px 12px 12px',
                    paddingLeft: index === 0 ? '12px' : '4px',
                    paddingRight: '4px',
                  }}>
                    {/* Price - Headline 4: 15px, 500 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '20px',
                      letterSpacing: '-0.24px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.price}
                    </p>
                    {/* Item name - Body 4: 13px, 400 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '-0.08px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title}
                    </p>
                    {/* Location + Distance - Meta 4: 12px, 400 weight, secondary text */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#65686c',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '0px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.location} · {item.distance}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {/* Row 2 */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#fff',
            }}>
              {similarItems.slice(2, 4).map((item, index) => (
                <button 
                  key={`listing-${item.id}`} 
                  onClick={() => handleSimilarItemClick(item)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  {/* Media - 1:1 aspect ratio, no border radius */}
                  <div style={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {/* Content - matching marketplace landing page grid */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '8px 12px 12px',
                    paddingLeft: index === 0 ? '12px' : '4px',
                    paddingRight: '4px',
                  }}>
                    {/* Price - Headline 4: 15px, 500 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '20px',
                      letterSpacing: '-0.24px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.price}
                    </p>
                    {/* Item name - Body 4: 13px, 400 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '-0.08px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title}
                    </p>
                    {/* Location + Distance - Meta 4: 12px, 400 weight, secondary text */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#65686c',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '0px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.location} · {item.distance}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Contextual Message - Get notified */}
            <div style={{
              padding: '4px 12px 12px',
              background: '#fff',
            }}>
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}>
                {/* Content row with illustration */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '12px',
                }}>
                  {/* Notification illustration */}
                  <img 
                    src="/illustrations/notif.png" 
                    alt="Notification"
                    style={{
                      width: '48px',
                      height: '48px',
                      flexShrink: 0,
                    }}
                  />
                  {/* Headline 3: 17px, 500 weight */}
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontSize: '17px',
                    fontWeight: '500',
                    lineHeight: '22px',
                    letterSpacing: 'normal',
                    color: '#080809',
                    margin: 0,
                  }}>
                    Get notified for items related to "stranger things funko pop"
                  </p>
                </div>
                {/* Primary Button - Button 2 (Medium): 15px, 600 weight */}
                <button 
                  onClick={() => window.open('https://apps.apple.com/app/facebook/id284882215', '_blank')}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: '#0866ff',
                    border: 'none',
                    borderRadius: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontSize: '15px',
                    fontWeight: '600',
                    lineHeight: '20px',
                    letterSpacing: 'normal',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Open app
                </button>
              </div>
            </div>

            {/* Row 3 */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#fff',
            }}>
              {similarItems.slice(4, 6).map((item, index) => (
                <button 
                  key={`listing-${item.id}`} 
                  onClick={() => handleSimilarItemClick(item)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  {/* Media - 1:1 aspect ratio, no border radius */}
                  <div style={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {/* Content - matching marketplace landing page grid */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '8px 12px 12px',
                    paddingLeft: index === 0 ? '12px' : '4px',
                    paddingRight: '4px',
                  }}>
                    {/* Price - Headline 4: 15px, 500 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '20px',
                      letterSpacing: '-0.24px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.price}
                    </p>
                    {/* Item name - Body 4: 13px, 400 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '-0.08px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title}
                    </p>
                    {/* Location + Distance - Meta 4: 12px, 400 weight, secondary text */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#65686c',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '0px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.location} · {item.distance}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {/* Row 4 */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#fff',
            }}>
              {similarItems.slice(6, 8).map((item, index) => (
                <button 
                  key={`listing-${item.id}`} 
                  onClick={() => handleSimilarItemClick(item)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  {/* Media - 1:1 aspect ratio, no border radius */}
                  <div style={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {/* Content - matching marketplace landing page grid */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '8px 12px 12px',
                    paddingLeft: index === 0 ? '12px' : '4px',
                    paddingRight: '4px',
                  }}>
                    {/* Price - Headline 4: 15px, 500 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '20px',
                      letterSpacing: '-0.24px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.price}
                    </p>
                    {/* Item name - Body 4: 13px, 400 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '-0.08px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title}
                    </p>
                    {/* Location + Distance - Meta 4: 12px, 400 weight, secondary text */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#65686c',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '0px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.location} · {item.distance}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Row 5 */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#fff',
            }}>
              {similarItems.slice(8, 10).map((item, index) => (
                <button 
                  key={`listing-${item.id}`} 
                  onClick={() => handleSimilarItemClick(item)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  {/* Media - 1:1 aspect ratio, no border radius */}
                  <div style={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {/* Content - matching marketplace landing page grid */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '8px 12px 12px',
                    paddingLeft: index === 0 ? '12px' : '4px',
                    paddingRight: '4px',
                  }}>
                    {/* Price - Headline 4: 15px, 500 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '20px',
                      letterSpacing: '-0.24px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.price}
                    </p>
                    {/* Item name - Body 4: 13px, 400 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '-0.08px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title}
                    </p>
                    {/* Location + Distance - Meta 4: 12px, 400 weight, secondary text */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#65686c',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '0px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.location} · {item.distance}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {/* Row 6 */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#fff',
            }}>
              {similarItems.slice(10, 12).map((item, index) => (
                <button 
                  key={`listing-${item.id}`} 
                  onClick={() => handleSimilarItemClick(item)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  {/* Media - 1:1 aspect ratio, no border radius */}
                  <div style={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {/* Content - matching marketplace landing page grid */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '8px 12px 12px',
                    paddingLeft: index === 0 ? '12px' : '4px',
                    paddingRight: '4px',
                  }}>
                    {/* Price - Headline 4: 15px, 500 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '20px',
                      letterSpacing: '-0.24px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.price}
                    </p>
                    {/* Item name - Body 4: 13px, 400 weight */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#080809',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '-0.08px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title}
                    </p>
                    {/* Location + Distance - Meta 4: 12px, 400 weight, secondary text */}
                    <p style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#65686c',
                      margin: 0,
                      lineHeight: '16px',
                      letterSpacing: '0px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.location} · {item.distance}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Message Seller Prompt Sheet */}
      <UpsellBottomSheet 
        isOpen={showMessagePrompt}
        onClose={() => setShowMessagePrompt(false)}
        type="message"
        entityName="Maya"
      />
    </PageWrapper>
  );
}

