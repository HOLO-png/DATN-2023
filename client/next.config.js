const withImages = require('next-images')


const nextConfig = {
  reactStrictMode: true,
  images: {
    domain: [
      "links.papareact.com",
      "platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com"
    ]
  },
  ...withImages()
}

module.exports = nextConfig