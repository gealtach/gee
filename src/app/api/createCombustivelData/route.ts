import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const newCombustivel = await prisma.combustivelData.create({
        data: {
            nome: body.nome,
            unidade: body.unidade,
            kgCO2: body.kgCO2,
            kgCH4: body.kgCH4,
            kgN2O: body.kgN2O,
            categoria: body.categoria
        }
    });
    return NextResponse.json(newCombustivel, { status: 201 });
  } catch (error) {
    console.error("Error al crear la combustivel:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
