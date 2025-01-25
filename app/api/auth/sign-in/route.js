import prismadb from "@/libs/prismadb";
import { sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  const { email, password } = await req.json();

  const user = await prismadb.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return new NextResponse("User Does Not Exist", { status: 404 });
  }

  if (comparePassword(password, user.password)) {
    session.userId = user.id;
    session.isLoggedIn = true;
    session.type = "user";
    await session.save();
  }

  return NextResponse.json({ username: session.username });
}
