'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MdxContentProps {
  mdxSource: MDXRemoteSerializeResult;
  mdxComponents?: Record<string, React.ComponentType<any>>;
  mdxScope?: Record<string, any>;
}

export default function MdxContent({ mdxSource, mdxComponents = {}, mdxScope = {} }: MdxContentProps) {
  return <MDXRemote {...mdxSource} components={mdxComponents} scope={mdxScope} />;
}
