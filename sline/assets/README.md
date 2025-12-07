# Sline Theme Assets

This directory contains reusable assets for SHOPLINE theme development using Sline templating.

## Asset Categories

### 1. JavaScript Libraries
Enhance theme functionality with custom JavaScript:
- `carousel.js` - Product image carousel
- `addToCart.js` - AJAX cart functionality
- `search.js` - Live search implementation
- `imageZoom.js` - Product image zoom

### 2. CSS Frameworks
Styling utilities and components:
- `theme.css` - Base theme styles
- `components.css` - Reusable UI components
- `responsive.css` - Mobile-first responsive design
- `forms.css` - Custom form styling

### 3. Templates
Boilerplate templates and layouts:
- `product-template.html` - Product page template
- `collection-template.html` - Collection page template
- `blog-template.html` - Blog post template
- `page-template.html` - Static page template

### 4. Images and Icons
Visual assets for themes:
- `icons/` - SVG icons and icon fonts
- `placeholders/` - Product and blog placeholders
- `backgrounds/` - Background patterns and textures
- `logos/` - Logo variations and formats

## Asset Organization

```
assets/
├── js/
│   ├── vendor/           # Third-party libraries
│   ├── components/       # Theme-specific components
│   └── utils/           # Utility functions
├── css/
│   ├── base/            # Base styles
│   ├── components/      # UI components
│   ├── layout/          # Layout styles
│   └── themes/          # Theme variations
├── images/
│   ├── icons/           # Icons and logos
│   ├── placeholders/    # Placeholder images
│   └── backgrounds/     # Background patterns
├── fonts/               # Custom fonts
├── templates/           # Template starters
└── data/               # JSON data files
```

## Using Assets in Sline Templates

### JavaScript Files

```html
{{#script_tag "assets/js/main.js" /}}

{{#if product}}
  {{#script_tag "assets/js/product.js" /}}
{{/if}}
```

### CSS Files

```html
{{#stylesheet_tag "assets/css/theme.css" /}}
{{#stylesheet_tag "assets/css/responsive.css" /}}
```

### Images

```html
<img src="{{ "assets/images/placeholder.svg" | asset_img_url() }}"
     alt="Placeholder image">
```

### SVG Icons

```html
{% include 'assets/images/icons/cart-icon.svg' %}
```

## Best Practices

### Performance
1. **Minimize HTTP requests** - Combine CSS and JS where possible
2. **Lazy load images** - Use loading="lazy" attribute
3. **Optimize images** - Use appropriate formats and sizes
4. **Cache assets** - Use versioning for cache busting

### Organization
1. **Logical grouping** - Related assets together
2. **Clear naming** - Descriptive file and directory names
3. **Version control** - Track changes but exclude build artifacts
4. **Documentation** - README files for complex components

### Responsive Design
1. **Mobile-first** - Start with mobile layout
2. **Flexible grids** - Use flexible units (%, rem, vw)
3. **Breakpoint system** - Consistent breakpoints across assets
4. **Touch-friendly** - Appropriate touch targets and gestures

## Asset Pipeline

### Development
- Source files with clear structure
- Automated testing and validation
- Development server with hot reload
- Browser compatibility checking

### Production
- Minification and compression
- Bundle optimization
- CDN integration
- Asset fingerprinting

## Integration with Sline

### Conditional Loading
```html
{{#if template.name == "product"}}
  {{#stylesheet_tag "assets/css/product.css" /}}
  {{#script_tag "assets/js/product.js" /}}
{{/if}}
```

### Settings Integration
```html
<div style="{{#if settings.enable_animations}}animation-duration: {{ settings.animation_speed }}ms{{/if}}">
  <!-- Animated content -->
</div>
```

### Theme Customization
```html
{% capture custom_css %}
  {{ settings.custom_css }}
{% endcapture %}

{{#if custom_css}}
  <style>{{ custom_css }}</style>
{{/if}}
```

## Asset Management Tools

### Build Tools
- **Webpack** - Module bundling and optimization
- **Gulp** - Task automation
- **Rollup** - Library bundling
- **Vite** - Fast development server

### Optimization Tools
- **ImageOptim** - Image compression
- **SVGO** - SVG optimization
- **CSSNano** - CSS minification
- **Terser** - JavaScript minification

### Validation Tools
- **HTML Validator** - Markup validation
- **CSS Linter** - Style checking
- **ESLint** - JavaScript quality
- **Prettier** - Code formatting

## Development Workflow

1. **Setup** - Configure asset pipeline
2. **Develop** - Create and modify assets
3. **Test** - Validate across browsers and devices
4. **Optimize** - Minimize and compress for production
5. **Deploy** - Upload to SHOPLINE

## Version Control

### .gitignore for Assets
```
# Build artifacts
assets/dist/
assets/build/

# Node modules
node_modules/

# Cache
.cache/
.temp/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db
```

### Asset Versioning
Use file-based versioning or query parameters:

```html
<!-- File-based versioning -->
{{#stylesheet_tag "assets/css/theme.v1.2.3.css" /}}

<!-- Query parameter versioning -->
{{#stylesheet_tag "assets/css/theme.css?v=1.2.3" /}}
```

## CDN Integration

### SHOPLINE CDN
All uploaded assets are automatically served through SHOPLINE's CDN for optimal performance.

### External CDN
For third-party libraries:

```html
<!-- Google Fonts -->
{{#stylesheet_tag "https://fonts.googleapis.com/css?family=Open+Sans" /}}

<!-- Font Awesome -->
{{#stylesheet_tag "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /}}
```

## Security Considerations

1. **Subresource Integrity** - Use SRI hashes for external resources
2. **Content Security Policy** - Configure CSP headers
3. **HTTPS Only** - Use HTTPS for all external resources
4. **Vendor Verification** - Validate user uploads
4. **Input Sanitization** - Sanitize user-generated content

## Monitoring and Analytics

### Performance Monitoring
- Asset load times
- Render performance
- User interaction metrics

### Usage Analytics
- Most used assets
- Error tracking
- User behavior patterns

## Future Enhancements

Planned additions to assets directory:

1. **Component Library** - Reusable UI components
2. **Design System** - Comprehensive style guide
3. **Animation Library** - Smooth animations and transitions
4. **Testing Framework** - Automated testing setup
5. **Documentation Generator** - Auto-generate asset documentation

## Support and Maintenance

Regular maintenance tasks:
- Update third-party libraries
- Optimize image assets
- Test browser compatibility
- Review security dependencies
- Update documentation

For issues or questions about assets:
1. Check this README.md file
2. Review inline documentation
3. Check parent skill documentation
4. Create detailed issue reports