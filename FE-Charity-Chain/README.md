# HCMUT Giving – Transparency for Every Heart

A transparent blockchain-powered platform for managing charity funds with integrity.

---

## 🛠️ Hướng dẫn cài đặt & chạy

### Yêu cầu

- **Node.js** >= 18.x
- **npm** hoặc **yarn** hoặc **pnpm**

### Cài đặt

```bash
# 1. Clone repository
git clone <repository-url>
cd FE-Charity-Chain

# 2. Cài đặt dependencies
npm install
```

### Chạy project

```bash
# Development mode (http://localhost:5173)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📁 Cấu trúc thư mục

```
FE-Charity-Chain/
├── public/                      # Static assets
├── src/
│   ├── assets/
│   │   └── images/             # Hình ảnh (thêm ảnh vào đây)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Navigation bar (sticky, responsive)
│   │   │   └── Footer.jsx      # Footer với social links
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx      # Button component (primary/secondary/outline/ghost)
│   │       └── StepCard.jsx    # Card cho "How It Works" section
│   │
│   ├── constants/
│   │   ├── index.js            # HOW_IT_WORKS_STEPS, NAV_LINKS
│   │   └── routes.js           # Tập trung routes (ROUTES.HOME, ROUTES.CAMPAIGNS, v.v.)
│   │
│   ├── pages/
│   │   └── Home/
│   │       ├── index.jsx       # Home page (combine 3 sections)
│   │       ├── HeroSection.jsx # Grid ảnh collage (placeholder - thêm ảnh vào)
│   │       ├── HowItWorksSection.jsx  # 4 bước "How It Works"
│   │       └── CtaSection.jsx  # Banner CTA "Get started"
│   │
│   ├── utils/                  # Helper functions (formatCurrency, truncate, v.v.)
│   │   └── index.js
│   │
│   ├── App.jsx                 # Main app với React Router
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind directives + custom styles
│
├── index.html                  # HTML entry
├── package.json
├── vite.config.js              # Vite config (path alias @ -> src/)
├── tailwind.config.js          # Tailwind custom colors & fonts
├── postcss.config.js           # PostCSS config
├── eslint.config.js            # ESLint config
└── .gitignore

```

### Path Aliases

Project sử dụng `@` alias cho thư mục `src/`:

```js
// Thay vì
import Button from '../../components/ui/Button'

// Dùng
import Button from '@/components/ui/Button'
```

### Icon Library

Sử dụng **lucide-react** - không paste SVG thẳng:

```jsx
import { Heart, Menu, ArrowRight } from 'lucide-react'
```

### Thêm hình ảnh

1. Đặt ảnh vào `src/assets/images/`
2. Mở `src/pages/Home/HeroSection.jsx`
3. Thay placeholder `<div>` bằng `<img>`

---

**Built with ❤️ by HCMUT Team**
