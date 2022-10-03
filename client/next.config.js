const withImages = require('next-images')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domain: []
  },
  ...withImages()
}

module.exports = nextConfig