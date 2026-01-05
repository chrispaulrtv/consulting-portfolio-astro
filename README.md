# Senior Consultant Portfolio & Landing Page

The source code for my professional consulting website, built to offer high-performance services in **React Native**, **Nest.js**, and **Software Architecture**.

Designed to be **blazing fast**, **SEO-optimized**, and focused on **B2B conversion**.

![Tech Stack](https://skillicons.dev/icons?i=astro,react,ts,tailwind,nodejs,docker)

## 🌐 Live Site

👉 **[chrispaulrtv.rinnotec.com](https://chrispaulrtv.rinnotec.com)**

---

## ✨ key Features

- **High Performance:** Scored **100/100** on Google Lighthouse Core Web Vitals.
- **Service-Oriented Architecture:** Modified structure to showcase *Services* & *Consulting Packages* instead of generic projects.
- **Glassmorphism UI:** Modern, dark-mode-first aesthetic for a premium professional look.
- **Tech Stack:**
  - **Framework:** [Astro](https://astro.build/) (Static Site Generation for speed)
  - **UI Library:** [React](https://react.dev/) + [Framer Motion](https://www.framer.com/motion/)
  - **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  - **Type Safety:** TypeScript

## 🛠 Project Structure

This project is configured to be data-driven. The entire content strategy lives in `src/lib/data.ts`, making it easy to pivot services or update pricing without touching UI components.

### Data Schema (`src/lib/data.ts`)

My custom configuration for selling **Senior Consulting Services**:

#### 1. Professional Profile
```ts
export const personalInfo = {
  name: "Christian Reinoso",
  role: "Senior Consultant Developer",
  location: "Ecuador (Remote Worldwide)",
  email: "chrispaulrtv@rinnotec.com",
  heroDescription: "Specialist in React Native & Nest.js. I help Agencies and Startups scale mobile applications.",
};

```

#### 2. Services (Formerly "Projects")

```ts
export const projects = [
  {
    title: "🚑 Mobile App Rescue",
    github: "mailto:chrispaulrtv@rinnotec.com?subject=Audit", 
    linkText: "Schedule Audit",
    description: [
      "Deep audit of React Native Apps.",
      "Performance optimization.",
      "Crash resolution & Store deployment.",
    ],
  },
];

```

## 🚀 Local Development

If you want to view the source code or adapt this architecture:

1. **Clone the repository**
```bash
git clone [https://github.com/chrispaulrtv/consulting-portfolio-astro.git](https://github.com/chrispaulrtv/consulting-portfolio-astro.git)
cd consulting-portfolio-astro

```


2. **Install dependencies**
```bash
pnpm install

```


3. **Start the server**
```bash
pnpm run dev

```



## 📦 Deployment

This project is optimized for **Vercel**.

* **Build Command:** `pnpm run build`
* **Output Directory:** `dist`

## 👤 Author

**Christian Reinoso**

* **Role:** Senior Consultant Developer
* **Specialty:** React Native, Nest.js, Scalable Architecture
* **LinkedIn:** [linkedin.com/in/christian-reinoso](https://www.linkedin.com/in/christian-reinoso/)
* **GitHub:** [@chrispaulrtv](https://github.com/chrispaulrtv)

---

## 🙏 Acknowledgments

Based on the [Astro Modern Portfolio Template](https://github.com/rishikesh2003/my-portfolio). Modified and re-architected for Senior Consulting services.