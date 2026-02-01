import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get parameters
    const score = searchParams.get("score") || "0";
    const total = searchParams.get("total") || "25";
    const rank = searchParams.get("rank") || "Quiz Taker";
    const title = searchParams.get("title") || "How X Are You?";
    const percentile = searchParams.get("percentile") || "50";
    const themeColor = searchParams.get("color") || "#3B82F6";

    const percentage = Math.round((parseInt(score) / parseInt(total)) * 100);

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          fontFamily: "system-ui",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 0%, ${themeColor}40, transparent 50%)`,
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            zIndex: 10,
          }}
        >
          {/* Quiz Title */}
          <div
            style={{
              fontSize: 32,
              color: "#9ca3af",
              marginBottom: 20,
            }}
          >
            {title}
          </div>

          {/* Big Score */}
          <div
            style={{
              fontSize: 120,
              fontWeight: "bold",
              color: themeColor,
              marginBottom: 10,
            }}
          >
            {percentage}%
          </div>

          {/* Rank */}
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
            }}
          >
            {rank}
          </div>

          {/* Percentile */}
          <div
            style={{
              fontSize: 24,
              color: "#9ca3af",
              padding: "12px 24px",
              borderRadius: 12,
              backgroundColor: "#1f2937",
              border: `2px solid ${themeColor}50`,
            }}
          >
            Top {100 - parseInt(percentile)}% of all quiz takers
          </div>

          {/* Branding */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              fontSize: 20,
              color: "#6b7280",
            }}
          >
            viralquiz.io
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
