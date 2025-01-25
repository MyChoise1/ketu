import prismadb from "@/libs/prismadb";
import { getIronSession } from "iron-session";

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
