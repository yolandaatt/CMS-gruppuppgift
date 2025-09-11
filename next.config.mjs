/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "a.storyblok.com",
    },
  ],
},

};

export default nextConfig;
