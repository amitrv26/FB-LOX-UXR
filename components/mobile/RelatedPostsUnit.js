"use client";

import { IconInline } from "../Icon";

// Default related posts data
const defaultRelatedPosts = [
  {
    id: 1,
    author: {
      name: "Finn Wolfhard",
      avatar: "/images/profile/finn-pp.jpg",
      verified: true,
    },
    image: "/images/profile/finn-post-1.jpg",
    text: "Vancouver, I'm coming home! 🎬 So excited to announce I'll be at the Rio Theatre for the Stranger Things finale screening. Can't wait to watch it with you all!",
    reactions: { count: 12847 },
    comments: 1562,
  },
  {
    id: 2,
    author: {
      name: "Stranger Things Fan Club",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
    },
    image: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
    text: "Who else is counting down the days until the finale? The Duffer Brothers have been teasing some major revelations about the Upside Down...",
    reactions: { count: 1247 },
    comments: 156,
  },
  {
    id: 3,
    author: {
      name: "Netflix Canada",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
    },
    image: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
    text: "The final chapter begins. Stranger Things Season 5 premieres January 2026. Are you ready to say goodbye to Hawkins?",
    reactions: { count: 3421 },
    comments: 342,
  },
  {
    id: 4,
    author: {
      name: "The Duffer Brothers",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
    },
    image: "/images/stranger-things-assets/images/marketplace/lego.jpg",
    text: "Thank you to everyone who has been on this journey with us. Season 5 is our love letter to the fans. See you in Hawkins one last time.",
    reactions: { count: 8934 },
    comments: 1247,
  },
  {
    id: 5,
    author: {
      name: "Rio Theatre Vancouver",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
    },
    image: "/images/stranger-things-assets/images/profile/rio-theatre-post.jpg",
    text: "Only 50 tickets left for our Stranger Things finale event! Don't miss your chance to watch with Finn Wolfhard 🎬",
    reactions: { count: 567 },
    comments: 78,
  },
  {
    id: 6,
    author: {
      name: "Hawkins Insider",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
    },
    image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
    text: "SPOILER-FREE review: The finale is everything we hoped for and more. Bring tissues. Lots of them. 😭",
    reactions: { count: 2156 },
    comments: 423,
  },
];

const RelatedPostsUnit = ({ 
  title = "Related posts", 
  posts = null,
  showSeeAll = true,
  showBottomDivider = false,
  showHeader = true,
  scrollBottomPadding = null,
  onPostClick = null,
}) => {
  const displayPosts = posts || defaultRelatedPosts;

  const formatCount = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  };

  return (
    <section className="related-posts-unit">
      {/* Header */}
      {showHeader && (
        <div className="related-posts-unit__header">
          <h2 className="related-posts-unit__title">{title}</h2>
          {showSeeAll && (
            <button className="related-posts-unit__see-all">See all</button>
          )}
        </div>
      )}

      {/* Horizontal scroll */}
      <div 
        className="related-posts-unit__scroll"
        style={scrollBottomPadding !== null ? { paddingBottom: scrollBottomPadding } : undefined}
      >
        {displayPosts.map((post) => (
          <div 
            key={post.id} 
            className="related-posts-unit__card"
            onClick={() => onPostClick?.(post)}
            style={{ cursor: onPostClick ? 'pointer' : 'default' }}
          >
            {/* Media with overlay */}
            <div className="related-posts-unit__media">
              <img 
                src={post.image} 
                alt="" 
                className="related-posts-unit__image"
              />
              {/* Overlay gradient */}
              <div className="related-posts-unit__overlay" />
              {/* Header on media */}
              <div className="related-posts-unit__card-header">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="related-posts-unit__avatar"
                />
                <span className="related-posts-unit__author">{post.author.name}</span>
                {post.author.verified && (
                  <IconInline name="badge-checkmark-filled" size={12} style={{ color: '#ffffff' }} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="related-posts-unit__content">
              <p className="related-posts-unit__text">{post.text}</p>
              
              {/* Footer */}
              <div className="related-posts-unit__footer">
                <div className="related-posts-unit__reactions">
                  <IconInline name="like-outline" size={16} color="secondary" />
                  <span className="related-posts-unit__count">{formatCount(post.reactions.count)}</span>
                </div>
                <div className="related-posts-unit__comments">
                  <IconInline name="comment-outline" size={16} color="secondary" />
                  <span className="related-posts-unit__count">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Grey divider at bottom - only shown when prop is true */}
      {showBottomDivider && (
        <div style={{ height: '4px', background: '#f0f2f5', width: '100%' }} />
      )}
    </section>
  );
};

export default RelatedPostsUnit;

