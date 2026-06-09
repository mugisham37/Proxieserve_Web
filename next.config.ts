import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Move .next to /dev/shm (RAM / POSIX shared memory) during dev.
  // Turbopack's startup filesystem benchmark drops from ~241ms to <10ms.
  // /dev/shm is guaranteed tmpfs on every Linux system — zero disk I/O.
  // Short path also reduces inode lookup depth from 9 levels → 3.
  // Contents are lost on reboot — fine, dev artifacts are ephemeral.
  distDir: isDev ? "/dev/shm/pb_next" : ".next",

  // Remove the X-Powered-By: Next.js header — no reason to advertise the stack.
  poweredByHeader: false,

  experimental: {
    // Cache Turbopack's module graph to disk between dev sessions (stable in v16.1).
    turbopackFileSystemCacheForDev: true,
    // Cache Turbopack's module graph between builds (opt-in).
    turbopackFileSystemCacheForBuild: true,

    // Fallback: if webpack is ever invoked, trade memory for compile speed.
    webpackMemoryOptimizations: true,

    // Reduce Turbopack's module-graph analysis time for barrel-heavy packages.
    // framer-motion re-exports ~80 top-level names; lucide-react has 1000+ icons.
    // Named imports resolve directly to their source file, skipping the export map.
    // gsap excluded: already dynamically imported (already code-split).
    // @base-ui/react excluded: consumer code uses subpath imports (already optimal).
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-slot",
    ],
  },
};

export default nextConfig;
