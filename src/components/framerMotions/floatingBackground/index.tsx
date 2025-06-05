// components/FloatingBackground.tsx
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

type FloatingItem = {
  id: string | number;
  className?: string;
  factor?: number;
  scaleFactor?: number; // 👈 新增缩放因子
  element: ReactNode;
};

type FloatingBackgroundProps = {
  items: FloatingItem[];
};

const FloatingItemComponent = ({
  className,
  factor = 10,
  scaleFactor,
  element,
  springX,
  springY
}: {
  className?: string;
  factor?: number;
  scaleFactor?: number;
  element: ReactNode;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) => {
  const offsetX = useTransform(springX, v => v * factor);
  const offsetY = useTransform(springY, v => v * factor);

  // ✅ 始终调用 useTransform
  const scale = useTransform([springX, springY], ([x, y]: number[]) => {
    const distance = Math.sqrt(x * x + y * y);
    return 1 + distance * (scaleFactor ?? 0); // 若未传 scaleFactor，则为 0，不缩放
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
      {items.map(({ id, className, factor, element, scaleFactor }) => (
        <FloatingItemComponent
          key={id}
          scaleFactor={scaleFactor}
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
