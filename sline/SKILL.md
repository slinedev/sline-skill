---
name: sline
description: SHOPLINE Sline templating language for e-commerce theme development
---

# Sline Skill

Comprehensive assistance with SHOPLINE Sline templating language, generated from official documentation. Sline is a powerful templating language designed for e-commerce theme development on the SHOPLINE platform.

## When to Use This Skill

This skill should be triggered when:
- Working with Sline templating language
- Developing SHOPLINE themes and templates
- Implementing dynamic content in e-commerce stores
- Debugging Sline template code
- Learning Sline syntax and best practices
- Working with Sline objects, tags, and filters
- Creating product, collection, or page templates

## Quick Reference

### Core Syntax

**Output Expressions:**
```html
<!-- Regular output (escaped) -->
{{ expression }}

<!-- Raw output (unescaped HTML) -->
{{{ expression }}}
```

**Template Tags:**
```html
<!-- Normal tag with closing -->
{{#if condition}}
  Content when true
{{/if}}

<!-- Self-closing tag -->
{{#product_form /}}
```

**Filters:**
```html
{{ variable | filter_name() }}
{{ variable | filter1() | filter2() }}
```

### Common Patterns

**Product Template Pattern:**
```html
<div class="product-page">
  <div class="product-image">
    {{#image_tag product.featured_image | image_url() /}}
  </div>
  <div class="product-title">
    {{ product.title }}
  </div>
  <div class="product-price">
    {{ product.price | money() }}
  </div>
</div>
```

**Meta Tags Pattern:**
```html
<!-- Page title -->
<title>{{ page_title }}</title>

<!-- Meta description -->
{{#if page_description}}
<meta name="description" content="{{ page_description | truncate(150) }}">
{{/if}}
```

**Conditional Content Pattern:**
```html
{{#if customer != nil}}
  User {{ customer.name }} is logged in!
{{else}}
  Please log in to continue
{{/if}}
```

### Essential Objects

**Global Objects (available everywhere):**
- `page_title` - Current page title
- `product` - Current product data
- `collection` - Current collection data
- `shop` - Store information
- `customer` - Logged-in customer data

**Local Objects (context-specific):**
- `forloop` - Loop iteration data
- `paginate` - Pagination information
- `block` - Block content data

### Core Tags

**Control Flow:**
- `{{#if condition}}` - Conditional logic
- `{{#unless condition}}` - Reverse conditional
- `{{#for array}}` - Loop through arrays
- `{{#case value}}` - Switch statement

**Forms:**
- `{{#product_form /}}` - Product form
- `{{#customer_register_form}}` - Customer registration
- `{{#customer_login_form}}` - Customer login

**Content:**
- `{{#sections}}` - Dynamic sections
- `{{#blocks}}` - Reusable blocks
- `{{#capture}}` - Capture content to variable

### Essential Filters

**String:**
- `truncate(length)` - Limit string length
- `append(suffix)` - Add suffix
- `prepend(prefix)` - Add prefix
- `capitalize` - Capitalize first letter

**Array:**
- `size()` - Get array length
- `sort(by=key)` - Sort array
- `join(separator)` - Join array elements

**Money:**
- `money()` - Format currency
- `money_with_currency()` - Include currency symbol

**Images:**
- `image_url(size)` - Get image URL
- `file_img_url(size)` - Get file image URL

## Reference Files

This skill includes comprehensive documentation in `references/`:

- **getting_started.md** - Sline overview and basics
- **tags.md** - Template tags reference
- **filters.md** - Output filters reference
- **objects.md** - Data objects reference
- **forms.md** - Form tags reference
- **examples.md** - Code examples and patterns

Use `view` to read specific reference files when detailed information is needed.

## Working with This Skill

### For Beginners
Start with `getting_started.md` for Sline fundamentals, then explore `examples.md` for practical implementations.

### For Theme Development
Use `tags.md`, `filters.md`, and `objects.md` as comprehensive references while building themes.

### For Specific Tasks
- **Product Templates**: Check `product` object and `product_form` tag
- **Customer Accounts**: Review customer objects and form tags
- **Collections**: Use `collection` object and pagination
- **Store Settings**: Access `shop` object for store information

### Best Practices

1. **Always escape user input** with `{{ }}` unless intentionally outputting raw HTML
2. **Use nil checks** with `{{#if variable}}` before accessing properties
3. **Properly close all tags** to avoid template errors
4. **Use appropriate filters** for data formatting (currency, dates, etc.)
5. **Leverage sections and blocks** for reusable components

### Common Patterns by Use Case

**Product Display:**
- Use `product` object for product data
- Apply `money()` filter for prices
- Use `image_url()` for product images

**Customer Accounts:**
- Check `customer` object existence
- Use customer form tags for user actions
- Display customer-specific content conditionally

**Navigation:**
- Use `linklist` objects for menu structures
- Implement `current_tags` for filtering
- Use `routes` object for URL generation

## Technical Details

### Data Types
- **string** - Text values (support escape sequences)
- **number** - Numeric values (integers and floats)
- **boolean** - true/false values
- **nil** - Undefined/null values
- **array** - Lists of values

### Operators
- `==` - Equal to
- `!=` - Not equal to
- `>` - Greater than
- `<` - Less than
- `>=` - Greater than or equal to
- `<=` - Less than or equal to
- `&&` - Logical AND
- `||` - Logical OR

### Truthy/Falsy Values
- **Truthy**: true, strings, numbers, arrays (including empty)
- **Falsy**: false, nil

### Resource Handles
Resource handles are unique identifiers for store resources:
- Automatically generated from titles (lowercase, hyphens for spaces)
- Used in URLs and object references
- Available via `.handle` property
- Can be referenced with dot notation or square brackets

## Resources

### references/
Organized documentation extracted from official SHOPLINE sources:

- **getting_started.md** - Sline overview, syntax basics, and core concepts
- **basics.md** - Detailed coverage of resource handles, operators, and data types
- **tags.md** - Complete reference for all template tags
- **filters.md** - Comprehensive filter documentation
- **objects.md** - All available objects and their properties
- **forms.md** - Form implementation guide
- **examples.md** - Real-world templates and code patterns

### scripts/
Add helper scripts here for:
- Template validation
- Code generation
- Common development tasks

### assets/
Store templates, boilerplate, and example projects:
- Theme starters
- Component templates
- Style guides

## Important Notes

- **SHOPLINE-Specific**: Sline is fully customized by SHOPLINE. You cannot define custom tags or filters.
- **Global vs Local**: Some objects (like `page_title`) are globally available, while others are context-specific.
- **Handle System**: Resource handles are crucial for URL generation and object references.
- **Security**: Always use escaped output `{{ }}` unless you specifically need raw HTML output.
- **Performance**: Efficient filter usage and proper pagination improve template rendering speed.

## Getting Help

For complex implementations or troubleshooting:
1. Check the relevant reference file for detailed syntax
2. Review common patterns in `examples.md`
3. Test templates with sample data before deployment
4. Use SHOPLINE's theme preview for testing

This skill provides comprehensive coverage of Sline templating language and serves as your complete reference for SHOPLINE theme development.