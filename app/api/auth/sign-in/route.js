import prismadb from "@/libs/prismadb";
import { sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

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
    return new NextResponse("User Does Not Exist", { status: 404 });
  }

  if (comparePassword(password, user.password)) {
    session.auth = {
      userId: user.id,
      type: user.type,
    };
    await session.save();
  }

  return NextResponse.json({ username: session.username });
}
