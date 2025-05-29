'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface EmojiHoverCardProps {
  emojis: string[];
  href: string;
  title: string;
  description: string;
}

const cardClassName =
  'relative cursor-pointer block rounded-3xl border border-gray-200 bg-white/10 p-6 shadow-lg backdrop-blur-lg transition-transform select-none hover:scale-105 hover:border-purple-400 hover:bg-white/20 hover:shadow-xl dark:border-white/20';

export default function EmojiHoverCard({ emojis, href, title, description }: EmojiHoverCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovering) {
      interval = setInterval(() => {
        setIndex(prev => (prev + 1) % emojis.length);
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isHovering, emojis.length]);

  return (
    <Link
      href={href}
      target="_blank"
      className={cardClassName}
      onMouseEnter={() => {
        setIsHovering(true);
        setIndex(prev => (prev + 1) % emojis.length); // 悬浮立刻切换
      }}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative mb-4 h-10 w-10 text-3xl">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {emojis[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <h3 className="mb-2 text-xl font-semibold dark:text-white">{title}</h3>
      <p className="text-sm text-black/80 dark:text-white/80">{description}</p>
      <div className="absolute right-4 bottom-4 text-sm text-black/40 dark:text-white/40">→</div>
    </Link>
  );
}
