"use client";

import React from 'react';
import Icon from '../Icon';

// Default related queries for different topics
const defaultRelatedQueries = {
  strangerthings: [
    "Stranger Things season 5 release date",
    "Will Byers Upside Down theory",
    "Eleven powers origin",
    "Hawkins lab experiments",
    "Vecna backstory explained",
    "Millie Bobby Brown movies",
    "Stranger Things cast ages",
    "Demogorgon explained",
    "Stranger Things filming locations",
    "Stranger Things soundtrack",
    "Hawkins Indiana map",
    "Eddie Munson guitar scene",
    "Stranger Things merchandise",
    "Upside Down creatures",
  ],
  tokyohotels: [
    "Best areas to stay in Tokyo",
    "Tokyo hotel booking tips",
    "Shinjuku vs Shibuya hotels",
    "Budget hotels Tokyo",
    "Ryokan near Tokyo",
    "Tokyo Disneyland hotels",
    "Ginza luxury hotels",
    "Capsule hotels Tokyo",
    "Hotels near Tokyo Station",
  ],
  coffee: [
    "Best coffee shops Portland Maine",
    "Portland coffee roasters",
    "Specialty coffee Portland",
    "Coffee shops with wifi Portland",
    "Cold brew Portland",
    "Espresso bars Portland",
  ],
};

const OthersSearchedFor = ({ queries, topic = 'strangerthings', onQueryClick, className = '', noDivider = false }) => {
  // Use provided queries or fall back to default for topic
  const displayQueries = queries || defaultRelatedQueries[topic] || defaultRelatedQueries.strangerthings;
  
  // Split queries into two rows
  const halfLength = Math.ceil(displayQueries.length / 2);
  const row1 = displayQueries.slice(0, halfLength);
  const row2 = displayQueries.slice(halfLength);

  const renderChip = (query, idx) => (
    <button 
      key={idx}
      className="others-searched-for__chip"
      onClick={() => onQueryClick?.(query)}
    >
      <Icon name="magnifying-glass-filled" size={16} color="primary" />
      <span className="others-searched-for__chip-label">{query}</span>
    </button>
  );

  return (
    <section className={`others-searched-for ${noDivider ? 'others-searched-for--no-divider' : ''} ${className}`}>
      <h3 className="others-searched-for__title">People also searched for</h3>
      <div className="others-searched-for__scroll-container">
        <div className="others-searched-for__list">
          <div className="others-searched-for__row">
            {row1.map((query, idx) => renderChip(query, idx))}
          </div>
          <div className="others-searched-for__row">
            {row2.map((query, idx) => renderChip(query, idx + halfLength))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OthersSearchedFor;

