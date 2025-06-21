# 🌟 Lumino – Frontend E-Commerce Platform

**Lumino** is a modern frontend for an e-commerce platform, built with:
- **React** (powered by Vite)
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for accessible, reusable components
- **Framer Motion** for beautiful, interactive animations

Designed to be fast, responsive, and easy to scale — ideal for online stores of all sizes.

---

## ✨ Key Features

- 🚀 **Vite** – fast builds and hot reload  
- 🎨 **Tailwind CSS** – responsive and utility-first styling  
- 🧩 **shadcn/ui** – consistent, accessible UI components  
- 🎬 **Framer Motion** – smooth transitions and hover animations  
- 🛒 Shopping cart system using React Context  
- 🔍 Product search and category filters  
- 📱 Fully responsive design (mobile & desktop)  
- ✅ Clean, reusable component structure  

---

## 📁 Folder Structure

```bash
E-commerce_client-page/
├── DashboardAdmin/         # Admin panel (product management, user data)
│   ├── components/         # Admin-specific components
│   ├── pages/              # Admin pages (products, users, orders)
│   └── ...                 # Related files
│
├── HomeClient/             # Frontend for customers
│   ├── components/         # Core UI components
│   ├── pages/              # Home, product detail, cart, etc.
│   ├── hooks/              # Custom React hooks
│   ├── data/               # JSON mock data (products, categories)
│   ├── utils/              # Utility functions (formatting, validators)
│   ├── App.tsx             # App root
│   └── main.tsx            # App entry point
│
├── README.md
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🛠️ Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/Kurson-Project/E-commerce_client-page.git
    cd E-commerce_client-page
    ```

2. **Navigate to HomeClient and install dependencies**
    ```bash
    cd HomeClient
    npm install
    # or
    yarn
    ```

3. **Start the development server (HomeClient)**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **(Optional)** Run the `DashboardAdmin` project separately if needed.

---

## 📦 Build & Deployment

- **Build for production:**
    ```bash
    npm run build
    ```
- The production files will be located in `dist/` inside each folder (`HomeClient/dist` or `DashboardAdmin/dist`).

---

## 🧪 Tech Stack

- [React](https://reactjs.org/) – UI library  
- [Vite](https://vitejs.dev/) – modern build tool  
- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS framework  
- [shadcn/ui](https://ui.shadcn.com/) – accessible UI components  
- [Framer Motion](https://www.framer.com/motion/) – animation library  

---

## 🤝 Contributing

We welcome pull requests and new feature ideas!

1. Fork the repository  
2. Create a new branch (`feat/feature-name`, `fix/bug-name`)  
3. Commit with clear messages  
4. Push and submit a Pull Request  
5. Wait for review & merge 😊