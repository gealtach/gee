import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.dataCombMovel.findMany();
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}