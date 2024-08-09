import { memo } from 'react';
import DarkSwitch from '../darkSwitch';
import GithubIcon from '../githubIcon';

export default memo(function Header() {
  return (
    <header className="z-50 bg-[#f4f4f5] dark:bg-[#18181b]">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <h1>CloveUI</h1>
        <div className="ml-auto mr-2">
          <DarkSwitch />
        </div>
        <GithubIcon />
      </div>
    </header>
  );
});
