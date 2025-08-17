import Link from 'next/link';

export default function NotFound() {
  const linkClassName =
    'px-2 text-lg font-bold hover:cursor-pointer inline-flex rounded-full px-3 py-1.5 bg-blue-500' +
    ' hover:bg-blue-600 ';
  return (
    <div className="p-4 flex flex-col gap-2 items-center justify-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <Link href={'/'} className={linkClassName}>
        Back home
      </Link>
    </div>
  );
}
