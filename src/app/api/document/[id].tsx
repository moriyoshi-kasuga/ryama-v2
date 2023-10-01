import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const document = await prisma.document.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(document);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { title, content } = await request.json();

  const document = await prisma.document.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json(document);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const document = await prisma.document.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(document);
}
