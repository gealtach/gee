export const dynamic = "force-dynamic";
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const getUsers = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            role: true
          },
    });
    return NextResponse.json(getUsers, { status: 201 });
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
