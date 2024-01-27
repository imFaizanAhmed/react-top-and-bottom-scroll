import React, { useEffect, useRef, useState, MutableRefObject } from 'react';

// Define types for the props
interface TopBottomScrollProps {
  children: React.ReactNode;
  scrollHeight: number;
  styling?: React.CSSProperties;
}

const TopBottomScroll: React.FC<TopBottomScrollProps> = ({ children, styling = {}, scrollHeight = 8 }) => {
  // Define the type for the refs
  const topScrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // State is already correctly typed as number
  const [scrollWidth, setScrollWidth] = useState(0);

  const updateScrollWidth = () => {
    if (contentRef.current) {
      setScrollWidth(contentRef.current.scrollWidth);
    }
  };

  // Define the type for the parameter of syncScroll
  const syncScroll = (sourceRef: MutableRefObject<HTMLDivElement | null>) => {
    const targetRef = sourceRef === topScrollRef ? contentRef : topScrollRef;
    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          updateScrollWidth();
        }
      }
    });

    updateScrollWidth(); // Initial update

    // Update on window resize
    const handleResize = () => {
      updateScrollWidth();
    };
    window.addEventListener('resize', handleResize);

    // Observe changes in the contentRef's children
    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true, // Observe direct children
        subtree: true, // Observe all descendants
        attributes: true // Observe attributes changes
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{ overflow: 'auto' }}
        ref={topScrollRef}
        onScroll={() => syncScroll(topScrollRef)}>
        <div style={{ ...styling, width: scrollWidth, height: scrollHeight }} />
      </div>
      <div
        style={{ width: '100%', overflow: 'auto' }}
        ref={contentRef}
        onScroll={() => syncScroll(contentRef)}>
        {children}
      </div>
    </div>
  );
};

export default TopBottomScroll;
