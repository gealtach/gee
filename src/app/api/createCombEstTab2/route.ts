import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const newRow = await prisma.rowCombEst2.create({
            data: {
                ref: body.ref,
                combustivel: body.combustivel,
                unidade: body.unidade,
                CO2: body.CO2,
                CH4: body.CH4,
                N2O: body.N2O,
                type: body.type
            }
        });
        return NextResponse.json(newRow, { status: 201 });        
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}