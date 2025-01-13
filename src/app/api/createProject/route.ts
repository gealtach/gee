import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Leer el cuerpo de la solicitud como JSON
    const body = await request.json();

    // Validar que los campos requeridos existen
    if (!body.name || !body.type || !body.userId) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: name, type, userId" },
        { status: 400 }
      );
    }
    const newProject = await prisma.projetos.create({
      data: {
        name: body.name,
        type: body.type,
        userId: body.userId,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
