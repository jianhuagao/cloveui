import { memo } from 'react';
import DarkSwitch from '../darkSwitch';
import GithubIcon from '../githubIcon';
import LogoBlock from '../logoBlock';

export default memo(function Header() {
  return (
    <header className="z-50">
      <div className="mx-auto flex h-24 items-center px-5 sm:px-20">
        <LogoBlock />
        <div className="mr-2 ml-auto">
          <DarkSwitch />
        </div>
        <GithubIcon />
      </div>
    </header>
  );
});
