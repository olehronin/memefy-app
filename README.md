# MemeFy 😂

A React-based web app built with **HeroUI** to display and edit a catalog of popular memes 📚. MemeFy meets the provided
technical specification, featuring a responsive UI, meme management, a Spring Boot backend, and deployment on **Railway
** 🚂. The app includes two views—**table** and **list**—with navigation powered by HeroUI Navbar.

Since the app took several days to build, third-party libraries were used to provide **"infinite scrolling"** and a *
*Masonry** layout in the list view to speed up development, prioritizing functionality over custom implementations ⚡.

## View Demo 👀

![Meme Directory Demo](/assets/Demo.gif)

Click the GIF above or visit the [Live Demo](https://memefy.up.railway.app) to explore the app. *P.S. No longer hosted 😢*

## Technologies Used 🛠️

- **Frontend**:
    - [React](https://reactjs.org) ⚛️ - UI library.
    - [Vite](https://vitejs.dev) 🚀 - Fast build tool.
    - [HeroUI](https://heroui.com) 🖼️ - Components (Navbar, Table, Card, Modal, Input, Dropdown, Button, Image).
    - [Tailwind CSS](https://tailwindcss.com) 🎨 - Styling framework.
    - [TypeScript](https://www.typescriptlang.org) 📜 - Typed JavaScript.
    - Third-party libraries for infinite scroll and Masonry layout 🔄.
- **Backend**:
    - [Spring Boot](https://spring.io/) 🛠️ - Java framework for REST API.
    - [PostgreSQL](https://www.postgresql.org/) 🗄️ - Relational database.
- **Deployment**:
    - [Railway](https://railway.app) ☁️ - Hosting platform.
- **Package Manager**: `npm` 📦.

## Repositories 🔗

- **Frontend**: [MemeFy Frontend](https://gitlab.com/olehIvasiuk/memefy-app)
- **Backend**: [MemeFy Backend](https://gitlab.com/olehIvasiuk/memefy-server)

## How to Run Locally 🏃‍♂️

### Prerequisites
- Node.js (v16+, tested on v22.13.0) 🟢
- npm 📦
- Java 21+ (for backend) ☕
- PostgreSQL 🗄️

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://gitlab.com/olehIvasiuk/memefy-app.git
   cd memefy-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` or `http://192.168.0.120:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

## Notes 📝

- The app uses a Spring Boot backend and PostrgesQL to persist meme data.
- Image URLs are validated to ensure they are valid JPG, JPEG, GIF or PNG links 🖼️.
- The List view uses third-party libraries for infinite scroll and Masonry layout 🔄.
- The Edit modal validates all fields (e.g., name length, likes range) ✅.
- Optimized for Chrome (latest) on Windows, macOS, and Android 🌍.

## License 🔒

Licensed under the [MIT License](LICENSE).

## Screenshots 📸

| Home                   | List View                   | Table View                    |
|------------------------|-----------------------------|-------------------------------|
| ![Home](/assets/1.png) | ![List View](/assets/2.png) | ![Table View ](/assets/3.png) |

| Table View Light                   | List View Light                   | Edit Modal                   |
|------------------------------------|-----------------------------------|------------------------------|
| ![Table View Light](/assets/4.png) | ![List View Light](/assets/5.png) | ![Edit Modal](/assets/6.png) |

| Mobile Home Light                   | Mobile List                         | Mobile Table View                         |
|-------------------------------------|-------------------------------------|-------------------------------------------|
| ![Mobile Home](/assets/mobile1.png) | ![Mobile List](/assets/mobile2.png) | ![Mobile Table View](/assets/mobile3.png) |

| Mobile Edit Modal                         | Mobile Menu                         |
|-------------------------------------------|-------------------------------------|
| ![Mobile Edit Modal](/assets/mobile4.png) | ![Mobile Menu](/assets/mobile5.png) |
