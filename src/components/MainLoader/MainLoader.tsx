export default function MainLoader() {
  return (
    <div className="flex flex-row gap-2" data-testid="main-loader">
      <div
        data-testid="bouncing-dot"
        className="w-4 h-4 rounded-full bg-blue-500 animate-bounce "
      ></div>
      <div
        data-testid="bouncing-dot"
        className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"
      ></div>
      <div
        data-testid="bouncing-dot"
        className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"
      ></div>
    </div>
  );
}
