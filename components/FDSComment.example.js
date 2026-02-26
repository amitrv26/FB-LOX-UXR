import React from 'react';
import FDSComment from './FDSComment';

/**
 * FDSComment Examples
 * Demonstrates various configurations of the FDSComment component
 */

export default function FDSCommentExamples() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', backgroundColor: '#fff' }}>
      <h2>FDSComment Examples</h2>

      {/* Basic Comment */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Basic Comment</h3>
        <FDSComment
          author="Sarah Johnson"
          authorProfileSrc="/images/thumbs/profile-1.png"
          timestamp="2h"
          text="This is amazing! I love how detailed and thoughtful this post is. Thank you for sharing! 🎉"
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>

      {/* Comment with Verified Badge */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Verified Author</h3>
        <FDSComment
          author="Meta Official"
          authorProfileSrc="/images/thumbs/profile-2.png"
          authorBadge="verified"
          timestamp="1h"
          text="Thanks for being part of our community! We're excited to announce new features coming soon."
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>

      {/* Comment with Public Badge */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Public Comment</h3>
        <FDSComment
          author="John Doe"
          authorProfileSrc="/images/thumbs/profile-3.png"
          authorBadge="public"
          timestamp="30m"
          text="Great work everyone! 👏"
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>

      {/* Liked Comment */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Liked Comment</h3>
        <FDSComment
          author="Emily Chen"
          authorProfileSrc="/images/thumbs/profile-4.png"
          timestamp="5h"
          text="Absolutely brilliant explanation!"
          isLiked={true}
          likeCount={42}
          onLike={() => console.log('Unlike')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>

      {/* Comment with Reactions */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Comment with Reactions</h3>
        <FDSComment
          author="Mike Wilson"
          authorProfileSrc="/images/thumbs/profile-5.png"
          timestamp="3h"
          text="This made my day! 😄"
          reactions={{ like: 5, love: 3, haha: 2 }}
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>

      {/* Edited Comment */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Edited Comment</h3>
        <FDSComment
          author="Lisa Anderson"
          authorProfileSrc="/images/thumbs/profile-6.png"
          timestamp="1d"
          text="I updated my previous comment with more details about the topic."
          isEdited={true}
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>

      {/* Long Comment with See More */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Long Comment (with truncation)</h3>
        <FDSComment
          author="David Martinez"
          authorProfileSrc="/images/thumbs/profile-7.png"
          timestamp="4h"
          text="This is a really long comment that demonstrates the truncation feature. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
          maxLines={3}
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>

      {/* Comment with Author Subtext */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Author with Subtext (Top Fan)</h3>
        <FDSComment
          author="Rachel Green"
          authorProfileSrc="/images/thumbs/profile-8.png"
          authorSubtext="Top fan"
          timestamp="6h"
          text="Always appreciate your content! Keep it up!"
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>

      {/* Comment with Replies */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Comment with Replies</h3>
        <FDSComment
          author="Alex Turner"
          authorProfileSrc="/images/thumbs/profile-9.png"
          timestamp="8h"
          text="Does anyone have more information about this?"
          replyCount={3}
          showReplies={true}
          replies={[
            {
              author: "Sam Lee",
              authorProfileSrc: "/images/thumbs/profile-10.png",
              timestamp: "7h",
              text: "I have some resources that might help!",
              onLike: () => console.log('Liked reply 1'),
              onReply: () => console.log('Reply to reply 1'),
            },
            {
              author: "Maria Garcia",
              authorProfileSrc: "/images/thumbs/profile-11.png",
              timestamp: "6h",
              text: "Check out the documentation, it's really helpful.",
              onLike: () => console.log('Liked reply 2'),
              onReply: () => console.log('Reply to reply 2'),
            },
            {
              author: "Chris Brown",
              authorProfileSrc: "/images/thumbs/profile-12.png",
              timestamp: "5h",
              text: "Thanks everyone for the suggestions!",
              isLiked: true,
              onLike: () => console.log('Unlike reply 3'),
              onReply: () => console.log('Reply to reply 3'),
            },
          ]}
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
          onViewReplies={() => console.log('View replies')}
        />
      </section>

      {/* Transparent Background (for dark mode) */}
      <section style={{ marginBottom: '40px', backgroundColor: '#000', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#fff' }}>Transparent Background (for dark backgrounds)</h3>
        <FDSComment
          author="Nina Patel"
          authorProfileSrc="/images/thumbs/profile-0.png"
          timestamp="2h"
          text="This looks great on dark backgrounds too!"
          backgroundColor="transparent"
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
        />
      </section>

      {/* Compact Layout */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Compact Layout (for nested replies)</h3>
        <FDSComment
          author="Tom Harris"
          authorProfileSrc="/images/thumbs/profile-1.png"
          timestamp="1h"
          text="This is a compact version of the comment."
          layout="compact"
          profilePhotoSize={24}
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
        />
      </section>

      {/* Without Actions */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Without Action Buttons</h3>
        <FDSComment
          author="Jessica White"
          authorProfileSrc="/images/thumbs/profile-2.png"
          timestamp="12h"
          text="This comment has no action buttons."
          showActions={false}
        />
      </section>

      {/* Small Profile Photo */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Small Profile Photo (24px)</h3>
        <FDSComment
          author="Kevin Brown"
          authorProfileSrc="/images/thumbs/profile-3.png"
          timestamp="15h"
          text="Smaller profile photo for compact spaces."
          profilePhotoSize={24}
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
        />
      </section>

      {/* Large Profile Photo */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Large Profile Photo (40px)</h3>
        <FDSComment
          author="Amanda Rodriguez"
          authorProfileSrc="/images/thumbs/profile-4.png"
          timestamp="20h"
          text="Larger profile photo for emphasis."
          profilePhotoSize={40}
          onLike={() => console.log('Liked')}
          onReply={() => console.log('Reply')}
          onMore={() => console.log('More')}
        />
      </section>
    </div>
  );
}

