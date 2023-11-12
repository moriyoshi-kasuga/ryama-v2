import { ensureAuthenticated } from '@/features/api/utils';
import { put } from '@vercel/blob';

export const POST = async (req: Request) => {
  return ensureAuthenticated(async (session) => {
    const blob = await put('avatar/' + session.id, req.body!, {
      access: 'public',
      addRandomSuffix: false,
    });
    return Response.json(blob);
  });
};
