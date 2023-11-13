import supabase from '@/lib/supabase';
import { ensureAuthenticated } from '@/features/api/utils';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return Response.json({ message: 'id is required' }, { status: 500 });
  }
  const avatar = supabase.storage.from('avatar').getPublicUrl(id);
  return Response.json(avatar.data.publicUrl);
};

export const POST = async (req: Request) => {
  return ensureAuthenticated(async (session) => {
    const avatar = await supabase.storage
      .from('avatar')
      .update(session.id, req.body!, { upsert: true });
    return Response.json({ url: avatar.data?.path });
  });
};
