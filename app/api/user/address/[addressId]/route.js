export async function PUT(req, { params }) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.auth) {
    return new NextResponse("Session not found", { status: 401 });
  }

  try {
    const { address, city, state, country, zip, type } = await req.json();

    if (!address || !city || !state || !country || !zip || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await prismadb.address.update({
      where: { id: params.addressId },
      data: {
        userId: session.auth.userId,
        address,
        city,
        state,
        country,
        zip,
        type,
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
