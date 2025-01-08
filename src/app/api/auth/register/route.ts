import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest){
    try {
        const data = await request.json();
        //verify all data is here
        if (!data || !data.email || !data.password || !data.name || !data.role) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        //verify the email does not exist in dB
        const existUser = await prisma.user.findUnique({
            where: { email: data.email}
        })
        if(existUser){
            return NextResponse.json({message: 'User already exist'}, { status: 400 })
        }
        //hash password with bcrypt
        const hashedPassword = await bcrypt.hash(data.password, 10);
        //create a newUser
        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role,
                passwdRecovery: "",
            }
        });
        //hide a passwd to send it to front
        const { password: _, ...user } = newUser;
        return NextResponse.json(
            { message: "User created successfully", user: user },
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