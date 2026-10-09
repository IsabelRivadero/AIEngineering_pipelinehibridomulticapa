/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false, // Desactivado para manejar subida de imágenes multipart/form-data
  },
};

module.exports = nextConfig;