import HomePage from '@/pages/HomePage';

export default async function Page({ params }: { params: { pageId: string } }) {
  const { pageId } = await params;
  return <HomePage pageId={pageId} />;
}
