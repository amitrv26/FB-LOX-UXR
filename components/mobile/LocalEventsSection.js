"use client";

import { 
  CalendarIcon as CalendarIconBase,
  ClockIcon as ClockIconBase,
  LocationIcon as LocationIconBase,
  PeopleIcon as PeopleIconBase,
  ChevronRightIcon as ChevronRightIconBase
} from "../icons";

// Wrapper components with local styling
const CalendarIcon = () => <CalendarIconBase size={16} color="#65686c" />;
const ClockIcon = () => <ClockIconBase size={16} color="#65686c" />;
const LocationIcon = () => <LocationIconBase size={16} color="#65686c" />;
const PeopleIcon = () => <PeopleIconBase size={16} color="#65686c" />;
const ChevronRightIcon = () => <ChevronRightIconBase size={20} color="#65686c" />;

const LocalEventsSection = ({ 
  events, 
  title,
  maxItems,
  onEventClick,
  showSeeMore = false,
  onSeeMore
}) => {
  const displayEvents = maxItems ? events.slice(0, maxItems) : events;

  return (
    <div className="local-events">
      {title && (
        <div className="local-events__header">
          <h3 className="local-events__title">{title}</h3>
          {showSeeMore && onSeeMore && (
            <button className="local-events__see-more" onClick={onSeeMore}>
              See all
            </button>
          )}
        </div>
      )}
      
      <div className="local-events__list">
        {displayEvents.map((event) => (
          <button
            key={event.id}
            className="local-events__item"
            onClick={() => onEventClick?.(event)}
          >
            <div className="local-events__image-wrapper">
              <img 
                src={event.image} 
                alt={event.title}
                className="local-events__image"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&h=200&fit=crop";
                }}
              />
            </div>
            
            <div className="local-events__content">
              <h4 className="local-events__event-title">{event.title}</h4>
              
              <p className="local-events__venue">
                {event.venue}
                {event.businessType && (
                  <span className="local-events__business-type">
                    · {event.businessType}
                  </span>
                )}
              </p>
              
              <div className="local-events__meta">
                <div className="local-events__meta-item">
                  <CalendarIcon />
                  <span>{event.date}</span>
                </div>
                
                <div className="local-events__meta-item">
                  <ClockIcon />
                  <span>{event.time}</span>
                </div>
              </div>
              
              <div className="local-events__meta">
                <div className="local-events__meta-item">
                  <LocationIcon />
                  <span>{event.location}</span>
                  {event.distance && (
                    <span className="local-events__distance">
                      · {event.distance}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="local-events__footer">
                <span className="local-events__price">{event.price}</span>
                
                {event.attending && (
                  <div className="local-events__attending">
                    <PeopleIcon />
                    <span>{event.attending} going</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="local-events__chevron">
              <ChevronRightIcon />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocalEventsSection;
