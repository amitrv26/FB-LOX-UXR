import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FDSProfilePhoto from './FDSProfilePhoto';
import { IconInline } from './Icon';

/**
 * FDSComposer - Facebook Design System Composer Component
 * 
 * A flexible text input component for writing comments, posts, or messages.
 * Adapts from React Native FDSComposer to web.
 * 
 * Features:
 * - Auto-expanding textarea
 * - Profile photo integration
 * - Character limit support
 * - Placeholder text
 * - Submit button with loading state
 * - Attachment support
 * - Accessibility
 * 
 * @example
 * <FDSComposer
 *   placeholder="Write a comment..."
 *   profilePhotoSrc="/images/profile.jpg"
 *   onSubmit={(text) => console.log(text)}
 * />
 */
const FDSComposer = ({
  // Profile
  profilePhotoSrc,
  profilePhotoSize = 32,
  showProfilePhoto = true,
  
  // Input
  placeholder = 'Write a comment...',
  value: controlledValue,
  defaultValue = '',
  maxLength = null,
  minRows = 1,
  maxRows = 10,
  autoFocus = false,
  disabled = false,
  
  // Submit
  onSubmit,
  submitButtonText = 'Post',
  submitIcon = null, // Icon name for submit button
  showSubmitButton = true,
  submitOnEnter = true, // Submit on Enter key (Shift+Enter for new line)
  isSubmitting = false,
  canSubmit = true, // Additional validation
  
  // Callbacks
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  
  // Attachments
  onAddPhoto,
  onAddGif,
  onAddEmoji,
  showAttachmentButtons = false,
  
  // Layout
  layout = 'default', // 'default', 'compact', 'inline'
  backgroundColor = 'default', // 'default', 'transparent', 'elevated'
  
  // Character count
  showCharacterCount = false,
  characterCountThreshold = 0.8, // Show count when 80% of maxLength
  
  // Custom styling
  className,
  style,
  
  // Accessibility
  'aria-label': ariaLabel = 'Write a comment',
  testid,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  
  // Use controlled or uncontrolled value
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = controlledValue !== undefined ? onChange : setInternalValue;
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight();
    }
  }, [value]);
  
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate the height based on content
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    
    let newHeight = textarea.scrollHeight;
    newHeight = Math.max(newHeight, minHeight);
    newHeight = Math.min(newHeight, maxHeight);
    
    textarea.style.height = `${newHeight}px`;
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Check max length
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    
    setValue?.(newValue);
  };
  
  const handleKeyDown = (e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
    
    // Submit on Enter (without Shift)
    if (submitOnEnter && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  const handleSubmit = () => {
    if (!canSubmit || isSubmitting || disabled || !value.trim()) {
      return;
    }
    
    if (onSubmit) {
      onSubmit(value);
      
      // Clear input after submit (only for uncontrolled)
      if (controlledValue === undefined) {
        setInternalValue('');
      }
    }
  };
  
  const handleAttachment = (type) => {
    switch (type) {
      case 'photo':
        if (onAddPhoto) onAddPhoto();
        break;
      case 'gif':
        if (onAddGif) onAddGif();
        break;
      case 'emoji':
        if (onAddEmoji) onAddEmoji();
        break;
    }
  };
  
  // Calculate if we should show character count
  const shouldShowCount = showCharacterCount && maxLength && (
    value.length / maxLength >= characterCountThreshold
  );
  
  const isOverLimit = maxLength && value.length > maxLength;
  const isAtLimit = maxLength && value.length === maxLength;
  const canSubmitNow = canSubmit && value.trim().length > 0 && !isOverLimit;
  
  return (
    <div
      className={classNames(
        'fds-composer',
        `fds-composer--layout-${layout}`,
        `fds-composer--bg-${backgroundColor}`,
        {
          'fds-composer--focused': isFocused,
          'fds-composer--disabled': disabled,
          'fds-composer--submitting': isSubmitting,
        },
        className
      )}
      style={style}
      data-testid={testid}
    >
      <div className="fds-composer__container">
        {/* Profile Photo */}
        {showProfilePhoto && profilePhotoSrc && (
          <div className="fds-composer__profile">
            <FDSProfilePhoto
              source={profilePhotoSrc}
              size={profilePhotoSize}
              alt="Your profile"
            />
          </div>
        )}
        
        {/* Input Area */}
        <div className="fds-composer__input-wrapper">
          <textarea
            ref={textareaRef}
            className="fds-composer__textarea"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled || isSubmitting}
            maxLength={maxLength || undefined}
            aria-label={ariaLabel}
            rows={minRows}
          />
          
          {/* Character Count */}
          {shouldShowCount && (
            <div
              className={classNames(
                'fds-composer__character-count',
                {
                  'fds-composer__character-count--warning': isAtLimit,
                  'fds-composer__character-count--error': isOverLimit,
                }
              )}
            >
              {value.length}{maxLength && `/${maxLength}`}
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="fds-composer__actions">
          {/* Attachment Buttons */}
          {showAttachmentButtons && !isSubmitting && (
            <div className="fds-composer__attachments">
              {onAddPhoto && (
                <button
                  className="fds-composer__attachment-button"
                  onClick={() => handleAttachment('photo')}
                  disabled={disabled}
                  aria-label="Add photo"
                  type="button"
                >
                  <IconInline name="camera-outline" size={20} color="secondary" />
                </button>
              )}
              {onAddGif && (
                <button
                  className="fds-composer__attachment-button"
                  onClick={() => handleAttachment('gif')}
                  disabled={disabled}
                  aria-label="Add GIF"
                  type="button"
                >
                  <IconInline name="gif-outline" size={20} color="secondary" />
                </button>
              )}
              {onAddEmoji && (
                <button
                  className="fds-composer__attachment-button"
                  onClick={() => handleAttachment('emoji')}
                  disabled={disabled}
                  aria-label="Add emoji"
                  type="button"
                >
                  <IconInline name="emoji-smile-outline" size={20} color="secondary" />
                </button>
              )}
            </div>
          )}
          
          {/* Submit Button */}
          {showSubmitButton && (
            <button
              className={classNames(
                'fds-composer__submit-button',
                {
                  'fds-composer__submit-button--active': canSubmitNow,
                  'fds-composer__submit-button--disabled': !canSubmitNow,
                }
              )}
              onClick={handleSubmit}
              disabled={!canSubmitNow || isSubmitting}
              type="button"
              aria-label="Submit"
            >
              {isSubmitting ? (
                <span className="fds-composer__submit-loading">
                  <IconInline name="spinner" size={16} />
                </span>
              ) : submitIcon ? (
                <IconInline name={submitIcon} size={16} color={canSubmitNow ? 'active' : 'disabled'} />
              ) : (
                <span className="fds-composer__submit-text">{submitButtonText}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

FDSComposer.propTypes = {
  // Profile
  profilePhotoSrc: PropTypes.string,
  profilePhotoSize: PropTypes.number,
  showProfilePhoto: PropTypes.bool,
  
  // Input
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  
  // Submit
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  submitIcon: PropTypes.string,
  showSubmitButton: PropTypes.bool,
  submitOnEnter: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  canSubmit: PropTypes.bool,
  
  // Callbacks
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  
  // Attachments
  onAddPhoto: PropTypes.func,
  onAddGif: PropTypes.func,
  onAddEmoji: PropTypes.func,
  showAttachmentButtons: PropTypes.bool,
  
  // Layout
  layout: PropTypes.oneOf(['default', 'compact', 'inline']),
  backgroundColor: PropTypes.oneOf(['default', 'transparent', 'elevated']),
  
  // Character count
  showCharacterCount: PropTypes.bool,
  characterCountThreshold: PropTypes.number,
  
  // Custom styling
  className: PropTypes.string,
  style: PropTypes.object,
  
  // Accessibility
  'aria-label': PropTypes.string,
  testid: PropTypes.string,
};

export default FDSComposer;

