// components/FloatingBackground.tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

type FloatingItem = {
  id: string | number;
  top?: string;
  left?: string;
  right?: string; // 可选，右侧偏移
  bottom?: string; // 可选，下侧偏移
  factor?: number; // 偏移强度
  element: ReactNode;
};

type FloatingBackgroundProps = {
  items: FloatingItem[];
};

const FloatingItemComponent = ({
  top,
  left,
  right,
  bottom,
  factor = 10,
  element,
  springX,
  springY
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  factor?: number;
  element: ReactNode;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) => {
  const offsetX = useTransform(springX, v => v * factor);
  const offsetY = useTransform(springY, v => v * factor);

  return (
    <motion.div
      className="absolute"
      style={{
        top,
        left,
        right,
        bottom,
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
      {items.map(({ id, top, left, right, bottom, factor, element }) => (
        <FloatingItemComponent
          key={id}
          top={top}
          left={left}
          right={right}
          bottom={bottom}
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
