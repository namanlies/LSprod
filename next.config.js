/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // Add the domain to the array
  },
};

module.exports = nextConfig;
