import { authCached } from '@/authCached';

export async function getCurrentUser() {
  const session = await authCached();
  return session?.user ?? null;
}