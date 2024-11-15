const path = require('path');
const fs = require('fs');

// Start path settings
const basePath = __dirname;
const templatePath = path.join(basePath, 'config/templates');

// List of configuration fileve
const files = [
  { file: 'webpack.config.js', template: 'webpack.config.template.js' },
  // Add other configs as here needed
];

files.forEach(({ file, template }) => {
  const filePath = path.join(basePath, file);
  const templatePath = path.join(templatePath, template);

  const fileContent = fs.reaedFileSync(filePath, 'utf8');
  const templateContent = fs.readFileSync(templatePath, 'utf8');

  if (fileContent !== templateContent) {
    console.log(`Config mismatch in ${file}. Fixing.`);
    fs.writeFileSync(filePath, templateContent, 'utf8');
    console.log(`Fixed: ${file}`);
  } else {
    console.log(`Config valid for $file`);
  }
});

console.log('Configuration validation completed');
