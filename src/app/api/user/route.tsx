import {NextRequest, NextResponse} from "next/server";
import {db} from "@/db/database";
import {UserRequestBody} from "@/db/customTypes";

export function GET() {
    return NextResponse.json(db.selectFrom('User').selectAll().executeTakeFirst())
}

export async function POST(request:NextRequest) {
    let requestBody:UserRequestBody = await request.json();
    if(requestBody.email) {
        return NextResponse.json(await db.selectFrom('User').selectAll().where('email', '=', requestBody.email).executeTakeFirst())
    } else if (requestBody.id != undefined) {
        return NextResponse.json(await db.selectFrom('User').selectAll().where('id', '=', requestBody.id).executeTakeFirst())
    }
    return NextResponse.json({},{
        status:404
    });
}