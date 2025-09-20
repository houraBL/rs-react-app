import HomePage from '@/pages/HomePage';

export default async function Page({
  params,
}: {
  params: { pageId: string; detailsId: string };
}) {
  const { pageId, detailsId } = await params;
  return <HomePage pageId={pageId} detailsId={detailsId} />;
}
