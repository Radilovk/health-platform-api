
const path = require('path');
const fs = require('fs');

const configFiles = [
  { file: 'webpack.config.js', template: 'config/templates/webpack.config.template.js' },
  { file: 'package.json', template: 'config/templates/package.template.json' }
];

configFiles.forEach(({ file, template }) => {
  const filePath = path.join(__dirname, '..', file);
  const templatePath = path.join(__dirname, '..', template);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    if (fileContent !== templateContent) {
      console.log(`File ${file} is outdated. Replacing with the template.`);
      fs.writeFileSync(filePath, templateContent, 'utf8');
    }
  } catch (error) {
    console.error(`Failed to compare ${file}. Error: ${error.message}`);
  }
});

console.log('All configuration files are validated and fixed.');
