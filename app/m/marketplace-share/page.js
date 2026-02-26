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

// Shared product data (Stranger Things LEGO)
const sharedProduct = {
  id: "t2",
  type: "marketplace",
  title: "LEGO The Upside Down 75810",
  price: "$199",
  location: "Seattle, WA",
  distance: "2 mi",
  condition: "Like new",
  image: "/images/stranger-things-assets/images/marketplace/lego.jpg",
  description: "Complete LEGO Stranger Things set featuring the Byers house in both dimensions. All 2,287 pieces included, built once and displayed in smoke-free home. Includes all 8 minifigures.",
};

// Friend who shared the product
const friend = {
  name: "Sarah",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
};

export default function MarketplaceSharePage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('marketplace');
  const chatAreaRef = useRef(null);

  // Prefetch the destination page for instant navigation
  useEffect(() => {
    router.prefetch(`/m/marketplace/${sharedProduct.id}`);
  }, [router]);

  // Scroll to bottom of chat on mount
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, []);

  const handleProductLinkTap = () => {
    // Store product data in sessionStorage for the marketplace page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('marketplaceProduct', JSON.stringify(sharedProduct));
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
      router.push(`/m/marketplace/${sharedProduct.id}`);
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
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            WebkitOverflowScrolling: 'touch',
          }}>
          
          {/* Conversation */}
          <ChatBubble text="omg look what I found on marketplace!!" />
          <ChatBubble text="ooh what is it" isSent />
          <ChatBubble text="the stranger things lego set!! 🧱" style={{ marginBottom: '12px' }} />

          {/* Product link preview */}
          <LinkPreviewCard
            type="product"
            title={sharedProduct.title}
            image={sharedProduct.image}
            price={sharedProduct.price}
            onClick={handleProductLinkTap}
            disabled={phase > 0}
          />

          <ChatBubble text="WAIT THE BYERS HOUSE?!" isSent maxWidth="80%" />
          <ChatBubble text="it flips to show the upside down?? 😱" isSent maxWidth="80%" />
          <ChatBubble text="YES and it has all the minifigures!!" maxWidth="70%" />
          <ChatBubble text="eleven, mike, dustin, the whole gang" maxWidth="70%" />
          <ChatBubble text="okay I need this immediately 😭" isSent maxWidth="80%" />
          <ChatBubble text="$199 is actually a good deal for this set" isSent maxWidth="80%" style={{ marginBottom: 0 }} />
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
        currentRoute="/m/marketplace-share"
      />
    </>
  );
}
