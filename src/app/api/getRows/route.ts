export const dynamic = "force-dynamic";
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if(id){
      const rows = await prisma.rows.findMany({
        where: {
            projetoId: id,
        }
      });      
      return NextResponse.json(rows, { status: 201 });
    }
    else{
      return NextResponse.json(null);
    }
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
