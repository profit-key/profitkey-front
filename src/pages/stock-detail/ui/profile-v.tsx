type ProfileProps = {
  username: string;
};

export function ProfileV({ username }: ProfileProps): JSX.Element {
  return (
    <div className="flex max-w-[128px] flex-col items-center justify-center">
      <div className="m-2 h-9 w-9 rounded-full bg-neutral-200"></div>
      <p className="w-full truncate text-center text-base font-bold">
        {username}
      </p>
    </div>
  );
}
