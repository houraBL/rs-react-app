import { ClientOnly } from './client';

export function generateStaticParams() {
  return [{ slug: [''] }, { slug: ['/'] }, { slug: ['/about'] }];
}

export default function Page() {
  return <ClientOnly />;
}
