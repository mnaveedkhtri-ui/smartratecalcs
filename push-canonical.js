const { execSync } = require('child_process');
const cwd = 'C:\\Users\\EliteBook\\.gemini\\antigravity\\scratch\\smartratecalcs';

try {
  console.log('--- Git Add ---');
  execSync('git add .', { cwd, stdio: 'inherit' });

  console.log('--- Git Commit ---');
  execSync('git commit -m "fix(seo): canonicalize TikTok Shop calculator under /calculators/ directory, eliminate duplicate URLs, and add 301 redirects"', { cwd, stdio: 'inherit' });

  console.log('--- Git Push ---');
  execSync('git push origin master', { cwd, stdio: 'inherit' });
  console.log('Push complete!');
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
