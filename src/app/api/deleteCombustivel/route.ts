import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const deletedCombustivel = await prisma.combustivelData.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true, data: deletedCombustivel }, { status: 200 });
  } catch (error) {
    console.error('Error deleting row:', error);
    return NextResponse.json({ error: 'Failed to delete combustivel' }, { status: 500 });
  }
}
