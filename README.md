# Teck Yew's Portfolio

Welcome to my personal portfolio website! I'm **Thong Teck Yew**, a passionate UX Designer and Software Developer focused on creating meaningful digital experiences and solving real-world problems through technology.

## 🌐 Live Website

Visit my portfolio: **[teckyew.github.io](https://teckyew.github.io)**

## 💻 Tech Stack

- **Frontend Framework:** Vue.js 3
- **Build Tool:** Vite
- **Styling:** Bootstrap, SCSS, CSS
- **Backend:** Firebase (Firestore, Authentication, Storage)
- **Additional Libraries:** 
  - Vue Router (Navigation)
  - Pinia (State Management)
  - Vue Toastification (Notifications)
  - Vue Datepicker
  - Google Maps Integration

## 🔧 Development Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/TeckYew/TeckYew.github.io.git
cd TeckYew.github.io

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```
The site will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```
This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Code Quality

```bash
# Lint and fix files
npm run lint

# Format code with Prettier
npm run format
```

## 📂 Project Structure

```
src/
├── assets/          # Images, styles, and static files
├── components/      # Reusable Vue components
├── views/          # Page components/views
├── router/         # Vue Router configuration
├── store/          # Pinia state management
├── firebase/       # Firebase configuration
└── main.js         # Application entry point

public/            # Static files served at root
.github/
├── workflows/      # GitHub Actions CI/CD
```

## 🚀 Deployment

This website is deployed on **GitHub Pages** using GitHub Actions for continuous integration and deployment.

### How It Works:
1. Push changes to the `main` branch
2. GitHub Actions automatically:
   - Installs dependencies
   - Builds the project with Vite
   - Deploys to GitHub Pages
3. Site updates automatically (usually within 1-2 minutes)

## 🔗 Connect With Me

- **LinkedIn:** [linkedin.com/in/teck-yew](https://www.linkedin.com/in/teck-yew/)
- **GitHub:** [github.com/TeckYew](https://github.com/TeckYew)

## 📝 License

This project is open source and available under the MIT License.

---

**Made with ❤️ by Teck Yew**

