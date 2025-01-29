import prismadb from "@/libs/prismadb";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";
import { cookies } from "next/headers";

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

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
