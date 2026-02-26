"use client";

import { StarIcon as StarIconBase, LocationIcon as LocationIconBase } from "../icons";

// Wrapper components with local styling
const StarIcon = () => <StarIconBase size={12} color="#F5C518" />;
const LocationIcon = () => <LocationIconBase size={12} color="#65686c" />;

const MarketplaceGrid = ({ 
  items, 
  title,
  columns = 2,
  maxItems,
  onItemClick,
  showSeeMore = false,
  onSeeMore,
  horizontal = false
}) => {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;

  if (horizontal) {
    return (
      <div className="marketplace-grid marketplace-grid--horizontal">
        {title && (
          <div className="marketplace-grid__header">
            <h3 className="marketplace-grid__title">{title}</h3>
            {showSeeMore && onSeeMore && (
              <button className="marketplace-grid__see-more" onClick={onSeeMore}>
                See more
              </button>
            )}
          </div>
        )}
        
        <div className="marketplace-grid__scroll">
          {displayItems.map((item) => (
            <button
              key={item.id}
              className="marketplace-grid__item marketplace-grid__item--horizontal"
              onClick={() => onItemClick?.(item)}
            >
              <div className="marketplace-grid__image-wrapper">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="marketplace-grid__image"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=200&h=200&fit=crop";
                  }}
                />
                {item.originalPrice && (
                  <span className="marketplace-grid__badge">Sale</span>
                )}
              </div>
              
              <div className="marketplace-grid__details">
                <p className="marketplace-grid__price">
                  {item.price}
                  {item.originalPrice && (
                    <span className="marketplace-grid__original-price">
                      {item.originalPrice}
                    </span>
                  )}
                </p>
                <p className="marketplace-grid__item-title">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-grid">
      {title && (
        <div className="marketplace-grid__header">
          <h3 className="marketplace-grid__title">{title}</h3>
          {showSeeMore && onSeeMore && (
            <button className="marketplace-grid__see-more" onClick={onSeeMore}>
              See more
            </button>
          )}
        </div>
      )}
      
      <div 
        className="marketplace-grid__container"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)` 
        }}
      >
        {displayItems.map((item) => (
          <button
            key={item.id}
            className="marketplace-grid__item"
            onClick={() => onItemClick?.(item)}
          >
            <div className="marketplace-grid__image-wrapper">
              <img 
                src={item.image} 
                alt={item.title}
                className="marketplace-grid__image"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=200&h=200&fit=crop";
                }}
              />
              {item.originalPrice && (
                <span className="marketplace-grid__badge">Sale</span>
              )}
            </div>
            
            <div className="marketplace-grid__details">
              <p className="marketplace-grid__price">
                {item.price}
                {item.originalPrice && (
                  <span className="marketplace-grid__original-price">
                    {item.originalPrice}
                  </span>
                )}
              </p>
              <p className="marketplace-grid__item-title">{item.title}</p>
              
              {item.location && (
                <div className="marketplace-grid__location">
                  <LocationIcon />
                  <span>{item.location}</span>
                </div>
              )}
              
              {item.rating && (
                <div className="marketplace-grid__rating">
                  <StarIcon />
                  <span>{item.rating}</span>
                  {item.reviews && (
                    <span className="marketplace-grid__reviews">
                      ({item.reviews})
                    </span>
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceGrid;
