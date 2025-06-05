// components/FloatingBackground.tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

type FloatingItem = {
  id: string | number;
  className?: string; // 可选，类名
  factor?: number; // 偏移强度
  element: ReactNode;
};

type FloatingBackgroundProps = {
  items: FloatingItem[];
};

const FloatingItemComponent = ({
  className,
  factor = 10,
  element,
  springX,
  springY
}: {
  className?: string;
  factor?: number;
  element: ReactNode;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) => {
  const offsetX = useTransform(springX, v => v * factor);
  const offsetY = useTransform(springY, v => v * factor);

  return (
    <motion.div
      className={className}
      style={{
        x: offsetX,
        y: offsetY
      }}
    >
      {element}
    </motion.div>
  );
};

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
      {items.map(({ id, className, factor, element }) => (
        <FloatingItemComponent
          key={id}
          className={className}
          factor={factor}
          element={element}
          springX={springX}
          springY={springY}
        />
      ))}
    </>
  );
};

export default FloatingBackground;
