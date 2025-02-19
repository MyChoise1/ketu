import prismadb from "@/libs/prismadb";
import { sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.auth) {
    return new NextResponse("Session not found", { status: 401 });
  }
  try {
    const users = await prismadb.user.findMany({
        where: {
            type: "USER"
        }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error Address GET: ", error);
    return new NextResponse(error.message || "An error occurred");
  }
}