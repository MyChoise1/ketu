export async function GET(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  if (!session) {
    return new NextResponse("Session not found", { status: 401 });
  }

  const user = await prismadb.users.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    session.destroy();
  }

  return Response.json(user);
}

export async function POST(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  if (!session) {
    return new NextResponse("Session not found", { status: 401 });
  }

  const { address, city, state, country, zip } = await req.json();

  if (!address || !city || !state || !country || !zip) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const { id } = await prismadb.address.create({
    data: {
      user_id: session.userId,
      address,
      city,
      state,
      country,
      zip,
    },
  });

  return NextResponse.json({
    message: "Address Created Successfully",
    address_id: id,
  });
}

export async function PUT(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  if (!session) {
    return new NextResponse("Session not found", { status: 401 });
  }

  const { address_id, address, city, state, country, zip } = await req.json();

  if (!address_id || !address || !city || !state || !country || !zip) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  await prismadb.address.update({
    where: {
      id: address_id,
    },
    data: {
      address,
      city,
      state,
      country,
      zip,
    },
  });

  return NextResponse.json({
    message: "Address Updated Successfully",
  });
}

export async function DELETE(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  if (!session) {
    return new NextResponse("Session not found", { status: 401 });
  }

  const { address_id } = await req.json();

  if (!address_id) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  await prismadb.address.delete({
    where: {
      id: address_id,
    },
  });

  return NextResponse.json({
    message: "Address Deleted Successfully",
  });
}
