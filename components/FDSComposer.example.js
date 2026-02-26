import React, { useState } from 'react';
import FDSComposer from './FDSComposer';

/**
 * FDSComposer Examples
 * Demonstrates various configurations of the FDSComposer component
 */

export default function FDSComposerExamples() {
  const [comment1, setComment1] = useState('');
  const [comment2, setComment2] = useState('');
  const [comment3, setComment3] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (text) => {
    console.log('Submitted:', text);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Posted: ${text}`);
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', backgroundColor: '#f0f2f5' }}>
      <h2>FDSComposer Examples</h2>

      {/* Basic Composer */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Basic Composer</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-0.png"
          placeholder="Write a comment..."
          onSubmit={(text) => {
            console.log('Basic submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* Controlled Composer */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Controlled Composer (with state)</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-1.png"
          placeholder="What's on your mind?"
          value={comment1}
          onChange={setComment1}
          onSubmit={(text) => {
            console.log('Controlled submit:', text);
            setComment1('');
            alert(`Posted: ${text}`);
          }}
        />
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#65686c' }}>
          Current value: "{comment1}" ({comment1.length} characters)
        </div>
      </section>

      {/* With Character Limit */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>With Character Limit (100 chars)</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-2.png"
          placeholder="Keep it short..."
          maxLength={100}
          showCharacterCount={true}
          value={comment2}
          onChange={setComment2}
          onSubmit={(text) => {
            console.log('Limited submit:', text);
            setComment2('');
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* With Attachment Buttons */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>With Attachment Buttons</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-3.png"
          placeholder="Add a comment..."
          showAttachmentButtons={true}
          onAddPhoto={() => alert('Add photo clicked')}
          onAddGif={() => alert('Add GIF clicked')}
          onAddEmoji={() => alert('Add emoji clicked')}
          onSubmit={(text) => {
            console.log('With attachments submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* Loading State */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Loading State</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-4.png"
          placeholder="Posting..."
          value={comment3}
          onChange={setComment3}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
        <button
          onClick={() => setIsSubmitting(!isSubmitting)}
          style={{ marginTop: '10px', padding: '8px 16px' }}
        >
          Toggle Loading State
        </button>
      </section>

      {/* With Icon Submit Button */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>With Icon Submit Button</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-5.png"
          placeholder="Send a message..."
          submitIcon="send-filled"
          onSubmit={(text) => {
            console.log('Icon submit:', text);
            alert(`Sent: ${text}`);
          }}
        />
      </section>

      {/* Compact Layout */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Compact Layout</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-6.png"
          profilePhotoSize={24}
          placeholder="Quick reply..."
          layout="compact"
          onSubmit={(text) => {
            console.log('Compact submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* Inline Layout */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Inline Layout</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-7.png"
          profilePhotoSize={20}
          placeholder="Reply..."
          layout="inline"
          submitIcon="send-filled"
          onSubmit={(text) => {
            console.log('Inline submit:', text);
            alert(`Sent: ${text}`);
          }}
        />
      </section>

      {/* Without Profile Photo */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Without Profile Photo</h3>
        <FDSComposer
          showProfilePhoto={false}
          placeholder="Anonymous comment..."
          onSubmit={(text) => {
            console.log('Anonymous submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* Transparent Background */}
      <section style={{ marginBottom: '40px', backgroundColor: '#e4e6eb', padding: '20px', borderRadius: '8px' }}>
        <h3>Transparent Background</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-8.png"
          placeholder="Write something..."
          backgroundColor="transparent"
          onSubmit={(text) => {
            console.log('Transparent submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* Elevated Background */}
      <section style={{ marginBottom: '40px', backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}>
        <h3>Elevated Background</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-9.png"
          placeholder="Create a post..."
          backgroundColor="elevated"
          showAttachmentButtons={true}
          onAddPhoto={() => alert('Add photo')}
          onAddGif={() => alert('Add GIF')}
          onSubmit={(text) => {
            console.log('Elevated submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* Disabled State */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Disabled State</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-10.png"
          placeholder="This composer is disabled..."
          disabled={true}
          onSubmit={(text) => {
            console.log('Disabled submit:', text);
          }}
        />
      </section>

      {/* Auto-focus */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Auto-focus (focused on load)</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-11.png"
          placeholder="This input is auto-focused..."
          autoFocus={true}
          onSubmit={(text) => {
            console.log('Auto-focus submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* Custom Submit Text */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Custom Submit Button Text</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-12.png"
          placeholder="Share your thoughts..."
          submitButtonText="Share"
          onSubmit={(text) => {
            console.log('Custom submit:', text);
            alert(`Shared: ${text}`);
          }}
        />
      </section>

      {/* Multi-row */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>Multi-row (min 3 rows, max 8 rows)</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-0.png"
          placeholder="Write a longer message..."
          minRows={3}
          maxRows={8}
          onSubmit={(text) => {
            console.log('Multi-row submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>

      {/* No Submit on Enter */}
      <section style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h3>No Submit on Enter (only button)</h3>
        <FDSComposer
          profilePhotoSrc="/images/thumbs/profile-1.png"
          placeholder="Press Enter for new line, click button to submit..."
          submitOnEnter={false}
          onSubmit={(text) => {
            console.log('Button-only submit:', text);
            alert(`Posted: ${text}`);
          }}
        />
      </section>
    </div>
  );
}

