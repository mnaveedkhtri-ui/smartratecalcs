import { NextRequest, NextResponse } from 'next/server';
import { getAffiliateRedirectUrl } from '../../../data/partner-links';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { partner: string } }
) {
  const partner = params.partner.toLowerCase();
  const targetUrl = getAffiliateRedirectUrl(partner);

  return NextResponse.redirect(targetUrl, {
    status: 307,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
