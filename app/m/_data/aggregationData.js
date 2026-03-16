// Aggregation data for cross-Facebook content exploration
// Supports three experience types: AI-Forward, Balanced, and Content-Forward

export const strangerThingsAggregation = {
  id: "stranger-things-finale",
  topic: "Stranger Things finale predictions",
  socialProof: { 
    count: "32.1K", 
    label: "people talking about this" 
  },

  // ============================================
  // AI-FORWARD EXPERIENCE DATA (V2 - matches Figma)
  // ============================================
  // Intro text shown at the top
  aiIntroSummary: "With the final season approaching, Stranger Things fans across Facebook are sharing their boldest predictions. From heartbreaking character deaths to theories about destroying the Upside Down forever, here's what the community expects from the epic conclusion.",

  // V2 format with bulleted lists (matches Figma design)
  aiSectionsV2: [
    {
      id: "character-fates",
      title: "Character death predictions",
      bullets: [
        {
          label: "Steve Harrington: ",
          text: "Fans widely expect Steve to sacrifice himself, completing his arc from bully to beloved protector. ",
          blueQuote: "\"If Steve doesn't die saving the kids, the Duffers wasted his entire redemption arc.\""
        },
        {
          label: "Will Byers: ",
          text: "Many believe Will must die to sever the connection to the Upside Down permanently—his journey started this, and his sacrifice would bring it full circle."
        },
        {
          label: "Eleven: ",
          text: "A vocal minority predicts El will lose her powers forever, living as a normal teenager. Others expect a heroic death alongside Vecna."
        }
      ],
      sources: [
        {
          id: "src-1",
          quote: "Steve has spent four seasons protecting kids who aren't even his. If anyone's earned a heroic death, it's him. I'll cry but I'll respect it 😭",
          author: { name: "Emily Martinez", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1247,
          comments: 89
        },
        {
          id: "src-2",
          placeholder: true,
          author: { name: "ST Theories", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
          reactions: 892,
          comments: 156
        },
        {
          id: "src-3",
          image: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
          author: { name: "TheoryNerd", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 2341,
          comments: 203
        },
        {
          id: "src-1b",
          quote: "Will's been through too much already. The writers CANNOT kill him off after everything. But I also wouldn't put it past them 😭",
          author: { name: "Byers Fan Club", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 734,
          comments: 112
        },
        {
          id: "src-1c",
          quote: "Eleven dying would be poetic but also devastating. She deserves a happy ending with Mike and Hopper. Let her be normal for once!",
          author: { name: "El Deserves Better", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1089,
          comments: 187
        }
      ]
    },
    {
      id: "upside-down",
      title: "How the Upside Down gets destroyed",
      bullets: [
        {
          label: "Time loop theory: ",
          text: "The Upside Down being frozen in 1983 isn't random—fans theorize the kids must travel back in time to prevent Henry Creel from ever opening the gate. ",
          blueQuote: "\"The finale will involve going back to that moment.\""
        },
        {
          label: "El vs Vecna: ",
          text: "The prevailing theory is Eleven must confront One/Vecna in a psychic battle, potentially trapping both of them in the Upside Down forever."
        },
        {
          label: "Nuclear option: ",
          text: "Some fans believe Hawkins Lab's experiments created a weak point that could implode the dimension entirely—at the cost of destroying Hawkins."
        }
      ],
      sources: [
        {
          id: "src-4",
          quote: "Think about it—the Upside Down is stuck in 1983 because that's when everything started. The finale will involve going back to that moment.",
          author: { name: "Marcus Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
          reactions: 678,
          comments: 94
        },
        {
          id: "src-5",
          quote: "El and Henry are two sides of the same coin. Their final battle will determine whether the gate stays open forever or closes for good.",
          author: { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 543,
          comments: 67
        },
        {
          id: "src-4b",
          placeholder: true,
          author: { name: "Hawkins Lab Docs", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
          reactions: 456,
          comments: 78
        },
        {
          id: "src-4c",
          quote: "What if destroying the Upside Down means destroying Hawkins too? The town is basically built on a hellmouth at this point 💀",
          author: { name: "Real Estate Agent", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 892,
          comments: 134
        },
        {
          id: "src-4d",
          image: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
          author: { name: "UpsideDown Expert", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1234,
          comments: 189
        }
      ]
    },
    {
      id: "ending-theories",
      title: "How fans think it'll end",
      bullets: [
        {
          label: "Bittersweet conclusion: ",
          text: "Most fans expect a \"Lord of the Rings\" style ending—victory against Vecna, but at tremendous cost. ",
          blueQuote: "\"Bring tissues and don't make plans after.\""
        },
        {
          label: "The party splits up: ",
          text: "Many predict the surviving friends will scatter after graduation, each haunted by shared trauma but unable to stay in Hawkins."
        },
        {
          label: "Full circle: ",
          text: "Popular theory: the finale mirrors S1E1, with a new D&D game representing how the friends process their trauma through storytelling."
        }
      ],
      sources: [
        {
          id: "src-6",
          quote: "The Duffers said the ending would be satisfying but emotional. I'm reading that as 'bring tissues and don't make plans after.'",
          author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1567,
          comments: 234
        },
        {
          id: "src-7",
          placeholder: true,
          author: { name: "NetflixFan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          reactions: 892,
          comments: 78
        },
        {
          id: "src-6b",
          quote: "I think the Party will scatter after graduation but reunite years later for a D&D game where they retell their adventures. Full circle ending 🎲",
          author: { name: "D&D Forever", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
          reactions: 723,
          comments: 98
        },
        {
          id: "src-6c",
          quote: "The show started with a game, it should end with one. But this time they're playing to remember, not escape. I'm already crying 😭",
          author: { name: "Emotional Wreck", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1102,
          comments: 167
        },
        {
          id: "src-6d",
          image: "/images/stranger-things-assets/images/profile/rio-theatre-post.jpg",
          author: { name: "Final Season Hype", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 2045,
          comments: 312
        }
      ]
    }
  ],

  // Related topics (for Related topics section)
  relatedTopics: [
    "Stranger Things watch party ideas",
    "Stranger Things finale viewing events near me",
    "Best Stranger Things theories Reddit"
  ],

  // Legacy AI sections for backward compatibility
  aiSections: [
    {
      id: "theories",
      title: "Popular Finale Theories",
      summary: "Many people in fan communities recommend focusing on Will's connection to the Upside Down, saying it's essential for understanding how the finale will resolve the main conflict.",
      expandedText: "Many believe Eleven's powers alone won't be enough to defeat Vecna, and that Will's deep connection to the Upside Down will be the key to victory. Some theorize the show will come full circle, with the original party members each playing crucial roles in the final battle.",
      sources: [
        { 
          id: "src-1",
          quote: "I think Will's connection to the Upside Down will be what ultimately saves Hawkins. He might have to sacrifice himself 😭",
          author: { name: "Emily Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Stranger Things Fans",
          reactions: 892,
          time: "2h"
        },
        {
          id: "src-2", 
          quote: "Hot take: Time travel is involved. The Upside Down being stuck in 1983 HAS to mean something!",
          author: { name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Hawkins Residents",
          reactions: 567,
          time: "4h"
        },
        {
          id: "src-3",
          quote: "The parallel with Eleven would be perfect - she opened the gate, but Will might be the one to close it forever.",
          author: { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Upside Down Theories",
          reactions: 445,
          time: "6h"
        }
      ]
    },
    {
      id: "eleven",
      title: "What Happens to Eleven?",
      summary: "Eleven's fate is the most debated topic among fans. While some believe she'll make the ultimate sacrifice to save her friends, others think her arc will end with her finally getting to live a normal life after years of trauma.",
      expandedText: "Her powers have consistently grown throughout the series, and Season 5 promises to push them to their limits. The connection between Eleven and Vecna (formerly Henry/001) suggests their final confrontation will be deeply personal.",
      sources: [
        {
          id: "src-4",
          quote: "Eleven has to make the ultimate sacrifice. I'm not ready for this emotionally 😭",
          author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Netflix Bingers",
          reactions: 623,
          time: "1h"
        },
        {
          id: "src-5",
          quote: "I think she'll survive but lose her powers permanently. It would be bittersweet but fitting.",
          author: { name: "Jordan Lee", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Stranger Things Fans",
          reactions: 389,
          time: "3h"
        }
      ]
    },
    {
      id: "upside-down",
      title: "Resolving the Upside Down",
      summary: "The Upside Down's origin and how it will be destroyed or sealed permanently remains a central mystery. Fans speculate that destroying Vecna alone won't be enough - the dimension itself needs to be addressed.",
      expandedText: "The Upside Down being frozen on November 6, 1983 (the day Will was taken) has led to theories about time manipulation being key to the resolution. Some believe the dimension is a corrupted version of our world that can be 'healed' rather than destroyed.",
      sources: [
        {
          id: "src-6",
          quote: "The Upside Down has merged with Hawkins and spread across the world. This is truly the endgame!",
          author: { name: "Chris Davis", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Upside Down Theories",
          reactions: 445,
          time: "5h"
        },
        {
          id: "src-7",
          quote: "If Eleven and Vecna die and the Upside Down is gone, maybe they go back to that day when Will was taken",
          author: { name: "Taylor Swift Fan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=faces" },
          groupName: "80s Nostalgia Club",
          reactions: 312,
          time: "8h"
        }
      ]
    },
    {
      id: "deaths",
      title: "Character Deaths & Sacrifices",
      summary: "With the finale approaching, fans are bracing for major character deaths. Steve, Hopper, and even Eleven are frequently mentioned as potential casualties, with many believing at least one beloved character won't survive.",
      expandedText: "The Duffer Brothers have hinted that the finale will be emotionally devastating. Eddie Munson's death in Season 4 set the tone for meaningful sacrifices, and fans expect similar gut-wrenching moments.",
      sources: [
        {
          id: "src-8",
          quote: "I'm convinced there's going to be a major death. My money is on Hopper going out like a hero.",
          author: { name: "Mike Stevens", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Stranger Things Fans",
          reactions: 534,
          time: "2h"
        },
        {
          id: "src-9",
          quote: "Steve's redemption arc from S1 bully to everyone's favorite babysitter is LEGENDARY 👑 Please don't kill him!",
          author: { name: "Nancy Wheeler Stan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Hawkins Residents",
          reactions: 423,
          time: "4h"
        }
      ]
    }
  ],

  // ============================================
  // BALANCED EXPERIENCE DATA  
  // ============================================
  aiIntro: {
    text: "From popular fan theories about Will's connection to the Upside Down to creative watch party ideas featuring Eggo waffles and 80s playlists, the Stranger Things community is buzzing with excitement for the finale.",
    highlights: [
      { text: "Will's connection", href: "#theories" },
      { text: "watch party ideas", href: "#party" }
    ]
  },
  
  // Reels about finale predictions/discussion
  reels: [
    {
      id: "reel-1",
      thumbnail: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
      title: "My Stranger Things finale theory 🔮",
      views: "2.1M",
      duration: "0:45",
      author: { name: "ST_Theories", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "reel-2",
      thumbnail: "/images/stranger-things-assets/images/profile/rio-theatre-post.jpg",
      title: "Who will die in S5? My predictions",
      views: "1.8M",
      duration: "1:02",
      author: { name: "HawkinsNews", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "reel-3",
      thumbnail: "/images/sabrina-carpenter-live.jpg",
      title: "Eleven vs Vecna - how it ends",
      views: "956K",
      duration: "0:58",
      author: { name: "UpsideDownFan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "reel-4",
      thumbnail: "/images/chappell-roan-live.jpg",
      title: "Will's powers EXPLAINED",
      views: "1.2M",
      duration: "1:15",
      author: { name: "ByersFamily", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "reel-5",
      thumbnail: "/images/millie/millie-1.jpg",
      title: "Time travel theory breakdown",
      views: "845K",
      duration: "1:30",
      author: { name: "80sNostalgia", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "reel-6",
      thumbnail: "/images/millie/millie-2.jpg",
      title: "The REAL meaning of the Upside Down",
      views: "1.5M",
      duration: "0:52",
      author: { name: "DufferDecoded", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=faces" }
    }
  ],

  // Reels about watch party planning
  partyReels: [
    {
      id: "party-reel-1",
      thumbnail: "/images/millie/millie-3.jpg",
      title: "Ultimate ST watch party setup 🎉",
      views: "567K",
      duration: "0:38",
      author: { name: "PartyPlanner", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "party-reel-2",
      thumbnail: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
      title: "Demogorgon cupcakes tutorial 🧁",
      views: "892K",
      duration: "1:05",
      author: { name: "NerdyBaker", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "party-reel-3",
      thumbnail: "/images/stranger-things-assets/images/profile/rio-theatre-post.jpg",
      title: "80s playlist for finale night 🎵",
      views: "423K",
      duration: "0:42",
      author: { name: "RetroVibes", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "party-reel-4",
      thumbnail: "/images/sabrina-carpenter-live.jpg",
      title: "Eggo waffle bar ideas 🧇",
      views: "1.1M",
      duration: "0:55",
      author: { name: "ElevenEats", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" }
    }
  ],

  // ============================================
  // CONTENT-FORWARD EXPERIENCE DATA
  // ============================================
  contentBuckets: [
    {
      id: "bucket-theories",
      category: "Finale prediction theories",
      icon: "🔮",
      discussions: [
        {
          id: "disc-1",
          question: "What are your theories for how Stranger Things will end?",
          answer: "Fans have many theories about how the series will conclude, ranging from time travel to major character sacrifices.",
          author: { name: "Jordan Lee", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Stranger Things Fans",
          groupAvatar: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=40&h=40&fit=crop",
          reactions: 892,
          comments: 156,
          time: "2h",
          snippets: [
            "I think Will's connection to the Upside Down will be what ultimately saves Hawkins. He might have to sacrifice himself 😭",
            "Hot take: Time travel is involved. The Upside Down being stuck in 1983 HAS to mean something!",
            "The parallel with Eleven would be perfect - she opened the gate, but Will might be the one to close it forever.",
            "I'm convinced there's going to be a major death. My money is on Hopper going out like a hero."
          ]
        },
        {
          id: "disc-2",
          question: "Has anyone stayed in Shinjuku with kids?",
          answer: "Several of us have stayed in Shinjuku and found it family-friendly for its convenience.",
          author: { name: "Sarah Kim", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Upside Down Theories",
          groupAvatar: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=40&h=40&fit=crop",
          reactions: 567,
          comments: 89,
          time: "4h",
          snippets: [
            "Vecna has survived — more powerful and vengeful than ever — and the rift between the real world and the Upside Down has torn open",
            "It's an emotional wrecking ball of a show. You go from heart-wrenching sadness to white-knuckle excitement.",
            "Secrets long buried will rise. Sacrifices must be made."
          ]
        }
      ]
    },
    {
      id: "bucket-party",
      category: "Plan a watch party",
      icon: "🎉",
      discussions: [
        {
          id: "disc-3",
          question: "What are the best Stranger Things watch party ideas?",
          answer: "Fans have shared creative ideas for hosting the perfect Stranger Things finale watch party.",
          author: { name: "Party Planner Pro", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Netflix Watch Parties",
          groupAvatar: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=40&h=40&fit=crop",
          reactions: 445,
          comments: 67,
          time: "6h",
          snippets: [
            "Eggo waffles are MANDATORY. I'm also making Demogorgon cupcakes! 🧇",
            "Setting up a projector in the backyard - going all out for this one!",
            "Christmas lights everywhere, 80s playlist before the show, and themed cocktails for the adults.",
            "We're doing a full rewatch marathon starting Dec 26th leading up to the finale on NYE!"
          ]
        }
      ],
      marketplace: [
        {
          id: "mp-1",
          title: "Stranger Things Party Decorations Kit",
          price: "$24.99",
          image: "/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg",
          location: "Ships nationwide",
          rating: 4.8
        },
        {
          id: "mp-2",
          title: "Upside Down String Lights",
          price: "$18.99",
          image: "/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg",
          location: "Ships nationwide",
          rating: 4.9
        },
        {
          id: "mp-3",
          title: "Eggo Waffle Maker - Retro Edition",
          price: "$34.99",
          originalPrice: "$44.99",
          image: "/images/stranger-things-assets/images/marketplace/lego.jpg",
          location: "Ships nationwide",
          rating: 4.7
        },
        {
          id: "mp-4",
          title: "Demogorgon Piñata",
          price: "$29.99",
          image: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg",
          location: "Ships nationwide",
          rating: 5.0
        }
      ],
      reels: [
        {
          id: "bucket-reel-1",
          thumbnail: "/images/chappell-roan-live.jpg",
          title: "Ultimate ST watch party setup",
          views: "567K"
        },
        {
          id: "bucket-reel-2",
          thumbnail: "/images/millie/millie-1.jpg",
          title: "Demogorgon cupcakes tutorial",
          views: "892K"
        }
      ]
    },
    {
      id: "bucket-events",
      category: "Find a viewing event",
      icon: "📍",
      discussions: [
        {
          id: "disc-4",
          question: "Anyone know of theaters showing the Stranger Things finale?",
          answer: "Several theaters and venues are hosting special viewing events for the finale.",
          author: { name: "Mike Stevens", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Los Angeles Events",
          groupAvatar: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=40&h=40&fit=crop",
          reactions: 234,
          comments: 45,
          time: "8h",
          snippets: [
            "The Rio Theatre in Vancouver is doing a big screen viewing! Tickets are $15",
            "AMC is showing it at select locations - check their Fandango page",
            "Our local brewery is hosting a watch party with themed drinks!"
          ]
        }
      ],
      events: [
        {
          id: "evt-1",
          title: "Stranger Things Finale Viewing Party",
          venue: "Rio Theatre",
          location: "Vancouver, BC",
          date: "Dec 31, 2025",
          time: "8:00 PM",
          price: "$15",
          image: "/images/sabrina-carpenter-live.jpg",
          attending: 234
        },
        {
          id: "evt-2",
          title: "NYE Stranger Things Marathon",
          venue: "Alamo Drafthouse",
          location: "Austin, TX",
          date: "Dec 31, 2025",
          time: "6:00 PM",
          price: "$25",
          image: "/images/chappell-roan-live.jpg",
          attending: 156
        },
        {
          id: "evt-3",
          title: "Upside Down Watch Party",
          venue: "The Nerd Bar",
          location: "Los Angeles, CA",
          date: "Dec 31, 2025",
          time: "7:30 PM",
          price: "Free (21+)",
          image: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
          attending: 89
        }
      ]
    }
  ],

  // ============================================
  // SHARED DATA
  // ============================================
  marketplace: [
    {
      id: "st-mp-1",
      title: "Funko Pop - Eleven with Eggos #421",
      price: "$24.99",
      image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
      location: "Seattle, WA",
      rating: 5.0,
      reviews: 89
    },
    {
      id: "st-mp-2",
      title: "LEGO Stranger Things The Upside Down",
      price: "$199",
      originalPrice: "$249",
      image: "/images/stranger-things-assets/images/marketplace/lego.jpg",
      location: "Seattle, WA",
      rating: 4.9,
      reviews: 156
    },
    {
      id: "st-mp-3",
      title: "Stranger Things Party Kit - Complete",
      price: "$45.99",
      image: "/images/stranger-things-assets/images/marketplace/pez-set.jpg",
      location: "Seattle, WA",
      rating: 4.8,
      reviews: 234
    },
    {
      id: "st-mp-4",
      title: "Vintage 80s Boombox - Working",
      price: "$85",
      image: "/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg",
      location: "Seattle, WA",
      rating: 4.7,
      reviews: 45
    },
    {
      id: "st-mp-5",
      title: "Demogorgon Costume - Adult L",
      price: "$65",
      originalPrice: "$89",
      image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
      location: "Seattle, WA",
      rating: 4.6,
      reviews: 78
    },
    {
      id: "st-mp-6",
      title: "Stranger Things Board Game Collection",
      price: "$39.99",
      image: "/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg",
      location: "Seattle, WA",
      rating: 4.9,
      reviews: 167
    }
  ],

  localEvents: [
    {
      id: "local-1",
      title: "Stranger Things Finale Viewing Party",
      venue: "Rio Theatre",
      businessType: "Movie Theatre",
      location: "Vancouver, BC",
      distance: "2.3 mi",
      date: "Dec 31, 2025",
      time: "8:00 PM",
      price: "$15",
      image: "/images/sabrina-carpenter-live.jpg",
      attending: 234,
      description: "Watch the epic finale on the big screen! Themed drinks and snacks available."
    },
    {
      id: "local-2",
      title: "NYE Stranger Things Marathon", 
      venue: "Alamo Drafthouse",
      businessType: "Movie Theatre",
      location: "Austin, TX",
      distance: "5.1 mi",
      date: "Dec 31, 2025",
      time: "6:00 PM",
      price: "$25",
      image: "/images/chappell-roan-live.jpg",
      attending: 156,
      description: "Full Season 5 marathon leading up to the finale at midnight!"
    },
    {
      id: "local-3",
      title: "Upside Down Watch Party",
      venue: "The Nerd Bar",
      businessType: "Bar & Restaurant",
      location: "Los Angeles, CA",
      distance: "1.8 mi",
      date: "Dec 31, 2025",
      time: "7:30 PM",
      price: "Free (21+)",
      image: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
      attending: 89,
      description: "Themed cocktails, costume contest, and the finale on all screens!"
    }
  ],

  relatedGroups: [
    {
      id: "group-1",
      name: "Stranger Things Fans",
      members: "2.1M",
      avatar: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
      postsPerDay: "50+ posts/day"
    },
    {
      id: "group-2", 
      name: "Hawkins Residents",
      members: "456K",
      avatar: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
      postsPerDay: "20+ posts/day"
    },
    {
      id: "group-3",
      name: "Upside Down Theories",
      members: "234K",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
      postsPerDay: "15+ posts/day"
    },
    {
      id: "group-4",
      name: "80s Nostalgia Club",
      members: "892K",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-post.jpg",
      postsPerDay: "30+ posts/day"
    }
  ],

  relatedQueries: [
    "stranger things season 5 release date",
    "stranger things finale watch party ideas",
    "will eleven die in stranger things",
    "stranger things upside down explained",
    "best stranger things merchandise",
    "stranger things viewing events near me"
  ]
};

// Costume Ideas Aggregation Data
export const strangerThingsCostumesAggregation = {
  id: "stranger-things-costumes",
  topic: "Stranger Things costume ideas",
  socialProof: { 
    count: 48, 
    label: "people talking about this" 
  },

  // ============================================
  // AI-FORWARD EXPERIENCE DATA
  // ============================================
  aiIntroSummary: "Halloween and cosplay fans across Facebook are sharing their best Stranger Things costume ideas. From Eleven's iconic looks to DIY Demogorgon builds, here are the most popular costume concepts and tips from the community.",

  aiSectionsV2: [
    {
      id: "eleven-costumes",
      title: "Eleven costume variations",
      bullets: [
        {
          label: "Season 1 Classic: ",
          text: "Pink dress, blue windbreaker, blonde wig, and white tube socks. Add fake blood under the nose for the iconic look. ",
          blueQuote: "\"This is THE costume that everyone recognizes instantly.\""
        },
        {
          label: "Punk Eleven: ",
          text: "Season 2's 'bitchin' look with slicked-back hair, dark eye makeup, and leather jacket is a fan favorite for those wanting something edgier."
        },
        {
          label: "Mall Eleven: ",
          text: "Season 3's colorful romper with scrunchies captures El's journey to finding her own style. Pair with roller skates for extra points."
        }
      ],
      sources: [
        {
          id: "src-1",
          quote: "The pink dress look is SO easy to do! I found the perfect blue jacket at Goodwill for $5. Added a blonde wig and some tube socks - done! 💕",
          author: { name: "Eggo Enthusiast", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=faces" },
          reactions: 892,
          comments: 67
        },
        {
          id: "src-2",
          quote: "Don't forget the SCRUNCHIES for the Season 3 look! And the friendship bracelets Max gave her 🥺",
          author: { name: "80s Fashion Expert", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 436,
          comments: 52
        },
        {
          id: "src-1b",
          placeholder: true,
          author: { name: "Costume DIY", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
          reactions: 567,
          comments: 89
        },
        {
          id: "src-1c",
          quote: "Punk El from Season 2 is underrated! Black eye makeup, slicked hair, leather jacket. Everyone does the pink dress but THIS is a statement 🖤",
          author: { name: "Punk Rock El", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
          reactions: 723,
          comments: 91
        },
        {
          id: "src-1d",
          image: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
          author: { name: "Cosplay Queen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1456,
          comments: 234
        }
      ]
    },
    {
      id: "group-costumes",
      title: "Group costume ideas",
      bullets: [
        {
          label: "The Party: ",
          text: "Eleven, Mike, Dustin, Lucas, Will, and Max make the perfect group. Each character has distinctive clothing and accessories that are easy to source."
        },
        {
          label: "Scoops Ahoy Crew: ",
          text: "Steve and Robin in their sailor uniforms are instantly recognizable. ",
          blueQuote: "\"The hair is 80% of Steve's costume!\""
        },
        {
          label: "Add a Demogorgon: ",
          text: "One person as the monster chasing the group creates photo opportunities and wins costume contests."
        }
      ],
      sources: [
        {
          id: "src-3",
          quote: "We did the whole crew - Eleven, Mike, Dustin, Lucas, Will, Max, Steve with his bat, and even a Demogorgon! Won first place! 🏆",
          author: { name: "Party of 8", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1567,
          comments: 234
        },
        {
          id: "src-4",
          quote: "Please tell me whoever did Steve got the hair right. The hair is 80% of the costume! 💇‍♂️",
          author: { name: "Steve's Hair Consultant", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=faces" },
          reactions: 456,
          comments: 89
        },
        {
          id: "src-3b",
          image: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
          author: { name: "Scoops Ahoy Crew", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1234,
          comments: 178
        },
        {
          id: "src-3c",
          quote: "The Scoops Ahoy sailor uniforms are SO FUN. My husband and I went as Steve and Robin. We practiced the handshake all week! 🍦",
          author: { name: "Ahoy Sailor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
          reactions: 892,
          comments: 134
        },
        {
          id: "src-3d",
          placeholder: true,
          author: { name: "Group Goals", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
          reactions: 678,
          comments: 92
        }
      ]
    },
    {
      id: "diy-tips",
      title: "Budget-friendly DIY tips",
      bullets: [
        {
          label: "Thrift stores: ",
          text: "Goodwill, Savers, and Value Village have authentic 80s clothing for under $10 per piece. ",
          blueQuote: "\"Found an authentic Members Only jacket for $8!\""
        },
        {
          label: "Dollar store accessories: ",
          text: "Scrunchies, walkie talkies, Christmas lights, and fake blood are all available at dollar stores."
        },
        {
          label: "DIY blood: ",
          text: "Mix red lipstick with clear lip gloss for a realistic bloody nose that won't stain."
        }
      ],
      sources: [
        {
          id: "src-5",
          quote: "Total cost for 8 costumes: about $200 (mostly thrifted!). We won $500 gift card at the costume contest!",
          author: { name: "Thrift Queen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" },
          reactions: 678,
          comments: 94
        },
        {
          id: "src-5b",
          quote: "Found an authentic Members Only jacket for $8 at Goodwill. Add some high-waisted jeans and you're basically any ST character 🎯",
          author: { name: "Thrift Store Tips", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 543,
          comments: 67
        },
        {
          id: "src-5c",
          placeholder: true,
          author: { name: "DIY Master", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
          reactions: 456,
          comments: 78
        },
        {
          id: "src-5d",
          quote: "Pro tip: Dollar store has walkie talkies, Christmas lights, scrunchies, AND fake blood. One stop shop for like $15 total!",
          author: { name: "Budget Cosplayer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" },
          reactions: 892,
          comments: 112
        },
        {
          id: "src-5e",
          image: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
          author: { name: "Costume Hacks", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          reactions: 1023,
          comments: 156
        }
      ]
    }
  ],

  relatedTopics: [
    "Stranger Things Halloween party ideas",
    "DIY Demogorgon costume tutorial",
    "80s costume accessories"
  ],

  // Legacy AI sections
  aiSections: [
    {
      id: "eleven",
      title: "Eleven Costume Ideas",
      summary: "Eleven's costumes span multiple iconic looks across seasons. The Season 1 pink dress with blue jacket remains the most popular choice.",
      expandedText: "For authenticity, add white tube socks, a blonde wig, and fake blood under the nose. Season 3's mall outfits with scrunchies are also popular.",
      sources: [
        { 
          id: "src-1",
          quote: "The pink dress is iconic! Found everything at Goodwill for under $20 total 💕",
          author: { name: "Cosplay Queen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Stranger Things Cosplay",
          reactions: 892,
          time: "2h"
        }
      ]
    }
  ],

  // Balanced experience data
  aiIntro: {
    text: "From DIY Eleven looks to elaborate Demogorgon builds, Stranger Things fans are sharing creative costume ideas and tutorials. Find budget-friendly tips and group costume inspiration.",
    highlights: [
      { text: "DIY Eleven looks", href: "#eleven" },
      { text: "group costume inspiration", href: "#group" }
    ]
  },
  
  reels: [
    {
      id: "costume-reel-1",
      thumbnail: "/images/millie/millie-2.jpg",
      title: "DIY Eleven costume under $20 💕",
      views: "1.8M",
      duration: "0:58",
      author: { name: "CosplayQueen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "costume-reel-2",
      thumbnail: "/images/millie/millie-3.jpg",
      title: "Making a Demogorgon head 🎃",
      views: "2.3M",
      duration: "1:45",
      author: { name: "DIYMonster", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces" }
    },
    {
      id: "costume-reel-3",
      thumbnail: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
      title: "Steve's hair tutorial 💇‍♂️",
      views: "956K",
      duration: "0:42",
      author: { name: "HairMaster", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces" }
    }
  ],

  // Content-forward experience
  contentBuckets: [
    {
      id: "bucket-eleven",
      category: "Eleven costume ideas",
      icon: "👗",
      discussions: [
        {
          id: "disc-1",
          question: "What are the best Eleven costume variations?",
          answer: "Fans have created costumes from every season, with Season 1's pink dress being the most iconic.",
          author: { name: "Cosplay Queen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Stranger Things Cosplay & Costumes",
          groupAvatar: "https://images.unsplash.com/photo-1509248961895-40c8e8c3e923?w=40&h=40&fit=crop",
          reactions: 3241,
          comments: 567,
          time: "2h",
          snippets: [
            "The pink dress look is SO easy to do! Found the jacket at Goodwill for $5 💕",
            "Don't forget the SCRUNCHIES for the Season 3 look!",
            "Pro tip: red lipstick mixed with clear lip gloss makes the perfect bloody nose effect"
          ]
        }
      ]
    },
    {
      id: "bucket-group",
      category: "Group costume ideas",
      icon: "👥",
      discussions: [
        {
          id: "disc-2",
          question: "Best Stranger Things group costumes?",
          answer: "The full Party crew or Scoops Ahoy team are popular choices for groups.",
          author: { name: "Party of 8", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces" },
          groupName: "Halloween Costume Ideas",
          groupAvatar: "https://images.unsplash.com/photo-1509248961895-40c8e8c3e923?w=40&h=40&fit=crop",
          reactions: 4567,
          comments: 823,
          time: "4h",
          snippets: [
            "We did the whole crew and won first place! 🏆",
            "The Demogorgon costume was made from scratch with foam and LED lights",
            "Total cost for 8 costumes: about $200 (mostly thrifted!)"
          ]
        }
      ],
      marketplace: [
        {
          id: "mp-1",
          title: "Eleven Pink Dress Costume Set",
          price: "$29.99",
          image: "/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg",
          location: "Ships nationwide",
          rating: 4.8
        },
        {
          id: "mp-2",
          title: "Scoops Ahoy Uniform - Adult",
          price: "$34.99",
          image: "/images/stranger-things-assets/images/marketplace/lego.jpg",
          location: "Ships nationwide",
          rating: 4.9
        }
      ]
    }
  ],

  marketplace: [
    {
      id: "st-mp-1",
      title: "Eleven Pink Dress Costume Set",
      price: "$29.99",
      image: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg",
      location: "Ships nationwide",
      rating: 4.8,
      reviews: 234
    },
    {
      id: "st-mp-2",
      title: "Scoops Ahoy Uniform - Steve",
      price: "$34.99",
      image: "/images/stranger-things-assets/images/marketplace/pez-set.jpg",
      location: "Ships nationwide",
      rating: 4.9,
      reviews: 156
    },
    {
      id: "st-mp-3",
      title: "Demogorgon Mask - Full Head",
      price: "$45.99",
      image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
      location: "Ships nationwide",
      rating: 4.7,
      reviews: 89
    }
  ],

  relatedGroups: [
    {
      id: "group-1",
      name: "Stranger Things Cosplay & Costumes",
      members: "456K",
      avatar: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
      postsPerDay: "30+ posts/day"
    },
    {
      id: "group-2", 
      name: "Halloween Costume Ideas",
      members: "1.2M",
      avatar: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
      postsPerDay: "100+ posts/day"
    },
    {
      id: "group-3",
      name: "DIY Costumes & Props",
      members: "892K",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
      postsPerDay: "50+ posts/day"
    }
  ],

  relatedQueries: [
    "stranger things eleven costume diy",
    "demogorgon costume tutorial",
    "scoops ahoy costume where to buy",
    "80s costume ideas halloween",
    "stranger things group costume",
    "kids stranger things costumes"
  ]
};

// Helper to get aggregation data by topic slug
export function getAggregationData(topicSlug) {
  const dataMap = {
    "stranger-things-finale": strangerThingsAggregation,
    "stranger-things-costumes": strangerThingsCostumesAggregation,
  };
  return dataMap[topicSlug] || strangerThingsAggregation;
}

export default strangerThingsAggregation;
