"use client";

import { PlayIcon as PlayIconBase, ViewsIcon as ViewsIconBase } from "../icons";

// Wrapper components with local styling
const PlayIcon = () => <PlayIconBase size={24} color="white" />;
const ViewsIcon = () => <ViewsIconBase size={12} color="white" />;

const ReelsGrid = ({ 
  reels, 
  title,
  columns = 2,
  maxItems,
  onReelClick,
  showSeeMore = false,
  onSeeMore
}) => {
  const displayReels = maxItems ? reels.slice(0, maxItems) : reels;

  return (
    <div className="reels-grid">
      {title && (
        <div className="reels-grid__header">
          <h3 className="reels-grid__title">{title}</h3>
          {showSeeMore && onSeeMore && (
            <button className="reels-grid__see-more" onClick={onSeeMore}>
              See more
            </button>
          )}
        </div>
      )}
      
      <div 
        className="reels-grid__container"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)` 
        }}
      >
        {displayReels.map((reel) => (
          <button
            key={reel.id}
            className="reels-grid__item"
            onClick={() => onReelClick?.(reel)}
          >
            <div className="reels-grid__thumbnail-wrapper">
              <img 
                src={reel.thumbnail} 
                alt={reel.title}
                className="reels-grid__thumbnail"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=400&fit=crop";
                }}
              />
              
              {/* Gradient overlay */}
              <div className="reels-grid__overlay" />
              
              {/* Play button */}
              <div className="reels-grid__play">
                <PlayIcon />
              </div>
              
              {/* Duration badge */}
              {reel.duration && (
                <span className="reels-grid__duration">{reel.duration}</span>
              )}
              
              {/* Views */}
              <div className="reels-grid__views">
                <ViewsIcon />
                <span>{reel.views}</span>
              </div>
            </div>
            
            {/* Title */}
            <p className="reels-grid__item-title">{reel.title}</p>
            
            {/* Author */}
            {reel.author && (
              <div className="reels-grid__author">
                <img 
                  src={reel.author.avatar} 
                  alt={reel.author.name}
                  className="reels-grid__author-avatar"
                />
                <span className="reels-grid__author-name">{reel.author.name}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReelsGrid;
