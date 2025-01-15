import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newData = await prisma.dataCombMovel.create({
            data: {
                combustivel: body.combustivel,
                unidade: body.unidade,
                kgCO2: body.kgCO2,
                kgCH4: body.kgCH4,
                kgN2O: body.kgN2O
            }
        })
        return NextResponse.json(newData, { status: 201 })
    } catch (error) {
        console.error("Error al crear Data:", error);
        return NextResponse.json(
          { error: "Error interno del servidor" },
          { status: 500 }
        );
    }
}