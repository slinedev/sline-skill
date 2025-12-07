# Sline Development Scripts

This directory contains helper scripts for Sline theme development and validation.

## Available Scripts

### template_validator.js

A comprehensive JavaScript utility for validating Sline templates. Checks for:
- Syntax errors (unmatched tags, brackets, expressions)
- Best practices compliance
- Performance optimization opportunities
- Accessibility considerations

#### Node.js Usage

```bash
# Validate a specific template file
node template_validator.js /path/to/template.html

# Or use it programmatically
const SlineTemplateValidator = require('./template_validator.js');
const fs = require('fs');

const template = fs.readFileSync('my-template.html', 'utf8');
const validator = new SlineTemplateValidator(template);
const result = validator.validate();

if (result.isValid) {
  console.log('Template is valid!');
} else {
  console.log('Errors found:', result.errors);
}
```

#### Browser Usage

```html
<script src="scripts/template_validator.js"></script>
<script>
  // Validate template in browser
  const template = document.getElementById('template-input').value;
  const validator = new SlineTemplateValidator(template);
  const result = validator.validate();

  console.log(result);
</script>
```

#### What It Checks

**Syntax Validation:**
- Unmatched opening/closing tags
- Malformed expressions
- Bracket balance
- Empty expressions

**Best Practices:**
- Nil checking before property access
- Proper HTML escaping usage
- Alt text for images
- Form implementation patterns

**Performance:**
- Nested loop optimization
- Large dataset handling
- Repeated complex expressions
- Pagination suggestions

**Example Output**

```
📋 Sline Template Validation Results for: product.html

✅ Template is valid!

⚠️  Warnings:
1. Images detected without alt attributes - accessibility issue

💡 Suggestions:
1. Consider adding nil check for expression: {{ product.vendor }}
2. Consider paginating large datasets for better performance
```

## Adding Your Own Scripts

### Naming Convention
- Use descriptive names: `theme_generator.js`, `asset_optimizer.js`
- Follow camelCase for file names
- Include JSDoc comments for documentation

### Script Structure
```javascript
/**
 * Brief description of what the script does
 *
 * @author Your Name
 * @version 1.0.0
 */

class YourScriptClass {
  constructor() {
    // Initialize
  }

  mainFunction() {
    // Main functionality
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = YourScriptClass;
}

if (typeof window !== 'undefined') {
  window.YourScriptClass = YourScriptClass;
}
```

### CLI Scripts
Add command-line interface support for Node.js scripts:

```javascript
function runCli() {
  const args = process.argv.slice(2);
  // Handle command-line arguments
}

if (require.main === module) {
  runCli();
}
```

## Development Guidelines

1. **Error Handling**: Always include proper error handling
2. **Cross-compatibility**: Support both Node.js and browser environments
3. **Documentation**: Include comprehensive JSDoc comments
4. **Testing**: Provide example usage and expected outputs
5. **Performance**: Consider performance for large template files

## Future Scripts to Consider

- `theme_generator.js` - Generate theme scaffolding
- `asset_optimizer.js` - Optimize images and assets
- `seo_validator.js` - Check SEO implementation
- `accessibility_checker.js` - WCAG compliance validator
- `translation_exporter.js` - Export translation keys
- `performance_analyzer.js` - Template performance analysis
- `css_generator.js` - Generate CSS from theme settings
- `schema_generator.js` - Generate JSON schemas

## Integration with IDE

You can integrate these scripts with popular IDEs and editors:

### VS Code Extension (Future)
```json
{
  "name": "Sline Tools",
  "commands": [
    {
      "command": "sline.validateTemplate",
      "title": "Validate Current Template"
    }
  ],
  "configuration": {
    "sline.validation.rules": {
      "syntax": true,
      "performance": true,
      "accessibility": true
    }
  }
}
```

### Git Hooks

Add pre-commit validation to your `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# Validate all modified .html files
for file in $(git diff --cached --name-only | grep '\.html$'); do
    node scripts/template_validator.js "$file"
done
```

## Contributing

When adding new scripts:

1. Follow the existing code style
2. Include comprehensive documentation
3. Add error handling and edge cases
4. Test with various template scenarios
5. Update this README with new script information

## Support

For issues or questions about these scripts:
1. Check the script documentation
2. Review existing issues in the repository
3. Create a new issue with detailed information
4. Include example templates that reproduce the issue