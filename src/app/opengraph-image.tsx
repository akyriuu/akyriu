import { ImageResponse } from "next/og";
import { dictionaries, profile } from "@/lib/content";

export const alt = `${profile.name} — ${dictionaries.pt.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080a",
          padding: 72,
          borderTop: "10px solid #f5b544",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#8b949e",
              textTransform: "uppercase",
            }}
          >
            {dictionaries.pt.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 78,
              fontWeight: 700,
              color: "#dfe3e8",
              letterSpacing: -2,
            }}
          >
            Marcus Vinícius
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 30,
              color: "#f5b544",
            }}
          >
            Node.js · NestJS · TypeScript · AWS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#8b949e",
              maxWidth: 940,
              lineHeight: 1.4,
            }}
          >
            Pagamentos assíncronos com AWS Lambda e SQS FIFO, outbox
            transacional, idempotência garantida no banco.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#5a626c" }}>
            github.com/{profile.githubHandle}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
