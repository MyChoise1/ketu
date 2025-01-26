import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { hashPassword } from "@/libs/crypto";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    const user = await prismadb.users.findFirst({ where: { email } });

    if (user) new NextResponse("User already exists", { status: 409 });

    const hashedPassword = await hashPassword(password);

    await prismadb.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return new NextResponse(err.message || "Internal Server Error");
  }
}
