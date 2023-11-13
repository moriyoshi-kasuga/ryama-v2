import bcrypt from 'bcrypt';

import prismadb from '@/lib/prismadb';

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prismadb.user.findUnique({ where: { email } });

    if (existingUser) {
      return Response.json(
        { message: 'Aleady registered this email' },
        { status: 422 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const avator = await fetch(
      'https://ui-avatars.com/api/?background=random&size=96&format=svg&name=' +
        name,
    ).then((res) => res.blob());

    const imageUrl = await fetch('/api/avatar', {
      method: 'POST',
      body: avator,
    })
      .then((res) => res.json())
      .then((res) => res.url as string);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: imageUrl,
      },
    });

    return Response.json({ user }, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
