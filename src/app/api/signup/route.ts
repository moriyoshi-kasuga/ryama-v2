import bcrypt from 'bcrypt';

import prismadb from '@/lib/prismadb';

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prismadb.user.findUnique({ where: { email } });

    if (existingUser) {
      return Response.json({ message: 'Email taken' }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
        directory: {
          create: {
            name: 'explorer',
            isExplorer: true,
          },
        },
      },
    });

    return Response.json({ user }, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
