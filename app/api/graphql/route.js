/**
 * API Route: Proxy for Facebook GraphQL
 * This runs server-side, avoiding CORS issues
 * 
 * To use: You'll need to provide an access token
 */

import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = "https://www.internalfb.com/api/graphql/";

export async function POST(request) {
  try {
    const body = await request.json();
    const { query, variables, accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token required. Get one from internalfb.com" },
        { status: 401 }
      );
    }

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        // Or if it uses a different auth header:
        // "X-FB-Access-Token": accessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GraphQL error:", errorText);
      return NextResponse.json(
        { error: `GraphQL request failed: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
