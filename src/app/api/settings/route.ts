import { NextResponse } from "next/server";
import { z } from "zod";
import { getSettings, saveSettings } from "@/lib/data";
import { isAdminAuthenticated } from "@/lib/auth";

const settingsSchema = z.object({
  practitionerName: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  doctolibUrl: z.string().url(),
  heroTagline: z.string(),
  aboutText: z.string(),
  openingHours: z.string(),
});

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const parsed = settingsSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await saveSettings(parsed.data);
  return NextResponse.json(parsed.data);
}
