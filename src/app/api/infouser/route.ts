    import { NextResponse } from "next/server";
    import { cookies } from "next/headers";
   import jwt from "jsonwebtoken"


    export async function POST() {
        const cookie = (await cookies()).get('token'); 
        if(!cookie){
            NextResponse.json({ error: "JWT inválido!" }, { status: 400 });
        }

        const decoded = jwt.verify(cookie?.value as string, process.env.JWT_SECRET as string);
        const User = await prisma.user.findFirst({
            where: {id: decoded?.id},   
            select:{
                password: true
            }
        }) 
    if(!User){
        NextResponse.json({ error: "Usuário não encontrado!" }, { status: 400 });
    }
    return NextResponse.json({ message: "User capturado: "+ User?.password, dados: User?.password }, { status: 200 });


    }
