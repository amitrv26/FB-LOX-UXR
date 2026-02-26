// Mock data matching the Portland coffee group post
export const groupPostData = {
  group: {
    id: "portland-maine-community",
    name: "Portland, Maine Community",
    // Unsplash image of Portland Head Light - iconic Portland, Maine landmark
    avatar: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=80&h=80&fit=crop",
    memberCount: "45.2K members",
    isPublic: true,
  },
  post: {
    id: "123456789",
    author: {
      id: "author-emily",
      name: "Emily Chen",
      // Unsplash portrait for author avatar
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
      date: "Dec 8",
      privacy: "public",
    },
    title: "What are the best cafes in Portland, Maine?",
    aiGenerated: true,
    body: `Hi everyone! I just moved to Portland and I'm a huge coffee lover ☕

I work remotely so I'm looking for cafes with good wifi, great coffee, and a nice atmosphere to work from. Bonus points if they have outdoor seating for warmer days! Any recommendations would be greatly appreciated.`,
    reactions: {
      like: 24,
      love: 8,
      total: 32,
    },
    commentsCount: 21,
    sharesCount: 12,
  },
  comments: [
    {
      id: "comment-1",
      author: {
        id: "author-mike",
        name: "Mike Richardson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
      },
      time: "2 days",
      text: `Welcome to Portland! You're going to love the coffee scene here. I've been living here for 5 years and still discovering new spots.

My best advice is to explore the East End and Old Port areas - tons of great options within walking distance of each other.`,
      reactions: {
        like: 18,
      },
      replies: [
        {
          id: "reply-1-1",
          author: {
            id: "author-sarah",
            name: "Sarah Mitchell",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
          },
          time: "1 day",
          text: "The East End has some hidden gems for sure! Don't miss the little spots off the main streets ☀️",
          reactions: { like: 7 },
        },
        {
          id: "reply-1-2",
          author: {
            id: "author-mike",
            name: "Mike Richardson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
          },
          time: "1 day",
          text: "Totally agree! The waterfront views are incredible too 🌊",
          reactions: { like: 4 },
        },
      ],
      replyCount: 2,
    },
    {
      id: "comment-2",
      author: {
        id: "author-jessica",
        name: "Jessica Torres",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
      },
      time: "1 day",
      text: "If you work remotely, definitely look for places with good wifi AND outlets. Some of the cozier spots can be hit or miss with power access!",
      reactions: { like: 12 },
      replies: [
        {
          id: "reply-2-1",
          author: { id: "author-tom", name: "Tom Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces" },
          time: "23h",
          text: "Second this! Their breakfast sandwich is incredible 🥪",
          reactions: { like: 5 },
        },
        {
          id: "reply-2-2",
          author: { id: "author-anna", name: "Anna Lee", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces" },
          time: "22h",
          text: "The wifi is super fast too!",
          reactions: { like: 3 },
        },
        {
          id: "reply-2-3",
          author: { id: "author-david", name: "David Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces" },
          time: "21h",
          text: "I work from there at least twice a week",
          reactions: { like: 6 },
        },
        {
          id: "reply-2-4",
          author: { id: "author-lisa", name: "Lisa Park", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces" },
          time: "20h",
          text: "Their oat milk latte is the best in Portland imo",
          reactions: { like: 8 },
        },
        {
          id: "reply-2-5",
          author: { id: "author-james", name: "James Brown", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces" },
          time: "19h",
          text: "Great vibes, highly recommend",
          reactions: { like: 2 },
        },
        {
          id: "reply-2-6",
          author: { id: "author-emma", name: "Emma Davis", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces" },
          time: "18h",
          text: "Love the natural lighting in there",
          reactions: { like: 4 },
        },
        {
          id: "reply-2-7",
          author: { id: "author-chris", name: "Chris Taylor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" },
          time: "17h",
          text: "The pastries are from a local bakery too 🥐",
          reactions: { like: 9 },
        },
        {
          id: "reply-2-8",
          author: { id: "author-sarah2", name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" },
          time: "16h",
          text: "Can confirm, amazing croissants!",
          reactions: { like: 5 },
        },
        {
          id: "reply-2-9",
          author: { id: "author-ryan", name: "Ryan Cooper", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces" },
          time: "15h",
          text: "Do they take reservations for groups?",
          reactions: { like: 1 },
        },
        {
          id: "reply-2-10",
          author: { id: "author-jen", name: "Jennifer White", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces" },
          time: "14h",
          text: "@Ryan Cooper not sure but it's usually not too crowded weekday mornings",
          reactions: { like: 3 },
        },
        {
          id: "reply-2-11",
          author: { id: "author-marcus", name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces" },
          time: "13h",
          text: "Been going there for 3 years now, never disappoints",
          reactions: { like: 7 },
        },
        {
          id: "reply-2-12",
          author: { id: "author-amy", name: "Amy Zhang", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=64&h=64&fit=crop&crop=faces" },
          time: "12h",
          text: "Their pour-over is exceptional ☕",
          reactions: { like: 4 },
        },
        {
          id: "reply-2-13",
          author: { id: "author-kevin", name: "Kevin O'Brien", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=64&h=64&fit=crop&crop=faces" },
          time: "11h",
          text: "Great spot for video calls too - quiet corners available",
          reactions: { like: 6 },
        },
        {
          id: "reply-2-14",
          author: { id: "author-maria", name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=64&h=64&fit=crop&crop=faces" },
          time: "10h",
          text: "The cold brew is amazing in summer!",
          reactions: { like: 8 },
        },
        {
          id: "reply-2-15",
          author: { id: "author-steve", name: "Steve Johnson", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=faces" },
          time: "9h",
          text: "Parking can be tricky but worth it",
          reactions: { like: 2 },
        },
        {
          id: "reply-2-16",
          author: { id: "author-rachel", name: "Rachel Adams", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces" },
          time: "8h",
          text: "Pro tip: come before 9am for guaranteed seating 💡",
          reactions: { like: 11 },
        },
        {
          id: "reply-2-17",
          author: { id: "author-brian", name: "Brian Lee", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=64&h=64&fit=crop&crop=faces" },
          time: "6h",
          text: "The staff really knows their coffee",
          reactions: { like: 3 },
        },
        {
          id: "reply-2-18",
          author: { id: "author-nicole", name: "Nicole Brown", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=64&h=64&fit=crop&crop=faces" },
          time: "4h",
          text: "Welcome to Portland! You'll love it here ✨",
          reactions: { like: 5 },
        },
      ],
      replyCount: 18,
    },
    {
      id: "comment-3",
      author: {
        id: "author-alex",
        name: "Alex Martinez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
      },
      time: "1 day",
      text: "Pro tip: most cafes here are busiest between 8-10am on weekdays. If you want a quiet spot to work, try going after 10:30 or in the early afternoon!",
      reactions: { like: 15 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-4",
      author: {
        id: "author-amanda",
        name: "Amanda Foster",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces",
      },
      time: "1 day",
      text: "Don't forget to check out the local roasters! Portland has some amazing small-batch coffee that you won't find anywhere else.",
      reactions: { like: 11 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-5",
      author: {
        id: "author-ben",
        name: "Ben Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
      },
      time: "20h",
      text: "Tandem Coffee Roasters! It's a bit out of the way but totally worth the trip. Their pastries are incredible too.",
      reactions: { like: 9 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-6",
      author: {
        id: "author-claire",
        name: "Claire Wong",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces",
      },
      time: "18h",
      text: "Definitely check out Speckled Ax! Great atmosphere and they have locations on Congress St and in the East End.",
      reactions: { like: 14 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-7",
      author: {
        id: "author-derek",
        name: "Derek Sullivan",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces",
      },
      time: "16h",
      text: "If you're into specialty coffee, Yordprom Coffee is a hidden gem. Small but amazing quality!",
      reactions: { like: 7 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-8",
      author: {
        id: "author-elena",
        name: "Elena Petrov",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces",
      },
      time: "15h",
      text: "Arabica has great wifi and is perfect for remote work. They have a quiet upstairs area too.",
      reactions: { like: 10 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-9",
      author: {
        id: "author-frank",
        name: "Frank Miller",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
      },
      time: "14h",
      text: "Rise and Shine Cafe on Munjoy Hill - amazing breakfast sandwiches and good coffee!",
      reactions: { like: 6 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-10",
      author: {
        id: "author-grace",
        name: "Grace Liu",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces",
      },
      time: "12h",
      text: "Rosemont Market has surprisingly great coffee and you can grab groceries while you're there!",
      reactions: { like: 5 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-11",
      author: {
        id: "author-henry",
        name: "Henry O'Connor",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces",
      },
      time: "11h",
      text: "Forage Market is excellent - they have a beautiful space and serve Coffee by Design.",
      reactions: { like: 8 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-12",
      author: {
        id: "author-iris",
        name: "Iris Campbell",
        avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=64&h=64&fit=crop&crop=faces",
      },
      time: "10h",
      text: "For something different, try Holy Donut - amazing donuts and decent coffee. Cash only though!",
      reactions: { like: 12 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-13",
      author: {
        id: "author-jake",
        name: "Jake Patterson",
        avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=64&h=64&fit=crop&crop=faces",
      },
      time: "9h",
      text: "Locally Sauced is underrated! Great food and coffee, plus outdoor seating in the summer.",
      reactions: { like: 4 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-14",
      author: {
        id: "author-kate",
        name: "Kate Anderson",
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=64&h=64&fit=crop&crop=faces",
      },
      time: "8h",
      text: "Highroller Lobster Co. has great coffee surprisingly! And you can have lobster for lunch 🦞",
      reactions: { like: 7 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-15",
      author: {
        id: "author-liam",
        name: "Liam Roberts",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=faces",
      },
      time: "7h",
      text: "Woodland Farms Brewery has great coffee in the mornings and transitions to beer later - best of both worlds!",
      reactions: { like: 9 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-16",
      author: {
        id: "author-maya",
        name: "Maya Singh",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces",
      },
      time: "6h",
      text: "Piccolo on Middle Street is tiny but mighty. Some of the best espresso I've had outside of Italy!",
      reactions: { like: 11 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-17",
      author: {
        id: "author-nathan",
        name: "Nathan Brooks",
        avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=64&h=64&fit=crop&crop=faces",
      },
      time: "5h",
      text: "The Portland Public Market has several great coffee options and it's a fun place to explore!",
      reactions: { like: 6 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-18",
      author: {
        id: "author-olivia",
        name: "Olivia Hayes",
        avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=64&h=64&fit=crop&crop=faces",
      },
      time: "4h",
      text: "Slab on Commercial Street has amazing pizza AND good coffee. Great lunch spot!",
      reactions: { like: 5 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-19",
      author: {
        id: "author-peter",
        name: "Peter Chang",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
      },
      time: "3h",
      text: "Stonewall Kitchen Cafe in the Old Port - beautiful space and they serve excellent coffee.",
      reactions: { like: 8 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-20",
      author: {
        id: "author-rachel2",
        name: "Rachel Bennett",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
      },
      time: "2h",
      text: "Aurora Provisions in the West End is lovely - great pastries and coffee in a cute neighborhood spot.",
      reactions: { like: 7 },
      replies: [],
      replyCount: 0,
    },
    {
      id: "comment-21",
      author: {
        id: "author-emily", // Same as post author
        name: "Emily Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
      },
      time: "1h",
      text: "Thank you all so much for the amazing recommendations! Can't wait to check these places out 🙏 ☕",
      reactions: {
        like: 8,
      },
      replies: [],
      replyCount: 0,
    },
  ],
};

// Source post data mapping - generates post data for source posts
// Each source has different groups and authors to differentiate from main page
const sourcePostsMap = {
  "source-1": {
    title: "Which coffee shop should I visit in Portland, Maine?",
    quote: "Coveside, Proper Cup, Yordprom, Uncharted, Coffee by Design on Diamond St",
    authorName: "Jake Patterson",
    authorAvatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Coffee Lovers",
    groupAvatar: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop",
    postAuthorName: "Sophie Turner",
    postAuthorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=faces",
  },
  "source-2": {
    title: "Are there any hidden gem coffee shops in Portland?",
    quote: "LB Kitchen!",
    authorName: "Amanda Foster",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Coffee Lovers",
    groupAvatar: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop",
    postAuthorName: "Marcus Johnson",
    postAuthorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=faces",
  },
  "source-3": {
    title: "Which coffee shops in Portland offer vegan options?",
    quote: "Coffee Me Up, Commercial Street",
    authorName: "Claire Wong",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces",
    groupName: "Vegan Portland Maine",
    groupAvatar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop",
    postAuthorName: "Olivia Hayes",
    postAuthorAvatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=faces",
  },
  "source-4": {
    title: "Best coworking spaces with day passes in Portland?",
    quote: "Cloudport is great. Can get day passes for desks or rent a small conference room.",
    authorName: "Derek Sullivan",
    authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Remote Workers",
    groupAvatar: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop",
    postAuthorName: "Nathan Brooks",
    postAuthorAvatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=80&h=80&fit=crop&crop=faces",
  },
  "source-5": {
    title: "Women-friendly coworking spaces in Portland, Maine?",
    quote: "CoworkHERS is amazing!!!",
    authorName: "Grace Liu",
    authorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces",
    groupName: "Women in Portland Business",
    groupAvatar: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=80&h=80&fit=crop",
    postAuthorName: "Kate Anderson",
    postAuthorAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=faces",
  },
  "source-6": {
    title: "Where do you work remotely in Portland, Maine?",
    quote: "Cloudport is great. Can get day passes for desks or rent a small conference room.",
    authorName: "Henry O'Connor",
    authorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Remote Workers",
    groupAvatar: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop",
    postAuthorName: "Ryan Cooper",
    postAuthorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces",
  },
  "source-7": {
    title: "Coffee shops with good WiFi for remote work in Portland?",
    quote: "Rigby Yard has a million tables and cozy corners to camp out in during the day and great coffee",
    authorName: "Iris Campbell",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Digital Nomads",
    groupAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop",
    postAuthorName: "Liam Roberts",
    postAuthorAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=faces",
  },
  "source-8": {
    title: "Breweries that are work-friendly in Portland, Maine?",
    quote: "Rising Tide Brewing has free WiFi, good food, and non-alcoholic options.",
    authorName: "Ben Thompson",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Beer & Breweries",
    groupAvatar: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=80&h=80&fit=crop",
    postAuthorName: "Peter Chang",
    postAuthorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces",
  },
  "source-9": {
    title: "Affordable office rentals in Portland, Maine?",
    quote: "Working Well: Co-Work Spaces for Wellness Professionals is a community-minded cooperative space in South Portland, Maine.",
    authorName: "Maya Singh",
    authorAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Small Business Network",
    groupAvatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop",
    postAuthorName: "Jennifer White",
    postAuthorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=faces",
  },
  "source-10": {
    title: "Office space sublets available now in Portland?",
    quote: "A room is available for sublet at Baby Booty on Forest Ave for $400.",
    authorName: "Frank Miller",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Real Estate & Rentals",
    groupAvatar: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=80&fit=crop",
    postAuthorName: "Steve Johnson",
    postAuthorAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=faces",
  },
  "source-11": {
    title: "Best seafood restaurants in Portland, Maine?",
    quote: "Fore Street is fabulous!!!",
    authorName: "Elena Petrov",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Foodies",
    groupAvatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop",
    postAuthorName: "Rachel Bennett",
    postAuthorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
  },
  "source-12": {
    title: "Date night restaurants in downtown Portland?",
    quote: "Scales served the best meal I've ever had and the service was untouchable.",
    authorName: "Amy Zhang",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=64&h=64&fit=crop&crop=faces",
    groupName: "Portland Date Night Ideas",
    groupAvatar: "https://images.unsplash.com/photo-1529543544277-065d914f5a0b?w=80&h=80&fit=crop",
    postAuthorName: "Chris Taylor",
    postAuthorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
  },
  "source-13": {
    title: "Where to get amazing lobster in Maine?",
    quote: "Street & Co. ... their lobster over linguine was absolutely incredible!",
    authorName: "Olivia Hayes",
    authorAvatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=64&h=64&fit=crop&crop=faces",
    groupName: "Maine Lobster Lovers",
    groupAvatar: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=80&h=80&fit=crop",
    postAuthorName: "Brian Lee",
    postAuthorAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=faces",
  },
};

// Additional comments for variety - expanded pool
const additionalComments = [
  { name: "Coffee Enthusiast", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces", text: "I second this! The pour-over here is incredible. They use single-origin beans from Ethiopia ☕", likes: 12 },
  { name: "Portland Native", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces", text: "Been going here for years. The baristas really know their stuff and the wifi is super reliable for remote work.", likes: 8 },
  { name: "Remote Worker", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces", text: "Perfect spot for getting work done! Plenty of outlets and the background noise level is just right.", likes: 15 },
  { name: "Foodie Mom", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces", text: "The pastries are amazing too - try the almond croissant! 🥐", likes: 9 },
  { name: "Espresso Lover", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces", text: "Best cortado in Portland, hands down. They dial in their espresso perfectly every time.", likes: 18 },
  { name: "Weekend Explorer", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces", text: "Love the vibe here! Great for a weekend morning with a book 📚", likes: 11 },
  { name: "Cafe Hopper", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces", text: "One of my top 3 cafes in the city. The cold brew is smooth and not too acidic.", likes: 14 },
  { name: "New to Portland", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces", text: "Just moved here and this was my first stop. Did not disappoint! 🙌", likes: 7 },
  { name: "Local Artist", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=64&h=64&fit=crop&crop=faces", text: "Great natural lighting and a chill atmosphere. Perfect for sketching and people watching.", likes: 10 },
  { name: "Morning Person", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=64&h=64&fit=crop&crop=faces", text: "Their breakfast sandwich + coffee combo is my go-to before work ☀️", likes: 13 },
  { name: "Tea Convert", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=64&h=64&fit=crop&crop=faces", text: "I was a tea person until I tried their house blend. Now I'm hooked!", likes: 6 },
  { name: "Digital Nomad", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces", text: "I've worked from cafes all over the world - this one ranks in my top 10 globally. The wifi speed is incredible.", likes: 22 },
  { name: "Local Foodie", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces", text: "They source from local farms too! Love supporting places that care about the community.", likes: 16 },
  { name: "Early Bird", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=faces", text: "Pro tip: come before 7am and you'll have the whole place to yourself 🌅", likes: 19 },
  { name: "Coffee Snob", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=64&h=64&fit=crop&crop=faces", text: "Finally, a place that understands proper extraction times. The espresso is perfectly balanced.", likes: 11 },
  { name: "Weekend Warrior", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=64&h=64&fit=crop&crop=faces", text: "This is my Saturday ritual spot. Nothing beats their weekend brunch specials!", likes: 14 },
  { name: "Startup Founder", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces", text: "Had so many productive meetings here. The atmosphere is perfect for brainstorming sessions.", likes: 9 },
  { name: "Book Lover", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces", text: "The cozy corners are perfect for reading. Finished three books here last month! 📖", likes: 8 },
  { name: "Music Fan", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces", text: "Love their playlist - it's the perfect background for working without being distracting.", likes: 7 },
  { name: "Healthy Eater", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces", text: "They have great dairy-free options! The oat milk here is actually good quality.", likes: 12 },
];

// Topic-specific additional comments
const topicComments = {
  turkey: [
    { name: "Home Cook", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces", text: "The brining method changed everything for me! So much more juicy now.", likes: 28 },
    { name: "Thanksgiving Pro", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces", text: "Don't forget to let the turkey rest for at least 30 minutes before carving! The juices need to redistribute.", likes: 35 },
    { name: "Chef Marco", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=faces", text: "I always start at high temp (450°F) for 30 min then drop to 325°F. Golden skin every time! 🦃", likes: 42 },
    { name: "Southern Cook", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces", text: "Butter under the skin with rosemary and thyme is the secret! Been doing it for 20 years.", likes: 31 },
    { name: "Holiday Host", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces", text: "Make sure you have a meat thermometer - 165°F is your target temp!", likes: 29 },
    { name: "Family Chef", avatar: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=64&h=64&fit=crop&crop=faces", text: "My grandmother's tip: baste every 45 minutes with pan drippings. Works every time!", likes: 26 },
    { name: "Thanksgiving Newbie", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces", text: "This is so helpful! First time cooking turkey this year. Saved this post! 🙏", likes: 18 },
    { name: "Foodie Dad", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces", text: "Pro tip: dry brine the night before. Just salt and leave uncovered in the fridge overnight.", likes: 33 },
    { name: "Holiday Baker", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces", text: "Don't stuff the turkey - cook dressing separately for food safety and crispier skin.", likes: 24 },
  ],
  nfl: [
    { name: "NFL Fan", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces", text: "YouTube TV is honestly the best option if you want everything. Pricey but worth it!", likes: 45 },
    { name: "Cord Cutter", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces", text: "Dofu Sports app works great and it's free! Just search for the game you want. 🏈", likes: 38 },
    { name: "Sports Streamer", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces", text: "Sportsurge has multiple links for each game. If one doesn't work, try another!", likes: 32 },
    { name: "Fantasy Player", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces", text: "NFL+ is only $7/month and works great on mobile. Perfect for watching while out.", likes: 29 },
    { name: "Sunday Ticket", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=faces", text: "Sunday Ticket on YouTube is expensive but if you're out of market it's the only legal way.", likes: 22 },
    { name: "VPN User", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces", text: "VPN + international streaming is the move. Games are often free in other countries!", likes: 35 },
    { name: "Bar Regular", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=64&h=64&fit=crop&crop=faces", text: "Honestly just find a good sports bar. Way more fun watching with other fans! 🍺", likes: 28 },
    { name: "Tech Savvy", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=64&h=64&fit=crop&crop=faces", text: "Use an adblocker with any free streaming site. Makes the experience so much better.", likes: 41 },
    { name: "Cheap Fan", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=64&h=64&fit=crop&crop=faces", text: "Pluto TV and Tubi have some games for free! Check the schedule.", likes: 19 },
  ],
  pinecone: [
    { name: "DIY Queen", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces", text: "The vase + candle idea is SO simple but looks amazing! Doing this for Thanksgiving 🕯️", likes: 67 },
    { name: "Crafty Mom", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces", text: "Pro tip: bake pinecones at 200°F for 30 mins first! Kills any bugs and opens them up nicely.", likes: 89 },
    { name: "Fall Lover", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces", text: "I spray painted some gold and silver - the contrast with natural ones is beautiful! ✨", likes: 54 },
    { name: "Nature Crafter", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces", text: "Made a garland using twine and hot glue. Draped it down my table with eucalyptus - so pretty!", likes: 72 },
    { name: "Rustic Decor Fan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces", text: "Fill a wooden crate with pinecones, mini pumpkins, and cinnamon sticks. Smells amazing! 🎃", likes: 48 },
    { name: "Budget Decorator", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces", text: "Dollar store candles + free pinecones from outside = gorgeous centerpiece for under $5!", likes: 95 },
    { name: "Seasonal Crafter", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces", text: "Add fairy lights inside a glass jar with pinecones. Magical evening glow! ✨", likes: 61 },
    { name: "Thanksgiving Host", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=64&h=64&fit=crop&crop=faces", text: "Layer: wooden board, burlap runner, pinecones, candles. Rustic and elegant!", likes: 43 },
    { name: "Pinterest Crafter", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=64&h=64&fit=crop&crop=faces", text: "Mason jars with pinecones are my go-to! Made 6 for my whole table for under $10 total.", likes: 56 },
  ],
  strangerthings: [
    { name: "Hawkins Fan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces", text: "Volume 1 dropped Nov 26, Vol 2 Christmas, finale New Year's Eve! Perfect end to 2025! 🙌", likes: 234 },
    { name: "Binge Watcher", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces", text: "Just finished Vol 1 and I'm SHOOK. Not spoiling anything but... prepare yourselves 😭", likes: 187 },
    { name: "Series Veteran", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces", text: "Planning to rewatch all 4 seasons before the finale! Starting my marathon this weekend 📺", likes: 156 },
    { name: "Theory Crafter", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces", text: "I think Eleven will sacrifice herself to close the Upside Down forever. Classic Duffers move 😢", likes: 98 },
    { name: "Will Stan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces", text: "Will is FINALLY getting his moment! His connection to the Upside Down has to mean something big!", likes: 145 },
    { name: "Steve Defender", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces", text: "If they kill Steve I'm literally rioting. He better survive! 🪧", likes: 289 },
    { name: "Patience Tester", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces", text: "The wait between Vol 2 and finale is only 6 days. Remember waiting 3 YEARS between seasons?", likes: 112 },
    { name: "Time Travel Theory", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces", text: "Hot take: Time travel is involved. The Upside Down being stuck in 1983 HAS to mean something!", likes: 87 },
    { name: "OG Fan", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces", text: "Been here since S1 dropped in 2016. Can't believe it's ending. End of an era 🥺", likes: 201 },
  ],
};

// Group info for different topics - with multiple groups per topic
const topicSourceGroups = {
  coffee: [
    { name: "Portland Coffee Lovers", avatar: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop" },
    { name: "Maine Cafe Society", avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=80&h=80&fit=crop" },
    { name: "East End Coffee Club", avatar: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop" },
    { name: "Portland Remote Workers", avatar: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=80&h=80&fit=crop" },
    { name: "Old Port Foodies", avatar: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=80&h=80&fit=crop" },
    { name: "Munjoy Hill Neighbors", avatar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=80&h=80&fit=crop" },
    { name: "Portland Freelancers", avatar: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=80&h=80&fit=crop" },
    { name: "Maine Espresso Enthusiasts", avatar: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=80&h=80&fit=crop" },
  ],
  turkey: [
    { name: "Home Cooking Enthusiasts", avatar: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=80&h=80&fit=crop" },
    { name: "Thanksgiving Recipes", avatar: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=80&h=80&fit=crop" },
    { name: "Holiday Feast Ideas", avatar: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop" },
    { name: "Family Dinner Club", avatar: "https://images.unsplash.com/photo-1547592180-85f173990554?w=80&h=80&fit=crop" },
    { name: "Southern Cooking Tips", avatar: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=80&h=80&fit=crop" },
    { name: "Roasting Perfection", avatar: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=80&h=80&fit=crop" },
  ],
  nfl: [
    { name: "NFL Fans & Fantasy", avatar: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=80&h=80&fit=crop" },
    { name: "Cord Cutters Club", avatar: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&h=80&fit=crop" },
    { name: "Sports Streaming Tips", avatar: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=80&h=80&fit=crop" },
    { name: "Sunday Ticket Fans", avatar: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=80&h=80&fit=crop" },
    { name: "Fantasy Football League", avatar: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=80&h=80&fit=crop" },
    { name: "Game Day Group", avatar: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=80&h=80&fit=crop" },
  ],
  pinecone: [
    { name: "DIY Home Decor Ideas", avatar: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=80&h=80&fit=crop" },
    { name: "Fall Crafts & Decor", avatar: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=80&h=80&fit=crop" },
    { name: "Rustic Decorating", avatar: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=80&h=80&fit=crop" },
    { name: "Thanksgiving Tablescape", avatar: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=80&h=80&fit=crop" },
    { name: "Nature Crafts Club", avatar: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=80&h=80&fit=crop" },
    { name: "Holiday Centerpieces", avatar: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=80&h=80&fit=crop" },
  ],
  strangerthings: [
    { name: "Stranger Things Fans", avatar: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=80&h=80&fit=crop" },
    { name: "Hawkins Residents", avatar: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=80&h=80&fit=crop" },
    { name: "Upside Down Theories", avatar: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=80&h=80&fit=crop" },
    { name: "Netflix Bingers", avatar: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=80&h=80&fit=crop" },
    { name: "80s Nostalgia Club", avatar: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=80&h=80&fit=crop" },
    { name: "Season 5 Countdown", avatar: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=80&h=80&fit=crop" },
  ],
};

// Unique member names and avatars for comments
const uniqueMembers = [
  { name: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces" },
  { name: "James Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" },
  { name: "Emily Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces" },
  { name: "Michael Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces" },
  { name: "Jessica Taylor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" },
  { name: "David Park", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces" },
  { name: "Amanda Foster", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces" },
  { name: "Ryan Cooper", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces" },
  { name: "Sophie Turner", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces" },
  { name: "Daniel Lee", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces" },
  { name: "Olivia Martinez", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces" },
  { name: "Chris Anderson", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=64&h=64&fit=crop&crop=faces" },
  { name: "Rachel Kim", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces" },
  { name: "Kevin O'Brien", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces" },
  { name: "Lisa Wang", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces" },
  { name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=faces" },
  { name: "Nicole Davis", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=64&h=64&fit=crop&crop=faces" },
  { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=64&h=64&fit=crop&crop=faces" },
  { name: "Hannah Scott", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=64&h=64&fit=crop&crop=faces" },
  { name: "Brian Thompson", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=faces" },
  { name: "Megan Clark", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=64&h=64&fit=crop&crop=faces" },
  { name: "Tyler Harris", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=64&h=64&fit=crop&crop=faces" },
  { name: "Ashley Moore", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=64&h=64&fit=crop&crop=faces" },
  { name: "Jason Wright", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces" },
];

// Post authors for source pages
const postAuthors = [
  { name: "Emma Rodriguez", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=faces" },
  { name: "Nathan Brooks", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=faces" },
  { name: "Sophia Chen", avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=80&h=80&fit=crop&crop=faces" },
  { name: "Jake Patterson", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=faces" },
  { name: "Maria Santos", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=faces" },
  { name: "Connor Murphy", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces" },
  { name: "Lily Thompson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces" },
  { name: "Ethan Williams", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces" },
];

// Legacy topicGroups for backwards compatibility
const topicGroups = {
  turkey: { name: "Home Cooking Enthusiasts", avatar: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=80&h=80&fit=crop" },
  nfl: { name: "NFL Fans & Fantasy Football", avatar: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=80&h=80&fit=crop" },
  pinecone: { name: "DIY Home Decor Ideas", avatar: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=80&h=80&fit=crop" },
  strangerthings: { name: "Stranger Things Fans", avatar: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=80&h=80&fit=crop" },
};

export function getSourcePostData(postId) {
  // Check if it's a topic-based source (e.g., source-turkey-0-1)
  const topicMatch = postId.match(/^source-(\w+)-(\d+)-(\d+)$/);
  
  if (topicMatch) {
    const [, topic, qaIndex, bulletIndex] = topicMatch;
    const qaIdx = parseInt(qaIndex);
    const bulletIdx = parseInt(bulletIndex);
    
    // Get group based on bullet index to match RelatedAnswers.js calculation
    // RelatedAnswers uses idx % groups.length where idx is the bullet index within each QA
    const groups = topicSourceGroups[topic] || topicSourceGroups.coffee;
    const groupInfo = groups[bulletIdx % groups.length];
    
    // sourceIndex is still used for unique author selection
    const sourceIndex = qaIdx * 4 + bulletIdx;
    
    // Get unique post author
    const authorIdx = (sourceIndex + 3) % postAuthors.length;
    const postAuthor = postAuthors[authorIdx];
    
    // Get unique members for comments, offset by source index for variety
    const memberOffset = sourceIndex * 5;
    const getUniqueMember = (idx) => {
      const memberIdx = (memberOffset + idx) % uniqueMembers.length;
      return uniqueMembers[memberIdx];
    };
    
    const comments = topicComments[topic] || additionalComments;
    const times = ["4h", "3h", "2h", "1h", "45m", "30m", "20m", "15m", "10m"];
    
    // Member counts vary by group
    const memberCounts = ["12.4K members", "8.7K members", "24.5K members", "15.2K members", "31.8K members", "6.3K members"];
    
    // Use the same fake names pattern as RelatedAnswers.js for consistency
    const fakeNames = ['Sarah', 'Mike', 'Emma', 'James', 'Olivia', 'Noah', 'Ava', 'Liam'];
    
    // Generate topic-specific post body descriptions
    const topicDescriptions = {
      coffee: "I'm looking for great coffee shops and cafes in the area. Would love recommendations for places with good atmosphere, quality coffee, and maybe wifi for remote work!",
      turkey: "Getting ready for Thanksgiving and need some help with cooking the turkey. Any tips on timing, temperature, or keeping it moist would be greatly appreciated!",
      nfl: "Trying to find the best way to watch NFL games this season. Looking for streaming options, apps, or services that work well. What do you all use?",
      pinecone: "I've collected a bunch of pinecones and want to make some beautiful decorations for the holidays. Looking for creative DIY ideas and inspiration!",
      strangerthings: "With the final season of Stranger Things coming out, I'm so curious about what's going to happen! What are your thoughts and theories about how it will all end?",
    };
    
    return {
      group: {
        id: `group-${topic}-${bulletIdx}`,
        name: groupInfo.name,
        avatar: groupInfo.avatar,
        memberCount: memberCounts[bulletIdx % memberCounts.length],
        isPublic: true,
      },
      post: {
        id: postId,
        title: `Question about ${topic.replace(/([A-Z])/g, ' $1').trim()}`,
        aiGenerated: true,
        body: topicDescriptions[topic] || `Looking for advice and recommendations about this topic. Would love to hear your experiences and tips!`,
        reactions: { like: 18 + (sourceIndex * 7) % 30, love: 5 + sourceIndex % 10, total: 23 + (sourceIndex * 7) % 30 },
        commentsCount: 10 + (sourceIndex * 3) % 15,
        author: {
          id: `author-${postId}`,
          name: postAuthor.name,
          avatar: postAuthor.avatar,
          date: "Dec " + (5 + sourceIndex % 5),
          privacy: "public",
        },
      },
      comments: comments.slice(0, 10).map((comment, idx) => {
        // For the first comment (idx=0), use the fake name and group avatar that matches RelatedAnswers card
        // For other comments, use unique members for variety
        if (idx === 0) {
          return {
            id: `comment-${idx + 1}`,
            author: {
              id: `author-${sourceIndex}-${idx}`,
              name: fakeNames[bulletIdx % fakeNames.length],
              avatar: groupInfo.avatar,
            },
            time: times[idx] || `${idx}h`,
            text: comment.text,
            reactions: { like: 20 + bulletIdx * 11 },
            replies: [],
            replyCount: 0,
          };
        }
        const member = getUniqueMember(idx);
        return {
          id: `comment-${idx + 1}`,
          author: {
            id: `author-${sourceIndex}-${idx}`,
            name: member.name,
            avatar: member.avatar,
          },
          time: times[idx] || `${idx}h`,
          text: comment.text,
          reactions: { like: comment.likes || 10 + idx },
          replies: [],
          replyCount: 0,
        };
      }),
    };
  }
  
  // Original coffee-based source handling
  const sourceData = sourcePostsMap[postId];
  
  if (!sourceData) {
    return groupPostData; // Fallback to default
  }

  // Get a consistent set of follow-up comments based on postId
  const sourceNum = parseInt(postId.replace('source-', ''));
  const startIndex = (sourceNum * 3) % additionalComments.length;
  
  // Get 9 unique comments by rotating through the array
  const getComment = (offset) => {
    const idx = (startIndex + offset) % additionalComments.length;
    return additionalComments[idx];
  };

  const times = ["4h", "3h", "2h", "1h", "45m", "30m", "20m", "15m", "10m", "5m"];

  return {
    group: {
      id: `group-${postId}`,
      name: sourceData.groupName || "Portland Community",
      avatar: sourceData.groupAvatar || "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=80&h=80&fit=crop",
      memberCount: "12.8K members",
      isPublic: true,
    },
    post: {
      ...groupPostData.post,
      id: postId,
      title: sourceData.title,
      body: `Hey everyone! I'm looking for some local recommendations. ${sourceData.title} Would love to hear your thoughts and experiences. Thanks in advance! 🙏`,
      author: {
        id: `author-${postId}`,
        name: sourceData.postAuthorName || "Community Member",
        avatar: sourceData.postAuthorAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces",
        date: "Dec 5",
        privacy: "public",
      },
      commentsCount: 10,
    },
    comments: [
      // First comment is always the source quote
      {
        id: "source-comment-1",
        author: {
          id: `author-${sourceData.authorName.replace(' ', '-').toLowerCase()}`,
          name: sourceData.authorName,
          avatar: sourceData.authorAvatar,
        },
        time: "4h",
        text: sourceData.quote,
        reactions: { like: 24 },
        replies: [],
        replyCount: 0,
      },
      // Additional comments from the pool
      ...Array.from({ length: 9 }, (_, i) => {
        const comment = getComment(i);
        return {
          id: `source-comment-${i + 2}`,
          author: {
            id: `author-followup-${i + 1}`,
            name: comment.name,
            avatar: comment.avatar,
          },
          time: times[i + 1] || `${5 + i}m`,
          text: comment.text,
          reactions: { like: comment.likes },
          replies: [],
          replyCount: 0,
        };
      }),
    ],
  };
}

export default groupPostData;

