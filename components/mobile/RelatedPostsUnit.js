"use client";

import { IconInline } from "../Icon";

const defaultRelatedPosts = [
  {
    id: 1,
    author: {
      name: "Sabrina Carpenter",
      avatar: "/images/sabrina-carpenter-pp.jpg",
      verified: true,
    },
    image: "/images/sabrina-carpenter-show.png",
    text: "New York!! 🎤 Can't wait to be back at Webster Hall this summer. The Short n' Sweet Tour is coming to the East Village and I'm SO ready. See you there! 💕",
    reactions: { count: 24513 },
    comments: 3842,
  },
  {
    id: 2,
    author: {
      name: "Webster Hall",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
    },
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
    text: "This weekend was ELECTRIC ⚡ Thank you to everyone who came out for the sold-out Chappell Roan show. What a night!",
    reactions: { count: 5621 },
    comments: 743,
  },
  {
    id: 3,
    author: {
      name: "Live Nation",
      avatar: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=80&h=80&fit=crop",
      verified: true,
    },
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop",
    text: "NYC's legendary Webster Hall is hosting an incredible lineup this spring. From indie to pop to hip-hop — there's something for everyone. Tickets on sale now!",
    reactions: { count: 3187 },
    comments: 412,
  },
  {
    id: 4,
    author: {
      name: "Webster Hall",
      avatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
    },
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    text: "We've been hosting unforgettable live music since 1886. From punk legends to today's biggest pop stars, our stage has seen it all. Here's to the next chapter 🎶",
    reactions: { count: 8934 },
    comments: 1247,
  },
  {
    id: 5,
    author: {
      name: "NYC Music Scene",
      avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
    },
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    text: "Webster Hall just announced a surprise Olivia Rodrigo intimate show for next month. Only 1,500 tickets available — this will sell out in minutes 🎟️",
    reactions: { count: 11432 },
    comments: 2156,
  },
  {
    id: 6,
    author: {
      name: "East Village NYC",
      avatar: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=80&h=80&fit=crop",
    },
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=400&fit=crop",
    text: "Best concert venues in the East Village? Webster Hall tops every list. The sound system upgrade last year was a game-changer. If you haven't been, you're missing out!",
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

