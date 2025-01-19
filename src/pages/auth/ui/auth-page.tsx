import { useQueryState } from 'nuqs';

export function AuthPage() {
  const [code] = useQueryState('code');
  return <div>code: {code}</div>;
}
