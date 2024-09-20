import { componentPreviewHtml, componentPreviewJsx, componentPreviewVue } from '@/utils/transformers';

export interface FetchHtmlReturn {
  textResponse: string;
  transformedHtml: string;
  transformedJsx: string;
  transformedVue: string;
}

export async function fetchHtml({
  url,
  innerWrapper,
  isDark = false
}: {
  url: string;
  innerWrapper?: string;
  isDark?: boolean;
}): Promise<FetchHtmlReturn> {
  const fetchResponse = await fetch(url);
  const textResponse = await fetchResponse.text();
  const transformedHtml = componentPreviewHtml(textResponse, innerWrapper, isDark);
  const transformedJsx = componentPreviewJsx(textResponse);
  const transformedVue = componentPreviewVue(textResponse);

  return {
    textResponse,
    transformedHtml,
    transformedJsx,
    transformedVue
  };
}
