type MainLoaderProps = {
  color?: string;
};

export default function MainLoader({ color }: MainLoaderProps) {
  return (
    <div className="flex flex-row gap-2" data-testid="main-loader">
      <div
        data-testid="bouncing-dot"
        className={`w-4 h-4 rounded-full animate-bounce ${color ?? 'dark:bg-white bg-blue-500'}`}
      ></div>
      <div
        data-testid="bouncing-dot"
        className={`w-4 h-4 rounded-full animate-bounce [animation-delay:-.3s] ${color ?? 'dark:bg-white bg-blue-500'}`}
      ></div>
      <div
        data-testid="bouncing-dot"
        className={`w-4 h-4 rounded-full animate-bounce [animation-delay:-.5s] ${color ?? 'dark:bg-white bg-blue-500'}`}
      ></div>
    </div>
  );
}
