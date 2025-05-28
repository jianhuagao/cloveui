'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

const animationVariants = {
  hidden: { opacity: 0, transform: 'scale(0.95)' },
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
  hidden: { opacity: 0, transform: 'scale(0.95)' },
  visible: { opacity: 1, transform: 'scale(1)', transition: { duration: 0.6 } }
};

const AnimatedShow = ({ children, className }: { children: React.ReactNode[]; className?: string }) => {
  return (
    <motion.div initial="hidden" whileInView="visible" variants={animationVariants} className={className}>
      {children.map((child, index) => (
        <motion.span key={index} variants={ChildVariants}>
          {child}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default memo(AnimatedShow);
