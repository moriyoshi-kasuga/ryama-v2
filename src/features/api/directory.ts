import prisma from '@/lib/prismadb';

export const directoriesUpdate = async (parentId: string) => {
  try {
    await prisma.directory.update({
      where: {
        id: parentId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
    const id = (
      await prisma.directory.findUnique({
        where: {
          id: parentId,
        },
        select: {
          parentId: true,
        },
      })
    )?.parentId;
    if (!id) {
      return;
    }
    directoriesUpdate(id);
  } catch (err: any) {
    return;
  }
};
