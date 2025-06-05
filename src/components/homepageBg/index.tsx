import AnimatedVis from '../framerMotions/animatedVis';
import FloatingBackground from '../framerMotions/floatingBackground';
import Image from 'next/image';

export default function HomepageBg() {
  return (
    <div className="absolute top-0 left-0 -z-10 h-screen w-full bg-[url(/grid.svg)] [mask-image:linear-gradient(180deg,white_1%,rgba(255,255,255,0)_98%)] bg-center dark:bg-[url(/gridDark.svg)]">
      <AnimatedVis className="h-full">
        <FloatingBackground
          items={[
            {
              id: 1,
              top: '12%',
              left: '20%',
              factor: 8,
              element: (
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="44" viewBox="0 0 640 512">
                  <path
                    fill="#3b82f6"
                    d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6m80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3l89.3 89.4l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3"
                  />
                </svg>
              )
            },
            {
              id: 2,
              top: '22%',
              right: '22%',
              factor: 15,
              element: (
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="#818cf8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m9.738 10.78l-3.891 3.977c-1.17 1.196-1.755 1.794-1.834 2.523q-.026.232 0 .464c.08.73.664 1.327 1.834 2.523l.149.152c.624.639.937.958 1.31 1.172q.328.188.689.291c.413.118.856.118 1.743.118c.886 0 1.33 0 1.743-.118q.361-.104.688-.29c.374-.215.686-.534 1.31-1.173l2.845-2.907M9.738 10.78l3.582-3.657C14.706 5.708 15.4 5 16.263 5s1.555.708 2.941 2.125l.743.76C21.316 9.283 22 9.983 22 10.85s-.685 1.566-2.054 2.964l-3.622 3.698M9.738 10.78l6.586 6.732M5.5 2l.258.697c.338.914.507 1.371.84 1.704c.334.334.791.503 1.705.841L9 5.5l-.697.258c-.914.338-1.371.507-1.704.84c-.334.334-.503.791-.841 1.705L5.5 9l-.258-.697c-.338-.914-.507-1.371-.84-1.704c-.334-.334-.791-.503-1.705-.841L2 5.5l.697-.258c.914-.338 1.371-.507 1.704-.84c.334-.334.503-.791.841-1.705z"
                    color="#818cf8"
                  />
                </svg>
              )
            },
            {
              id: 3,
              top: '32%',
              left: '15%',
              factor: 20,
              element: (
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24">
                  <path
                    fill="#ec4899"
                    d="M20 11h3v2h-3zM1 11h3v2H1zM13 1v3h-2V1zM4.92 3.5l2.13 2.14l-1.42 1.41L3.5 4.93zm12.03 2.13l2.12-2.13l1.43 1.43l-2.13 2.12zM12 6a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.8c-1.79-1.04-3-2.98-3-5.2a6 6 0 0 1 6-6m2 15v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1zm-3-3h2v-2.13c1.73-.44 3-2.01 3-3.87a4 4 0 0 0-4-4a4 4 0 0 0-4 4c0 1.86 1.27 3.43 3 3.87z"
                  />
                </svg>
              )
            },
            {
              id: 4,
              top: '32%',
              right: '18%',
              factor: 10,
              element: (
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24">
                  <path
                    fill="#fde047"
                    fillRule="evenodd"
                    d="M15.597 11.082c.11.29.39.49.7.49s.59-.2.7-.49l.27-.72c.3-.8.45-1.2.66-1.41c.208-.208.602-.357 1.406-.66l.024-.01l.7-.26c.29-.11.49-.39.49-.7s-.2-.59-.49-.7l-.72-.27c-.8-.3-1.2-.45-1.41-.66c-.208-.208-.357-.603-.662-1.408l-.008-.022l-.26-.7a.76.76 0 0 0-.7-.49c-.31 0-.59.2-.7.49l-.27.72c-.3.8-.45 1.2-.66 1.41c-.208.208-.603.358-1.408.662l-.022.008l-.7.26c-.29.11-.49.39-.49.7s.2.59.49.7l.72.27c.8.3 1.2.45 1.41.66c.208.208.357.603.662 1.408l.008.022zm.13-3.19c-.23-.24-.5-.41-.85-.57c.34-.16.61-.33.85-.57c.24-.23.41-.5.57-.85c.16.34.33.61.57.85c.23.24.5.41.85.57c-.34.16-.61.33-.85.57c-.24.23-.41.5-.57.85c-.16-.34-.33-.61-.57-.85m-3.93 11.68c-4.27 0-7.75-3.48-7.75-7.75s3.48-7.75 7.75-7.75c.41 0 .75.34.75.75s-.34.75-.75.75c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25s6.25-2.8 6.25-6.25c0-.41.34-.75.75-.75s.75.34.75.75a7.7 7.7 0 0 1-1.77 4.921l3.55 3.55c.29.29.29.77 0 1.06c-.15.15-.34.22-.53.22s-.38-.07-.53-.22l-3.55-3.55a7.7 7.7 0 0 1-4.92 1.77"
                    color="#fde047"
                  />
                </svg>
              )
            },
            {
              id: 5,
              top: '45%',
              left: '29%',
              factor: 25,
              element: (
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24">
                  <g fill="none" stroke="#a855f7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <circle cx="12" cy="32" r="6" fill="#a855f7" fillOpacity=".3">
                      <animate fill="freeze" attributeName="cy" dur="0.6s" values="32;12" />
                    </circle>
                    <g>
                      <path strokeDasharray="2" strokeDashoffset="2" d="M12 19v1M19 12h1M12 5v-1M5 12h-1">
                        <animate
                          fill="freeze"
                          attributeName="d"
                          begin="0.7s"
                          dur="0.2s"
                          values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
                        />
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="2;0" />
                      </path>
                      <path
                        strokeDasharray="2"
                        strokeDashoffset="2"
                        d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5"
                      >
                        <animate
                          fill="freeze"
                          attributeName="d"
                          begin="0.9s"
                          dur="0.2s"
                          values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
                        />
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="2;0" />
                      </path>
                      <animateTransform
                        attributeName="transform"
                        dur="30s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      />
                    </g>
                  </g>
                </svg>
              )
            },
            {
              id: 6,
              top: '42%',
              right: '11%',
              factor: 50,
              element: (
                <div>
                  <Image src="/rbt.png" width={560} height={560} alt="" />
                </div>
              )
            }
          ]}
        />
        <div></div>
      </AnimatedVis>
    </div>
  );
}
