import { CONFIGS } from '@/lib/configs';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const res = await fetch(`${CONFIGS.BASE_API_URL}/users/${params.id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data = await res.json();

  return Response.json(data);
}
