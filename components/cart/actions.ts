'use server';

import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

/**
 * Ensures checkout always redirects to Shopify (myshopify.com). When your storefront
 * uses a custom domain (e.g. shop.ditectrev.com) as Shopify's primary domain, the
 * API returns checkout URLs with that domain. But the custom domain points to Vercel,
 * so those URLs would 404. We replace the host with the Shopify domain so checkout
 * always goes to Shopify.
 *
 * Uses SHOPIFY_STORE_DOMAIN (e.g. ditectrev.myshopify.com) or SHOPIFY_STORE_SUBDOMAIN
 * (e.g. ditectrev) as fallback to construct the redirect URL.
 */
function getCheckoutUrl(checkoutUrl: string): string {
  let shopifyHost = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').split('/')[0];
  // Reject placeholder values
  if (!shopifyHost || shopifyHost.includes('[') || shopifyHost.includes(']')) {
    const subdomain = process.env.SHOPIFY_STORE_SUBDOMAIN;
    shopifyHost = subdomain ? `${subdomain}.myshopify.com` : undefined;
  }
  const customCheckoutDomain = process.env.SHOPIFY_CHECKOUT_DOMAIN?.replace(/^https?:\/\//, '').split('/')[0];
  const targetHost = customCheckoutDomain || shopifyHost;

  if (!targetHost) return checkoutUrl;

  try {
    const url = new URL(checkoutUrl);
    // If checkout URL points to a non-Shopify host (e.g. custom storefront domain),
    // replace with Shopify so checkout actually works
    if (!url.hostname.endsWith('.myshopify.com') || customCheckoutDomain) {
      url.host = targetHost;
      return url.toString();
    }
    return checkoutUrl;
  } catch {
    return checkoutUrl;
  }
}

export async function redirectToCheckout() {
  const cart = await getCart();
  if (!cart) throw new Error('Cart not found');
  redirect(getCheckoutUrl(cart.checkoutUrl));
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set('cartId', cart.id!);
}
