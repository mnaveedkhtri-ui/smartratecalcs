import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/v1/', '/data/'],
        disallow: ['/api/indexnow', '/admin/', '/go/'],
      },
    ],
    sitemap: 'https://www.smartratecalcs.com/sitemap.xml',
    host: 'https://www.smartratecalcs.com',
  };
}
