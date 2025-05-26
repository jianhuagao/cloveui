'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MdxContentProps {
  mdxSource: MDXRemoteSerializeResult;
  mdxComponents?: Record<string, React.ComponentType<unknown>>;
  mdxScope?: Record<string, unknown>;
}

export default function MdxContent({ mdxSource, mdxComponents = {}, mdxScope = {} }: MdxContentProps) {
  return <MDXRemote {...mdxSource} components={mdxComponents} scope={mdxScope} />;
}
