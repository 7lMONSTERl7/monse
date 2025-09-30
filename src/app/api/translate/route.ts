import { NextResponse } from "next/server";
import { translate } from "@vitalets/google-translate-api";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "";
    const to = searchParams.get("to") || "ar";

    const result = await translate(text, { to });

    return NextResponse.json({ translated: result.text });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unable to translate right now, please try again later." },
      { status: 500 }
    );
  }
}
