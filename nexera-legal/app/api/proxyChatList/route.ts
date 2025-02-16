// app/api/proxyChatList/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  const externalApiUrl = "http://44.203.0.32:8000/api/nexgen/ChatList/";

  try {
    const response = await fetch(externalApiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error fetching chat list: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in proxy API:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
