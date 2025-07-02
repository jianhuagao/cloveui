'use client';

import { memo, useContext } from 'react';
import LayoutContext from '@/context/layoutContext';

export default memo(function LayoutModeSwitch() {
  const layoutContext = useContext(LayoutContext);

  if (!layoutContext) {
    throw new Error('useContext must be used within a LayoutProvider');
  }

  const { toggleLayout } = layoutContext;

  return (
    <button
      onClick={toggleLayout}
      className="inline-flex min-w-0 cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-sm font-semibold opacity-90 transition-all hover:bg-gray-500/10 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:hover:bg-gray-200/20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19.926 22.251v-1.559c0-.402.127-.794.338-1.137c1.494-2.426 1.964-5.028 1.636-6.042c-1.043-2.16-4.524-3.011-6.14-3.214l1.037-5.16c.174-.818-.446-1.642-1.383-1.84c-.938-.197-1.84.306-2.013 1.124l-2.055 9.666l-2.571-1.637s-1.295-1.036-2.335 0c-1.039 1.035 0 2.325 0 2.325l3.909 5.002c.251.322.398.713.42 1.12l.071 1.318M6.957 2.239s-.252 2.271 0 2.519m0 0c.326.32 2.602.05 2.602.05m-2.602-.05L10 1.748M5.045 9.252s.252-2.271 0-2.519m0 0c-.326-.321-2.602-.05-2.602-.05m2.602.05L2.001 9.741"
          color="currentColor"
        />
      </svg>
    </button>
  );
});
