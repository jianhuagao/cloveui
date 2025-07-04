export function componentPreviewHtml(
  componentHtml: string,
  innerWrapper: string = 'relative',
  isDarkMode: boolean = false,
  isRtl: boolean = false
): string {
  const htmlClass = isDarkMode ? 'dark' : 'relative';
  const htmlDirection = isRtl ? 'rtl' : 'ltr';
  const version = process.env.NEXT_PUBLIC_BUILD_VERSION;
  const cssHref = `/components.css?v=${version || '0'}`;

  return `
    <html class="${htmlClass}" dir="${htmlDirection}">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" />

        <script>
          document.addEventListener('DOMContentLoaded', function () {
            const iframeLinks = [...document.querySelectorAll('a')];
            const iframeForms = [...document.querySelectorAll('form')];

            iframeLinks.forEach(function (iframeLink) {
              iframeLink.addEventListener('click', (e) => e.preventDefault());
            });

            iframeForms.forEach(function (iframeForm) {
              iframeForm.addEventListener('submit', (e) => e.preventDefault());
            });
          });
        </script>

        <style>
            ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
              background: transparent;
            }

            ::-webkit-scrollbar-thumb {
              border-radius: 6px;
              background-color: #b9b9b9c2;
              background-clip: content-box;
              border: 1px solid transparent;
            }

            ::-webkit-scrollbar-corner {
              background: transparent;
            }
        </style>

        <link href="${cssHref}" rel="stylesheet">

      </head>

      <body class="${innerWrapper} font-sans antialiased">
        ${componentHtml}
      </body>
    </html>
  `;
}

export function componentPreviewJsx(componentHtml: string): string {
  return componentHtml
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/viewBox=/g, 'viewBox=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/tabindex=/g, 'tabIndex=')
    .replace(/<!--/g, '{/*')
    .replace(/-->/g, '*/}');
}

export function componentPreviewVue(componentHtml: string): string {
  const newComponentHtml = `<template>\n${componentHtml}</template>`;
  const formattedComponentHtml = newComponentHtml
    .split('\n')
    .map(codeLine => {
      if (codeLine.includes('<template>') || codeLine.includes('</template>')) {
        return codeLine.trim();
      }

      return `  ${codeLine}`;
    })
    .join('\n');

  return formattedComponentHtml;
}
