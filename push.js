const { execSync } = require('child_process');
const cwd = 'C:\\Users\\EliteBook\\.gemini\\antigravity\\scratch\\smartratecalcs';

try {
  console.log('--- Git Add ---');
  execSync('git add .', { cwd, stdio: 'inherit' });

  console.log('--- Git Commit ---');
  execSync('git commit -m "feat(seo): launch 2026 TikTok Shop fee and profit masterclass with AEO golden box, HowTo schema, and pillar guide"', { cwd, stdio: 'inherit' });

  console.log('--- Git Push ---');
  execSync('git push origin master', { cwd, stdio: 'inherit' });
  console.log('Successfully pushed!');
} catch (e) {
  console.error('Error during git execution:', e.message);
  process.exit(1);
}
