import React, { useState, useRef } from 'react';
import '../../assets/css/carroussel.css'

interface CarouselItem {
  id: number;
  content: string;
}

const CAROUSEL_CONFIG = {
  smallWidth: 38,
  smallHeight: 60,
  largeWidth: 70,
  largeHeight: 80,
  gap: 8,
  animationDuration: 400,
} as const;

function Projects() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [items, setItems] = useState<CarouselItem[]>([
    { id: 1, content: 'in development1' },
    { id: 2, content: 'in development2' },
    { id: 3, content: 'in development3' },
    { id: 4, content: 'in development4' },
    { id: 5, content: 'in development5' },
  ]);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselMove = async (direction: 1 | -1) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (!carouselRef.current) {
      setIsAnimating(false);
      return;
    }

    const carouselItems = carouselRef.current.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>;
    const middleIndex = Math.floor(items.length / 2);
    
    // First, animate size changes for current center and new center
    const currentCenter = carouselItems[middleIndex];
    const newCenterIndex = middleIndex - direction;
    const newCenter = carouselItems[newCenterIndex];
    
    if (currentCenter && newCenter) {
      // Animate size transition
      currentCenter.style.transition = 'width 0.5s ease, height 0.5s ease';
      newCenter.style.transition = 'width 0.5s ease, height 0.5s ease';
      
      currentCenter.style.width = `${CAROUSEL_CONFIG.smallWidth}vw`;
      currentCenter.style.height = `${CAROUSEL_CONFIG.smallHeight}vh`;
      
      newCenter.style.width = `${CAROUSEL_CONFIG.largeWidth}vw`;
      newCenter.style.height = `${CAROUSEL_CONFIG.largeHeight}vh`;
    }
    
    // Calculate displacement for slide animation
    const displacement = direction * (CAROUSEL_CONFIG.largeWidth + CAROUSEL_CONFIG.gap - CAROUSEL_CONFIG.smallWidth);
    
    // Apply slide animation to all items
    carouselItems.forEach((item) => {
      item.style.transform = `translateX(${displacement}vw)`;
      if (!item.style.transition.includes('transform')) {
        item.style.transition += ', transform 0.5s ease';
      }
    });
    
    // After animation completes, update the DOM order and reset transforms
    setTimeout(() => {
      // Update items array
      setItems(prevItems => {
        const newItems = [...prevItems];
        if (direction === 1) {
          // Move last item to first
          const lastItem = newItems.pop()!;
          newItems.unshift(lastItem);
        } else {
          // Move first item to last
          const firstItem = newItems.shift()!;
          newItems.push(firstItem);
        }
        return newItems;
      });
      
      // Reset all transforms and transitions
      carouselItems.forEach((item) => {
        item.style.transition = '';
        item.style.transform = 'translateX(0vw)';
      });
      
      setIsAnimating(false);
    }, CAROUSEL_CONFIG.animationDuration);
  };

  const getItemStyle = (index: number): React.CSSProperties => {
    const middleIndex = Math.floor(items.length / 2);
    const isCenter = index === middleIndex;
    
    return {
      width: isCenter ? `${CAROUSEL_CONFIG.largeWidth}vw` : `${CAROUSEL_CONFIG.smallWidth}vw`,
      height: isCenter ? `${CAROUSEL_CONFIG.largeHeight}vh` : `${CAROUSEL_CONFIG.smallHeight}vh`,
      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      transformOrigin: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };
  return (
    <div className="container carousel-container">
      <button 
        className="prev-btn" 
        style={{ left: '8px' }}
        disabled={isAnimating}
        onClick={() => handleCarouselMove(1)}
      >
        &lt;
      </button>
      
      <div className='carousel' ref={carouselRef}>
        {items.map((item, index) => (
          <div 
            key={item.id}
            className='carousel-item'
            style={getItemStyle(index)}
          >
            {item.content}
          </div>
        ))}
      </div>
      
      <button 
        className="next-btn" 
        style={{ right: '8px' }}
        disabled={isAnimating}
        onClick={() => handleCarouselMove(-1)}
      >
        &gt;
      </button>
    </div>
  );
}

export default Projects;