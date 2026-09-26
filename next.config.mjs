/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rnfmerrozenyvvhflbvf.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;