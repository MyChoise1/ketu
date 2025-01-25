import { defaultSession, sessionOptions } from "@/libs/session";
import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const ONE_WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;
  const session = await getIronSession(req, res, sessionOptions);

  if (!session) {
    return new NextResponse("Session not found", { status: 401 });
  }

  if (session.cookieOption.expires > Date.now() + ONE_WEEK_IN_MS) {
    session.cookieOption.expires = Date.now() + ONE_WEEK_IN_MS;
    await session.save();
  }
  return Response.json(session);
}

export async function DELETE() {
  const session = await getIronSession(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}
