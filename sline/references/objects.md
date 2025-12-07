# Sline Objects Reference

Sline objects represent the variables you can use to build themes. Objects are divided into global and local:
- **Global objects**: Available across all theme templates
- **Local objects**: Restricted to the current template file where they are defined

## Global Objects

### page_title

The page title for SEO and browser tabs.

```html
<title>{{ page_title }}</title>
<meta property="og:title" content="{{ page_title }}">
```

### page_description

Meta description for SEO.

```html
{{#if page_description}}
<meta name="description" content="{{ page_description | truncate(160) }}">
{{/if}}
```

### shop

Information about the store.

```html
<!-- Store name -->
<h1>{{ shop.name }}</h1>

<!-- Store currency -->
{{ shop.currency }} <!-- USD, EUR, etc. -->

<!-- Store domain -->
{{ shop.domain }} <!-- "mystore.shopline.com" -->

<!-- Store email -->
{{ shop.email }}

<!-- Store settings -->
{{ shop.enabled_payment_types }}
{{ shop.collections | size() }} <!-- Total collections -->
{{ shop.products | size() }} <!-- Total products -->
```

**Shop Properties:**
- `name` (string) - Store name
- `domain` (string) - Store domain
- `email` (string) - Store email
- `currency` (string) - Default currency code
- `money_format` (string) - Money display format
- `weight_unit` (string) - Weight unit (kg, g, lb, oz)
- `collections` (array) - All collections
- `products` (array) - All products
- `pages` (array) - All pages
- `blogs` (array) - All blogs
- `types` (array) - All product types
- `vendors` (array) - All product vendors

### customer

Information about the logged-in customer.

```html
{{#if customer}}
  Welcome back, {{ customer.first_name }}!
  Email: {{ customer.email }}
{{else}}
  Please login or register
{{/if}}
```

**Customer Properties:**
- `first_name` (string) - First name
- `last_name` (string) - Last name
- `name` (string) - Full name
- `email` (string) - Email address
- `phone` (string) - Phone number
- `addresses` (array) - Customer addresses
- `default_address` (object) - Default address
- `orders` (array) - Customer orders
- `tags` (array) - Customer tags
- `accepts_marketing` (boolean) - Marketing consent

### current_tags

Tags applied to the current page.

```html
{{#if current_tags}}
  <h3>Active Tags:</h3>
  {{#for current_tags}}
    <span class="tag">{{ . }}</span>
  {{/for}}
{{/if}}
```

### routes

URL routing objects for internal links.

```html
<a href="{{ routes.root_url }}">Home</a>
<a href="{{ routes.cart_url }}">Cart</a>
<a href="{{ routes.search_url }}">Search</a>
```

**Route Properties:**
- `root_url` (string) - Homepage URL
- `cart_url` (string) - Cart page URL
- `checkout_url` (string) - Checkout URL
- `search_url` (string) - Search page URL
- `account_url` (string) - Account page URL
- `login_url` (string) - Login page URL
- `register_url` (string) - Registration page URL
- `products_url` (string) - All products URL
- `collections_url` (string) - All collections URL

## Page-Specific Objects

### product

Product object available on product pages and collections.

```html
<h1>{{ product.title }}</h1>
<p>Price: {{ product.price | money() }}</p>
<p>{{ product.description }}</p>

{{#if product.available}}
  {{#product_form /}}
{{else}}
  <p>Out of Stock</p>
{{/if}}
```

**Product Properties:**
- `id` (number) - Product ID
- `title` (string) - Product title
- `handle` (string) - Product handle
- `description` (string) - Product description
- `price` (number) - Product price
- `compare_at_price` (number) - Original price
- `available` (boolean) - Product availability
- `featured_image` (object) - Featured image
- `images` (array) - All product images
- `options` (array) - Product options (size, color, etc.)
- `variants` (array) - Product variants
- `tags` (array) - Product tags
- `type` (string) - Product type
- `vendor` (string) - Product vendor
- `sku` (string) - Product SKU
- `weight` (number) - Product weight
- `published_at` (date) - Publication date

### collection

Collection object on collection pages.

```html
<h1>{{ collection.title }}</h1>
<p>{{ collection.description }}</p>

<!-- Display products in collection -->
{{#for collection.products}}
  <div class="product">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money() }}</p>
  </div>
{{/for}}
```

**Collection Properties:**
- `id` (number) - Collection ID
- `title` (string) - Collection title
- `handle` (string) - Collection handle
- `description` (string) - Collection description
- `products` (array) - Products in collection
- `products_count` (number) - Number of products
- `image` (object) - Collection image (optional)
- `published_at` (date) - Publication date
- `updated_at` (date) - Last update date

### article

Blog article object.

```html
<h1>{{ article.title }}</h1>
<p class="date">{{ article.published_at | date("%B %d, %Y") }}</p>
<div class="content">
  {{ article.content }}
</div>
```

**Article Properties:**
- `id` (number) - Article ID
- `title` (string) - Article title
- `handle` (string) - Article handle
- `content` (string) - Article content
- `excerpt` (string) - Article excerpt
- `published_at` (date) - Publication date
- `updated_at` (date) - Last update date
- `author` (string) - Article author
- `tags` (array) - Article tags
- `comments` (array) - Article comments
- `image` (object) - Article image (optional)

### blog

Blog object.

```html
<h1>{{ blog.title }}</h1>
<p>{{ blog.description }}</p>

{{#for blog.articles}}
  <article>
    <h2><a href="{{ article.url }}">{{ article.title }}</a></h2>
    <p>{{ article.excerpt }}</p>
  </article>
{{/for}}
```

**Blog Properties:**
- `id` (number) - Blog ID
- `title` (string) - Blog title
- `handle` (string) - Blog handle
- `description` (string) - Blog description
- `articles` (array) - Blog articles
- `articles_count` (number) - Number of articles
- `tags` (array) - All tags used in blog
- `updated_at` (date) - Last update date

### page

Static page object.

```html
<h1>{{ page.title }}</h1>
<div class="content">
  {{ page.content }}
</div>
```

**Page Properties:**
- `id` (number) - Page ID
- `title` (string) - Page title
- `handle` (string) - Page handle
- `content` (string) - Page content
- `author` (string) - Page author
- `published_at` (date) - Publication date
- `updated_at` (date) - Last update date
- `template_suffix` (string) - Template suffix

## Cart Objects

### cart

Shopping cart object.

```html
{{#if cart.items}}
  <h2>Shopping Cart ({{ cart.items | size() }} items)</h2>

  {{#for cart.items}}
    <div class="cart-item">
      <h4>{{ item.title }}</h4>
      <p>{{ item.price | money() }} x {{ item.quantity }}</p>
      <p>Total: {{ item.line_price | money() }}</p>
    </div>
  {{/for}}

  <h3>Total: {{ cart.total_price | money() }}</h3>
{{else}}
  <p>Your cart is empty</p>
{{/if}}
```

**Cart Properties:**
- `items` (array) - Cart items
- `item_count` (number) - Total items
- `total_price` (number) - Total price
- `total_weight` (number) - Total weight
- `requires_shipping` (boolean) - Shipping required

**Cart Item Properties:**
- `product` (object) - Product object
- `variant` (object) - Product variant
- `quantity` (number) - Item quantity
- `price` (number) - Item price
- `line_price` (number) - Line total price
- `weight` (number) - Item weight
- `line_weight` (number) - Line total weight

## Local Objects

### forloop

Iteration information in loops.

```html
{{#for products}}
  <div class="product {{#if forloop.first}}first{{/if}}">
    {{ forloop.index }}. {{ product.title }}
    {{#if forloop.last}}(Last item){{/if}}
  </div>
{{/for}}
```

**Forloop Properties:**
- `index` (number) - Current iteration (1-based)
- `index0` (number) - Current iteration (0-based)
- `first` (boolean) - First iteration
- `last` (boolean) - Last iteration
- `length` (number) - Total iterations

### paginate

Pagination information.

```html
{{#for paginate.parts}}
  {{#if part.is_link}}
    <a href="{{ part.url }}">{{ part.title }}</a>
  {{else}}
    <span class="current">{{ part.title }}</span>
  {{/if}}
{{/for}}

<p>Showing items {{ paginate.current_offset }} to {{ paginate.current_size }}
   of {{ paginate.items }} total</p>
```

**Paginate Properties:**
- `current_page` (number) - Current page
- `current_offset` (number) - Current offset
- `current_size` (number) - Items on current page
- `items` (number) - Total items
- `pages` (number) - Total pages
- `parts` (array) - Pagination navigation parts
- `next` (object) - Next page object
- `previous` (object) - Previous page object

### block

Block object in sections.

```html
{{#block type="text" name="announcement"}}
  {{ block.settings.text }}
  {{ block.type }}
{{/block}}
```

**Block Properties:**
- `type` (string) - Block type
- `name` (string) - Block name
- `settings` (object) - Block settings
- `id` (string) - Block ID

## Special Objects

### content_for_header

Dynamically returns all scripts required by SHOPLINE.

```html
<head>
  {{ content_for_header }}
</head>
```

### content_for_layout

Main content for layout files.

```html
<body>
  <header>{{ content_for_header }}</header>
  <main>{{ content_for_layout }}</main>
  <footer>{{ content_for_footer }}</footer>
</body>
```

### current_page_metadata

SEO metadata for current page.

```html
<meta property="og:title" content="{{ current_page_metadata.title }}">
<meta property="og:description" content="{{ current_page_metadata.description }}">
```

## Image Objects

### image

Image object with properties.

```html
{{#for product.images}}
  <img src="{{ image.src | image_url('medium') }}"
       alt="{{ product.title }}"
       width="{{ image.width }}"
       height="{{ image.height }}">
{{/for}}
```

**Image Properties:**
- `id` (number) - Image ID
- `src` (string) - Image source URL
- `alt` (string) - Alt text
- `width` (number) - Image width
- `height` (number) - Image height
- `position` (number) - Image position
- `variant_ids` (array) - Associated variant IDs

## Address Objects

### address

Customer or shipping address.

```html
{{ address.first_name }} {{ address.last_name }}
{{ address.company }}
{{ address.address1 }}
{{#if address.address2}}{{ address.address2 }}{{/if}}
{{ address.city }}, {{ address.province }} {{ address.zip }}
{{ address.country }}
{{ address.phone }}
```

**Address Properties:**
- `first_name` (string) - First name
- `last_name` (string) - Last name
- `company` (string) - Company name
- `address1` (string) - Address line 1
- `address2` (string) - Address line 2
- `city` (string) - City
- `province` (string) - State/province
- `country` (string) - Country
- `zip` (string) - Postal code
- `phone` (string) - Phone number
- `latitude` (number) - Latitude
- `longitude` (number) - Longitude

## Object Precedence and Scope

1. **Global Scope**: Available in all templates
2. **Page Scope**: Available on specific page types
3. **Local Scope**: Available within specific tags/loops
4. **Nested Scope**: Inner regions override outer regions

## Best Practices

1. **Check for nil** before accessing object properties
2. **Use dot notation** for simple property access
3. **Use bracket notation** for dynamic property names
4. **Leverage object loops** for displaying collections
5. **Cache expensive operations** where appropriate
6. **Use proper escape handling** for user-generated content