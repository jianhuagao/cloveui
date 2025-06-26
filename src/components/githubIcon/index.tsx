import { memo } from 'react';
import Image from 'next/image';

export default memo(function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <a href="https://github.com/jianhuagao/TwinkleUI" target="_blank">
      <Image className="dark:invert" src="/icons/github.svg" width={size} height={size} alt="" />
    </a>
  );
});
