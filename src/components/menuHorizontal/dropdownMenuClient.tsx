'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MenuItemProps } from '../menu';
import Link from 'next/link';
import { useDropdownMenu } from './dropdownMenuContext';
import clsx from 'clsx';

interface DropdownMenuClientProps {
  id: string;
  buttonLabel: string;
  items: MenuItemProps[];
}

export default function DropdownMenuClient({ id, buttonLabel, items }: DropdownMenuClientProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { openId, setOpenId } = useDropdownMenu();

  const isOpen = openId === id;

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    }
    setOpenId(isOpen ? null : id);
  };

  useEffect(() => {
    const hide = () => setOpenId(null);
    window.addEventListener('click', hide);
    return () => window.removeEventListener('click', hide);
  }, [setOpenId]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={clsx(
          isOpen && 'bg-gray-500/15 dark:bg-white/20',
          'cursor-pointer rounded-[10px] px-2 py-1 transition-all hover:bg-gray-500/15 dark:hover:bg-white/20'
        )}
      >
        {buttonLabel}
      </button>
      {isOpen &&
        createPortal(
          <div
            className="fixed z-[9999] w-56 rounded-2xl bg-white/60 p-3 text-sm text-gray-700 shadow-2xl ring-1 ring-gray-400/10 backdrop-blur-2xl dark:bg-black/20 dark:text-white dark:ring-white/10"
            style={{ top: position.top, left: position.left }}
          >
            {items.map(({ slug, title }) => {
              const url = `/docs/comp/${slug}`;
              return (
                <Link
                  href={url}
                  key={title}
                  className="group relative flex h-10 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-lg p-2 transition-all duration-300 ease-in-out select-none hover:bg-gray-500/15 active:scale-90 dark:ring-white/30 dark:hover:bg-white/20"
                >
                  {title}
                </Link>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
