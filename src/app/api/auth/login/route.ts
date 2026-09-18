import { NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  verifyAdminPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (!body.password || !verifyAdminPassword(body.password)) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }
  const token = await createSessionToken();
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
