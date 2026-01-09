const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  const runnerResult = await lighthouse('https://aslavchev.com', options);

  // Print scores
  const scores = runnerResult.lhr.categories;
  console.log('\n=== Lighthouse Scores ===\n');
  console.log(`Performance:      ${Math.round(scores.performance.score * 100)}/100`);
  console.log(`Accessibility:    ${Math.round(scores.accessibility.score * 100)}/100`);
  console.log(`Best Practices:   ${Math.round(scores['best-practices'].score * 100)}/100`);
  console.log(`SEO:              ${Math.round(scores.seo.score * 100)}/100`);
  console.log('\n');

  // Print any accessibility issues
  const accessibilityAudits = runnerResult.lhr.audits;
  const failedAudits = Object.values(accessibilityAudits).filter(
    audit => audit.score !== null && audit.score < 1 && audit.id.includes('accessibility')
  );

  if (failedAudits.length > 0) {
    console.log('=== Accessibility Issues ===\n');
    failedAudits.forEach(audit => {
      console.log(`❌ ${audit.title}`);
      console.log(`   ${audit.description}\n`);
    });
  } else {
    console.log('✅ No accessibility issues found!\n');
  }

  await chrome.kill();
}

runLighthouse().catch(err => {
  console.error(err);
  process.exit(1);
});
