# Sline Forms Reference

Sline provides comprehensive form tags for customer interactions, account management, and e-commerce functionality. All forms should be implemented with proper validation and user experience considerations.

## Customer Forms

### create_customer_form

Generate a form for creating new customer accounts.

```html
{{#create_customer_form}}
  <div class="form-group">
    <label for="customer-email">Email</label>
    <input type="email"
           id="customer-email"
           name="customer[email]"
           required
           placeholder="Enter your email">
  </div>

  <div class="form-group">
    <label for="customer-first_name">First Name</label>
    <input type="text"
           id="customer-first_name"
           name="customer[first_name]">
  </div>

  <div class="form-group">
    <label for="customer-last_name">Last Name</label>
    <input type="text"
           id="customer-last_name"
           name="customer[last_name]">
  </div>

  <div class="form-group">
    <label for="customer-birthday">Birthday</label>
    <input type="date"
           id="customer-birthday"
           name="customer[birthday]">
  </div>

  <div class="form-group">
    <label for="customer-phone">Phone</label>
    <input type="tel"
           id="customer-phone"
           name="customer[phone]"
           placeholder="Enter your phone number">
  </div>

  <div class="form-group">
    <label for="customer-password">Password</label>
    <input type="password"
           id="customer-password"
           name="customer[password]"
           required
           minlength="{{ settings.password_min_length }}">
  </div>

  <div class="form-group">
    <label for="customer-password_confirmation">Confirm Password</label>
    <input type="password"
           id="customer-password_confirmation"
           name="customer[password_confirmation]"
           required>
  </div>

  <button type="submit" class="btn btn-primary">Create Account</button>
{{/create_customer_form}}
```

**Form Inputs:**
- `customer[email]` (email) - Required email address
- `customer[first_name]` (string) - First name
- `customer[last_name]` (string) - Last name
- `customer[birthday]` (date) - Birthday (optional)
- `customer[phone]` (phone) - Phone number (optional)
- `customer[password]` (password) - Required password
- `customer[password_confirmation]` (password) - Password confirmation

### customer_login_form

Generate a login form for existing customers.

```html
{{#customer_login_form}}
  <div class="form-group">
    <label for="customer-email">Email</label>
    <input type="email"
           id="customer-email"
           name="customer[email]"
           required
           placeholder="Enter your email">
  </div>

  <div class="form-group">
    <label for="customer-password">Password</label>
    <input type="password"
           id="customer-password"
           name="customer[password]"
           required
           placeholder="Enter your password">
  </div>

  <div class="form-check">
    <input type="checkbox" id="remember-me" name="customer[remember_me]">
    <label for="remember-me">Remember me</label>
  </div>

  <button type="submit" class="btn btn-primary">Login</button>
  <a href="{{ routes.recover_password_url }}">Forgot password?</a>
{{/customer_login_form}}
```

**Form Inputs:**
- `customer[email]` (email) - Required email address
- `customer[password]` (password) - Required password
- `customer[remember_me]` (boolean) - Remember login

### recover_customer_password_form

Password recovery form.

```html
{{#recover_customer_password_form}}
  <div class="form-group">
    <label for="customer-email">Email</label>
    <input type="email"
           id="customer-email"
           name="customer[email]"
           required
           placeholder="Enter your email address">
  </div>

  <button type="submit" class="btn btn-primary">Reset Password</button>
{{/recover_customer_password_form}}
```

### update_customer_form

Update customer information form.

```html
{{#update_customer_form}}
  <div class="form-row">
    <div class="form-group">
      <label for="customer-first_name">First Name</label>
      <input type="text"
             id="customer-first_name"
             name="customer[first_name]"
             value="{{ customer.first_name }}">
    </div>

    <div class="form-group">
      <label for="customer-last_name">Last Name</label>
      <input type="text"
             id="customer-last_name"
             name="customer[last_name]"
             value="{{ customer.last_name }}">
    </div>
  </div>

  <div class="form-group">
    <label for="customer-birthday">Birthday</label>
    <input type="date"
           id="customer-birthday"
           name="customer[birthday]"
           value="{{ customer.birthday }}">
  </div>

  <div class="form-group">
    <label for="customer-phone">Phone</label>
    <input type="tel"
           id="customer-phone"
           name="customer[phone]"
           value="{{ customer.phone }}"
           placeholder="Enter your phone number">
  </div>

  <button type="submit" class="btn btn-primary">Update Information</button>
{{/update_customer_form}}
```

## Customer Address Forms

### customer_address_form

Create or edit customer address.

```html
{{#customer_address_form}}
  <div class="form-row">
    <div class="form-group">
      <label for="address-first_name">First Name</label>
      <input type="text"
             id="address-first_name"
             name="address[first_name]"
             required
             value="{{ address.first_name }}">
    </div>

    <div class="form-group">
      <label for="address-last_name">Last Name</label>
      <input type="text"
             id="address-last_name"
             name="address[last_name]"
             required
             value="{{ address.last_name }}">
    </div>
  </div>

  <div class="form-group">
    <label for="address-company">Company (optional)</label>
    <input type="text"
           id="address-company"
           name="address[company]"
           value="{{ address.company }}">
  </div>

  <div class="form-group">
    <label for="address-phone">Phone</label>
    <input type="tel"
           id="address-phone"
           name="address[phone]"
           placeholder="Enter your phone number"
           value="{{ address.phone }}">
  </div>

  <div class="form-group">
    <label for="address-address1">Address</label>
    <input type="text"
           id="address-address1"
           name="address[address1]"
           required
           placeholder="Street address"
           value="{{ address.address1 }}">
  </div>

  <div class="form-group">
    <label for="address-address2">Apartment, suite, etc. (optional)</label>
    <input type="text"
           id="address-address2"
           name="address[address2]"
           placeholder="Apartment, suite, unit, building, floor, etc."
           value="{{ address.address2 }}">
  </div>

  <div class="form-row">
    <div class="form-group">
      <label for="address-city">City</label>
      <input type="text"
             id="address-city"
             name="address[city]"
             required
             value="{{ address.city }}">
    </div>

    <div class="form-group">
      <label for="address-province">State/Province</label>
      <select id="address-province"
              name="address[province]"
              required>
        <option value="">Select State/Province</option>
        <!-- Add province/state options -->
      </select>
    </div>
  </div>

  <div class="form-row">
    <div class="form-group">
      <label for="address-country">Country</label>
      <select id="address-country"
              name="address[country]"
              required>
        <option value="">Select Country</option>
        {{#for shop.countries}}
          <option value="{{ iso }}" {{#if ../address.country == iso}}selected{{/if}}>
            {{ name }}
          </option>
        {{/for}}
      </select>
    </div>

    <div class="form-group">
      <label for="address-zip">Postal/ZIP Code</label>
      <input type="text"
             id="address-zip"
             name="address[zip]"
             required
             placeholder="Postal/ZIP code"
             value="{{ address.zip }}">
    </div>
  </div>

  <button type="submit" class="btn btn-primary">
    {{#if address}}Update Address{{else}}Add Address{{/if}}
  </button>
{{/customer_address_form}}
```

**Form Inputs:**
- `address[first_name]` (string) - Required first name
- `address[last_name]` (string) - Required last name
- `address[company]` (string) - Company name (optional)
- `address[phone]` (string) - Phone number (optional)
- `address[address1]` (string) - Required street address
- `address[address2]` (string) - Address line 2 (optional)
- `address[city]` (string) - Required city
- `address[province]` (string) - Required state/province
- `address[country]` (string) - Required country
- `address[zip]` (string) - Required postal code

## Product Forms

### product_form

Generate product purchase form (self-closing).

```html
<div class="product-form">
  {{#if product.variants | size() > 1}}
    <div class="product-options">
      {{#for product.options}}
        <div class="option-group">
          <label for="{{ name | handle }}">{{ name }}</label>
          <select id="{{ name | handle }}" name="options[{{ name | handle }}]">
            {{#for values}}
              <option value="{{ . }}"
                      {{#if ../selected.value == .}}selected{{/if}}>
                {{ . }}
              </option>
            {{/for}}
          </select>
        </div>
      {{/for}}
    </div>
  {{/if}}

  <!-- Hidden variant ID input (populated by JavaScript) -->
  <input type="hidden" name="variant_id" id="variant-id"
         value="{{ product.variants[0].id }}">

  <!-- Quantity selector -->
  <div class="product-quantity">
    <label for="quantity">Quantity</label>
    <input type="number"
           id="quantity"
           name="quantity"
           min="1"
           value="1"
           {{#unless product.available}}disabled{{/unless}}>
  </div>

  <!-- Add to cart button -->
  <button type="submit"
          class="btn btn-primary add-to-cart"
          {{#unless product.available}}disabled{{/unless}}>
    {{#if product.available}}
      Add to Cart
    {{else}}
      Out of Stock
    {{/if}}
  </button>

  {{#product_form /}}
</div>
```

## Storefront Forms

### storefront_password_form

Password protection form for password-protected stores.

```html
{{#storefront_password_form}}
  <div class="password-form">
    <h2>Enter Store Password</h2>
    <p>This store is password protected. Please enter password to continue.</p>

    <div class="form-group">
      <input type="password"
             name="password"
             placeholder="Enter store password"
             required
             class="form-control">
    </div>

    <button type="submit" class="btn btn-primary">Enter Store</button>
  </div>
{{/storefront_password_form}}
```

### localization_form

Country and language selection form.

```html
{{#localization_form}}
  <div class="localization-forms">
    <div class="country-form">
      <label for="localization-country">Country</label>
      <select id="localization-country" name="country">
        {{#for localization.available_countries}}
          <option value="{{ iso }}"
                  {{#if ../localization.country.iso == iso}}selected{{/if}}>
            {{ name }}
          </option>
        {{/for}}
      </select>
    </div>

    <div class="language-form">
      <label for="localization-language">Language</label>
      <select id="localization-language" name="language">
        {{#for localization.available_languages}}
          <option value="{{ iso }}"
                  {{#if ../localization.language.iso == iso}}selected{{/if}}>
            {{ name }}
          </option>
        {{/for}}
      </select>
    </div>

    <button type="submit" class="btn btn-secondary">Update Localization</button>
  </div>
{{/localization_form}}
```

## Special Forms

### delete_customer_form

Account deletion form for customers.

```html
{{#delete_customer_form}}
  <div class="delete-account-section">
    <h3>Delete Account</h3>
    <p>Warning: This action cannot be undone. All your data will be permanently deleted.</p>

    <div class="confirmation-checkbox">
      <input type="checkbox"
             id="delete-confirm"
             name="confirm_delete"
             value="true"
             required>
      <label for="delete-confirm">
        I understand that account deletion is permanent and cannot be undone.
      </label>
    </div>

    <button type="submit"
            class="btn btn-danger"
            onclick="return confirm('Are you sure you want to delete your account?')">
      Delete Account
    </button>
  </div>
{{/delete_customer_form}}
```

**Form Inputs:**
- `customer[verifycode]` (number) - Verification code (required)

### customer_subscribe_form

Email/phone subscription form.

```html
{{#customer_subscribe_form}}
  <div class="subscribe-form">
    <h3>Subscribe to Updates</h3>
    <p>Get the latest news and special offers delivered to your inbox.</p>

    <div class="form-group">
      <label for="customer-email">Email</label>
      <input type="email"
             id="customer-email"
             name="customer[email]"
             placeholder="Enter your email address">
    </div>

    <div class="form-group">
      <label for="customer-phone">Phone (optional)</label>
      <input type="tel"
             id="customer-phone"
             name="customer[phone]"
             placeholder="Enter your phone number">
    </div>

    <button type="submit" class="btn btn-primary">Subscribe</button>
  </div>
{{/customer_subscribe_form}}
```

**Form Inputs:**
- `customer[email]` (email) - Subscription email
- `customer[phone]` (phone) - Subscription phone (optional)

### bind_customer_phone_form

Phone binding form for customer account.

```html
{{#bind_customer_phone_form}}
  <div class="phone-binding-form">
    <h3>Verify Phone Number</h3>

    <div class="form-group">
      <label for="customer-verifycode1">Current Phone Verification Code</label>
      <input type="number"
             id="customer-verifycode1"
             name="customer[verifycode1]"
             placeholder="Enter verification code"
             required>
    </div>

    <div class="form-group">
      <label for="customer-phone">New Phone Number</label>
      <input type="tel"
             id="customer-phone"
             name="customer[phone]"
             placeholder="Enter new phone number"
             required>
    </div>

    <div class="form-group">
      <label for="customer-verifycode2">New Phone Verification Code</label>
      <input type="number"
             id="customer-verifycode2"
             name="customer[verifycode2]"
             placeholder="Enter verification code"
             required>
    </div>

    <button type="submit" class="btn btn-primary">Update Phone Number</button>
  </div>
{{/bind_customer_phone_form}}
```

**Form Inputs:**
- `customer[verifycode1]` (number) - Current phone verification code
- `customer[phone]` (phone) - New phone number
- `customer[verifycode2]` (number) - New phone verification code

## Form Best Practices

### Validation

```html
{{#create_customer_form}}
  <div class="form-group {{#if errors.email}}has-error{{/if}}">
    <label for="customer-email">Email</label>
    <input type="email"
           id="customer-email"
           name="customer[email]"
           required
           class="form-control {{#if errors.email}}is-invalid{{/if}}">
    {{#if errors.email}}
      <div class="error-message">{{ errors.email }}</div>
    {{/if}}
  </div>
{{/create_customer_form}}
```

### Security Considerations

1. **Use HTTPS** for all form submissions
2. **Validate input server-side** (forms provide basic validation)
3. **Sanitize user input** before display
4. **Use appropriate input types** for better mobile experience
5. **Implement rate limiting** for sensitive actions
6. **Log form submissions** for security monitoring

### User Experience

1. **Clear form labels** and placeholder text
2. **Error message positioning** near relevant fields
3. **Success confirmation** after form submission
4. **Loading states** during submission
5. **Form auto-completion** where appropriate
6. **Mobile-responsive form layouts**

### Accessibility

```html
{{#create_customer_form}}
  <div class="form-group">
    <label for="customer-email" class="form-label">Email</label>
    <input type="email"
           id="customer-email"
           name="customer[email]"
           required
           aria-describedby="email-help"
           class="form-control">
    <small id="email-help" class="form-text">
      We'll never share your email with anyone else.
    </small>
  </div>
{{/create_customer_form}}
```

## Form Submission Handling

### Client-side JavaScript

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      // Custom validation
      if (!validateForm(form)) {
        e.preventDefault();
        return false;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    });
  });
});

function validateForm(form) {
  // Custom validation logic
  return true;
}
```

### Success/Error Handling

```html
{{#if form.posted_successfully?}}
  <div class="alert alert-success">
    {{ success_message }}
  </div>
{{elsif form.errors}}
  <div class="alert alert-danger">
    {{ form.errors | first }}
  </div>
{{/if}}

{{#customer_login_form}}
  <!-- Form content -->
{{/customer_login_form}}
```

## Form Customization

### Custom Styling

```html
<style>
  .form-group {
    margin-bottom: 1rem;
  }

  .form-control {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  .form-control.is-invalid {
    border-color: #dc3545;
  }

  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
</style>
```

### Custom Validation Messages

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Custom validation messages
  const emailInput = document.getElementById('customer-email');
  if (emailInput) {
    emailInput.addEventListener('invalid', function(e) {
      e.preventDefault();
      e.target.setCustomValidity('Please enter a valid email address');
    });
  }
});
```

These form tags provide comprehensive functionality for e-commerce operations, customer account management, and user interactions in SHOPLINE themes.