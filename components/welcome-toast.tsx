'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to Ditectrev Shop!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            This is an Open Source Shop powered by Shopify, Next.js, and Vercel.{' '}
            <a
              href="https://github.com/Ditectrev/shop"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              View the source
            </a>
            .
          </>
        )
      });
    }
  }, []);

  return null;
}
