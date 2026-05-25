import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['nl', 'fr'],
  defaultLocale: 'nl',
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
