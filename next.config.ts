import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Always serve the latest résumé after you replace the PDF (no stale browser/CDN copies).
        source: "/Ayush_Yadav_Resume.pdf",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
  async redirects() {
    return [
      // Short, shareable link: yoursite.com/resume opens the PDF.
      { source: "/resume", destination: "/Ayush_Yadav_Resume.pdf", permanent: false },
    ];
  },
};

export default nextConfig;
