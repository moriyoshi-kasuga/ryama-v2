import { authOptions } from '@/lib/authOptions';
import { Session, getServerSession } from 'next-auth';

export const ensureAuthenticated = async (
  func: (session: Session) => Promise<Response>,
): Promise<Response> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    const message = 'Unauthorized';
    if (process.env.NODE_ENV == 'development') {
      console.log(message);
    }
    return Response.json({ message }, { status: 401 });
  }
  try {
    return func(session);
  } catch (err: any) {
    const message = err.message;
    if (process.env.NODE_ENV == 'development') {
      console.log(message);
    }
    return Response.json({ message }, { status: 500 });
  }
};
