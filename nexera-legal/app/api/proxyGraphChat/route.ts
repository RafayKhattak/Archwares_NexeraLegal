// app/api/proxyGraphChat/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const externalUrl = "http://44.203.0.32:8000/api/nexgen/GraphChat/";
    const response = await fetch(externalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: response.statusText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in GraphChat proxy:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
