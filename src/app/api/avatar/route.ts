import { head } from '@vercel/blob';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
	const blob = await head('avatar/' + req.nextUrl.searchParams.get('id'));
	return Response.json(blob);
};
