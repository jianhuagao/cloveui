'use client';

import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

const animationVariants = {
  hidden: { opacity: 0, transform: 'scale(0.98)' },
  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      duration: 1,
      delayChildren: 0.1,
      staggerChildren: 0.2
    }
  }
};

const ChildVariants = {
  hidden: { opacity: 0, transform: 'scale(0.98)' },
  visible: { opacity: 1, transform: 'scale(1)', transition: { duration: 0.2 } }
};

const AnimatedShow = ({ children, className }: { children: React.ReactNode[]; className?: string }) => {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setIsVisible(true), 100); // 延迟以避免初次显示
    return () => clearTimeout(timer); // 清理定时器
  }, []);

  if (!isClient) return null; // 确保在客户端渲染

  return (
    <motion.div initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={animationVariants} className={className}>
      {children.map((child, index) => (
        <motion.span key={index} variants={ChildVariants}>
          {child}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default memo(AnimatedShow);
