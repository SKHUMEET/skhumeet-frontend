/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    domains: ["localhost", "*", "phinf.pstatic.net", "storage.googleapis.com"],
  },

  async rewrites() {
    return [
      {
        source: "/oauth2.0/:path*", // url이 source에 해당될 경우
        destination: "https://nid.naver.com/oauth2.0/:path*", // destination으로 redirect
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // path 주소
        destination: "http://api-skhumeet.duckdns.org//api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
