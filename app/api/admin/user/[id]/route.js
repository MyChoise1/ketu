import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb"; 

export async function GET(req, { params }) {
    try {
        const { id } = params; 

        if (!id) {
            return new NextResponse("Missing user ID", { status: 400 });
        }

        const addresses = await prismadb.address.findMany({
            where: {
                userId: id,
            },
        });

        return NextResponse.json(addresses);
    } catch (error) {
        console.error("Error Address GET:", error);
        return new NextResponse(error.message || "An error occurred", { status: 500 });
    }
}
