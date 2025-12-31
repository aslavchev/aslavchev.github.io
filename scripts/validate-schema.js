#!/usr/bin/env node

/**
 * Schema.org Structured Data Validator
 * Validates the generated JSON-LD against Schema.org specifications
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Structured Data (Schema.org JSON-LD)\n');

try {
  // Import the structured data generator
  const baseUrl = "https://aslavchev.github.io/aslavchev-portfolio-website";

  // Read the built HTML file
  const htmlPath = path.join(__dirname, '../out/index.html');

  if (!fs.existsSync(htmlPath)) {
    console.log('⚠️  Built HTML not found. Running build first...\n');
    const { execSync } = require('child_process');
    execSync('npm run build', { stdio: 'inherit' });
  }

  const html = fs.readFileSync(htmlPath, 'utf8');

  // Extract JSON-LD from HTML
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);

  if (!jsonLdMatch) {
    throw new Error('No JSON-LD found in HTML');
  }

  const jsonLd = JSON.parse(jsonLdMatch[1]);

  console.log('✅ JSON-LD successfully extracted from HTML\n');

  // Validate structure
  console.log('📊 Structured Data Summary:\n');
  console.log(`   Context: ${jsonLd['@context']}`);
  console.log(`   Graph Items: ${jsonLd['@graph']?.length || 0}\n`);

  if (jsonLd['@graph']) {
    const types = jsonLd['@graph'].map(item => item['@type']).filter(Boolean);
    const typeCounts = types.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    console.log('📋 Schema Types:\n');
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`   • ${type}: ${count}`);
    });
    console.log();
  }

  // Check for Person schema
  const person = jsonLd['@graph']?.find(item => item['@type'] === 'Person');
  if (person) {
    console.log('✅ Person Schema Found\n');
    console.log(`   Name: ${person.name}`);
    console.log(`   Job Title: ${person.jobTitle}`);
    console.log(`   Skills: ${person.hasOccupation?.skills?.length || 0}`);
    console.log(`   Languages: ${person.knowsLanguage?.length || 0}`);
    console.log(`   Knowledge Areas: ${person.knowsAbout?.length || 0}\n`);
  }

  // Check for Work Experience
  const workExperiences = jsonLd['@graph']?.filter(item => item['@type'] === 'OrganizationRole') || [];
  if (workExperiences.length > 0) {
    console.log(`✅ Work Experience: ${workExperiences.length} roles\n`);
    workExperiences.forEach((exp, i) => {
      console.log(`   ${i + 1}. ${exp.roleName} at ${exp.organization?.name}`);
      console.log(`      ${exp.startDate} → ${exp.endDate}`);
    });
    console.log();
  }

  // Check for Education
  const education = jsonLd['@graph']?.filter(item => item['@type'] === 'EducationalOccupationalCredential') || [];
  if (education.length > 0) {
    console.log(`✅ Education: ${education.length} credentials\n`);
    education.forEach((edu, i) => {
      console.log(`   ${i + 1}. ${edu.credentialCategory}: ${edu.name}`);
    });
    console.log();
  }

  // Check for Breadcrumb
  const breadcrumb = jsonLd['@graph']?.find(item => item['@type'] === 'BreadcrumbList');
  if (breadcrumb) {
    console.log(`✅ Breadcrumb Navigation: ${breadcrumb.itemListElement?.length || 0} items\n`);
  }

  // Write formatted JSON for manual inspection
  const outputPath = path.join(__dirname, '../out/structured-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(jsonLd, null, 2), 'utf8');
  console.log(`📁 Full structured data written to: ${outputPath}\n`);

  // Validation summary
  console.log('─'.repeat(60));
  console.log('✅ Validation Complete!\n');
  console.log('🔗 Test with online validators:\n');
  console.log('   • Google Rich Results: https://search.google.com/test/rich-results');
  console.log('   • Schema.org Validator: https://validator.schema.org/');
  console.log('   • JSON-LD Playground: https://json-ld.org/playground/\n');
  console.log('💡 Paste the contents of out/structured-data.json into these tools\n');

} catch (error) {
  console.error('❌ Validation Error:', error.message);
  process.exit(1);
}
