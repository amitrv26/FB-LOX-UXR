"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import UseCaseBottomSheet from "../../../components/mobile/UseCaseBottomSheet";
import { 
  ChatBubble, 
  ChatHeader, 
  InputBar, 
  LinkPreviewCard, 
  AppSwitcherLayout 
} from "../../../components/mobile/imessage";

// Shared video data (Stranger Things)
const sharedVideo = {
  id: "stranger-things-1",
  type: "video",
  title: "Millie and Noah Interview | Stranger Things",
  source: "Facebook",
  channelName: "Netflix",
  duration: "2:34",
  views: "2.8M",
  image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=640&h=360&fit=crop",
  videoSrc: "/videos/stranger-things-interviews/Video-153.mp4",
  postedTime: "2 days ago",
};

// Friend who shared the video
const friend = {
  name: "Sarah",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
};

export default function MessagesShareFeedPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('videoLinkShareFeed');
  const chatAreaRef = useRef(null);

  // Prefetch the destination page for instant navigation
  useEffect(() => {
    router.prefetch(`/m/feed-video/${sharedVideo.id}`);
  }, [router]);

  // Scroll to bottom of chat on mount
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, []);

  const handleVideoLinkTap = () => {
    // Store video data in sessionStorage for the feed video page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('googleVideoResult', JSON.stringify(sharedVideo));
      sessionStorage.setItem('cameFromMessages', 'true');
    }

    // Phase 1: Both slide left together
    setPhase(1);

    // Phase 2: Safari scales up to full screen
    setTimeout(() => {
      setPhase(2);
    }, 550);

    // Navigate after Safari has scaled up
    setTimeout(() => {
      router.push(`/m/feed-video/${sharedVideo.id}?source=messages`);
    }, 1000);
  };

  // Messages app content
  const sourceContent = (
    <>
      {/* Chat Area with Header Overlay */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minHeight: 0,
      }}>
        <ChatHeader 
          friend={friend}
          onBackClick={() => setBottomSheetOpen(true)}
        />

        {/* Scrollable Chat Area */}
        <div 
          ref={chatAreaRef}
          style={{
            flex: 1,
            background: '#fff',
            padding: '16px',
            paddingTop: '170px',
            paddingBottom: '8px',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            WebkitOverflowScrolling: 'touch',
          }}>
          
          {/* Conversation */}
          <ChatBubble text="omg did you finish it yet" />
          <ChatBubble text="YES finally 😭" isSent />
          <ChatBubble text="that ending tho" isSent />
          <ChatBubble text="I KNOW i was sobbing" />
          <ChatBubble text="literally same" isSent />
          <ChatBubble text="have you been watching the stranger things interviews??" />
          <ChatBubble text="NO WHAT" isSent />
          <ChatBubble text="pls send me 🙏" isSent />
          <ChatBubble text="YES look at this one between millie and noah 😭" />

          {/* Video link preview */}
          <LinkPreviewCard
            type="video"
            title={sharedVideo.title}
            subtitle={`${sharedVideo.views} views | Reel by ${sharedVideo.channelName}`}
            videoSrc={sharedVideo.videoSrc}
            bubbleColor="#3d2314"
            onClick={handleVideoLinkTap}
            disabled={phase > 0}
          />
        </div>
      </div>

      <InputBar />
    </>
  );

  return (
    <>
      <AppSwitcherLayout
        phase={phase}
        sourceContent={sourceContent}
      />

      {/* Bottom Sheet */}
      <UseCaseBottomSheet
        isOpen={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        selectedCategory={selectedCategory}
        currentRoute="/m/messages-share-feed"
      />
    </>
  );
}

