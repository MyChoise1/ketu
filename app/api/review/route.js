import { sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);

    if (!session) {
      return new NextResponse("Session not found", { status: 401 });
    }

    const { product_id, rating, review } = await req.json();

    if (!product_id || !rating || !review) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const { id } = await prismadb.review.create({
      data: {
        user_id: session.userId,
        product_id,
        rating,
        review,
      },
    });

    return NextResponse.json({
      message: "Review Created Successfully",
      review_id: id,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message || "An error occurred");
  }
}

export async function DELETE(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);

    if (!session) {
      return new NextResponse("Session not found", { status: 401 });
    }

    const { review_id } = await req.json();

    if (!review_id) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await prismadb.review.delete({
      where: {
        id: review_id,
      },
    });

    return NextResponse.json({
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message || "An error occurred");
  }
}
