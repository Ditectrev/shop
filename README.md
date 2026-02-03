![Ditectrev Logo](/components/icons/logo.svg)

# 🛒 Ditectrev Shop

**Ditectrev Shop** is our ecommerce storefront for selling Ditectrev products. Built on [Next.js Commerce](https://github.com/vercel/commerce) with Shopify as the headless CMS, it provides a high-performance, server-rendered shopping experience using React Server Components, Server Actions, `Suspense`, `useOptimistic`, and more.

[![Contributors](https://img.shields.io/github/contributors/Ditectrev/shop?style=flat-square)](https://github.com/Ditectrev/shop/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/Ditectrev/shop?style=flat-square)](https://github.com/Ditectrev/shop/issues)
[![PRs](https://img.shields.io/github/issues-pr/Ditectrev/shop?style=flat-square)](https://github.com/Ditectrev/shop/pulls)
[![License](https://img.shields.io/github/license/Ditectrev/shop?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/Ditectrev/shop?style=flat-square)](https://github.com/Ditectrev/shop/stargazers)

## 🌟 Features

- High-performance Next.js App Router ecommerce
- Shopify headless CMS integration
- Server-rendered product pages and collections
- Cart and checkout flow
- Custom domain support (e.g. shop.ditectrev.com)

## 🌱 Getting Started

You will need to use the environment variables [defined in `.env.example`](.env.example) to run locally. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables), but a `.env` file is all that is necessary.

> **Note:** Do not commit your `.env` file—it exposes secrets that allow others to control your Shopify store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub: `vercel link`
3. Download environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Providers

This repository uses Shopify. Vercel maintains the Shopify version [as outlined in the Next.js Commerce vision](https://github.com/vercel/commerce/pull/966). Alternative providers (BigCommerce, Medusa, Saleor, etc.) can swap out the `lib/shopify` implementation—see the [original commerce repo](https://github.com/vercel/commerce) for details.

## Integrations

- [Orama](https://github.com/oramasearch/nextjs-commerce) – Typeahead search, vector-based similarity
- [React Bricks](https://github.com/ReactBricks/nextjs-commerce-rb) – Visual CMS for pages and content

## 👥 Contributing

We welcome feedback and contributions from other developers. Contributions in the form of **pull requests** and **issues** are greatly appreciated and help improve the quality of the shop and the overall experience.

To contribute:

1. Open an [issue](https://github.com/Ditectrev/shop/issues) to discuss your idea or report a bug
2. Fork the repo and submit a [pull request](https://github.com/Ditectrev/shop/pulls) with your changes
3. Read our contribution guidelines (if available) before submitting

Thank you for being involved!

## 📚 Resources

- [Vercel, Next.js Commerce, and Shopify Integration Guide](https://vercel.com/docs/integrations/ecommerce/shopify) – Step-by-step setup for Shopify as a headless CMS on Vercel

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](license.md) file for details.
