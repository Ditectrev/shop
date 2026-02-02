const shopifyHost =
  process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').split('/')[0] ||
  (process.env.SHOPIFY_STORE_SUBDOMAIN
    ? `${process.env.SHOPIFY_STORE_SUBDOMAIN}.myshopify.com`
    : null);

export default {
  experimental: {
    useCache: true
  },
  async redirects() {
    if (!shopifyHost || shopifyHost.includes('[')) return [];
    return [
      {
        source: '/cart/c/:path*',
        destination: `https://${shopifyHost}/cart/c/:path*`,
        permanent: false
      }
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};
