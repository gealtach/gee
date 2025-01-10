import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        // Verify all data is here
        if (!data || !data.email || !data.password || !data.name || !data.role) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        // Verify the email does not exist in the database
        const existUser = await prisma.user.findUnique({
            where: { email: data.email }
        });
        if (existUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // Create a new user
        await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role,
                passwdRecovery: "",
            }
        });
        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error completo:', error);

        return NextResponse.json(
            {
                error: "Error creating user",
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
