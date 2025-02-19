import { sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";

import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET() {
    try {
        const orders = await prismadb.order.findMany({
            include: {
                orderItems: true,
            },
        });

        return NextResponse.json({ orders });
    } catch (error) {
        console.error(error);
        return new NextResponse.json(error.message || "An error occurred");
    }
}

export async function POST(req, res) {
    try {
        const session = await getIronSession(req, res, sessionOptions);

        if (!session.auth) {
            return new NextResponse("Session not found", { status: 401 });
        }

        const { products } = await req.json();

        if (!products || products.length === 0 || !Array.isArray(products)) {
            return new NextResponse(
                "Products is not array or missing products data",
                { status: 400 }
            );
        }

        if (
            products.some(
                (product) =>
                    !product.id ||
                    !product.quantity ||
                    (!product.total && typeof product.total !== "number")
            )
        ) {
            return new NextResponse("Missing required fields in products", {
                status: 400,
            });
        }

        const grandTotal = products.reduce((acc, product) => {
            return parseFloat(acc + product.total);
        }, 0);

        const { orderId } = await prismadb.$transaction(async (tx) => {
            const { id: orderId } = await tx.order.create({
                data: {
                    userId: session.auth.userId,
                    total: grandTotal,
                },
            });

            const orderItems = products.map((product) => {
                return {
                    orderId,
                    productId: product.id,
                    quantity: parseInt(product.quantity),
                    total: parseFloat(product.total),
                };
            });

            await tx.orderItem.createMany({
                data: orderItems,
            });

            return { orderId };
        });

        return NextResponse.json({
            message: "Order Created Successfully",
            order_id: orderId,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(error.message || "An error occurred");
    }
}

export async function DELETE(req, res) {
    try {
        const session = await getIronSession(req, res, sessionOptions);

        if (!session.auth) {
            return new NextResponse("Session not found", { status: 401 });
        }

        const { orderId } = await req.json();

        if (!orderId) {
            return new NextResponse("Order ID is required", { status: 400 });
        }

        await prismadb.$transaction(async (tx) => {
            await tx.orderItem.deleteMany({
                where: { orderId },
            });

            await tx.order.delete({
                where: { id: orderId },
            });
        });

        return NextResponse.json({ message: "Order Deleted Successfully" });
    } catch (error) {
        console.error(error);
        return new NextResponse(error.message || "An error occurred");
    }
}

export async function PATCH(req, res) {
    const session = await getIronSession(req, res, sessionOptions);
  
    if (!session.auth) {
      return new NextResponse("Session not found", { status: 401 });
    }
  
    const { orderId, orderStatus, paymentStatus } = await req.json();
  
    if (!orderId  ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
  
    await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus,
        paymentStatus,
      },
    });
  
    return NextResponse.json({ message: "Order Status Update Successfully" });
  }
