export const dynamic = "force-dynamic";
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    if(categoria){
        const combustivels = await prisma.combustivelData.findMany({
            where: { categoria : categoria }
        })
        return NextResponse.json(combustivels, { status: 201 });
    }
    else{
        const combustivels = await prisma.combustivelData.findMany(); 
        return NextResponse.json(combustivels, { status: 201 });
    }
  } catch (error) {
    console.error("Error al traer combustibles:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
