import prismadb from "@/libs/prismadb";
import { sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { comparePassword } from "@/libs/crypto";

export async function POST(req) {
  try {
    const session = await getIronSession(cookies(), sessionOptions);

    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse(
        { status: false, message: "User Not Exists!" },
        { status: 404 }
      );
    }

    if (comparePassword(password, user.password)) {
      session.auth = {
        userId: user.id,
        type: user.type,
      };
      await session.save();
    }

    return NextResponse.json({ username: session.username });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
