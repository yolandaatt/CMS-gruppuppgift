# Next.js with Storyblok - Starter code
## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager
- Storyblok account and API token

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jonatan-Vahlberg-WAS/nextjs-storyblok-starter.git <your-project-name>
   cd <your-project-name>
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` and add your Storyblok API token:

   ```env
   STORYBLOK_DELIVERY_API_ACCESS_TOKEN=your_storyblok_token_here
   NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN=your_storyblok_token_here
   ```

4. **Start Development Server**
We use Turbopack for faster development and HTTPS for local development. That way we can use the Storyblok preview mode while not having to use a proxy. to do this we use the experimental-https flag as seen below anf found in the package.json file.
    ```bash
    npm run dev --experimental-https
    ```

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Architecture

### Directory Structure

```
verdant-fe/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.js            # Home page (renders Storyblok content)
│   │   ├── layout.js          # Root layout with providers
│   │   ├── globals.css        # Global styles with Tailwind
│   │   └── home/              # Home-specific components
│   ├── components/
│   │   ├── StoryBlokProvider.js  # Storyblok client provider
│   │   └── sb/                # Storyblok components
│   │       ├── Page.js        # Page wrapper component
│   │       ├── Teaser.js      # Teaser component
│   │       ├── Feature.js     # Feature component
│   │       └── Grid.js        # Grid layout component
│   └── lib/
│       └── storyblok.js       # Storyblok API configuration
├── public/                    # Static assets
├── certificates/              # SSL certificates (for HTTPS dev)
└── package.json              # Dependencies and scripts
```

### Key Technologies

- **Next.js 15.3.3** - React framework with App Router
- **React 19** - Latest React version
- **Storyblok** - Headless CMS integration
- **Tailwind CSS 4** - Utility-first CSS framework
- **Geist Font** - Modern typography from Vercel

## 📝 Storyblok Integration

### Configuration

The project is configured to work with Storyblok CMS through the `src/lib/storyblok.js` file. Key features:

- **Server-side rendering** with Next.js App Router
- **Component mapping** for dynamic content rendering
- **EU region** configuration for optimal performance
- **Draft/Preview mode** support

### Available Components

The following Storyblok components are implemented:

1. **Page** (`src/components/sb/Page.js`)

   - Main page wrapper that renders nested components
   - Maps to `page` content type in Storyblok

2. **Teaser** (`src/components/sb/Teaser.js`)

   - Simple headline component
   - Maps to `teaser` content type in Storyblok

3. **Feature** (`src/components/sb/Feature.js`)

   - Feature component with editable content
   - Maps to `feature` content type in Storyblok

4. **Grid** (`src/components/sb/Grid.js`)
   - Grid layout component for organizing content
   - Maps to `grid` content type in Storyblok

### Adding New Components

To add a new Storyblok component:

1. Create the component in `src/components/sb/`
2. Register it in `src/lib/storyblok.js` components object
3. Create the corresponding content type in Storyblok

Example:

```javascript
// src/components/sb/MyComponent.js
import { storyblokEditable } from "@storyblok/react/rsc";

export default function MyComponent({ blok }) {
  return (
    <div className="my-component" {...storyblokEditable(blok)}>
      <h3>{blok.title}</h3>
      <p>{blok.description}</p>
    </div>
  );
}
```

Then register in `src/lib/storyblok.js`:

```javascript
import MyComponent from "@/components/sb/MyComponent";

const components = {
  // ... existing components
  my_component: MyComponent,
};
```

## 🎨 Styling

### Tailwind CSS 4

The project uses Tailwind CSS 4 with the new `@import "tailwindcss"` syntax. Key features:

- **CSS Variables** for theming
- **Dark mode** support with `prefers-color-scheme`
- **Geist fonts** integration
- **Custom color scheme** with CSS variables

### Customization

Colors and fonts can be customized in `src/app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack and HTTPS
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Development Features

- **Turbopack** - Fast bundler for development
- **HTTPS** - Secure development with experimental HTTPS
- **Hot reloading** - Automatic page updates during development
- **Path aliases** - `@/` maps to `src/` directory

### Environment Variables

Required environment variables:

- `STORYBLOK_DELIVERY_API_ACCESS_TOKEN` - Server-side API token
- `NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN` - Client-side API token

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deployment Platforms

This project can be deployed to:

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Static site hosting
- **AWS Amplify** - Full-stack hosting
- **Docker** - Containerized deployment

### Environment Setup for Production

Ensure all environment variables are set in your deployment platform:

```env
STORYBLOK_DELIVERY_API_ACCESS_TOKEN=your_production_token
NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN=your_production_token
```

## 📚 Content Management

### Storyblok Setup

1. Create a Storyblok account at [storyblok.com](https://storyblok.com)
2. Create a new space
3. Get your API token from the API Keys section
4. Create content types that match your components:
   - `page` - Main page content type
   - `teaser` - Teaser content type
   - `feature` - Feature content type
   - `grid` - Grid content type

### Content Structure

The home page fetches content from the `home` story in Storyblok. The content structure should match the component hierarchy:

```
home (page)
├── body (nested blocks)
    ├── teaser
    ├── grid
    │   └── columns (nested blocks)
    │       ├── feature
    │       └── teaser
    └── feature
```

## 🔍 Troubleshooting

### Common Issues

1. **Storyblok API errors**

   - Verify your API token is correct
   - Check that the token has proper permissions
   - Ensure the story exists in Storyblok

2. **Component not rendering**

   - Verify the component is registered in `src/lib/storyblok.js`
   - Check that the content type name matches the component key
   - Ensure the component is properly exported

3. **Styling issues**
   - Verify Tailwind CSS is properly configured
   - Check that CSS variables are defined
   - Ensure PostCSS is configured correctly

### Debug Mode

Enable debug mode by adding to your environment variables:

```env
NEXT_PUBLIC_STORYBLOK_DEBUG=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

For more information about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
