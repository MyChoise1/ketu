import { sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";

import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const product_id = url.searchParams.get("product_id");

    if (!product_id) {
      return new NextResponse("Missing product ID", { status: 400 });
    }

    const reviews = await prismadb.review.findMany({
      where: {
        productId: product_id, // Ensure correct type if it's a number
      },
    });

    return NextResponse.json(reviews);
  } catch (err) {
    console.error(err);
    return new NextResponse(err.message || "An error occurred", { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);

    if (!session) {
      return new NextResponse("Session not found", { status: 401 });
    }

    console.log(session);

    const { reviewerName, product_id, rating, review } = await req.json();

    if (!product_id || !review) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const { id } = await prismadb.review.create({
      data: {
        userId: session.auth.userId,
        productId: product_id,
        rating,
        review,
        reviewerName
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

    const url = new URL(req.url);
    const review_id = url.searchParams.get("review_id");

    if (!review_id) {
      return new NextResponse("Missing Reviewer ID", { status: 400 });
    }

    await prismadb.review.delete({
      where: {
        id: parseInt(review_id),
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
