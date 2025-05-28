import clsx from 'clsx';
import { memo, useState, useRef, useEffect } from 'react';

interface ResizeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export default memo(function ResizeBlock({ children, className }: ResizeBlockProps) {
  const [width, setWidth] = useState('100%'); // 初始宽度为 100%
  const resizableRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);
  const overlayDivRef = useRef<HTMLDivElement | null>(undefined);

  const handleMouseDown = () => {
    isResizingRef.current = true;
    // 禁用文本选择并设置鼠标样式为 ew-resize
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ew-resize';

    // 创建一个覆盖 iframe 的透明 div 解决拖动的时候会拖动到iframe的问题
    const overlayDiv = document.createElement('div');
    overlayDiv.style.position = 'fixed';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.zIndex = '9999';
    overlayDiv.style.cursor = 'ew-resize';
    document.body.appendChild(overlayDiv);

    // 保存 overlayDiv 以便后续移除
    overlayDivRef.current = overlayDiv;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current || !resizableRef.current) return;

    const containerWidth = resizableRef.current.parentElement?.getBoundingClientRect().width || 0;
    let newWidth = e.clientX - resizableRef.current.getBoundingClientRect().left;

    // 限制宽度在 360px 和 100% 之间
    if (newWidth < 360) {
      newWidth = 360;
    } else if (newWidth >= containerWidth) {
      setWidth('100%');
      return;
    }

    setWidth(`${newWidth}px`);
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    // 恢复文本选择和默认鼠标样式
    document.body.style.userSelect = '';
    document.body.style.cursor = '';

    // 移除覆盖 iframe 的透明 div
    if (overlayDivRef.current && document.body.contains(overlayDivRef.current)) {
      document.body.removeChild(overlayDivRef.current);
    }
    overlayDivRef.current = null;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={resizableRef}
      style={{ width }}
      className={clsx(className, 'relative rounded-xl bg-[#f4f4f5]/60 dark:bg-white/5')}
    >
      <div
        className="group absolute top-1/2 -right-[18px] h-16 -translate-y-1/2 cursor-e-resize p-2"
        onMouseDown={handleMouseDown}
      >
        <div className="h-full w-[6px] rounded-full bg-black/10 group-hover:scale-110 group-hover:bg-black/45 dark:bg-white/20 dark:group-hover:bg-white/45"></div>
      </div>
      {children}
    </div>
  );
});
