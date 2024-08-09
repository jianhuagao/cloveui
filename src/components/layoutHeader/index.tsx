import { memo } from 'react';
import DarkSwitch from '../darkSwitch';
import GithubIcon from '../githubIcon';

export default memo(function Header() {
  return (
    <header className="z-50 flex h-16 items-center bg-[#f4f4f5] px-4 dark:bg-[#18181b]">
      <h1>CloveUI</h1>
      <div className="ml-auto mr-2">
        <DarkSwitch />
      </div>
      <GithubIcon />
    </header>
  );
});
