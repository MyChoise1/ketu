import prismadb from "@/libs/prismadb";
import { sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.auth) {
    return new NextResponse("Session not found", { status: 401 });
  }

  try {
    const { address, city, state, country, zip, type, first_name, last_name, phone } = await req.json();

    if (!address || !city || !state || !country || !zip || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await prismadb.address.update({
      where: { id: parseInt(params.addressId) },
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

    return NextResponse.json({ message: "Address update successfully" });
  } catch (error) {
    console.error("Error Address PUT: ", error);
    return new NextResponse(error.message || "An error occurred");
  }
}

export async function DELETE(_, { params }) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.auth) {
    return new NextResponse("Session not found", { status: 401 });
  }

  try {
    await prismadb.address.delete({
      where: { id: params.addressId },
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error Address DELETE: ", error);
    return new NextResponse(error.message || "An error occurred");
  }
}
