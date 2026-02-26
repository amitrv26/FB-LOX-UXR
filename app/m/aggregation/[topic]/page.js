"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { getAggregationData } from "../../_data/aggregationData";
import GridViewExperience from "../../../../components/mobile/GridViewExperience";
import ContentForwardExperience from "../../../../components/mobile/ContentForwardExperience";
import AIForwardExperience from "../../../../components/mobile/AIForwardExperience";
import ImmersiveViewExperience from "../../../../components/mobile/ImmersiveViewExperience";
import "../../../../public/styles/mobile/aggregation.scss";

// Experience type constants
const EXPERIENCES = {
  GRID_VIEW: "grid-view",
  H_SCROLL: "h-scroll",
  AI_FORWARD: "ai-forward",
  IMMERSIVE_VIEW: "immersive-view",
};

export default function AggregationPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const topicSlug = params?.topic || "stranger-things-finale";
  
  // Get search query from URL (for URL-based navigation with back button support)
  const urlQuery = searchParams?.get('q');
  
  // Get aggregation data for this topic
  const data = getAggregationData(topicSlug);

  // State for experience type (default to grid view)
  const [experienceType, setExperienceType] = useState(EXPERIENCES.GRID_VIEW);

  // Handlers
  const handleBack = () => {
    router.back();
  };

  const handleDiscussionClick = (discussion) => {
    console.log("Discussion clicked:", discussion);
  };

  const handleMarketplaceClick = (item) => {
    console.log("Marketplace item clicked:", item);
  };

  const handleEventClick = (event) => {
    console.log("Event clicked:", event);
  };

  const handleQueryClick = (query) => {
    console.log("Related query clicked:", query);
  };

  const handleReelClick = (reel) => {
    console.log("Reel clicked:", reel);
    router.push(`/m/reels/${reel.id}`);
  };

  const handleLinkClick = (link) => {
    console.log("Link clicked:", link);
  };

  // No-op for Facebook click - this is a standalone version
  const handleFacebookClick = () => {
    // Standalone version - no use case switcher
  };

  // Navigate to a new page with the search query in URL (for proper back button support)
  const handleSearchNavigate = (query) => {
    router.push(`/m/aggregation/${topicSlug}?q=${encodeURIComponent(query)}`);
  };

  // Render the appropriate experience based on selected type
  const renderExperience = () => {
    switch (experienceType) {
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
            onExperienceChange={setExperienceType}
            initialQuery={urlQuery}
            onSearchNavigate={handleSearchNavigate}
          />
        );

      case EXPERIENCES.H_SCROLL:
        return (
          <ContentForwardExperience
            data={data}
            onBack={handleBack}
            onDiscussionClick={handleDiscussionClick}
            onMarketplaceClick={handleMarketplaceClick}
            onReelClick={handleReelClick}
            onEventClick={handleEventClick}
            onFacebookClick={handleFacebookClick}
            onExperienceChange={setExperienceType}
          />
        );

      case EXPERIENCES.AI_FORWARD:
        return (
          <AIForwardExperience
            data={data}
            onBack={handleBack}
            onQueryClick={handleQueryClick}
            onFacebookClick={handleFacebookClick}
            onExperienceChange={setExperienceType}
          />
        );

      case EXPERIENCES.IMMERSIVE_VIEW:
        return (
          <ImmersiveViewExperience
            data={data}
            onFacebookClick={handleFacebookClick}
            onExperienceChange={setExperienceType}
          />
        );

      default:
        return (
          <GridViewExperience
            data={data}
            onBack={handleBack}
            onDiscussionClick={handleDiscussionClick}
            onMarketplaceClick={handleMarketplaceClick}
            onEventClick={handleEventClick}
            onFacebookClick={handleFacebookClick}
            onTopicClick={handleQueryClick}
            onExperienceChange={setExperienceType}
            initialQuery={urlQuery}
            onSearchNavigate={handleSearchNavigate}
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
    </div>
  );
}
