# Getting Started with Sline

## Overview

Sline is a templating language. It allows you to create a template to display static content and dynamically insert data based on the rendering location of the template.

For example, you can use Sline to create a product template that includes common features, such as the product image, title, and price. When a user views a specific product, the template automatically populates the corresponding product information based on the user's selection.

## How to Use Sline?

Sline facilitates the dynamic display of **objects** and their properties. Objects and their properties are presented through expressions with double curly braces, such as `{{ expression }}`. To output unescaped HTML code, use triple curly braces, such as `{{{ expression }}}`, which treats any HTML tags within the expression as plain text rather than HTML elements.

Additionally, you can write logic using **tags** and modify outputs using **filters**.

**Note**: Sline is fully customized by SHOPLINE. You cannot define your own tags and filters.

### Basic Example

```html
<!-- Render html title -->
<title>
{{ page_title }}
</title>

<!-- Render html meta description -->
{{#if page_description}}
<meta name="description" content="{{ page_description | truncate(150) }}">
{{/if}}

<!-- Render unescaped html -->
<div class="product_description_container">
{{{ product.description }}}
</div>
```

## Sline Resources

### Basics

Sline basics mainly contain the creation and usage of resource handles, logical and comparison operators, and data types output by objects and their properties.

Refer to the Basics documentation before you get started.

### Tags

Sline tags are used to define logic that instructs the template to output specific content. The text within tag delimiters will not produce visible output when the webpage is rendered.

Tags are divided into normal tags and self-closing tags:

- Normal tags start with `{{# tag_name }}` and end with `{{/ tag_name }}`
- Self-closing tags are formatted as `{{# tag_name /}}`

**Example:**

```typescript
{{#if customer != nil}}
User {{customer.name}} is logged in!
{{/if}}
{{#product_form /}}
```

### Filters

Sline filters are utilized to modify the output of variables and objects. They can be added after a pipe symbol within `{{}}` or tags.

Multiple filters can be used within a single output, and they are parsed sequentially from left to right.

**Example:**

```typescript
<div class="product-page">
  <div class="product-image">
    <!-- get the product image link to generate the image tag -->
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

### Objects

Sline objects represent the variables you can use to build themes. Object types include but are not limited to:

- Store resources, such as **collection** and **product**
- Functional elements for creating interactivity, such as **paginate**

Objects can represent a single data point, such as **page_title**, or contain multiple properties, such as **product**.

#### Scope

Objects are divided into global and local. Global objects can be used across all **theme templates**, such as **page_title**, whereas local objects defined by tags are restricted to the current template file where they are defined, such as **forloop**.

## Core Concepts

### Template Structure

Sline templates use a simple, readable syntax that combines:
- **Output expressions** for displaying data
- **Logic tags** for control flow
- **Filters** for data transformation
- **Objects** for data access

### Output Expressions

Use double curly braces for safe (escaped) output:
```html
{{ product.title }}
```

Use triple curly braces for raw (unescaped) output:
```html
{{{ product.description }}}
```

### Logic Tags

Conditional statements:
```html
{{#if product.available}}
  <!-- Product is available -->
{{else}}
  <!-- Product is out of stock -->
{{/if}}
```

Loops:
```html
{{#for product.options}}
  {{ option.name }}: {{ option.value }}
{{/for}}
```

### Data Flow

1. **Template Request** - User requests a page
2. **Data Collection** - SHOPLINE collects relevant objects
3. **Template Processing** - Sline processes template with data
4. **HTML Output** - Final HTML is generated and sent to browser

## Common Use Cases

### Product Pages
Display product information with images, pricing, and variants.

### Collection Pages
Show lists of products with filtering and pagination.

### Blog/Article Pages
Render articles with metadata and navigation.

### Static Pages
Create about, contact, and other informational pages.

### User Account Pages
Display customer information and order history.

## Development Workflow

1. **Plan Template** - Identify required objects and logic
2. **Write Template** - Implement using Sline syntax
3. **Test Data** - Test with various data scenarios
4. **Refine** - Optimize performance and user experience
5. **Deploy** - Upload to SHOPLINE theme

## Best Practices

1. **Always check for nil values** before accessing properties
2. **Use appropriate filters** for data formatting
3. **Organize templates** with clear structure and comments
4. **Test thoroughly** with different data scenarios
5. **Follow naming conventions** for consistency

Next: Learn more about [Basics](basics.md), [Tags](tags.md), [Filters](filters.md), or [Objects](objects.md).