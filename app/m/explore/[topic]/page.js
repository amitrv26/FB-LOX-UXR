"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAggregationData } from "../../_data/aggregationData";
import AIForwardExperience from "../../../../components/mobile/AIForwardExperience";
import BalancedExperience from "../../../../components/mobile/BalancedExperience";
import ContentForwardExperience from "../../../../components/mobile/ContentForwardExperience";
import LoggedOutSearchExperience from "../../../../components/mobile/LoggedOutSearchExperience";
import ImmersiveViewExperience from "../../../../components/mobile/ImmersiveViewExperience";
import GridViewExperience from "../../../../components/mobile/GridViewExperience";
import ExperienceTypeBottomSheet from "../../../../components/mobile/ExperienceTypeBottomSheet";
import { useUseCase } from "../../../../contexts/UseCaseContext";
import "../../../../public/styles/mobile/aggregation.scss";

// Experience type constants
const EXPERIENCES = {
  AI_FORWARD: "ai-forward",
  BALANCED: "balanced",
  CONTENT_FORWARD: "content-forward",
  LOGGED_OUT_SEARCH: "logged-out-search",
  IMMERSIVE_VIEW: "immersive-view",
  GRID_VIEW: "grid-view",
};

export default function ExplorePage() {
  const router = useRouter();
  const params = useParams();
  const { openBottomSheet } = useUseCase();
  const topicSlug = params?.topic || "stranger-things-finale";
  
  // Get aggregation data for this topic
  const data = getAggregationData(topicSlug);

  // State for experience type (default to grid view)
  const [experienceType, setExperienceType] = useState(EXPERIENCES.GRID_VIEW);
  
  // State for experience type bottom sheet
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  // Handlers
  const handleBack = () => {
    router.back();
  };

  const handleSourceClick = (source) => {
    console.log("Source clicked:", source);
    // Could navigate to the group post
  };

  const handleGroupJoin = (group) => {
    console.log("Group join clicked:", group);
    // Could show login prompt or navigate to group
  };

  const handleDiscussionClick = (discussion) => {
    console.log("Discussion clicked:", discussion);
  };

  const handleMarketplaceClick = (item) => {
    console.log("Marketplace item clicked:", item);
    router.push("/m/marketplace/vehicles");
  };

  const handleReelClick = (reel) => {
    console.log("Reel clicked:", reel);
    router.push(`/m/reels/${reel.id}`);
  };

  const handleEventClick = (event) => {
    console.log("Event clicked:", event);
  };

  const handleQueryClick = (query) => {
    console.log("Related query clicked:", query);
  };

  const handleLinkClick = (link) => {
    console.log("Link clicked:", link);
  };

  // Handler to open use case bottom sheet
  const handleFacebookClick = () => {
    openBottomSheet({ selectedCategory: 'aggregation' });
  };

  // Render the appropriate experience
  const renderExperience = () => {
    switch (experienceType) {
      case EXPERIENCES.AI_FORWARD:
        return (
          <AIForwardExperience
            data={data}
            onBack={handleBack}
            onSourceClick={handleSourceClick}
            onGroupJoin={handleGroupJoin}
            onQueryClick={handleQueryClick}
            onFacebookClick={handleFacebookClick}
          />
        );
      
      case EXPERIENCES.BALANCED:
        return (
          <BalancedExperience
            data={data}
            onBack={handleBack}
            onReelClick={handleReelClick}
            onMarketplaceClick={handleMarketplaceClick}
            onQueryClick={handleQueryClick}
            onLinkClick={handleLinkClick}
            onFacebookClick={handleFacebookClick}
          />
        );
      
      case EXPERIENCES.CONTENT_FORWARD:
        return (
          <ContentForwardExperience
            data={data}
            onBack={handleBack}
            onDiscussionClick={handleDiscussionClick}
            onMarketplaceClick={handleMarketplaceClick}
            onReelClick={handleReelClick}
            onEventClick={handleEventClick}
            onFacebookClick={handleFacebookClick}
          />
        );

      case EXPERIENCES.LOGGED_OUT_SEARCH:
        return (
          <LoggedOutSearchExperience
            data={data}
            onBack={handleBack}
            onQueryClick={handleQueryClick}
            onFacebookClick={handleFacebookClick}
          />
        );

      case EXPERIENCES.IMMERSIVE_VIEW:
        return (
          <ImmersiveViewExperience
            data={data}
            onFacebookClick={handleFacebookClick}
          />
        );

      case EXPERIENCES.GRID_VIEW:
        return (
          <GridViewExperience
            data={data}
            onBack={handleBack}
            onDiscussionClick={handleDiscussionClick}
            onMarketplaceClick={handleMarketplaceClick}
            onEventClick={handleEventClick}
            onFacebookClick={handleFacebookClick}
            onTopicClick={handleQueryClick}
          />
        );

      default:
        return (
          <ContentForwardExperience
            data={data}
            onBack={handleBack}
            onDiscussionClick={handleDiscussionClick}
            onMarketplaceClick={handleMarketplaceClick}
            onReelClick={handleReelClick}
            onEventClick={handleEventClick}
            onFacebookClick={handleFacebookClick}
          />
        );
    }
  };

  return (
    <div className="explore-page">
      {/* Main Experience Content */}
      <div className="explore-page__content">
        {renderExperience()}
            </div>

      {/* Experience Type Bottom Sheet */}
      <ExperienceTypeBottomSheet
        isOpen={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        selectedType={experienceType}
        onTypeChange={setExperienceType}
      />
    </div>
  );
}
