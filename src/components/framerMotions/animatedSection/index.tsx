'use client';

import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

const animationVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      delayChildren: 0.1,
      staggerChildren: 0.2
    }
  }
};

const ChildVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1 } }
};

const AnimatedSection = ({ children, className }: { children: React.ReactNode[]; className?: string }) => {
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

export default memo(AnimatedSection);
