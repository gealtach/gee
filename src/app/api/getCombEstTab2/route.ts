import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.rowCombEst2.findMany();
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Error Interno del Servidor'},
            { status: 500 }
        )
    }
}