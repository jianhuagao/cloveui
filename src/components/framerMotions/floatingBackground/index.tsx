'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, memo } from 'react';
import type { ReactNode } from 'react';

type FloatingItem = {
  id: string | number;
  className?: string;
  factor?: number;
  scaleFactor?: number;
  element: ReactNode;
};

type FloatingBackgroundProps = {
  items: FloatingItem[];
};

type FloatingItemComponentProps = {
  className?: string;
  factor?: number;
  scaleFactor?: number;
  element: ReactNode;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
};

const FloatingItemComponent = memo(
  ({ className, factor = 10, scaleFactor, element, springX, springY }: FloatingItemComponentProps) => {
    const offsetX = useTransform(springX, v => v * factor);
    const offsetY = useTransform(springY, v => v * factor);

    const scale = useTransform([springX, springY], ([x, y]: number[]) => {
      if (!scaleFactor) return 1;
      const distance = Math.sqrt(x * x + y * y);
      return 1 + distance * scaleFactor;
    });

    return (
      <motion.div
        className={className}
        style={{
          x: offsetX,
          y: offsetY,
          scale
        }}
      >
        {element}
      </motion.div>
    );
  }
);

FloatingItemComponent.displayName = 'FloatingItemComponent';

const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ items }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2;
      const y = (event.clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {items.map(({ id, className, factor, scaleFactor, element }) => (
        <FloatingItemComponent
          key={id}
          className={className}
          factor={factor}
          scaleFactor={scaleFactor}
          element={element}
          springX={springX}
          springY={springY}
        />
      ))}
    </>
  );
};

export default FloatingBackground;
