import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();
export async function POST() {

    const bank = await prisma.bank.findFirst(
        { where: {bankNumber: 9999997},
        
    }
    )
    return NextResponse.json({ bank }, { status: 200 });


}
