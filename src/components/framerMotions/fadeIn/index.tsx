'use client';
import { memo, useMemo } from 'react';
import { HTMLMotionProps, Variants, motion } from 'framer-motion';

type TransitionType = 'spring' | 'tween' | 'inertia';
interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  offscreenX?: number;
  offscreenY?: number;
  onscreenX?: number;
  onscreenY?: number;
  /**
   *弹力,默认0.4,0为没有弹力
   * **/
  bounce?: number;
  type?: TransitionType;
  once?: boolean;
}

export default memo(function FadeIn({
  children,
  delay = 0,
  offscreenX = 0,
  offscreenY = 100,
  onscreenX = 0,
  onscreenY = 0,
  bounce = 0.4,
  once = false,
  type = 'spring',
  ...rest
}: FadeInProps) {
  const cardVariants: Variants = useMemo(
    () => ({
      offscreen: {
        y: offscreenY,
        x: offscreenX,
        opacity: 0
      },
      onscreen: {
        y: onscreenY,
        x: onscreenX,
        opacity: 1,
        transition: {
          delay,
          type,
          bounce,
          duration: 2
        }
      }
    }),
    [delay, offscreenX, offscreenY, onscreenX, onscreenY, bounce, type]
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{
        once,
        amount: 0
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
