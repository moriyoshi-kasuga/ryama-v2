import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const documents = await prisma.document.findMany();
  return NextResponse.json(documents);
}

export async function document(request: NextRequest) {
  const { name, content } = await request.json();

  const document = await prisma.document.create({
    data: {
      name,
      content,
    },
  });

  return NextResponse.json(document);
}
