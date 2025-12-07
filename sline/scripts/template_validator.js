/**
 * Sline Template Validator
 *
 * This script helps validate Sline templates for common syntax errors
 * and provides suggestions for improvements.
 */

class SlineTemplateValidator {
  constructor(template) {
    this.template = template;
    this.errors = [];
    this.warnings = [];
    this.suggestions = [];
  }

  validate() {
    this.checkSyntax();
    this.checkBestPractices();
    this.checkPerformance();

    return {
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions,
      isValid: this.errors.length === 0
    };
  }

  checkSyntax() {
    // Check for unmatched tags
    const tagPattern = /\{\{\#(\w+)[\s\S]*?\}\}[\s\S]*?\{\{\/\1\}\}/g;
    const openTagPattern = /\{\{\#(\w+)[\s\S]*?\}\}(?![\s\S]*?\{\{\/\1\}\})/g;
    const closeTagPattern = /\{\{\/(\w+)\}\}(?![\s\S]*?\{\{\#(\w+)[\s\S]*?\}\})/g;

    // Find all opening tags
    const openTags = [];
    let match;
    const openTagRegex = /\{\{\#(\w+)[\s\S]*?\}\}/g;
    while ((match = openTagRegex.exec(this.template)) !== null) {
      const tagContent = match[0];
      const tagName = match[1];

      // Check if it's a self-closing tag
      if (tagContent.includes('/}}')) {
        continue; // Self-closing tag, no need to match closing
      }
      openTags.push({ name: tagName, position: match.index });
    }

    // Find all closing tags
    const closeTags = [];
    const closeTagRegex = /\{\{\/(\w+)\}\}/g;
    while ((match = closeTagRegex.exec(this.template)) !== null) {
      closeTags.push({ name: match[1], position: match.index });
    }

    // Check for unmatched tags
    for (const openTag of openTags) {
      const matchingClose = closeTags.find(close => close.name === openTag.name);
      if (!matchingClose) {
        this.errors.push({
          type: 'unmatched_tag',
          message: `Unclosed tag "{{#${openTag.name}}}" at position ${openTag.position}`,
          position: openTag.position
        });
      }
    }

    for (const closeTag of closeTags) {
      const matchingOpen = openTags.find(open => open.name === closeTag.name);
      if (!matchingOpen) {
        this.errors.push({
          type: 'unmatched_tag',
          message: `Unmatched closing tag "{{/${closeTag.name}}}" at position ${closeTag.position}`,
          position: closeTag.position
        });
      }
    }

    // Check for malformed expressions
    const expressionPattern = /\{\{([^}]+)\}\}/g;
    while ((match = expressionPattern.exec(this.template)) !== null) {
      const expression = match[1].trim();
      if (!expression) {
        this.errors.push({
          type: 'empty_expression',
          message: 'Empty Sline expression',
          position: match.index
        });
      }
    }

    // Check bracket balance
    let braceCount = 0;
    for (let i = 0; i < this.template.length; i++) {
      if (this.template[i] === '{') {
        braceCount++;
      } else if (this.template[i] === '}') {
        braceCount--;
        if (braceCount < 0) {
          this.errors.push({
            type: 'unmatched_brackets',
            message: 'Unmatched closing brackets',
            position: i
          });
        }
      }
    }
    if (braceCount > 0) {
      this.errors.push({
        type: 'unmatched_brackets',
        message: 'Unmatched opening brackets'
      });
    }
  }

  checkBestPractices() {
    // Check for properly nested forms
    const formCount = (this.template.match(/\{\{\w+_form[\s\S]*?\{\{\/\w+_form\}\}/g) || []).length;
    const selfClosingFormCount = (this.template.match(/\{\{\w+_form \/}/g) || []).length;

    if (formCount === 0 && selfClosingFormCount === 0) {
      this.warnings.push({
        type: 'no_forms',
        message: 'No forms detected. Consider adding contact, login, or registration forms.'
      });
    }

    // Check for nil checks before accessing properties
    const propertyAccessPattern = /\{\{[^}]+\.[^}]+\}\}/g;
    let match;
    while ((match = propertyAccessPattern.exec(this.template)) !== null) {
      const expression = match[0];
      // Simple heuristic - check for nil checks nearby
      const startIndex = Math.max(0, match.index - 200);
      const context = this.template.substring(startIndex, match.index + expression.length + 200);

      if (!context.includes('if ') && !context.includes('unless ')) {
        this.suggestions.push({
          type: 'nil_check',
          message: `Consider adding nil check for expression: ${expression}`,
          position: match.index
        });
      }
    }

    // Check for escape usage
    const rawOutputCount = (this.template.match(/\{\{\{[^}]+\}\}\}/g) || []).length;
    const escapedOutputCount = (this.template.match(/\{\{[^}]+\}\}/g) || []).length - rawOutputCount;

    if (rawOutputCount > escapedOutputCount) {
      this.warnings.push({
        type: 'excessive_raw_output',
        message: 'Using triple braces extensively. Ensure user content is properly escaped.'
      });
    }

    // Check for accessibility
    if (!this.template.includes('alt=') && this.template.includes('<img')) {
      this.warnings.push({
        type: 'missing_alt_text',
        message: 'Images detected without alt attributes - accessibility issue'
      });
    }
  }

  checkPerformance() {
    // Check for deeply nested loops
    const nestedLoopPattern = /\{\{#for[^}]+\}\}[\s\S]*?\{\{#for[^}]+\}\}[\s\S]*?\{\{\/for\}\}[\s\S]*?\{\{\/for\}\}/g;
    if (nestedLoopPattern.test(this.template)) {
      this.warnings.push({
        type: 'nested_loops',
        message: 'Deep loop nesting detected. Consider optimizing data structure.'
      });
    }

    // Check for large data processing
    if (this.template.includes('products | size()') || this.template.includes('all ')) {
      this.suggestions.push({
        type: 'data_optimization',
        message: 'Consider paginating large datasets for better performance'
      });
    }

    // Check for repeated complex expressions
    const expressionPattern = /\{\{([^}]+)\}\}/g;
    const expressions = {};
    let match;
    while ((match = expressionPattern.exec(this.template)) !== null) {
      const expr = match[1].trim();
      expressions[expr] = (expressions[expr] || 0) + 1;
    }

    for (const [expr, count] of Object.entries(expressions)) {
      if (count > 3 && expr.length > 20) {
        this.suggestions.push({
          type: 'repeated_expression',
          message: `Complex expression used ${count} times: ${expr}. Consider using a variable.`
        });
      }
    }
  }
}

// Node.js usage example
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SlineTemplateValidator;
}

// Browser usage example
if (typeof window !== 'undefined') {
  window.SlineTemplateValidator = SlineTemplateValidator;
}

// CLI usage function
function validateTemplate(templatePath) {
  const fs = require('fs');
  const template = fs.readFileSync(templatePath, 'utf8');
  const validator = new SlineTemplateValidator(template);
  const result = validator.validate();

  console.log(`\n📋 Sline Template Validation Results for: ${templatePath}\n`);

  if (result.isValid) {
    console.log('✅ Template is valid!\n');
  } else {
    console.log('❌ Template has errors:\n');
    result.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.message} (${error.type})`);
    });
  }

  if (result.warnings.length > 0) {
    console.log('\n⚠️  Warnings:\n');
    result.warnings.forEach((warning, index) => {
      console.log(`${index + 1}. ${warning.message} (${warning.type})`);
    });
  }

  if (result.suggestions.length > 0) {
    console.log('\n💡 Suggestions:\n');
    result.suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion.message} (${suggestion.type})`);
    });
  }

  return result;
}

// Export CLI function if required directly
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log('Usage: node template_validator.js <template-file-path>');
    process.exit(1);
  }

  try {
    validateTemplate(filePath);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}