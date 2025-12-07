# Sline Tags Reference

Sline tags are used to define logic that instructs the template to output specific content. The text within tag delimiters will not produce visible output when the webpage is rendered.

Tags are divided into normal tags and self-closing tags:
- Normal tags start with `{{# tag_name }}` and end with `{{/ tag_name }}`
- Self-closing tags are formatted as `{{# tag_name /}}`

## Control Flow Tags

### if

Conditional logic based on boolean expressions.

```html
{{#if condition}}
  Content when condition is true
{{/if}}
```

**With else:**
```html
{{#if condition}}
  Content when condition is true
{{else}}
  Content when condition is false
{{/if}}
```

**With elseif:**
```html
{{#if condition1}}
  Content for condition1
{{elseif condition2}}
  Content for condition2
{{else}}
  Default content
{{/if}}
```

### unless

Reverse conditional - executes content when condition is false.

```html
{{#unless condition}}
  Content when condition is false
{{/unless}}
```

### case

Switch statement for multiple conditions.

```html
{{#case value}}
  {{#when "option1"}}
    Content for option1
  {{/when}}
  {{#when "option2"}}
    Content for option2
  {{/when}}
  {{#else}}
    Default content
  {{/else}}
{{/case}}
```

## Loop Tags

### for

Iterate over arrays and collections.

```html
{{#for products}}
  {{ product.title }} - ${{ product.price }}
{{/for}}
```

**With index:**
```html
{{#for products}}
  {{ forloop.index }}: {{ product.title }}
{{/for}}
```

**With loop properties:**
- `forloop.index` - Current index (1-based)
- `forloop.index0` - Current index (0-based)
- `forloop.first` - True if first iteration
- `forloop.last` - True if last iteration
- `forloop.length` - Total number of items

## Form Tags

### create_customer_form

Generate a form for creating a new customer account.

```html
{{#create_customer_form}}
  <input type="email" name="customer[email]" required>
  <input type="password" name="customer[password]" required>
  <button type="submit">Create Account</button>
{{/create_customer_form}}
```

**Form Inputs:**
- `customer[email]` (email) - Email
- `customer[first_name]` (string) - First name
- `customer[last_name]` (string) - Last name
- `customer[phone]` (phone) - Phone number
- `customer[birthday]` (date) - Birthday
- `customer[password]` (password) - Password

### customer_login_form

Generate a form for customer login.

```html
{{#customer_login_form}}
  <input type="email" name="customer[email]" required>
  <input type="password" name="customer[password]" required>
  <button type="submit">Login</button>
{{/customer_login_form}}
```

### product_form

Generate a product purchase form (self-closing).

```html
{{#product_form /}}
```

### customer_address_form

Generate forms for customer address management.

```html
{{#customer_address_form}}
  <input type="text" name="address[first_name]">
  <input type="text" name="address[last_name]">
  <!-- Other address fields -->
{{/customer_address_form}}
```

## Page Structure Tags

### Sections

Define dynamic template sections.

```html
{{#sections "header"}}
  <!-- Header content -->
{{/sections}}
```

### Blocks

Define reusable content blocks.

```html
{{#block type="text" name="announcement"}}
  {{ block.settings.text }}
{{/block}}
```

### capture

Capture content to a variable.

```html
{{#capture variable_name}}
  Content to capture
{{ with more content }}
{{/capture}}

<!-- Use the captured content -->
{{ variable_name }}
```

## Content Tags

### link_to

Generate hyperlink tags.

```html
{{#link_to "Login Page" url="/login" class="btn" /}}
```

### image_tag

Generate image tags.

```html
{{#image_tag product.featured_image alt=product.title /}}
```

### video_tag

Generate HTML video elements.

```html
{{#video_tag video_url autoplay=true loop=true class="product-video" /}}
```

### script_tag

Include JavaScript files.

```html
{{#script_tag "app.js" /}}
```

### stylesheet_tag

Include CSS files.

```html
{{#stylesheet_tag "style.css" /}}
```

## Localization Tags

### currency

Display currency symbol and code.

```html
{{#currency shop.currency /}}
```

### schema

Generate structured data markup.

```html
{{#schema type="Product"}}
  {
    "name": "{{ product.title }}",
    "price": "{{ product.price }}"
  }
{{/schema}}
```

### localization_form

Generate country/language selection form.

```html
{{#localization_form}}
  <!-- Country and language selectors -->
{{/localization_form}}
```

## Utility Tags

### paginate

Generate pagination controls.

```html
{{#paginate paginate.parts}}
  {{#if part.is_link}}
    <a href="{{ part.url }}">{{ part.title }}</a>
  {{else}}
    <span class="current">{{ part.title }}</span>
  {{/if}}
{{/paginate}}
```

### format_address

Format address according to locale.

```html
{{#format_address address /}}
```

### delete_customer_form

Generate account deletion form.

```html
{{#delete_customer_form}}
  <button type="submit">Delete Account</button>
{{/delete_customer_form}}
```

### storefront_password_form

Generate store password protection form.

```html
{{#storefront_password_form /}}
```

### placeholder_svg

Generate placeholder SVG images.

```html
{{#placeholder_svg type="product" class="placeholder" /}}
```

## Variable Tags

### var

Define and assign variables.

```html
{{#var product_price = product.price | money() }}
{{ product_price }}
```

### assign

Alternative way to assign variables.

```html
{{#assign product_name = product.title}}
{{ product_name }}
```

## Comment Tags

### comment

Add comments that won't render in output.

```html
{{#comment}}
  This is a comment that won't appear in the final HTML
{{/comment}}
```

## Raw Output

### raw

Output content without processing.

```html
{{#raw}}
  {{ This will be treated as literal text, not processed }}
{{/raw}}
```

## Form Tag Examples

### Customer Registration Form

```html
{{#create_customer_form}}
  <div class="form-group">
    <label for="customer-email">Email</label>
    <input type="email" id="customer-email" name="customer[email]" required>
  </div>

  <div class="form-group">
    <label for="customer-first_name">First Name</label>
    <input type="text" id="customer-first_name" name="customer[first_name]">
  </div>

  <div class="form-group">
    <label for="customer-last_name">Last Name</label>
    <input type="text" id="customer-last_name" name="customer[last_name]">
  </div>

  <div class="form-group">
    <label for="customer-password">Password</label>
    <input type="password" id="customer-password" name="customer[password]" required>
  </div>

  <button type="submit">Create Account</button>
{{/create_customer_form}}
```

### Product Options Loop

```html
{{#for product.options}}
  <div class="product-option">
    <h3>{{ option.name }}</h3>
    <select name="options[{{ option.handle }}]">
      {{#for option.values}}
        <option value="{{ value }}">{{ value }}</option>
      {{/for}}
    </select>
  </div>
{{/for}}
```

### Conditional Content Display

```html
{{#if product.available}}
  <div class="product-available">
    <p>In Stock: {{ product.inventory_quantity }} units</p>
    {{#product_form /}}
  </div>
{{else}}
  <div class="product-unavailable">
    <p>Out of Stock</p>
    {{#if product.will_backorder}}
      <p>Backorder available</p>
    {{/if}}
  </div>
{{/if}}
```

## Best Practices

1. **Always close tags properly** to avoid template errors
2. **Use meaningful variable names** with `var` and `assign`
3. **Structure form tags** with proper input naming conventions
4. **Conditionally render forms** based on user context
5. **Use pagination** for large datasets
6. **Implement proper error handling** in forms
7. **Validate form inputs** on both client and server side
8. **Use schema tags** for SEO and structured data
9. **Leverage localization forms** for multi-store support
10. **Test forms thoroughly** with various scenarios