export const dynamic = "force-dynamic";
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get('type');
    const projects = await prisma.projetos.findMany({
    
    })

    return NextResponse.json(projects, { status: 201 });
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
