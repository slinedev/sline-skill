# Sline Filters Reference

Sline filters are utilized to modify the output of variables and objects. They can be added after a pipe symbol `|` within `{{}}` or tags.

Multiple filters can be used within a single output, and they are parsed sequentially from left to right.

## Basic Syntax

```html
{{ variable | filter_name() }}
{{ variable | filter1() | filter2() }}
{{ variable | filter_name(param1, param2) }}
```

## String Filters

### truncate

Truncate a string to specified length.

```html
{{ description | truncate(50) }}
{{ content | truncate(150, "...") }}
```

### append

Append a string to the end of another string.

```html
{{ "Hello" | append(" World") }}  <!-- "Hello World" -->
{{ product.name | append(" - " | append(product.sku)) }}
```

### prepend

Add a string to the beginning of another string.

```html
{{ "World" | prepend("Hello ") }}  <!-- "Hello World" -->
{{ price | prepend("$") }}
```

### capitalize

Capitalize the first letter of a string.

```html
{{ title | capitalize }}
{{ "hello world" | capitalize }}  <!-- "Hello world" -->
```

### upcase

Convert string to uppercase.

```html
{{ text | upcase }}
{{ "hello" | upcase }}  <!-- "HELLO" -->
```

### downcase

Convert string to lowercase.

```html
{{ text | downcase }}
{{ "HELLO" | downcase }}  <!-- "hello" -->
```

### remove

Remove all occurrences of a substring.

```html
{{ "Hello World" | remove("Hello ") }}  <!-- "World" -->
{{ product.title | remove("Brand - ") }}
```

### replace

Replace all occurrences of a substring.

```html
{{ "Hello World" | replace("World", "Universe") }}  <!-- "Hello Universe" -->
{{ content | replace(old_string, new_string) }}
```

### split

Split a string into an array using a delimiter.

```html
{{ "red,green,blue" | split(",") }}  <!-- ["red", "green", "blue"] -->
{{ tags | split(",") }}
```

### strip_html

Remove HTML tags from string.

```html
{{ "<p>Hello <strong>World</strong></p>" | strip_html }}  <!-- "Hello World" -->
{{ product.description | strip_html | truncate(100) }}
```

### strip

Remove leading and trailing whitespace.

```html
{{ "  Hello World  " | strip }}  <!-- "Hello World" -->
{{ title | strip }}
```

### lstrip

Remove leading whitespace.

```html
{{ "  Hello World" | lstrip }}  <!-- "Hello World" -->
```

### rstrip

Remove trailing whitespace.

```html
{{ "Hello World  " | rstrip }}  <!-- "Hello World" -->
```

### starts_with

Check if a string starts with a prefix.

```html
{{ "Hello World" | starts_with("Hello") }}  <!-- true -->
{{ url | starts_with("https://") }}
```

### ends_with

Check if a string ends with a suffix.

```html
{{ "image.jpg" | ends_with(".jpg") }}  <!-- true -->
{{ filename | ends_with(extension) }}
```

## Array Filters

### size

Get the size of an array or string.

```html
{{ products | size() }}
{{ "Hello" | size() }}  <!-- 5 -->
{{ cart.items | size() }}
```

### sort

Sort an array by a specified key.

```html
{{ products | sort(by="price") }}
{{ articles | sort(by="published_at", reverse=true) }}
```

### join

Join array elements with a string.

```html
{{ ["red", "green", "blue"] | join(", ") }}  <!-- "red, green, blue" -->
{{ tags | join(" #") }}
```

### first

Get the first element of an array.

```html
{{ products | first }}
{{ comments | first }}
```

### last

Get the last element of an array.

```html
{{ products | last }}
{{ comments | last }}
```

### map

Create a new array with property values.

```html
{{ products | map(property="title") }}
{{ authors | map(property="name") }}
```

### uniq

Remove duplicate elements from array.

```html
{{ tags | uniq() }}
{{ products | uniq(key="vendor") }}
```

## Number Filters

### money

Format a number as currency.

```html
{{ product.price | money() }}  <!-- "$19.99" -->
{{ total | money() }}
```

### money_with_currency

Format currency with currency symbol.

```html
{{ product.price | money_with_currency() }}  <!-- "$19.99 USD" -->
{{ total | money_with_currency() }}
```

### ceil

Round up to nearest integer.

```html
{{ 3.14 | ceil() }}  <!-- 4 -->
{{ price | ceil() }}
```

### floor

Round down to nearest integer.

```html
{{ 3.14 | floor() }}  <!-- 3 -->
{{ price | floor() }}
```

### round

Round to nearest integer.

```html
{{ 3.14 | round() }}  <!-- 3 -->
{{ 3.5 | round() }}  <!-- 4 -->
{{ price | round(decimals=2) }}
```

### divided_by

Divide a number by another.

```html
{{ 10 | divided_by(2) }}  <!-- 5 -->
{{ total | divided_by(items_count) }}
```

### times

Multiply a number by another.

```html
{{ 5 | times(3) }}  <!-- 15 -->
{{ price | times(quantity) }}
```

### minus

Subtract from a number.

```html
{{ 10 | minus(3) }}  <!-- 7 -->
{{ total | minus(discount) }}
```

### plus

Add to a number.

```html
{{ 10 | plus(3) }}  <!-- 13 -->
{{ subtotal | plus(tax) }}
```

### modulo

Get the remainder of division.

```html
{{ 10 | modulo(3) }}  <!-- 1 -->
{{ index | modulo(3) }}
```

## Date and Time Filters

### date

Format a date.

```html
{{ article.published_at | date("%B %d, %Y") }}  <!-- "December 08, 2025" -->
{{ "2025-12-08" | date("%m/%d/%Y") }}  <!-- "12/08/2025" -->
```

### date_diff

Calculate difference between dates.

```html
{{ now | date_diff(created_at, "days") }}
{{ end_date | date_diff(start_date, "hours") }}
```

## Image Filters

### image_url

Get the URL of an image with specified size.

```html
{{ product.featured_image | image_url("small") }}
{{ image | image_url("large", crop="center") }}
```

### file_img_url

Get CDN URL of an uploaded file image.

```html
{{ "logo.png" | file_img_url(size="medium") }}
{{ filename | file_img_url(size="original") }}
```

### font_face

Generate CSS @font-face declaration.

```html
{{ font | font_face() }}
{{ heading_font | font_face() }}
```

## JSON and Data Filters

### json

Convert a value to JSON string.

```html
{{ product | json() }}
{{ settings | json() }}
```

### default

Provide a default value for nil, false, or empty strings.

```html
{{ product.description | default("No description available") }}
{{ customer.name | default("Guest") }}
```

## URL Filters

### url_encode

Encode a URL string.

```html
{{ search_query | url_encode() }}
{{ product.title | url_encode() }}
```

### url_for

Generate URL for a specific route.

```html
{{ "product" | url_for(product.handle) }}
{{ "page" | url_for(page.handle) }}
```

## Utility Filters

### escape

Escape HTML entities.

```html
{{ "<script>alert('xss')</script>" | escape() }}
{{ user_input | escape() }}
```

### escape_once

Escape HTML but avoid double-escaping.

```html
{{ content | escape_once() }}
```

### newline_to_br

Convert newlines to `<br>` tags.

```html
{{ product.description | newline_to_br }}
{{ message | newline_to_br() }}
```

### strip_newlines

Remove all newline characters.

```html
{{ multiline_text | strip_newlines }}
```

### abs

Get absolute value of a number.

```html
{{ -5 | abs() }}  <!-- 5 -->
{{ difference | abs() }}
```

### at_most

Limit value to maximum.

```html
{{ 150 | at_most(100) }}  <!-- 100 -->
{{ product.price | at_most(max_price) }}
```

### at_least

Set minimum value.

```html
{{ 50 | at_least(100) }}  <!-- 100 -->
{{ product.price | at_least(min_price) }}
```

## Specialized Filters

### get_product_pagination

Get products for pagination.

```html
{{ collection | get_product_pagination(12) }}
{{ category | get_product_pagination(pageSize) }}
```

### format_address

Format address according to locale.

```html
{{ customer.default_address | format_address() }}
{{ shipping_address | format_address(locale="zh-CN") }}
```

### location_filter

Filter by geographic location.

```html
{{ products | location_filter(country="US") }}
{{ stores | location_filter(radius="50km") }}
```

## Filter Chain Examples

### Product Display

```html
<!-- Format product title and price -->
{{ product.title | upcase() | truncate(30) }}
{{ product.price | money_with_currency() }}

<!-- Product image with fallback -->
{{ product.featured_image | default("placeholder.jpg") | image_url("medium") }}
```

### Content Processing

```html
<!-- Blog excerpt -->
{{ article.content | strip_html | truncate(200) | append("...") }}

<!-- Tag list -->
{{ article.tags | uniq() | sort() | join(", ") }}
```

### Array Operations

```html
<!-- Sorted product titles -->
{{ products | sort(by="price") | map(property="title") | join(", ") }}

<!-- Filter unique values -->
{{ colors | uniq() | size() }}
<!-- Count unique colors -->
```

## Performance Considerations

1. **Minimize filter chains** for better performance
2. **Cache expensive operations** where possible
3. **Use appropriate filter types** for the data
4. **Avoid nested filters** with complex logic
5. **Test filter impact** on large datasets

## Error Handling

1. **Provide defaults** for potentially nil values
2. **Validate filter parameters** before use
3. **Handle type mismatches** gracefully
4. **Test edge cases** thoroughly
5. **Use try-catch patterns** for complex operations

## Best Practices

1. **Chose specific filters** over generic ones
2. **Use descriptive variable names** before filtering
3. **Document complex filter chains** with comments
4. **Test with various data types** and edge cases
5. **Consider locale and internationalization** for text filters
6. **Optimize for performance** with large datasets
7. **Validate user input** before processing with filters
8. **Use appropriate image sizes** for responsive design