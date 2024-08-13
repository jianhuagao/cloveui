import { memo } from 'react';

export default memo(function CreatedBy({ creatorGithub }: { creatorGithub: string }) {
  return (
    <div className="text-sm">
      Created by{' '}
      <a href={`https://github.com/${creatorGithub}`} className="no-underline hover:underline" target="_blank" rel="noreferrer">
        @{creatorGithub}
      </a>
    </div>
  );
});
