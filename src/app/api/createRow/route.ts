import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Leer el cuerpo de la solicitud como JSON
    const body = await request.json();
   
    if(body.unidade === 'N/A' || body.co2unidade === 'N/A' || body.ch4unidade === 'N/A' || body.n2ounidade === 'N/A'){
        const newRow = await prisma.rows.create({
            data: {
              instalacao: body.instalacao,
              fonte: body.fonte,
              combustivel: body.combustivel,
              qtd: body.qtd,
              unidade: body.unidade,
              co2unidade: body.co2unidade,
              ch4unidade: body.ch4unidade,
              n2ounidade: body.n2ounidade,
              co2tons: body.co2unidade,
              ch4tons: body.ch4unidade,
              n2otons: body.n2ounidade,
              totais: body.unidade,
              projetoId: body.projetoId
            },
          });
        return NextResponse.json(newRow, { status: 201 });
    }
    else{
        const co2tons = (parseFloat(body.co2unidade) * parseFloat(body.qtd)).toFixed(3);
        const ch4tons = (parseFloat(body.ch4unidade) * parseFloat(body.qtd)).toFixed(3);
        const n2otons = (parseFloat(body.n2ounidade) * parseFloat(body.qtd)).toFixed(3);
        const totais = (parseFloat(body.co2unidade) + parseFloat(body.ch4unidade) + parseFloat(body.n2ounidade)).toFixed(3);
        const newRow = await prisma.rows.create({
            data: {
              instalacao: body.instalacao,
              fonte: body.fonte,
              combustivel: body.combustivel,
              qtd: body.qtd,
              unidade: body.unidade,
              co2unidade: body.co2unidade.toString(),
              ch4unidade: body.ch4unidade.toString(),
              n2ounidade: body.n2ounidade.toString(),
              co2tons: co2tons.toString(),
              ch4tons: ch4tons.toString(),
              n2otons: n2otons.toString(),
              totais: totais.toString(),
              projetoId: body.projetoId
            },
          }); 
        return NextResponse.json(newRow, { status: 201 });
    }

  } catch (error) {
    console.error("Error al crear la fila:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
