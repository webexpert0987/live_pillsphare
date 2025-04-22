import React, { useEffect } from 'react';
import routes from '../../routes';

const Sitemap = () => {
  useEffect(() => {
    // Generate sitemap XML
    const baseUrl = window.location.origin;
    const currentDate = new Date().toISOString();
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes.map(route => `
        <url>
          <loc>${baseUrl}${route.path}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`;

    // Set content type and serve XML
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    window.location.href = url;
  }, []);

  return null;
};

export default Sitemap;
