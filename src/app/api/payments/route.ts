import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch("https://api.quickprimetech.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Payment initiation failed", details: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Return both orderId and uniqueId (you need uniqueId for SSE)
    return NextResponse.json({
      orderId: data.data?.orderId,
      uniqueId: data.data?.uniqueId, // This is crucial for the SSE connection
      message: data.message,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
