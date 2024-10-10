import { memo } from 'react';
import DarkSwitch from '../darkSwitch';
import GithubIcon from '../githubIcon';

export default memo(function Header() {
  return (
    <header className="z-50">
      <div className="mx-auto flex h-24 items-center px-20">
        <h1></h1>
        <div className="ml-auto mr-2">
          <DarkSwitch />
        </div>
        <GithubIcon />
      </div>
    </header>
  );
});
