'use client';

import { motion, transform } from 'framer-motion';
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div>{children}</div>;

  return (
    <motion.div initial="hidden" animate="visible" variants={animationVariants} className={className}>
      {children.map((child, index) => (
        <motion.span key={index} variants={ChildVariants}>
          {child}
        </motion.span>
      ))}
      {/* Continue with more elements */}
    </motion.div>
  );
};

export default memo(AnimatedShow);
