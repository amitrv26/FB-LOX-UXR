"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getSourcePostData } from "../../../../_data/groupPost";
import { topicsData } from "../../../../_data/topicsData";
import MobileGroupPost from "../../../../../../components/mobile/MobileGroupPost";
import MobileComments from "../../../../../../components/mobile/MobileComments";
import RelatedAnswers from "../../../../../../components/mobile/RelatedAnswers";
import MarketplaceUnit from "../../../../../../components/mobile/MarketplaceUnit";
import ReelsUnit from "../../../../../../components/mobile/ReelsUnit";
import UpsellBottomSheet from "../../../../../../components/mobile/UpsellBottomSheet";
import EndOfFeedUpsell from "../../../../../../components/mobile/EndOfFeedUpsell";
import ShareSheet from "../../../../../../components/mobile/ShareSheet";

// Helper to convert topic data to the format expected by components
function getTopicPostData(topicId, resultIdx = 0) {
  const topic = topicsData[topicId];
  if (!topic) return null;

  // Get the specific search result based on resultIdx
  const searchResult = topic.searchResults[resultIdx] || topic.searchResults[0];
  
  // Use the search result's title (LLM title) and comments
  const postTitle = searchResult.title || topic.postTitle;
  const postComments = searchResult.comments || [];

  return {
    group: {
      id: `group-${topicId}`,
      name: topic.groupData.groupName,
      avatar: topic.groupData.groupAvatar,
      memberCount: topic.groupData.memberCount,
      isPublic: true,
    },
    post: {
      id: searchResult.postId || searchResult.id,
      title: postTitle,
      aiGenerated: true,
      body: topic.groupData.postBody,
      commentsCount: searchResult.commentsCount || 21,
      reactions: {
        like: 24,
        love: 8,
        total: 32,
      },
      sharesCount: 12,
      author: {
        id: `author-${topicId}`,
        name: topic.groupData.postAuthor.name,
        avatar: topic.groupData.postAuthor.avatar,
        date: "Dec 8",
        privacy: "public",
      },
    },
    // Use comments from the search result (the blue bullet points become the comments)
    comments: postComments.map((comment, idx) => ({
      id: `comment-${idx + 1}`,
      author: {
        id: `author-comment-${idx}`,
        name: topic.comments[idx]?.author?.name || `Community Member`,
        avatar: topic.comments[idx]?.author?.avatar || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces`,
      },
      text: comment.text,
      time: `${idx + 1}h`,
      reactions: { like: comment.reactions },
      replies: [],
      replyCount: 0,
    })),
    relatedAnswers: topic.relatedAnswers,
  };
}

// Fallback avatars for when FB CDN URLs don't load
const fallbackAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
];

// Stranger Things related answers data
const strangerThingsRelatedAnswers = [
  {
    id: "qa-1",
    question: "What are your theories for how Stranger Things will end?",
    answer: "Fans have many theories about how the series will conclude, ranging from time travel to major character sacrifices.",
    bullets: [
      "I think Will's connection to the Upside Down will be what ultimately saves Hawkins. He might have to sacrifice himself 😭",
      "Hot take: Time travel is involved. The Upside Down being stuck in 1983 HAS to mean something!",
      "The parallel with Eleven would be perfect - she opened the gate, but Will might be the one to close it forever.",
      "I'm convinced there's going to be a major death. My money is on Hopper going out like a hero.",
    ],
  },
  {
    id: "qa-2", 
    question: "What are the best Stranger Things watch party ideas?",
    answer: "Fans have shared creative ideas for hosting the perfect Stranger Things finale watch party.",
    bullets: [
      "Eggo waffles are MANDATORY. I'm also making Demogorgon cupcakes! 🧇",
      "Setting up a projector in the backyard - going all out for this one!",
      "Christmas lights everywhere, 80s playlist before the show, and themed cocktails for the adults.",
      "We're doing a full rewatch marathon starting Dec 26th leading up to the finale on NYE!",
    ],
  },
  {
    id: "qa-3",
    question: "Which Stranger Things character has the best arc?",
    answer: "Fans debate which character has had the most compelling development across all five seasons.",
    bullets: [
      "Steve's redemption arc from S1 bully to everyone's favorite babysitter is LEGENDARY 👑",
      "Will finally gets his moment in S5! His connection to the Upside Down is key to everything.",
      "Max's storyline in S4 was the best character work the show has ever done. Sadie Sink deserves an Emmy!",
      "Hopper's journey from grieving father to found-family protector hits different on rewatches 😢",
    ],
  },
  {
    id: "qa-4",
    question: "What's the deal with the Upside Down being stuck in 1983?",
    answer: "Fans have theories about why the Upside Down mirrors Hawkins from November 6, 1983.",
    bullets: [
      "It's frozen in time from when Eleven first opened the gate. The Upside Down is basically a snapshot of that moment.",
      "I think it's connected to Will being taken - like his presence there locked it in place somehow.",
      "The Mind Flayer might be keeping it frozen intentionally. It's preserving something important.",
      "Season 5 better explain this! It's been bugging me since they revealed it in S4 🤯",
    ],
  },
  {
    id: "qa-5",
    question: "Who do you think will die in the finale?",
    answer: "Fans are preparing for potential character deaths in the final season.",
    bullets: [
      "I hate to say it but Steve is giving major death flags. The whole 'I want 6 kids' speech? Classic foreshadowing 😭",
      "Eleven sacrificing herself to close the gate forever would be poetic but DEVASTATING.",
      "Hot take: Everyone survives. The Duffers said they wanted a satisfying ending, not GoT vibes.",
      "If they kill Dustin I'm rioting. That's the line. DO NOT CROSS IT DUFFERS.",
    ],
  },
];

// Helper to convert Google Groups result to the format expected by components
function getGoogleGroupPostData(result) {
  if (!result) return null;

  // Format time ago from timestamp
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "1d";
    const seconds = Math.floor((Date.now() / 1000) - timestamp);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w`;
    return `${Math.floor(seconds / 2592000)}mo`;
  };

  return {
    group: {
      id: `group-${result.id}`,
      name: result.groupName,
      avatar: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=64&h=64&fit=crop", // Tokyo themed
      memberCount: "45K",
      isPublic: true,
    },
    post: {
      id: result.id,
      title: result.title,
      aiGenerated: true,
      body: result.fullText || result.description,
      commentsCount: result.comments || 0,
      reactions: {
        like: result.reactionBreakdown?.like || 0,
        love: result.reactionBreakdown?.love || 0,
        total: result.reactions || 0,
      },
      sharesCount: 12,
      author: {
        id: result.author?.id || "author-1",
        name: result.author?.name || "Community Member",
        avatar: fallbackAvatars[0],
        date: formatTimeAgo(result.createdTime),
        privacy: "public",
      },
      image: result.image,
    },
    comments: (result.topComments || []).map((comment, idx) => ({
      id: `comment-${idx + 1}`,
      author: {
        id: `author-comment-${idx}`,
        name: comment.author?.name || "Community Member",
        avatar: fallbackAvatars[(idx + 1) % fallbackAvatars.length],
      },
      text: comment.text,
      time: `${idx + 1}h`,
      reactions: { like: comment.reactions || 0 },
      replies: [],
      replyCount: 0,
    })),
    relatedAnswers: strangerThingsRelatedAnswers,
  };
}

// Glimmer component for loading state
const PageGlimmer = () => (
  <>
    <style>{`
      @keyframes permalink-glimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      .glimmer-bar {
        background: linear-gradient(90deg, #e4e6eb 0%, #f0f2f5 50%, #e4e6eb 100%);
        background-size: 200% 100%;
        animation: permalink-glimmer 1.5s ease-in-out infinite;
        border-radius: 4px;
      }
    `}</style>
    <div style={{ padding: '16px', backgroundColor: '#fff' }}>
      {/* Group header glimmer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div className="glimmer-bar" style={{ width: '48px', height: '48px', borderRadius: '8px' }} />
        <div style={{ flex: 1 }}>
          <div className="glimmer-bar" style={{ width: '140px', height: '16px', marginBottom: '6px' }} />
          <div className="glimmer-bar" style={{ width: '100px', height: '12px' }} />
        </div>
      </div>
      
      {/* Post title glimmer */}
      <div className="glimmer-bar" style={{ width: '100%', height: '22px', marginBottom: '8px' }} />
      <div className="glimmer-bar" style={{ width: '85%', height: '22px', marginBottom: '16px' }} />
      
      {/* Post author glimmer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div className="glimmer-bar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        <div>
          <div className="glimmer-bar" style={{ width: '100px', height: '14px', marginBottom: '4px' }} />
          <div className="glimmer-bar" style={{ width: '60px', height: '12px' }} />
        </div>
      </div>
      
      {/* Post body glimmer */}
      <div className="glimmer-bar" style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
      <div className="glimmer-bar" style={{ width: '95%', height: '16px', marginBottom: '8px' }} />
      <div className="glimmer-bar" style={{ width: '70%', height: '16px', marginBottom: '24px' }} />
      
      {/* Reactions bar glimmer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #e4e6eb' }}>
        <div className="glimmer-bar" style={{ width: '80px', height: '14px' }} />
        <div className="glimmer-bar" style={{ width: '100px', height: '14px' }} />
      </div>
      
      {/* Comments section glimmer */}
      <div style={{ marginTop: '24px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <div className="glimmer-bar" style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="glimmer-bar" style={{ width: '80px', height: '14px', marginBottom: '6px' }} />
              <div className="glimmer-bar" style={{ width: '100%', height: '14px', marginBottom: '4px' }} />
              <div className="glimmer-bar" style={{ width: '85%', height: '14px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default function MobileGroupPostPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const postId = params?.postId;
  const topicParam = searchParams?.get('topic');
  
  // Use null initial state - show glimmer until data is loaded
  const [currentPostData, setCurrentPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTopic, setCurrentTopic] = useState('strangerthings');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [upsellConfig, setUpsellConfig] = useState({ type: 'generic', count: 0, entityName: '' });
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [likeSheetReactionCount, setLikeSheetReactionCount] = useState(0);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [sourcesSheet, setSourcesSheet] = useState({ isOpen: false, sources: [] });
  const [isFromGoogle, setIsFromGoogle] = useState(false);
  const [googleRelatedAnswers, setGoogleRelatedAnswers] = useState(null);
  const commentsRef = useRef(null);
  
  // Animation state for expand transition from aggregation
  // Use ref to read sessionStorage synchronously on first render
  const sourceRectRef = useRef(null);
  const hasReadSourceRect = useRef(false);
  
  // Check if this is a source page
  const isSourcePage = postId?.startsWith('source-');
  
  // Check if navigated from aggregation page
  const isFromAggregation = searchParams?.get('fromAggregation') === 'true';
  
  // Check if this is a comment card that should pulse the first comment
  const shouldHighlightComment = searchParams?.get('highlightComment') === 'true';
  
  // Read source rect and post data from sessionStorage synchronously on first render
  const aggregationPostDataRef = useRef(null);
  const hasReadAggregationData = useRef(false);
  
  if (isFromAggregation && typeof window !== 'undefined' && !hasReadSourceRect.current) {
    hasReadSourceRect.current = true;
    const storedRect = sessionStorage.getItem('aggregationSourceRect');
    if (storedRect) {
      try {
        sourceRectRef.current = JSON.parse(storedRect);
        // Clear it so it doesn't affect future navigations
        sessionStorage.removeItem('aggregationSourceRect');
      } catch (e) {
        console.error('Failed to parse source rect:', e);
      }
    }
  }
  
  if (isFromAggregation && typeof window !== 'undefined' && !hasReadAggregationData.current) {
    hasReadAggregationData.current = true;
    const storedPostData = sessionStorage.getItem('aggregationPostData');
    if (storedPostData) {
      try {
        aggregationPostDataRef.current = JSON.parse(storedPostData);
        sessionStorage.removeItem('aggregationPostData');
      } catch (e) {
        console.error('Failed to parse aggregation post data:', e);
      }
    }
  }
  
  const sourceRect = sourceRectRef.current;
  const aggregationPostData = aggregationPostDataRef.current;
  
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

  // Generate AI title (a question) based on the post text
  const generateAITitle = (text) => {
    // Map common themes to questions people ask
    const questionMappings = [
      { keywords: ['die', 'death', 'dead', 'kill', 'sacrifice'], question: 'Which characters will die in the finale?' },
      { keywords: ['reality', 'illusion', 'simulation', 'fake', 'mind'], question: 'Is Hawkins trapped in a false reality?' },
      { keywords: ['vecna', 'one', 'henry'], question: 'What is Vecna\'s true plan for Hawkins?' },
      { keywords: ['eleven', 'el', 'powers'], question: 'Will Eleven sacrifice herself to save everyone?' },
      { keywords: ['upside down', 'gate', 'portal'], question: 'How will the Upside Down storyline end?' },
      { keywords: ['steve', 'nancy', 'jonathan'], question: 'Who does Nancy end up with in the finale?' },
      { keywords: ['max', 'coma', 'braindead'], question: 'Is Max actually alive or gone forever?' },
      { keywords: ['hopper', 'joyce'], question: 'What happens to Hopper and Joyce?' },
      { keywords: ['dustin', 'lucas', 'mike', 'will'], question: 'Do all the main kids survive?' },
    ];
    
    const lowerText = text.toLowerCase();
    for (const mapping of questionMappings) {
      if (mapping.keywords.some(keyword => lowerText.includes(keyword))) {
        return mapping.question;
      }
    }
    
    return 'What are fans saying about Stranger Things Season 5?';
  };

  // Generate a user-like post body that expands on the AI title
  const generatePostBody = (aiTitle) => {
    const bodyMappings = {
      'Which characters will die in the finale?': 'With Season 5 being the last, I\'m genuinely worried about everyone. The Duffers said the finale would be devastating and I don\'t think anyone is safe at this point. Who do you think is most likely to die?',
      'Is Hawkins trapped in a false reality?': 'Been rewatching Season 4 and noticed so many hints about reality being distorted. Vecna shows people their "true reality" before killing them. What if everything we\'ve seen has been part of his mind control? Would love to hear your theories.',
      'What is Vecna\'s true plan for Hawkins?': 'We know Vecna wants to reshape the world, but I feel like there\'s more to his plan than just destruction. He seems way too calculated for simple revenge. What do you all think his endgame really is?',
      'Will Eleven sacrifice herself to save everyone?': 'The show has been building up to this moment for years. Eleven has always been the one to save everyone, but at what cost? I have a feeling Season 5 will end with her making the ultimate sacrifice.',
      'How will the Upside Down storyline end?': 'The gates are open, Hawkins is being consumed... how do you think this all ends? Will they destroy the Upside Down completely or find a way to close it forever?',
      'Who does Nancy end up with in the finale?': 'The Steve-Nancy-Jonathan love triangle has been going on for 4 seasons now. I need closure! Who do you think she ends up with, or does she choose herself?',
      'Is Max actually alive or gone forever?': 'Max\'s fate has been left so ambiguous. She\'s technically alive but braindead, and Eleven couldn\'t find her in the void. Is she trapped somewhere? Will she come back?',
      'What happens to Hopper and Joyce?': 'After everything they\'ve been through, I really hope Hopper and Joyce get a happy ending. But this is Stranger Things... happy endings aren\'t guaranteed.',
      'Do all the main kids survive?': 'The original party has been through so much together. I can\'t imagine the show ending without at least one of them dying. Who do you think is most at risk?',
    };
    
    return bodyMappings[aiTitle] || 'What are your predictions for how this all ends? I\'ve been thinking about this non-stop and would love to hear everyone\'s theories.';
  };

  // Generate 15 comments for group posts
  const generateComments = (originalComment, originalAuthor, originalAvatar, originalLikes) => {
    const commentPool = [
      { name: 'ST Fan Forever', avatar: 'https://i.pravatar.cc/40?img=8', text: 'This is such a great point! The Duffers have been building to this for seasons.', likes: 45 },
      { name: 'HawkinsResident', avatar: 'https://i.pravatar.cc/40?img=12', text: 'I\'ve been saying this since Season 4! The evidence is all there.', likes: 23 },
      { name: 'UpsideDownFan', avatar: 'https://i.pravatar.cc/40?img=15', text: 'This would absolutely break me but it makes so much sense narratively.', likes: 67 },
      { name: 'TheoryMaster', avatar: 'https://i.pravatar.cc/40?img=20', text: 'Rewatching Season 1 with this in mind and there are SO many clues!', likes: 34 },
      { name: 'DemogorgonSlayer', avatar: 'https://i.pravatar.cc/40?img=22', text: 'I\'m not ready for this. Emotionally or otherwise. 😭', likes: 89 },
      { name: 'NostalgiaVibes', avatar: 'https://i.pravatar.cc/40?img=25', text: 'The way they\'ve set everything up... it all connects perfectly.', likes: 28 },
      { name: 'WillTheWise', avatar: 'https://i.pravatar.cc/40?img=28', text: 'I think there\'s even more to this than we realize. Can\'t wait for the finale.', likes: 41 },
      { name: 'ElevenFanclub', avatar: 'https://i.pravatar.cc/40?img=31', text: 'This is why I love this fandom. The theories here are always incredible.', likes: 56 },
      { name: 'StarcuortMallRat', avatar: 'https://i.pravatar.cc/40?img=33', text: 'My heart isn\'t ready but my mind has been preparing for years.', likes: 19 },
      { name: 'MindFlayerHunter', avatar: 'https://i.pravatar.cc/40?img=36', text: 'The foreshadowing in this show is honestly next level.', likes: 73 },
      { name: 'VecnaWatcher', avatar: 'https://i.pravatar.cc/40?img=39', text: 'I\'ve analyzed every frame and I think you\'re onto something huge here.', likes: 38 },
      { name: 'RadioactiveRobin', avatar: 'https://i.pravatar.cc/40?img=42', text: 'This theory keeps me up at night. In the best way possible.', likes: 52 },
      { name: 'ScoopsAhoySteve', avatar: 'https://i.pravatar.cc/40?img=45', text: 'Whatever happens, this show has been an incredible ride.', likes: 31 },
      { name: 'LabRat011', avatar: 'https://i.pravatar.cc/40?img=48', text: 'The writers know exactly what they\'re doing. Trust the process.', likes: 44 },
    ];
    
    const timestamps = ['2 days', '1 day', '22 hours', '18 hours', '15 hours', '12 hours', '10 hours', '8 hours', '6 hours', '4 hours', '3 hours', '2 hours', '1 hour', '45 min'];
    
    // First comment is always the original from the tile
    const comments = [
      {
        id: 'comment-1',
        author: {
          id: 'comment-author-1',
          name: originalAuthor,
          avatar: originalAvatar || 'https://i.pravatar.cc/40?img=3',
        },
        text: originalComment,
        timestamp: '2 days',
        likes: originalLikes,
        replyTo: null,
      },
    ];
    
    // Add 14 more comments from the pool
    for (let i = 0; i < 14; i++) {
      const poolComment = commentPool[i % commentPool.length];
      comments.push({
        id: `comment-${i + 2}`,
        author: {
          id: `comment-author-${i + 2}`,
          name: poolComment.name,
          avatar: poolComment.avatar,
        },
        text: poolComment.text,
        timestamp: timestamps[i] || '30 min',
        likes: poolComment.likes,
      });
    }
    
    return comments;
  };

  // Update post data based on postId and topic after mount to avoid hydration issues
  useEffect(() => {
    // Check if coming from aggregation page with post data
    if (isFromAggregation && aggregationPostData) {
      // Both post and comment tiles are treated as comments on a post
      // The tile text becomes the first (pulsing) comment
      // The main post is a question that the comment is answering
      const aiTitle = generateAITitle(aggregationPostData.text);
      const postBody = generatePostBody(aiTitle);
      
      // Parse likes from aggregation data
      const originalLikes = typeof aggregationPostData.likes === 'number' 
        ? aggregationPostData.likes 
        : parseInt(String(aggregationPostData.likes).replace(/[^\d]/g, '')) || 89;
      
      // Generate 15 comments
      const comments = generateComments(
        aggregationPostData.text,
        aggregationPostData.author,
        aggregationPostData.avatar,
        originalLikes
      );
      
      const aggregationPageData = {
        group: {
          id: 'aggregation-group',
          name: aggregationPostData.group || 'Stranger Things Fans',
          avatar: aggregationPostData.groupAvatar || '/images/stranger-things-assets/images/profile/stranger-things-post.png',
          memberCount: '2.1M',
          isPublic: true,
        },
        post: {
          id: 'aggregation-post',
          title: aiTitle, // Question that the comments are answering
          aiGenerated: true,
          body: postBody, // User-generated style body that expands on the title
          commentsCount: 15, // Always 15 comments for group posts
          reactions: {
            like: Math.floor(Math.random() * 50) + 20,
            love: Math.floor(Math.random() * 15) + 5,
            total: 32,
          },
          sharesCount: 12,
          author: {
            id: 'aggregation-author',
            name: 'Original Poster',
            avatar: 'https://i.pravatar.cc/40?img=1',
            date: 'Dec 8',
            privacy: 'public',
          },
        },
        comments: comments,
      };
      
      setCurrentPostData(aggregationPageData);
      setShowAllComments(true); // Expand all comments when coming from aggregation
      setIsLoading(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    
    // Check if this is coming from Google search page
    const sourceParam = searchParams?.get('source');
    
    if (sourceParam === 'google' && typeof window !== 'undefined') {
      // Load data from sessionStorage (set by Google page)
      const storedResult = sessionStorage.getItem('googleGroupResult');
      if (storedResult) {
        try {
          const result = JSON.parse(storedResult);
          const googlePostData = getGoogleGroupPostData(result);
          if (googlePostData) {
            setCurrentPostData(googlePostData);
            setShowAllComments(false);
            setIsFromGoogle(true);
            setGoogleRelatedAnswers(googlePostData.relatedAnswers);
            setIsLoading(false);
            // Scroll to top
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            return;
          }
        } catch (e) {
          console.error('Failed to parse Google result data:', e);
        }
      }
    }

    // Get topic from URL param or localStorage
    let topic = topicParam;
    if (!topic && typeof window !== 'undefined') {
      topic = localStorage.getItem('selectedTopic') || 'strangerthings';
    }
    setCurrentTopic(topic || 'strangerthings');

    // Get resultIdx from URL params (which search result was clicked)
    const resultIdxParam = searchParams?.get('resultIdx');
    const resultIdx = resultIdxParam ? parseInt(resultIdxParam, 10) : 0;

    if (isSourcePage) {
      // For source pages, use the source data
      const sourceData = getSourcePostData(postId);
      
      // Override title, body, and first comment from URL params (from sources sheet or related answers)
      const sourceTitleParam = searchParams?.get('sourceTitle');
      const firstCommentParam = searchParams?.get('firstComment');
      const groupNameParam = searchParams?.get('groupName');
      const authorNameParam = searchParams?.get('authorName');
      const authorAvatarParam = searchParams?.get('authorAvatar');
      const postBodyParam = searchParams?.get('postBody');
      
      // Update post title if provided (this is the question being asked)
      if (sourceTitleParam) {
        sourceData.post.title = sourceTitleParam;
      }
      
      // Update post body if provided (this provides context about the question)
      if (postBodyParam) {
        sourceData.post.body = postBodyParam;
      }
      
      // Update group name if provided
      if (groupNameParam) {
        sourceData.group.name = groupNameParam;
      }
      
      // Update first comment to match what was shown in the related answers card
      if (sourceData.comments.length > 0) {
        // Update first comment text if provided
        if (firstCommentParam) {
          sourceData.comments[0].text = firstCommentParam;
        }
        // Update first comment author if provided (matches the card that was tapped)
        if (authorNameParam) {
          sourceData.comments[0].author.name = authorNameParam;
        }
        if (authorAvatarParam) {
          sourceData.comments[0].author.avatar = authorAvatarParam;
        }
      }
      
      setCurrentPostData(sourceData);
      setShowAllComments(false);
      setIsLoading(false);
    } else if (topic && topicsData[topic]) {
      // For main page with topic param, use topic data with specific result index
      const topicPostData = getTopicPostData(topic, resultIdx);
      if (topicPostData) {
        setCurrentPostData(topicPostData);
      } else {
        // Fallback to Stranger Things data
        setCurrentPostData(getTopicPostData('strangerthings'));
      }
      setShowAllComments(false);
      setIsLoading(false);
    } else {
      // Default to Stranger Things data
      setCurrentPostData(getTopicPostData('strangerthings'));
      setShowAllComments(false);
      setIsLoading(false);
    }
    
    // Check if we need to scroll to a specific comment
    const scrollToCommentParam = searchParams?.get('scrollToComment');
    
    if (scrollToCommentParam !== null) {
      // Show all comments and scroll to the specific one
      setShowAllComments(true);
      setTimeout(() => {
        const commentIndex = parseInt(scrollToCommentParam, 10);
        const commentElement = document.getElementById(`comment-${commentIndex}`);
        if (commentElement) {
          commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a brief highlight effect
          commentElement.style.backgroundColor = '#e8f0fe';
          setTimeout(() => {
            commentElement.style.backgroundColor = '';
            commentElement.style.transition = 'background-color 0.5s ease';
          }, 1500);
        }
      }, 300);
    } else {
      // Scroll to absolute top immediately (no animation)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [postId, isSourcePage, topicParam, searchParams]);

  const handleSourceClick = (source) => {
    // Close the sources sheet first
    handleCloseSources();
    // Navigate to the source post with title and first comment from the source
    const sourcePostId = source.postId || 'source-1';
    const params = new URLSearchParams({
      topic: currentTopic,
      sourceTitle: source.llmTitle || source.title || '',
      firstComment: source.quote || '',
    });
    router.push(`/m/groups/123/posts/${sourcePostId}?${params.toString()}`);
  };

  const handleOpenSources = (sources) => {
    setSourcesSheet({ isOpen: true, sources });
  };

  const handleCloseSources = () => {
    setSourcesSheet({ isOpen: false, sources: [] });
  };

  const showUpsell = (config = {}) => {
    setUpsellConfig({ type: config.type || 'generic', count: config.count || 0, entityName: config.entityName || '' });
    setShowLoginPrompt(true);
  };

  const handleJoinGroup = () => {
    showUpsell({ type: 'joinGroup' });
  };

  const handleLike = () => {
    // Show reactions upsell with the post's reaction count
    setLikeSheetReactionCount(currentPostData?.post?.reactions?.total || 0);
    setShowLikeSheet(true);
  };

  const handleComment = () => {
    showUpsell({ type: 'comment', count: currentPostData?.post?.commentsCount || 0 });
  };

  const handleShare = () => {
    setShowShareSheet(true);
  };

  const handleReply = () => {
    showUpsell({ type: 'comment', count: currentPostData?.post?.commentsCount || 0 });
  };

  const handleLikeComment = (reactionCount) => {
    // Show reactions upsell with the comment's reaction count
    setLikeSheetReactionCount(reactionCount || 0);
    setShowLikeSheet(true);
  };

  // Get related answers for current topic
  const relatedAnswersData = currentTopic && topicsData[currentTopic] 
    ? topicsData[currentTopic].relatedAnswers 
    : null;

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

  // Show glimmer while loading
  if (isLoading || !currentPostData) {
    return (
      <div className="mobile-post-page has-floating-tab-bar">
        <PageGlimmer />
      </div>
    );
  }

  return (
    <PageWrapper 
      className="mobile-post-page has-floating-tab-bar"
      {...wrapperProps}
    >
      <MobileGroupPost
        group={currentPostData.group}
        post={currentPostData.post}
        onJoinGroup={handleJoinGroup}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        hideSeeMore={isFromAggregation}
        noTruncateGroupName={isFromAggregation}
      />

      <div ref={commentsRef} className="mobile-comments-wrapper">
        <MobileComments
          comments={currentPostData.comments}
          totalCount={currentPostData.post.commentsCount}
          postAuthorId={currentPostData.post.author?.id}
          showAllComments={showAllComments}
          onReply={handleReply}
          onLikeComment={handleLikeComment}
          onCommentPromptClick={() => showUpsell({ type: 'comment', count: currentPostData.post.commentsCount })}
          highlightCommentIndex={(isSourcePage || shouldHighlightComment || isFromAggregation) ? 0 : null}
        />
      </div>

      {/* Related Answers - hide when coming from aggregation */}
      {!isFromAggregation && (
        <RelatedAnswers 
          onOpenSources={handleOpenSources} 
          relatedAnswersData={isFromGoogle ? googleRelatedAnswers : relatedAnswersData}
          currentTopic={isFromGoogle ? 'strangerthings' : currentTopic}
        />
      )}

      {/* Reels Unit - below Related Answers - hide when coming from aggregation */}
      {!isFromAggregation && (
        <ReelsUnit title="Fans talking about this" showSeeAll={true} />
      )}

      {/* Marketplace Unit - below Reels - hide when coming from aggregation */}
      {!isFromAggregation && (
        <MarketplaceUnit title="Shop for merchandise" showSeeAll={true} />
      )}

      <EndOfFeedUpsell hideWordmark />

      <UpsellBottomSheet
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        type={upsellConfig.type}
        count={upsellConfig.count}
        entityName={upsellConfig.entityName}
      />

      <UpsellBottomSheet
        isOpen={showLikeSheet}
        onClose={() => setShowLikeSheet(false)}
        type="like"
        count={likeSheetReactionCount}
      />

      <ShareSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
      />

      {/* Sources Bottom Sheet */}
      {sourcesSheet.isOpen && (
        <div 
          className="sources-sheet-overlay" 
          onClick={handleCloseSources}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div 
            className="sources-sheet" 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#f0f2f5',
              borderRadius: '16px 16px 0 0',
              width: '100%',
              maxWidth: '500px',
              paddingBottom: '24px',
            }}
          >
            {/* Grey scroll handle - above title */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              height: '12px',
              alignItems: 'flex-end',
            }}>
              <div style={{ 
                width: '40px', 
                height: '4px', 
                background: '#84878b', 
                borderRadius: '2px',
              }} />
            </div>

            {/* Title */}
            <h3 style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: '17px', 
              fontWeight: 700, 
              lineHeight: '20px',
              letterSpacing: '-0.41px',
              margin: 0,
              padding: '12px',
              textAlign: 'center',
              color: '#080809',
            }}>
              Sources
            </h3>
            
            {/* Source List - white container */}
            <div style={{ 
              margin: '0 12px',
              background: 'white',
              borderRadius: '8px',
              maxHeight: '60vh', 
              overflowY: 'auto',
            }}>
              <div style={{ padding: '8px 0' }}>
                {sourcesSheet.sources.map((source, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSourceClick(source)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    {/* Text Content */}
                    <div style={{ flex: 1, minWidth: 0, marginRight: '12px' }}>
                      <p style={{ 
                        margin: 0, 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        fontSize: '15px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        letterSpacing: '-0.23px',
                        color: '#080809',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {source.title || source.quote}
                      </p>
                      <p style={{ 
                        margin: '2px 0 0', 
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '16px',
                        letterSpacing: '0px',
                        color: '#65686c',
                      }}>
                        {source.groupName || 'Stranger Things Fans'} · {source.time || '4h'}
                      </p>
                    </div>
                    
                    {/* Chevron */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#65686c" style={{ flexShrink: 0 }}>
                      <path d="M8.11612 4.88388C7.62796 5.37204 7.62796 6.1633 8.11612 6.65146L13.4647 12L8.11612 17.3485C7.62796 17.8367 7.62796 18.628 8.11612 19.1161C8.60427 19.6043 9.39554 19.6043 9.88369 19.1161L16.1161 12.8839C16.6043 12.3957 16.6043 11.6043 16.1161 11.1161L9.88369 4.88388C9.39554 4.39573 8.60427 4.39573 8.11612 4.88388Z"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
