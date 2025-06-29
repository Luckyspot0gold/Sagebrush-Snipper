`javascript
// bolt.config.js
module.exports = {
  rewrites: () => [
    { source: "/arena", destination: "/boxing" },
    { source: "/saloon", destination: "/bartender" }
  ],
  experimental: {
    disableOptimization: true // Bypass build errors
  }
}
