import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { hashPassword } from "@/libs/crypto";

export async function POST(req) {
  try {
    const { email, password, type } = await req.json();

    if (!email || !password || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await prismadb.user.findFirst({ where: { email } });

    if (user) new NextResponse("User already exists", { status: 409 });

    const hashedPassword = await hashPassword(password);

    await prismadb.user.create({
      data: {
        email,
        password: hashedPassword,
        type,
      },
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return new NextResponse(err.message || "Internal Server Error");
  }
}