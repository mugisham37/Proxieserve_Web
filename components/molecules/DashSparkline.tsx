interface DashSparklineProps {
  points: number[];
  up: boolean;
  width?: number;
  height?: number;
}

export function DashSparkline({ points, up, width = 120, height = 32 }: DashSparklineProps) {
  const svgPoints = points
    .map((v, j) => `${j * (width / (points.length - 1))},${v}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full mt-2"
      style={{ height: "28px" }}
      aria-hidden
    >
      <polyline
        points={svgPoints}
        fill="none"
        stroke={up ? "var(--success)" : "var(--danger)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
