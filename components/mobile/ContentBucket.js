"use client";

import { useState } from "react";
import { 
  ChevronUpIcon as ChevronUpIconBase, 
  ChevronDownIcon as ChevronDownIconBase,
  LikeIcon as LikeIconBase,
  CommentIcon as CommentIconBase,
  ReplyIcon as ReplyIconBase
} from "../icons";

// Wrapper components with local styling
const ChevronUpIcon = () => <ChevronUpIconBase size={20} />;
const ChevronDownIcon = () => <ChevronDownIconBase size={20} />;
const LikeIcon = () => <LikeIconBase size={16} color="#65686c" />;
const CommentIcon = () => <CommentIconBase size={16} color="#65686c" />;
const ReplyIcon = () => <ReplyIconBase size={14} color="#0866ff" />;

const ContentBucket = ({
  category,
  icon,
  discussions,
  marketplace,
  reels,
  events,
  defaultExpanded = true,
  onDiscussionClick,
  onMarketplaceClick,
  onReelClick,
  onEventClick
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [expandedDiscussions, setExpandedDiscussions] = useState(new Set());

  const toggleDiscussion = (id) => {
    setExpandedDiscussions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="content-bucket">
      {/* Category Header */}
      <button 
        className="content-bucket__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="content-bucket__header-left">
          {icon && <span className="content-bucket__icon">{icon}</span>}
          <h2 className="content-bucket__category">{category}</h2>
        </div>
        <span className="content-bucket__chevron">
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="content-bucket__content">
          {/* Discussions */}
          {discussions && discussions.length > 0 && (
            <div className="content-bucket__discussions">
              {discussions.map((disc) => {
                const isDiscExpanded = expandedDiscussions.has(disc.id);
                const displaySnippets = isDiscExpanded 
                  ? disc.snippets 
                  : disc.snippets?.slice(0, 2);

                return (
                  <div key={disc.id} className="content-bucket__discussion">
                    {/* Question Header */}
                    <div className="content-bucket__discussion-header">
                      <img 
                        src={disc.groupAvatar || disc.author?.avatar} 
                        alt=""
                        className="content-bucket__group-avatar"
                      />
                      <div className="content-bucket__discussion-meta">
                        <span className="content-bucket__group-name">
                          {disc.groupName}
                        </span>
                        <span className="content-bucket__time">· {disc.time}</span>
                      </div>
                    </div>

                    {/* Question */}
                    <h3 
                      className="content-bucket__question"
                      onClick={() => onDiscussionClick?.(disc)}
                    >
                      {disc.question}
                    </h3>

                    {/* AI Answer */}
                    {disc.answer && (
                      <p className="content-bucket__answer">{disc.answer}</p>
                    )}

                    {/* Snippets */}
                    {displaySnippets && displaySnippets.length > 0 && (
                      <ul className="content-bucket__snippets">
                        {displaySnippets.map((snippet, idx) => (
                          <li key={idx} className="content-bucket__snippet">
                            "{snippet}"
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* See More */}
                    {disc.snippets && disc.snippets.length > 2 && (
                      <button 
                        className="content-bucket__see-more"
                        onClick={() => toggleDiscussion(disc.id)}
                      >
                        {isDiscExpanded ? 'Show less' : `See ${disc.snippets.length - 2} more`}
                      </button>
                    )}

                    {/* Engagement */}
                    <div className="content-bucket__engagement">
                      <div className="content-bucket__reactions">
                        <LikeIcon />
                        <span>{disc.reactions}</span>
                      </div>
                      <div className="content-bucket__comments">
                        <CommentIcon />
                        <span>{disc.comments} comments</span>
                      </div>
                      <button className="content-bucket__reply">
                        <ReplyIcon />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Marketplace Items */}
          {marketplace && marketplace.length > 0 && (
            <div className="content-bucket__marketplace">
              <h4 className="content-bucket__section-title">Shop related items</h4>
              <div className="content-bucket__marketplace-grid">
                {marketplace.map((item) => (
                  <button
                    key={item.id}
                    className="content-bucket__marketplace-item"
                    onClick={() => onMarketplaceClick?.(item)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="content-bucket__marketplace-image"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=200&h=200&fit=crop";
                      }}
                    />
                    <p className="content-bucket__marketplace-price">{item.price}</p>
                    <p className="content-bucket__marketplace-title">{item.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {events && events.length > 0 && (
            <div className="content-bucket__events">
              {events.map((event) => (
                <button
                  key={event.id}
                  className="content-bucket__event"
                  onClick={() => onEventClick?.(event)}
                >
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="content-bucket__event-image"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&h=200&fit=crop";
                    }}
                  />
                  <div className="content-bucket__event-details">
                    <span className="content-bucket__event-date">
                      {event.date} · {event.time}
                    </span>
                    <h4 className="content-bucket__event-title">{event.title}</h4>
                    <span className="content-bucket__event-venue">
                      {event.venue} · {event.location}
                    </span>
                    <span className="content-bucket__event-price">{event.price}</span>
                    {event.attending && (
                      <span className="content-bucket__event-attending">
                        {event.attending} going
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentBucket;
