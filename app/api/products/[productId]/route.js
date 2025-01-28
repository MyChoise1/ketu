import prismadb from "@/libs/prismadb";
import { generateSlug } from "@/libs/utils";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { productId } = params;

  try {
    const product = await prismadb.products.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message || "An error occurred");
  }
}

export async function PUT(req, { params }) {
  const { productId } = params;

  try {
    const {
      name,
      mrp,
      sell_price,
      thumbnail_one,
      thumbnail_two,
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
    const product = await prismadb.products.update({
      where: { id: productId },
      data: {
        name,
        slug: generateSlug(name),
        mrp: parseFloat(mrp),
        sell_price: parseFloat(sell_price),
        images: {
          thumbnail_one,
          thumbnail_two,
          other: other_images,
        },
        sku,
        stock: parseInt(stock),
        description,
      },
    });

    return NextResponse.json({
      message: "Product Updated Successfully",
      product_id: product.id,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message || "An error occurred");
  }
}

export async function DELETE(req, { params }) {
  const { productId } = params;

  try {
    const product = await prismadb.products.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({
      message: "Product Deleted Successfully",
      product_id: product.id,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message || "An error occurred");
  }
}
