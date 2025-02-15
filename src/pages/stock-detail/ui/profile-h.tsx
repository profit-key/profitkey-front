type ProfileProps = {
  username: string;
};

export function ProfileH({ username }: ProfileProps): JSX.Element {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="m-2 h-9 w-9 rounded-full bg-neutral-200"></div>
      <p className="truncate text-base font-bold">{username}</p>
    </div>
  );
}
