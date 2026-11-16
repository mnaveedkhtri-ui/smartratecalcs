async function testSchema(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const regex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
    let match;
    const schemas = [];
    while ((match = regex.exec(html)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        schemas.push(parsed);
      } catch (e) {
        console.error('JSON Parse Error in', url, e.message);
      }
    }
    console.log('====================================');
    console.log('URL:', url);
    console.log('HTTP Status:', res.status);
    console.log('Found', schemas.length, 'Schema blocks:');
    schemas.forEach((s, idx) => {
      const type = s['@type'] || (s['@graph'] ? '@graph (' + s['@graph'].map(g => g['@type']).join(', ') + ')' : 'unknown');
      console.log(`  [Block ${idx + 1}] Type: ${type}`);
      if (s['@type'] === 'FAQPage') {
        console.log(`    -> FAQ count: ${s.mainEntity?.length || 0}`);
        s.mainEntity?.forEach((q, i) => console.log(`       Q${i+1}: ${q.name}`));
      }
      if (s['@type'] === 'SoftwareApplication') {
        console.log(`    -> App Name: "${s.name}" | Category: ${s.applicationCategory} | Price: $${s.offers?.price}`);
      }
      if (s['@type'] === 'BreadcrumbList') {
        console.log(`    -> Breadcrumb items: ${s.itemListElement?.length || 0}`);
        s.itemListElement?.forEach((b) => console.log(`       Pos ${b.position}: ${b.name} (${b.item})`));
      }
      if (s['@graph']) {
        s['@graph'].forEach((g) => {
          console.log(`    -> Graph entity: ${g['@type']} (${g.name || g.url || ''})`);
        });
      }
    });
  } catch (err) {
    console.error('Error fetching', url, err.message);
  }
}

async function main() {
  await testSchema('https://www.smartratecalcs.com/');
  await testSchema('https://www.smartratecalcs.com/calculators/cash-app-fee-calculator');
  await testSchema('https://www.smartratecalcs.com/calculators/upwork-to-jazzcash-calculator');
}

main();
