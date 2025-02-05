import prismadb from "@/libs/prismadb";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.auth) {
    return new NextResponse("Session not found", { status: 401 });
  }

  try{
    const user = await prismadb.user.findFirst({
      where: {
        id: session.auth.userId,
      },
    });
  
    if (!user) {
      session.destroy();
    }
    return NextResponse.json(user);
  }catch( err) {
    console.error("Error fetching user: ", err);
    return new NextResponse("Error fetching user", { status: 500 });
  }
}
