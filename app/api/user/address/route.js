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
    const addresses = await prismadb.address.findFirst({
      where: {
        userId: session.auth.userId,
      },
      include: { user: true },
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("Error Address GET: ", error);
    return new NextResponse(error.message || "An error occurred");
  }
}

export async function POST(req) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.auth) {
    return new NextResponse("Session not found", { status: 401 });
  }

  try {
    const { address, city, state, country, zip, type, first_name, last_name, phone } = await req.json();

    if (!address || !city || !state || !country || !zip || !type ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await prismadb.address.create({
      data: {
        userId: session.auth.userId,
        address,
        city,
        state,
        country,
        zip,
        type,
        first_name,
        last_name,
        phone
      },
    });

    return NextResponse.json({ message: "Address created successfully" });
  } catch (error) {
    console.error("Error Address POST: ", error);
    return new NextResponse(error.message || "An error occurred");
  }
}
