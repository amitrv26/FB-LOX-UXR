"use client";

// People talking icon (chat bubbles)
const PeopleTalkingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#65686c">
    <path d="M12 3C6.5 3 2 6.58 2 11c0 2.13.98 4.07 2.58 5.51-.03.56-.29 1.42-.75 2.53-.18.44.21.9.67.79 1.69-.42 3.04-.98 4-.78.08.02.17.04.25.05.03.01.05.01.08.02.31.06.63.11.96.14.12.02.24.03.36.04.36.03.73.05 1.1.05.06 0 .13 0 .19-.01h.06c.17 0 .33-.01.5-.02 4.95-.32 8.88-3.75 8.88-7.97C21 6.58 16.5 3 12 3z"/>
  </svg>
);

// Format number with K/M suffix
function formatCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}

const AggregationHeader = ({ 
  topic, 
  socialProof, 
  onBack,
  onFacebookClick
}) => {
  return (
    <header className="aggregation-header">
      <div className="aggregation-header__top">
        <div className="aggregation-header__content">
          {/* Topic Title - Clickable to open experience picker */}
          <button className="aggregation-header__topic-btn" onClick={onFacebookClick}>
            <h1 className="aggregation-header__topic">{topic}</h1>
          </button>
          
          {socialProof && (
            <div className="aggregation-header__social-proof">
              <PeopleTalkingIcon />
              <span>
                {formatCount(socialProof.count)} {socialProof.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AggregationHeader;
