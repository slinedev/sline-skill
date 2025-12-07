# Sline Documentation Index

Welcome to the comprehensive documentation for SHOPLINE Sline templating language. This documentation covers everything you need to know to build powerful, dynamic e-commerce themes using Sline.

## Getting Started

- **[Getting Started](getting_started.md)** - Introduction to Sline, basic syntax, and core concepts
- **[Basics](basics.md)** - Detailed coverage of resource handles, operators, and data types

## Core Language Features

- **[Tags](tags.md)** - Complete reference for all template tags and control structures
- **[Filters](filters.md)** - Comprehensive guide to output filters and data transformation
- **[Objects](objects.md)** - All available global and local objects with their properties

## Practical Implementation

- **[Forms](forms.md)** - Complete guide to customer, product, and store forms
- **[Examples](examples.md)** - Real-world templates and implementation patterns

## Quick Reference

### Essential Sline Syntax

```html
<!-- Output expressions -->
{{ variable }}                    <!-- Escaped output -->
{{{ variable }}}                  <!-- Raw HTML output -->

<!-- Template tags -->
{{#if condition}}
  Content when true
{{else}}
  Content when false
{{/if}}

<!-- Loops -->
{{#for items}}
  {{ item.name }}
{{/for}}

<!-- Filters -->
{{ variable | filter_name() }}
{{ variable | filter1() | filter2() }}
```

### Key Objects

| Object | Description | Example Usage |
|--------|-------------|---------------|
| `product` | Current product data | `{{ product.title }}` |
| `collection` | Collection data | `{{ collection.products }}` |
| `cart` | Shopping cart | `{{ cart.total_price \| money() }}` |
| `customer` | Logged-in customer | `{{ customer.first_name }}` |
| `shop` | Store information | `{{ shop.name }}` |
| `page_title` | Current page title | `<title>{{ page_title }}</title>` |

### Common Filters

| Filter | Purpose | Example |
|--------|---------|---------|
| `money()` | Format currency | `{{ price \| money() }}` |
| `truncate(n)` | Limit string length | `{{ content \| truncate(100) }}` |
| `append(txt)` | Add to end | `{{ "Hello" \| append(" World") }}` |
| `size()` | Get array/string size | `{{ items \| size() }}` |
| `sort(by=field)` | Sort array | `{{ products \| sort(by="price") }}` |

### Common Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `{{#if}}` | Conditional logic | `{{#if product.available}}` |
| `{{#for}}` | Loop through arrays | `{{#for products}}` |
| `{{#product_form}}` | Product purchase form | `{{#product_form /}}` |
| `{{#create_customer_form}}` | Customer registration | `{{#create_customer_form}}...{{/create_customer_form}}` |

## Learning Path

### 1. **Absolute Beginners**
1. Read [Getting Started](getting_started.md)
2. Review [Examples](examples.md) for practical templates
3. Try modifying existing templates

### 2. **Theme Developers**
1. Study [Basics](basics.md) for data types and operators
2. Master [Objects](objects.md) for available data
3. Reference [Tags](tags.md) for control flow
4. Use [Filters](filters.md) for data formatting

### 3. **Advanced Implementation**
1. Implement complex [Examples](examples.md)
2. Customize [Forms](forms.md) for specific needs
3. Optimize performance and user experience

## Template Development Workflow

1. **Plan Template Structure** - Identify needed objects and logic
2. **Write Base Template** - Implement basic HTML structure
3. **Add Dynamic Content** - Insert Sline expressions and tags
4. **Apply Filters** - Format data appropriately
5. **Handle Edge Cases** - Add nil checks and fallbacks
6. **Test Thoroughly** - Verify with different data scenarios
7. **Optimize Performance** - Refine for speed and user experience

## Common Use Cases

### Product Pages
```html
<h1>{{ product.title }}</h1>
<p>{{ product.price | money_with_currency() }}</p>
{{#if product.available}}
  {{#product_form /}}
{{else}}
  <p>Out of Stock</p>
{{/if}}
```

### Collection Pages
```html
{{#for collection.products}}
  <div class="product">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money() }}</p>
  </div>
{{/for}}
```

### Customer Account
```html
{{#if customer}}
  Welcome back, {{ customer.first_name }}!
{{else}}
  <a href="{{ routes.login_url }}">Login</a>
{{/if}}
```

## Best Practices Summary

1. **Always check for nil values** before accessing properties
2. **Use escaped output `{{ }}`** by default, raw `{{{ }}}` only when needed
3. **Leverage filters** for data formatting and transformation
4. **Organize templates** with clear structure and comments
5. **Test with various data scenarios** to ensure robustness
6. **Follow semantic HTML** and accessibility guidelines
7. **Optimize images** with appropriate sizes and formats
8. **Implement proper form validation** and error handling

## Resources and Tools

### Official Documentation
- [SHOPLINE Developer Portal](https://developer.shopline.com/)
- [Theme Development Guide](https://developer.shopline.com/docs/online-store-3-0-themes/)

### Development Tools
- Theme Editor (built-in)
- Local development with SHOPLINE CLI
- Browser DevTools for debugging

### Testing and Validation
- Theme Preview functionality
- Multiple device testing
- Cross-browser compatibility checks

## Troubleshooting

### Common Issues

**Empty Template Output:**
- Check for proper syntax (matching tags, correct brackets)
- Verify object availability in current context
- Test with different data scenarios

**Form Submission Errors:**
- Ensure proper form tag structure
- Verify input names match expected format
- Check validation rules and required fields

**Performance Issues:**
- Optimize image sizes and loading
- Minimize complex nested loops
- Cache expensive operations where possible

## Getting Help

1. **Check documentation** - Most issues are covered in these guides
2. **Review examples** - Similar implementations may solve your problem
3. **Test incrementally** - Build templates piece by piece
4. **Use debugging output** - Temporarily display variables to verify values
5. **Community support** - SHOPLINE developer forums and Discord

---

**Quick Navigation:**
- [← Back to Skill Overview](../SKILL.md)
- [Getting Started](getting_started.md) → [Basics](basics.md) → [Tags](tags.md) → [Filters](filters.md) → [Objects](objects.md) → [Forms](forms.md) → [Examples](examples.md)