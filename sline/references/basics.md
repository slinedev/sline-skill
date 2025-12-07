# Sline Basics

## Resource Handles

Resource handles are unique identifiers that distinguish different resources in a store. Resource handles are used to construct resource URLs or to retrieve information about corresponding objects.

Common resource objects that have handles include `product`, `collection`, `article`, and `blog`. Other resource objects, such as `linklists` and `link`, also have handles.

Each resource for the same object has its unique handle. Taking the `product` object as an example, if a store has two different products, their resource handles are distinct.

### Create and Modify Handles

By default, handles are automatically generated based on the resource title or name when the resource is created. The automatically generated handles follow these rules:

- Handles for alphabetic characters are always in lowercase.
- Spaces and special characters are automatically replaced with hyphens (`-`).
- Multiple consecutive spaces or special characters are replaced with a single hyphen.
- Leading spaces or special characters are removed.
- Handles within the same resource are unique. If titles or names in the same resource are duplicated, handles are automatically marked with incrementing numbers, increasing by one each time. For example, if two products have the same title `bed`, their handles would be `bed` and `bed-1` respectively.

Once a resource is added, changing its title will not update the handle.

To modify the resource handle, you need to go to the specific resource page in the SHOPLINE Admin, find the **Search engine optimization** section, and modify the handle there. If you have referenced the resource using its handle, ensure to update these references when modifying the handle.

**Cautions:**

- For the `linklist` object, some handles, such as `header`, are automatically generated based on link titles and cannot be modified.
- Some resources in the `theme.config.json`, `sections`, and `blocks` use the ID attribute as their handles.

### Reference Handles

All objects with handles have a `handle` property. For example, you can output a product's handle using `product.handle`. You can also reference an object within a parent object using its handle in two ways:

- **Square bracket notation**`[ ]`: Enclose the handle string or variables in brackets. For example, `linklists["header"]` or `linklists[header]`.
- **Dot notation**`.`: Use a dot to directly connect the parent object with the handle, for example, `linklists.header`.

## Operators

Sline supports basic logical and comparison operators, which can be used with the `if` tag and value expressions.

| **Operator** | **Description** |
| --- | --- |
| `==` | equal to |
| `!=` | not equal to |
| `>` | greater than |
| `<` | less than |
| `>=` | greater than or equal to |
| `<=` | less than or equal to |
| `||` | condition A or condition B |
| `&&` | condition A and condition B |

### Operator Precedence

In Sline templates, the precedence of logical operators follows the rules of conventional programming languages. The `&&` operator has higher precedence than the `||` operator. Conditional expressions are evaluated from left to right, prioritizing all `&&` operations before `||` operations.

```plain
{{#if false || true || true && false }}
This evaluates to true, because the calculation proceeds as follows:
1. false || true → true
2. true && false → false
3. true || false → true
{{/if}}
```

You can use `()` to change the evaluation order. The system first executes the expression within `()`, and then proceeds with the remaining expressions.

```plain
{{#if true && (true && true) || false }}
This evaluates to true, with explicit calculation steps:
1. (true && true)   → true
2. true && true     → true
3. true || false    → true
{{/if}}
```

## Data Types

Sline supports output of the following data types.

### string

A series of characters that are enclosed in double quotes(`""`), single quotes(`''`), or backticks(```).

**Tip**: You can use `""` to check if a string is empty.

#### Double quotes `""`
These are used for standard strings and support escape characters like `"\n"` for new lines.

#### Single quotes `''`
They are typically used for single characters.

#### Backticks ` `` ``
These denote raw strings that do not support escape sequences and can span multiple lines.

### number

Numeric value, including floats(`float`) and integers(`int`).

```plain
{{ 42 }}   <!-- integer -->
{{ 3.14 }} <!-- float -->
```

### boolean

Binary values, either `true` or `false`.

### nil

An undefined value.

Expressions that return `nil` do not produce any output. `nil` is considered `false` in conditional statements.

### array

A list of variables of any type.

To access all items in an array, use the [for](https://developer.shopline.com/docs/sline/tag/for?version=v20250601) helper to iterate over each item in the array.

To access a specific item in an array, use the notation `[]`. An array index starts at `0`.

You cannot initialize an array directly with Sline. However, you can use the [split](https://developer.shopline.com/docs/sline/filter/split?version=v20251201) filter to convert a comma-separated string into an array.

**Tip**: You can use the [`size`](https://developer.shopline.com/docs/sline/filter/size?version=v20250601) filter to obtain the array size and determine whether the size is greater than 0.

## Truthy and Falsy

All data types must return either `true` or `false`. Those that return `true` by default are called truthy, and those that return `false` by default are called falsy.

Sline may treat unexpected values as truthy. Refer to the following table for common values that are considered to be truthy or falsy.

| **Value** | **Truthy** | **Falsy** |
| --- | --- | --- |
| true | ✔️ |  |
| false |  | ✔️ |
| nil |  | ✔️ |
| string | ✔️ |  |
| empty string | ✔️ |  |
| integer | ✔️ |  |
| float | ✔️ |  |
| array | ✔️ |  |
| empty array | ✔️ |  |

### Example

When checking values in Sline, be cautious that a value may not be in the format you expect, but it can still be regarded as truthy.

```plain
<!-- It is true if current_tags is an empty array. Use size to determine if it is empty. -->
{{#if current_tags | size() > 0}}
Presence tag.
{{#else/}}
Tag is empty.
{{/if}}
```

## Whitespace Control

You can strip the whitespaces (such as spaces, newlines, and tabs) from the output in Sline by adding a `~` character next to the curly braces. This tells Sline to automatically remove all whitespaces adjacent to the `~` symbol when parsing the template, until it encounters a non-whitespace character or another Sline expression.

```plain
start
{{~ settings.product.title ~}}
end
```

## Common Patterns

### Working with Strings

```plain
<!-- String concatenation -->
{{ "Hello " | append(name) }}

<!-- String length check -->
{{ title | size() > 0 }}

<!-- Default values -->
{{ title | default("Untitled") }}
```

### Working with Numbers

```plain
<!-- Numeric comparisons -->
{{ product.price > 0 }}

<!-- Mathematical operations with filters -->
{{ price | divided_by(2) }}
```

### Working with Arrays

```plain
<!-- Array iteration -->
{{#for products}}
  {{ product.title }}
{{/for}}

<!-- Array size check -->
{{ products | size() > 0 }}

<!-- Get specific item -->
{{ products[0].title }}
```

### Conditional Logic

```plain
<!-- Multi-condition check -->
{{#if product.available && product.price > 0}}
  Product is ready for purchase
{{/if}}

<!-- Nil checking -->
{{#if customer != nil}}
  Welcome back, {{ customer.name }}!
{{/if}}
```

## Debugging Tips

1. **Use size() filter** to check if arrays are empty instead of checking for truthiness
2. **Always check for nil** before accessing object properties
3. **Test with different data scenarios** to ensure robust templates
4. **Use proper operator precedence** with parentheses when needed
5. **Handle empty strings** appropriately in conditional logic

## Performance Considerations

1. **Avoid excessive nesting** of conditional statements
2. **Use efficient array operations** for large datasets
3. **Cache expensive operations** when possible
4. **Minimize complex expressions** in frequently rendered sections