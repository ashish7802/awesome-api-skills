import { trpc } from '../utils/trpc';
export function UserProfile() {
  const user = trpc.getUser.useQuery('id_123');
  if (user.isLoading) return <div>Loading...</div>;
  return <div>{user.data?.name}</div>;
}