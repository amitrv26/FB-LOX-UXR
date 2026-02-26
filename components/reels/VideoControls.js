import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconInline } from '../Icon';
import { easingCurves, durations } from '../../constants/motion';

const VideoControls = ({ isPlaying, isMuted, volume, onPlayPause, onMuteToggle, onVolumeChange }) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <motion.div 
      className="video-controls"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: durations.ultraFast,
        ease: easingCurves.fadeIn
      }}
    >
      <button
        className="video-control-button"
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <IconInline 
          name={isPlaying ? "pause-outline" : "play-outline"} 
          size={24} 
          color="onMedia" 
        />
      </button>
      
      <div 
        className="volume-control-wrapper"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          className="video-control-button"
          onClick={onMuteToggle}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <IconInline 
            name={isMuted ? "audio-off-outline" : "audio-hi-outline"} 
            size={24} 
            color="onMedia" 
          />
        </button>
        
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              className="volume-slider-container"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{
                duration: durations.normal,
                ease: easingCurves.expand
              }}
            >
              <div className="volume-slider">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="volume-slider-input"
                  style={{ '--volume-percent': `${volume}%` }}
                  aria-label="Volume"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VideoControls;

