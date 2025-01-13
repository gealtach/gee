import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const admId = searchParams.get('adm');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    if(admId){
        const imAdm = await prisma.user.findUnique({
            where: { id: admId }
        });
        if(imAdm?.role === '2'){
            const deletedUser = await prisma.user.delete({
                where: { id: id },
              });
              return NextResponse.json({ success: true, data: deletedUser }, { status: 200 });
        }
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}