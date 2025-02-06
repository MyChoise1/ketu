import prismadb from "@/libs/prismadb";
import { generateSlug } from "@/libs/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prismadb.products.findMany();

    return NextResponse.json({ products });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message || "An error occurred");
  }
}

export async function POST(req) {
  try {
    const {
      name,
      mrp,
      sell_price,
      thumbnail_one,
      thumbnail_two,
      thumbnail_three,
      other_images,
      sku,
      stock,
      description,
    } = await req.json();

    if (
      !name ||
      !mrp ||
      !sell_price ||
      !thumbnail_one ||
      !thumbnail_two ||
      !other_images ||
      !sku ||
      !stock ||
      !description
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const product = await prismadb.products.create({
      data: {
        name,
        slug: generateSlug(name),
        mrp: parseFloat(mrp),
        sell_price: parseFloat(sell_price),
        images: {
          thumbnail_one,
          thumbnail_two,
          thumbnail_three,
          other: other_images,
        },
        sku,
        stock: parseInt(stock),
        description,
      },
    });

    return NextResponse.json({
      message: "Product Created Successfully",
      product_id: product.id,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message || "An error occurred");
  }
}