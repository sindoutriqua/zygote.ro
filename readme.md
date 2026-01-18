# zygote.ro

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A collection of free, high-quality code generators designed to help developers stop writing boilerplate and start building features.

🌐 **Live Site**: [zygote.ro](https://zygote.ro)

## ✨ Features

- 🚀 **Instant Generation** - All generators run client-side, no server processing
- 🎨 **Modern UI** - Dark/light theme with smooth transitions
- 📋 **One-Click Copy** - Copy generated code instantly
- 🔒 **Privacy First** - No data leaves your browser
- 📱 **Responsive** - Works on desktop and mobile

## 🛠️ Available Generators

| Generator | Description |
|-----------|-------------|
| **README.md** | Generate professional README files for your projects |
| **Project Structure** | Create folder structures for various project types |
| **.gitignore** | Generate .gitignore files for different tech stacks |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/zygote.ro.git
cd zygote.ro

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and add your GA4 Measurement ID (optional)

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PUBLIC_GA4_ID` | Google Analytics 4 Measurement ID | No |

## 📦 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |

## 🏗️ Tech Stack

- **[Astro](https://astro.build)** - Static site generator
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org)** - Type safety

## 📁 Project Structure

```
zygote.ro/
├── public/              # Static assets (favicon, og-image, robots.txt)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── generators/      # Generator logic and UI
│   │   ├── readme/      # README.md generator
│   │   ├── structure/   # Project structure generator
│   │   └── gitignore/   # .gitignore generator
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   └── styles/          # Global CSS
├── .env.example         # Environment variables template
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com) (or your platform)

---

Made with ❤️ by [zygote.ro](https://zygote.ro)
