# Sline Skill for Claude AI

<div align="center">

![Sline Logo](https://sline.dev/sline-logo.png)

**Complete SHOPLINE Sline Templating Language Skill for Claude AI**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/slinedev/sline-skill/releases)
[![SHOPLINE](https://img.shields.io/badge/platform-SHOPline-orange.svg)](https://www.shopline.com/)

 comprehensive guide for building powerful e-commerce themes with SHOPLINE Sline templating language, optimized for Claude AI assistance.

[View Documentation](references/) • [Quick Start](#quick-start) • [Examples](examples.md) • [Contributing](#contributing)

</div>

## 📋 Overview

This skill provides comprehensive documentation and practical examples for **SHOPLINE Sline**, the powerful templating language designed for e-commerce theme development. Whether you're a beginner learning the basics or an experienced developer implementing complex features, this skill has everything you need.

### ✨ Key Features

- 🎯 **Complete Language Coverage** - Every tag, filter, and object documented
- 📚 **Real-World Examples** - Production-ready templates and patterns
- 🛠️ **Development Tools** - Template validation and optimization utilities
- 🔧 **Best Practices** - Security, performance, and accessibility guidelines
- 📖 **Structured Learning** - Progressive documentation from basics to advanced

## 🚀 Quick Start

### 1. Add to Claude AI

Download the latest `sline.zip` and upload it to your Claude AI workspace:

```
1. Click "+ Add Skill" in Claude AI
2. Upload sline.zip
3. Start using Sline immediately!
```

### 2. Basic Usage

```html
<!-- Output expressions -->
{{ product.title }}                    <!-- Safe escaped output -->
{{{ product.description }}}          <!-- Raw HTML output -->

<!-- Conditional logic -->
{{#if product.available}}
  {{#product_form /}}
{{else}}
  <p>Out of Stock</p>
{{/if}}

<!-- Loops and filters -->
{{#for collection.products}}
  <h3>{{ title }}</h3>
  <p>{{ price | money_with_currency() }}</p>
{{/for}}
```

### 3. Essential Objects

| Object | Purpose | Example |
|--------|---------|---------|
| `product` | Current product data | `{{ product.title }}` |
| `collection` | Collection information | `{{ collection.products }}` |
| `shop` | Store settings | `{{ shop.name }}` |
| `cart` | Shopping cart | `{{ cart.total_price | money() }}` |
| `customer` | Logged-in user | `{{ customer.first_name }}` |

## 📚 Documentation Structure

```
sline/
├── SKILL.md                    # Main overview and quick reference
├── references/                 # Comprehensive documentation
│   ├── index.md               # Navigation and getting started
│   ├── getting_started.md     # Introduction to Sline
│   ├── basics.md              # Fundamentals: data types, operators
│   ├── tags.md                # Complete tag reference
│   ├── filters.md             # All filters with examples
│   ├── objects.md             # Object properties and usage
│   ├── forms.md               # Form implementation guide
│   └── examples.md            # Real-world templates
├── scripts/                   # Development utilities
│   ├── template_validator.js  # Syntax validation tool
│   └── README.md              # Scripts documentation
└── assets/                     # Theme assets framework
    └── README.md              # Assets organization guide
```

## 🎯 Core Concepts

### Template Syntax

```html
<!-- Variables and objects -->
{{ variable_name }}
{{ object.property }}
{{ shop.name }}

<!-- Raw HTML output -->
{{{ product.description }}}

<!-- Filters -->
{{ price | money() }}
{{ content | truncate(150) }}
{{ products | sort(by="price") }}

<!-- Conditionals -->
{{#if condition}}
  <!-- Content when true -->
{{else}}
  <!-- Content when false -->
{{/if}}

<!-- Loops -->
{{#for items}}
  {{ forloop.index }}: {{ item.name }}
{{/for}}
```

### Essential Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `money()` | Format currency | `{{ price | money() }}` |
| `truncate(n)` | Limit text length | `{{ content | truncate(100) }}` |
| `append(txt)` | Add to end | `{{ "Hello" | append(" World") }}` |
| `size()` | Get array length | `{{ items | size() }}` |
| `sort(by=field)` | Sort items | `{{ products | sort(by="price") }}` |

### Common Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `{{#if}}` | Conditional logic | `{{#if product.available}}` |
| `{{#for}}` | Loop through arrays | `{{#for products}}` |
| `{{#product_form}}` | Product purchase form | `{{#product_form /}}` |
| `{{#create_customer_form}}` | Customer registration | `{{#create_customer_form}}...{{/create_customer_form}}` |

## 🛠️ Development Tools

### Template Validator

Validate your Sline templates for syntax errors and best practices:

```bash
# Validate a template file
node scripts/template_validator.js path/to/template.liquid

# Or use programmatically
const SlineTemplateValidator = require('./scripts/template_validator.js');
const result = validator.validate(template);
```

**What it checks:**
- Syntax errors (unmatched tags, brackets)
- Best practices compliance
- Performance optimization opportunities
- Accessibility considerations

### Asset Framework

Organized structure for theme assets:

```
assets/
├── js/          # JavaScript components
├── css/         # Stylesheets
├── images/      # Images and icons
├── fonts/       # Custom fonts
└── templates/   # Template starters
```

## 📖 Real Examples

### Product Page Template

```html
<div class="product-page">
  <h1>{{ product.title }}</h1>

  <div class="product-pricing">
    <span class="price">{{ product.price | money_with_currency() }}</span>
    {{#if product.compare_at_price}}
      <span class="original-price">
        {{ product.compare_at_price | money_with_currency() }}
      </span>
    {{/if}}
  </div>

  <div class="product-description">
    {{ product.description }}
  </div>

  {{#if product.available}}
    {{#if product.variants | size() > 1}}
      {{#for product.options}}
        <label for="{{ name | handle }}">{{ name }}</label>
        <select id="{{ name | handle }}" name="options[{{ name | handle }}]">
          {{#for values}}
            <option value="{{ . }}">{{ . }}</option>
          {{/for}}
        </select>
      {{/for}}
    {{/if}}

    <div class="quantity-selector">
      <label for="quantity">Quantity</label>
      <input type="number" id="quantity" name="quantity" value="1" min="1">
    </div>

    {{#product_form /}}
    <button type="submit" class="btn btn-primary">Add to Cart</button>
  {{else}}
    <div class="out-of-stock">
      <p>This product is currently out of stock.</p>
    </div>
  {{/if}}
</div>
```

### Customer Dashboard

```html
<div class="customer-dashboard">
  <h1>Welcome, {{ customer.first_name }}!</h1>

  <div class="account-stats">
    <div class="stat-card">
      <h3>{{ customer.orders | size() }}</h3>
      <p>Total Orders</p>
    </div>
    <div class="stat-card">
      <h3>{{ customer.addresses | size() }}</h3>
      <p>Saved Addresses</p>
    </div>
  </div>

  <section class="recent-orders">
    <h2>Recent Orders</h2>
    {{#if customer.orders}}
      {{#for customer.orders | slice(0, 5)}}
        <div class="order-card">
          <h4>Order {{ order.name }}</h4>
          <p>Date: {{ order.created_at | date('%B %d, %Y') }}</p>
          <p>Total: {{ order.total_price | money() }}</p>
          <a href="{{ order.customer_url }}" class="btn btn-secondary">
            View Order
          </a>
        </div>
      {{/for}}
    {{else}}
      <p>You haven't placed any orders yet.</p>
      <a href="{{ routes.root_url }}" class="btn btn-primary">
        Start Shopping
      </a>
    {{/if}}
  </section>
</div>
```

See [examples.md](references/examples.md) for more comprehensive templates and patterns.

## 🎨 Common Use Cases

### E-commerce Features
- **Product customization** - Options, variants, and personalization
- **Shopping cart** - Dynamic cart management and checkout flow
- **Customer accounts** - Registration, login, and profile management
- **Order management** - Order history and tracking

### Content Management
- **Blog system** - Articles, comments, and SEO optimization
- **Static pages** - About us, contact, and information pages
- **Navigation menus** - Dynamic menus and breadcrumbs
- **Search functionality** - Product search and filtering

### Advanced Features
- **Multi-language support** - Internationalization and localization
- **Mobile responsiveness** - Progressive enhancement and PWA
- **Performance optimization** - Caching and lazy loading
- **Accessibility** - WCAG compliance and screen reader support

## 🔧 Best Practices

### Security
```html
✅ Always escape user content
{{ user_input }}

❌ Never trust unescaped HTML
{{{ user_input }}}

✅ Use filtered products
{{ products | where("available", true) }}
```

### Performance
```html
✅ Use pagination for large datasets
{{ paginate paginate.parts }}

✅ Optimize images
{{ image | image_url("medium") }}

✅ Cache expensive operations
{{#capture expensive_calculation}}
  {{ complexExpression }}
{{/capture}}
{{ expensive_calculation }}
```

### Accessibility
```html
✅ Use proper form labels
<label for="customer-email">Email</label>
<input type="email" id="customer-email" name="customer[email]">

✅ Add alt text to images
<img src="{{ image.src | image_url() }}" alt="{{ product.title }}">

✅ Use semantic HTML
<header>, <nav>, <main>, <section>, <article>, <footer>
```

## 🌍 Integration

### Claude AI Usage

Simply upload the `sline.zip` file to Claude AI and start asking questions:

> **"How do I create a product variant selector in Sline?"**
>
> **"What's the best way to implement a customer review system?"**
>
> **"Can you help me optimize this template for performance?"**

The skill provides relevant code examples, best practices, and detailed explanations tailored to your specific needs.

### Theme Development Workflow

1. **Planning** - Determine required objects and logic
2. **Structure** - Create semantic HTML with Sline expressions
3. **Validation** - Use template validator to check syntax
4. **Testing** - Test with various data scenarios
5. **Optimization** - Apply performance best practices
6. **Deployment** - Upload to SHOPLINE store

## 🤝 Contributing

We welcome contributions to make this skill even better!

### How to Contribute

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- **Documentation** - Keep examples current and comprehensive
- **Code Quality** - Follow existing style and patterns
- **Testing** - Validate templates with the validator tool
- **Accessibility** - Ensure examples follow accessibility best practices
- **Performance** - Optimize for speed and user experience

### Areas for Contribution

- 📝 **Additional Examples** - Real-world template implementations
- 🛠️ **Development Tools** - New validation and optimization utilities
- 📚 **Enhanced Documentation** - More detailed guides and tutorials
- 🌐 **Internationalization** - Multi-language examples and patterns
- 📊 **Performance Analysis** - Advanced optimization techniques

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SHOPLINE** - For providing the powerful Sline templating language
- **Theme Developers** - For inspiring real-world examples and patterns
- **Claude AI Community** - For feedback and contributions

## 📞 Support

- 📖 **Documentation:** [Browse reference materials](references/)
- ❓ **Issues:** [Create an issue](https://github.com/slinedev/sline-skill/issues)
- 💬 **Discussions:** [Join our community](https://github.com/slinedev/sline-skill/discussions)
- 📧 **Email:** hi@sline.dev

## 🔗 Related Resources

- [SHOPLINE Developer Portal](https://developer.shopline.com/)
- [Sline Official Documentation](https://developer.shopline.com/docs/sline/)
- [Theme Development Guide](https://developer.shopline.com/docs/online-store-3-0-themes/)
- [SHOPLINE App Store](https://apps.shopline.com/)

---

<div align="center">

**Made with ❤️ for the SHOPLINE developer community**

[⭐ Star this repo](https://github.com/slinedev/sline-skill) • [🐛 Report Issues](https://github.com/slinedev/sline-skill/issues) • [📖 Read Docs](references/)

</div>
