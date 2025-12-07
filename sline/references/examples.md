# Sline Examples and Patterns

This section provides practical examples and common patterns for implementing SHOPLINE themes using Sline templating language.

## Product Page Examples

### Complete Product Template

```html
<div class="product-page">
  <!-- Product Title and Price -->
  <div class="product-header">
    <h1>{{ product.title }}</h1>
    <div class="product-pricing">
      <span class="price">{{ product.price | money_with_currency() }}</span>
      {{#if product.compare_at_price}}
        <span class="compare-price">
          {{ product.compare_at_price | money_with_currency() }}
        </span>
        <span class="discount">
          Save {{ product.compare_at_price | minus(product.price) | divided_by(product.compare_at_price) | times(100) | round() }}%
        </span>
      {{/if}}
    </div>
  </div>

  <!-- Product Description -->
  <div class="product-description">
    {{ product.description }}
  </div>

  <!-- Product Form -->
  <div class="product-purchase">
    {{#if product.available}}
      {{#if product.variants | size() > 1}}
        <!-- Variant Options -->
        {{#for product.options}}
          <div class="product-option">
            <label for="{{ name | handle }}">{{ name }}</label>
            <select id="{{ name | handle }}" name="options[{{ name | handle }}]">
              {{#for values}}
                <option value="{{ . }}"
                        data-option-position="{{ forloop.index }}"
                        {{#if ../selected.value == .}}selected{{/if}}>
                  {{ . }}
                </option>
              {{/for}}
            </select>
          </div>
        {{/for}}
      {{/if}}

      <!-- Quantity Selector -->
      <div class="quantity-selector">
        <label for="quantity">Quantity</label>
        <div class="quantity-input-group">
          <button type="button" class="quantity-decrement">-</button>
          <input type="number"
                 id="quantity"
                 name="quantity"
                 min="1"
                 value="1"
                 class="quantity-input">
          <button type="button" class="quantity-increment">+</button>
        </div>
      </div>

      <!-- Add to Cart Button -->
      {{#product_form /}}
      <button type="submit" class="btn btn-primary add-to-cart">
        Add to Cart
      </button>

    {{else}}
      <div class="out-of-stock">
        <p>This product is currently out of stock.</p>
        {{#if product.will_backorder}}
          <p>Available for backorder.</p>
        {{/if}}
      </div>
    {{/if}}
  </div>

  <!-- Product Gallery -->
  <div class="product-gallery">
    {{#if product.featured_image}}
      <div class="featured-image">
        <img src="{{ product.featured_image | image_url('large') }}"
             alt="{{ product.title }}"
             id="main-product-image"
             width="{{ product.featured_image.width }}"
             height="{{ product.featured_image.height }}">
      </div>
    {{/if}}

    {{#if product.images | size() > 1}}
      <div class="product-thumbnails">
        {{#for product.images}}
          <img src="{{ image | image_url('thumbnail') }}"
               alt="{{ product.title }}"
               class="thumbnail {{#if forloop.first}}active{{/if}}"
               data-image-src="{{ image | image_url('large') }}">
        {{/for}}
      </div>
    {{/if}}
  </div>

  <!-- Product Information Tabs -->
  <div class="product-tabs">
    <div class="tab-buttons">
      <button class="tab-button active" data-tab="description">Description</button>
      <button class="tab-button" data-tab="specifications">Specifications</button>
      <button class="tab-button" data-tab="shipping">Shipping</button>
    </div>

    <div class="tab-content" id="description">
      {{ product.description }}
    </div>

    <div class="tab-content" id="specifications">
      <!-- Custom specifications implementation -->
      {{#if product.type}}
        <p><strong>Type:</strong> {{ product.type }}</p>
      {{/if}}
      {{#if product.vendor}}
        <p><strong>Vendor:</strong> {{ product.vendor }}</p>
      {{/if}}
      {{#if product.sku}}
        <p><strong>SKU:</strong> {{ product.sku }}</p>
      {{/if}}
      {{#if product.weight}}
        <p><strong>Weight:</strong> {{ product.weight }} {{ shop.weight_unit }}</p>
      {{/if}}
    </div>

    <div class="tab-content" id="shipping">
      <h4>Shipping Information</h4>
      <!-- Static shipping content -->
    </div>
  </div>

  <!-- Related Products -->
  {{#if product.tags}}
    <div class="related-products">
      <h3>Related Products</h3>
      <div class="products-grid">
        {{#for collection.products}}
          {{#if product.tags contains related-tag}}
            <div class="product-card">
              <a href="{{ product.url }}">
                {{#if product.featured_image}}
                  <img src="{{ product.featured_image | image_url('medium') }}"
                       alt="{{ product.title }}">
                {{/if}}
                <h4>{{ product.title }}</h4>
                <p>{{ product.price | money() }}</p>
              </a>
            </div>
          {{/if}}
        {{/for}}
      </div>
    </div>
  {{/if}}
</div>
```

## Collection Page Examples

### Collection Grid with Filters

```html
<div class="collection-page">
  <!-- Collection Header -->
  <div class="collection-header">
    <h1>{{ collection.title }}</h1>
    {{#if collection.description}}
      <div class="collection-description">
        {{ collection.description }}
      </div>
    {{/if}}
    <p>{{ collection.products_count }} products</p>
  </div>

  <div class="collection-content">
    <!-- Sidebar Filters -->
    <aside class="collection-sidebar">
      <div class="filter-section">
        <h3>Filters</h3>

        <!-- Active Tags -->
        {{#if current_tags}}
          <div class="active-filters">
            <h4>Active Filters:</h4>
            {{#for current_tags}}
              <span class="active-tag">
                {{ . }}
                <a href="{{ collection.url }}"
                   class="remove-filter">×</a>
              </span>
            {{/for}}
            <a href="{{ collection.url }}" class="clear-all">Clear All</a>
          </div>
        {{/if}}

        <!-- Tag Filters -->
        {{#if collection.tags}}
          <div class="tag-filters">
            <h4>Product Types</h4>
            {{#for collection.tags | uniq() | sort()}}
              <a href="{{ collection.url | append("/tag/") | append(handle) }}"
                 class="tag-link {{#if current_tags contains .}}active{{/if}}">
                {{ . }}
              </a>
            {{/for}}
          </div>
        {{/if}}

        <!-- Sort Options -->
        <div class="sort-options">
          <h4>Sort By</h4>
          <select id="sort-by" onchange="sortProducts(this.value)">
            <option value="manual">Featured</option>
            <option value="price-ascending">Price: Low to High</option>
            <option value="price-descending">Price: High to Low</option>
            <option value="title-ascending">A-Z</option>
            <option value="title-descending">Z-A</option>
            <option value="created-ascending">Oldest to Newest</option>
            <option value="created-descending">Newest to Oldest</option>
          </select>
        </div>
      </div>
    </aside>

    <!-- Product Grid -->
    <main class="collection-main">
      {{#if collection.products}}
        <div class="products-grid" id="products-grid">
          {{#for collection.products}}
            <div class="product-card" data-product-id="{{ id }}">
              <a href="{{ url }}" class="product-link">
                <div class="product-image">
                  {{#if featured_image}}
                    <img src="{{ featured_image | image_url('medium') }}"
                         alt="{{ title }}"
                         loading="lazy">
                  {{else}}
                    <div class="no-image">No Image</div>
                  {{/if}}

                  {{#unless available}}
                    <div class="sold-out-badge">Sold Out</div>
                  {{/unless}}
                </div>

                <div class="product-info">
                  <h3 class="product-title">{{ title }}</h3>
                  <div class="product-price">
                    <span class="current-price">{{ price | money() }}</span>
                    {{#if compare_at_price}}
                      <span class="original-price">{{ compare_at_price | money() }}</span>
                    {{/if}}
                  </div>
                  {{#if tags}}
                    <div class="product-tags">
                      {{#for tags}}
                        <span class="product-tag">{{ . }}</span>
                      {{/for}}
                    </div>
                  {{/if}}
                </div>
              </a>

              <!-- Quick Add to Cart -->
              {{#if available}}
                <form action="{{ routes.cart_url }}/add" method="post" class="quick-add-form">
                  <input type="hidden" name="id" value="{{ variants[0].id }}">
                  <input type="hidden" name="quantity" value="1">
                  <button type="submit" class="btn btn-secondary quick-add-btn">
                    Quick Add
                  </button>
                </form>
              {{/if}}
            </div>
          {{/for}}
        </div>

        <!-- Pagination -->
        {{#if paginate.pages > 1}}
          <div class="pagination">
            {{#paginate paginate.parts}}
              {{#if part.is_link}}
                <a href="{{ part.url }}" class="page-link">{{ part.title }}</a>
              {{else}}
                <span class="page-link current">{{ part.title }}</span>
              {{/if}}
            {{/paginate}}
          </div>
        {{/if}}

      {{else}}
        <div class="no-products">
          <h3>No products found</h3>
          <p>Try removing some filters or <a href="{{ collection.url }}">clear all filters</a>.</p>
        </div>
      {{/if}}
    </main>
  </div>
</div>
```

## Cart Page Examples

### Shopping Cart Template

```html
<div class="cart-page">
  <h1>Shopping Cart</h1>

  {{#if cart.items}}
    <form action="{{ routes.cart_url }}" method="post">
      <div class="cart-content">
        <!-- Cart Items -->
        <div class="cart-items">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {{#for cart.items}}
                <tr class="cart-item" data-variant-id="{{ variant.id }}">
                  <!-- Product Info -->
                  <td class="cart-product">
                    <img src="{{ variant.featured_image | image_url('small', crop: 'center') }}"
                         alt="{{ title }}"
                         width="80"
                         height="80">
                    <div class="cart-product-info">
                      <h4><a href="{{ url }}">{{ title }}</a></h4>
                      {{#if variant.title != 'Default Title'}}
                        <p class="variant-title">{{ variant.title }}</p>
                      {{/if}}
                      {{#if vendor}}
                        <p class="product-vendor">{{ vendor }}</p>
                      {{/if}}
                    </div>
                  </td>

                  <!-- Unit Price -->
                  <td class="cart-price">
                    <span class="item-price">{{ price | money() }}</span>
                  </td>

                  <!-- Quantity -->
                  <td class="cart-quantity">
                    <div class="quantity-selector">
                      <button type="button" class="quantity-btn decrease"
                              onclick="updateQuantity({{ variant.id }}, {{ quantity | minus: 1 }})">−</button>
                      <input type="number"
                             name="updates[]"
                             value="{{ quantity }}"
                             min="0"
                             class="quantity-input"
                             data-variant-id="{{ variant.id }}">
                      <button type="button" class="quantity-btn increase"
                              onclick="updateQuantity({{ variant.id }}, {{ quantity | plus: 1 }})">+</button>
                    </div>
                  </td>

                  <!-- Line Total -->
                  <td class="cart-total">
                    <span class="line-total">{{ line_price | money() }}</span>
                  </td>

                  <!-- Remove Button -->
                  <td class="cart-remove">
                    <a href="{{ routes.cart_url }}/change?line={{ forloop.index }}&amp;quantity=0"
                       class="remove-item"
                       onclick="return confirm('Remove this item from cart?')">×</a>
                  </td>
                </tr>
              {{/for}}
            </tbody>
          </table>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-content">
            <h3>Order Summary</h3>

            <!-- Subtotal -->
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ cart.total_price | money() }}</span>
            </div>

            <!-- Shipping (estimated) -->
            <div class="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <!-- Taxes (estimated) -->
            <div class="summary-row">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </div>

            <!-- Total -->
            <div class="summary-row total">
              <span>Total</span>
              <span>{{ cart.total_price | money() }}</span>
            </div>

            <!-- Action Buttons -->
            <div class="cart-actions">
              <button type="submit" name="update" class="btn btn-secondary">
                Update Cart
              </button>
              <button type="submit" name="checkout" class="btn btn-primary">
                Proceed to Checkout
              </button>
            </div>

            <!-- Continue Shopping -->
            <div class="continue-shopping">
              <a href="{{ routes.root_url }}" class="continue-link">
                ← Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>

  {{else}}
    <div class="empty-cart">
      <div class="empty-cart-content">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <a href="{{ routes.root_url }}" class="btn btn-primary">
          Continue Shopping
        </a>
      </div>
    </div>
  {{/if}}
</div>
```

## Customer Account Examples

### Customer Dashboard

```html
<div class="customer-dashboard">
  <!-- Customer Welcome -->
  <div class="customer-welcome">
    <h1>Welcome, {{ customer.first_name }}!</h1>
    <p>Email: {{ customer.email }}</p>
  </div>

  <div class="account-content">
    <!-- Sidebar Navigation -->
    <aside class="account-sidebar">
      <nav class="account-nav">
        <a href="{{ routes.account_url }}" class="nav-link active">Dashboard</a>
        <a href="{{ routes.account_url }}/orders" class="nav-link">Orders</a>
        <a href="{{ routes.account_url }}/addresses" class="nav-link">Addresses</a>
        <a href="{{ routes.account_url }}/wishlist" class="nav-link">Wishlist</a>
        <a href="{{ routes.account_url }}/profile" class="nav-link">Profile</a>
        <a href="{{ routes.account_url }}/logout" class="nav-link">Logout</a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="account-main">
      <!-- Quick Stats -->
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

      <!-- Recent Orders -->
      <section class="recent-orders">
        <h2>Recent Orders</h2>
        {{#if customer.orders}}
          <div class="orders-table">
            {{#for customer.orders | slice(0, 5)}}
              <div class="order-card">
                <div class="order-header">
                  <h4>Order {{ order.name }}</h4>
                  <span class="order-status status-{{ order.financial_status }}">
                    {{ order.financial_status | capitalize }}
                  </span>
                </div>
                <div class="order-details">
                  <p>Date: {{ order.created_at | date('%B %d, %Y') }}</p>
                  <p>Total: {{ order.total_price | money() }}</p>
                  <p>Items: {{ order.line_items | size() }}</p>
                </div>
                <div class="order-actions">
                  <a href="{{ order.customer_url }}" class="btn btn-sm btn-secondary">
                    View Order
                  </a>
                </div>
              </div>
            {{/for}}
          </div>

          {{#if customer.orders | size() > 5}}
            <div class="view-all-orders">
              <a href="{{ routes.account_url }}/orders" class="btn btn-primary">
                View All Orders
              </a>
            </div>
          {{/if}}

        {{else}}
          <div class="no-orders">
            <p>You haven't placed any orders yet.</p>
            <a href="{{ routes.root_url }}" class="btn btn-primary">
              Start Shopping
            </a>
          </div>
        {{/if}}
      </section>

      <!-- Default Address -->
      {{#if customer.default_address}}
        <section class="default-address">
          <h2>Default Address</h2>
          <div class="address-card">
            <div class="address-info">
              <p>
                {{ customer.default_address.first_name }} {{ customer.default_address.last_name }}<br>
                {{ customer.default_address.company }}<br>
                {{ customer.default_address.address1 }}<br>
                {{#if customer.default_address.address2}}
                  {{ customer.default_address.address2 }}<br>
                {{/if}}
                {{ customer.default_address.city }}, {{ customer.default_address.province }} {{ customer.default_address.zip }}<br>
                {{ customer.default_address.country }}
              </p>
            </div>
          </div>
        </section>
      {{/if}}
    </main>
  </div>
</div>
```

## Header and Navigation Examples

### Main Header with Navigation

```html
<header class="site-header">
  <div class="header-container">
    <!-- Logo -->
    <div class="header-logo">
      <a href="{{ routes.root_url }}" title="{{ shop.name }}">
        {{#if shop.logo}}
          <img src="{{ shop.logo | image_url('medium') }}"
               alt="{{ shop.name }}"
               width="{{ shop.logo.width }}"
               height="{{ shop.logo.height }}">
        {{else}}
          <h1 class="site-title">{{ shop.name }}</h1>
        {{/if}}
      </a>
    </div>

    <!-- Navigation Menu -->
    <nav class="main-navigation" role="navigation">
      {{#for linklists.main-menu.links}}
        <li class="nav-item {{#if child_links}}has-dropdown{{/if}}">
          <a href="{{ url }}" class="nav-link">
            {{ title }}
            {{#if child_links}}
              <span class="dropdown-arrow">▼</span>
            {{/if}}
          </a>

          <!-- Dropdown Menu -->
          {{#if child_links}}
            <div class="dropdown-menu">
              {{#for child_links}}
                <a href="{{ url }}" class="dropdown-link">{{ title }}</a>
              {{/for}}
            </div>
          {{/if}}
        </li>
      {{/for}}
    </nav>

    <!-- Header Actions -->
    <div class="header-actions">
      <!-- Search -->
      <div class="search-toggle">
        <button type="button" class="search-btn" aria-label="Search">
          <span class="search-icon">🔍</span>
        </button>
      </div>

      <!-- Customer Account -->
      <div class="customer-links">
        {{#if customer}}
          <a href="{{ routes.account_url }}" class="account-link" title="My Account">
            <span class="account-icon">👤</span>
          </a>
        {{else}}
          <a href="{{ routes.login_url }}" class="login-link" title="Login">
            Login
          </a>
        {{/if}}
      </div>

      <!-- Cart -->
      <div class="cart-toggle">
        <a href="{{ routes.cart_url }}" class="cart-link" title="Cart">
          <span class="cart-icon">🛒</span>
          {{#if cart.items}}
            <span class="cart-count">{{ cart.items | size() }}</span>
          {{/if}}
        </a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button type="button" class="mobile-menu-toggle" aria-label="Toggle menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>

  <!-- Mobile Navigation -->
  <div class="mobile-navigation">
    <div class="mobile-nav-content">
      {{#for linklists.main-menu.links}}
        <div class="mobile-nav-item">
          <a href="{{ url }}" class="mobile-nav-link">{{ title }}</a>
          {{#if child_links}}
            <div class="mobile-dropdown">
              {{#for child_links}}
                <a href="{{ url }}" class="mobile-dropdown-link">{{ title }}</a>
              {{/for}}
            </div>
          {{/if}}
        </div>
      {{/for}}

      <div class="mobile-account-links">
        {{#if customer}}
          <a href="{{ routes.account_url }}" class="mobile-nav-link">My Account</a>
          <a href="{{ routes.account_url }}/logout" class="mobile-nav-link">Logout</a>
        {{else}}
          <a href="{{ routes.login_url }}" class="mobile-nav-link">Login</a>
          <a href="{{ routes.register_url }}" class="mobile-nav-link">Register</a>
        {{/if}}
      </div>
    </div>
  </div>

  <!-- Search Overlay -->
  <div class="search-overlay" id="search-overlay">
    <div class="search-container">
      <form action="{{ routes.search_url }}" method="get" class="search-form">
        <input type="search"
               name="q"
               placeholder="Search products..."
               class="search-input"
               autocomplete="off">
        <button type="submit" class="search-submit">Search</button>
        <button type="button" class="search-close">×</button>
      </form>

      <!-- Search Results -->
      <div class="search-results" id="search-results">
        <!-- Populated by JavaScript -->
      </div>
    </div>
  </div>
</header>
```

## Footer Examples

### Comprehensive Footer

```html
<footer class="site-footer">
  <div class="footer-container">
    <!-- Newsletter Signup -->
    <div class="footer-newsletter">
      <div class="newsletter-content">
        <h3>Stay Updated</h3>
        <p>Get the latest news and exclusive offers</p>
        {{#customer_subscribe_form}}
          <div class="newsletter-form">
            <input type="email"
                   name="customer[email]"
                   placeholder="Enter your email"
                   required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </div>
        {{/customer_subscribe_form}}
      </div>
    </div>

    <!-- Footer Links -->
    <div class="footer-links">
      {{#for linklists.footer.links}}
        <div class="footer-column">
          <h4>{{ title }}</h4>
          {{#if child_links}}
            <ul class="footer-sublinks">
              {{#for child_links}}
                <li><a href="{{ url }}">{{ title }}</a></li>
              {{/for}}
            </ul>
          {{else}}
            <a href="{{ url }}" class="footer-main-link">{{ title }}</a>
          {{/if}}
        </div>
      {{/for}}
    </div>

    <!-- Contact Info -->
    <div class="footer-contact">
      <h4>Contact Us</h4>
      <div class="contact-info">
        {{#if shop.email}}
          <p>
            <strong>Email:</strong>
            <a href="mailto:{{ shop.email }}">{{ shop.email }}</a>
          </p>
        {{/if}}
        {{#if shop.phone}}
          <p>
            <strong>Phone:</strong>
            <a href="tel:{{ shop.phone }}">{{ shop.phone }}</a>
          </p>
        {{/if}}
        {{#if shop.address}}
          <address>
            {{ shop.address }}
          </address>
        {{/if}}
      </div>
    </div>

    <!-- Social Links -->
    <div class="footer-social">
      <h4>Follow Us</h4>
      <div class="social-links">
        {{#if settings.social_facebook_url}}
          <a href="{{ settings.social_facebook_url }}" target="_blank" rel="noopener">
            Facebook
          </a>
        {{/if}}
        {{#if settings.social_instagram_url}}
          <a href="{{ settings.social_instagram_url }}" target="_blank" rel="noopener">
            Instagram
          </a>
        {{/if}}
        {{#if settings.social_twitter_url}}
          <a href="{{ settings.social_twitter_url }}" target="_blank" rel="noopener">
            Twitter
          </a>
        {{/if}}
        {{#if settings.social_youtube_url}}
          <a href="{{ settings.social_youtube_url }}" target="_blank" rel="noopener">
            YouTube
          </a>
        {{/if}}
      </div>
    </div>
  </div>

  <!-- Footer Bottom -->
  <div class="footer-bottom">
    <div class="footer-bottom-container">
      <div class="footer-copyright">
        <p>&copy; {{ 'now' | date('%Y') }} {{ shop.name }}. All rights reserved.</p>
      </div>

      <div class="footer-legal">
        <a href="{{ routes.root_url }}/privacy-policy">Privacy Policy</a>
        <a href="{{ routes.root_url }}/terms-of-service">Terms of Service</a>
        <a href="{{ routes.root_url }}/refund-policy">Refund Policy</a>
      </div>

      <!-- Payment Icons -->
      <div class="payment-methods">
        {{#for shop.enabled_payment_types}}
          <span class="payment-icon" title="{{ . }}">{{ . }}</span>
        {{/for}}
      </div>
    </div>
  </div>
</footer>
```

## These examples demonstrate:

1. **Complete templates** for major page types
2. **Responsive design** considerations
3. **Accessibility features** (ARIA labels, semantic HTML)
4. **User experience enhancements** (loading states, interactions)
5. **Error handling** and edge cases
6. **SEO optimization** (meta tags, structured data)
7. **Performance considerations** (lazy loading, image optimization)
8. **Internationalization** support

Use these patterns as starting points and customize them for your specific theme requirements and branding.