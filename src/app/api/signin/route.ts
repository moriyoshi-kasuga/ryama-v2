import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';

// ログインAPI
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return NextResponse.json({ message: 'user not found' }, { status: 404 });

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid)
      return NextResponse.json(
        { message: 'password is missing' },
        { status: 401 },
      );

    return NextResponse.json(
      { message: 'signin successful', user },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
