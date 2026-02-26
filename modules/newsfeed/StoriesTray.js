import { useRef, useState, useEffect } from "react";
import CircleButton from "../../components/button/circleButton";

const StoriesTray = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Show right arrow if there's more content to scroll
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
      // Show left arrow if we've scrolled past the beginning
      setShowLeftArrow(scrollLeft > 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [children]);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 600; // 5 cards * (112px card width + 8px gap)
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 600; // 5 cards * (112px card width + 8px gap)
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="stories-tray-wrapper">
      {showLeftArrow && (
        <div className="stories-nav-button stories-nav-button--left">
          <CircleButton
            type="secondary"
            size="xlarge"
            icon="chevron-left-filled"
            iconColor="primary"
            deemph={true}
            performAction={scrollLeft}
          />
        </div>
      )}
      <div 
        className="stories-container" 
        ref={scrollContainerRef}
        onScroll={checkScroll}
      >
        {children}
      </div>
      {showRightArrow && (
        <div className="stories-nav-button stories-nav-button--right">
          <CircleButton
            type="secondary"
            size="xlarge"
            icon="chevron-right-filled"
            iconColor="primary"
            deemph={true}
            performAction={scrollRight}
          />
        </div>
      )}
    </div>
  );
};

export default StoriesTray;

