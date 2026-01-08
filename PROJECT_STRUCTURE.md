# Structure du Projet

```
chapelle-tour-2026/
│
├── 📄 Configuration
│   ├── .env.example              # Template des variables d'environnement
│   ├── .env.local                # Variables d'environnement (ne pas commit)
│   ├── .eslintrc.json            # Configuration ESLint (qualité code)
│   ├── .prettierrc               # Configuration Prettier (formatage)
│   ├── .lintstagedrc.json        # Config lint-staged (pre-commit)
│   ├── .gitignore                # Fichiers à ignorer par Git
│   ├── next.config.ts            # Configuration Next.js
│   ├── tsconfig.json             # Configuration TypeScript
│   ├── tailwind.config.ts        # Configuration TailwindCSS
│   ├── postcss.config.mjs        # Configuration PostCSS
│   ├── vercel.json               # Configuration Vercel
│   ├── prismicio.ts              # Configuration Prismic CMS
│   └── slicemachine.config.json  # Configuration Slice Machine
│
├── 📱 Application (app/)
│   ├── layout.tsx                # Layout principal (Navigation + Footer)
│   ├── page.tsx                  # Page d'accueil
│   └── globals.css               # Styles globaux
│
├── 🧩 Composants (components/)
│   └── ui/
│       ├── Navigation.tsx        # Menu de navigation (responsive)
│       └── Footer.tsx            # Pied de page
│
├── 🎨 Slices Prismic (slices/)
│   ├── index.ts                  # Export des slices
│   ├── Hero/                     # Section bannière principale
│   │   ├── index.tsx             # Composant Hero
│   │   └── model.json            # Modèle Prismic
│   ├── Team/                     # Section équipe
│   │   ├── index.tsx             # Composant Team
│   │   └── model.json            # Modèle Prismic
│   └── Contact/                  # Section contact
│       ├── index.tsx             # Composant Contact (formulaire)
│       └── model.json            # Modèle Prismic
│
├── 🌍 Fichiers publics (public/)
│   └── robots.txt                # SEO - Instructions pour les crawlers
│
├── 📚 Documentation
│   ├── README.md                 # Documentation principale
│   ├── QUICKSTART.md             # Guide de démarrage rapide (15 min)
│   ├── PRISMIC_SETUP.md          # Guide configuration Prismic détaillé
│   ├── VERCEL_DEPLOYMENT.md      # Guide déploiement Vercel détaillé
│   └── PROJECT_STRUCTURE.md      # Ce fichier
│
├── 📦 Dépendances
│   ├── package.json              # Dépendances et scripts npm
│   ├── package-lock.json         # Versions lockées
│   └── node_modules/             # Modules installés (gitignored)
│
└── 🔧 Fichiers générés
    ├── next-env.d.ts             # Types Next.js
    └── .next/                    # Build Next.js (gitignored)
```

## Technologies utilisées

### Framework & Language

- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript 5.9** - Typage statique

### Styling

- **TailwindCSS 3.4** - Framework CSS utility-first
- **PostCSS** - Transformation CSS

### CMS

- **Prismic** - Headless CMS pour gérer le contenu
  - `@prismicio/client` - Client API
  - `@prismicio/next` - Intégration Next.js
  - `@prismicio/react` - Composants React

### Qualité de Code

- **ESLint** - Linter JavaScript/TypeScript
  - `eslint-plugin-sonarjs` - Règles qualité SonarJS
  - `eslint-plugin-security` - Règles sécurité
- **Prettier** - Formateur de code
- **lint-staged** - Lint des fichiers stagés
- **husky** - Git hooks

### Deployment

- **Vercel** - Plateforme d'hébergement et CDN

## Commandes disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de dev (http://localhost:3000)

# Production
npm run build        # Builder pour production
npm run start        # Lancer le serveur de production

# Qualité
npm run lint         # Vérifier le code (ESLint)
npm run lint:fix     # Corriger automatiquement les erreurs
npm run format       # Formater le code (Prettier)

# Déploiement
vercel               # Déployer sur Vercel (CLI)
```

## Flux de données

```
┌─────────────┐
│   Prismic   │  ← Admin modifie le contenu ici
│     CMS     │
└──────┬──────┘
       │ API
       │
       ↓
┌─────────────┐
│  Next.js    │  ← Récupère le contenu via @prismicio/client
│   Server    │
└──────┬──────┘
       │ SSR
       │
       ↓
┌─────────────┐
│   Browser   │  ← Utilisateur voit le site
│    User     │
└─────────────┘
```

## Pages et Routes

```
/ (homepage)
├── Hero Section      (Slice Hero)
├── Team Section      (Slice Team)
└── Contact Section   (Slice Contact)
```

## Sections du site

### 1. Hero (Bannière principale)

- Titre de campagne
- Slogan
- Image de fond (optionnelle)
- Logo (optionnel)
- Call-to-action

### 2. Team (Équipe)

- Titre de section
- Description
- Liste des membres avec :
  - Photo
  - Nom
  - Rôle
  - Biographie

### 3. Contact (Formulaire)

- Titre
- Description
- Formulaire :
  - Nom
  - Email
  - Message
- Informations de contact (email, téléphone)

## Design System

### Couleurs principales

- **Primary** : Indigo (bleu) - Modifiable dans `tailwind.config.ts`
- **Background** : Blanc / Gris clair
- **Text** : Gris foncé

### Composants UI

- **Navigation** : Fixed top, responsive avec menu mobile
- **Footer** : Gris foncé avec copyright
- **Boutons** : Arrondis (rounded-full) avec effet hover
- **Cards** : Ombres légères, arrondis

### Responsive

- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px

Tous les composants sont responsive avec TailwindCSS.

## Sécurité

- ✅ TypeScript strict mode
- ✅ ESLint security rules
- ✅ Pas de credentials hardcodés
- ✅ Variables d'environnement pour secrets
- ✅ HTTPS automatique (Vercel)
- ✅ CSP headers (Vercel)

## Performance

- ✅ Next.js App Router (React Server Components)
- ✅ Image optimization automatique
- ✅ Code splitting
- ✅ Static generation quand possible
- ✅ CDN global (Vercel Edge Network)

## SEO

- ✅ Metadata dans `app/layout.tsx`
- ✅ robots.txt configuré
- ✅ Structure HTML sémantique
- ✅ Images avec alt text
- ✅ Sitemap (à générer)

## Prochaines améliorations possibles

### Contenu

- [ ] Page programme détaillé
- [ ] Blog / Actualités
- [ ] Galerie photos
- [ ] Vidéos de campagne

### Fonctionnalités

- [ ] Newsletter inscription
- [ ] Partage réseaux sociaux
- [ ] Événements à venir
- [ ] Carte interactive de la commune

### Technique

- [ ] Sitemap.xml généré
- [ ] Google Analytics / Matomo
- [ ] Formulaire de contact fonctionnel (API route)
- [ ] Tests E2E (Playwright)

### Design

- [ ] Animations (Framer Motion)
- [ ] Mode sombre
- [ ] Thème personnalisé aux couleurs de la liste

---

**Ce projet respecte les standards de qualité "NIVEAU 1" selon la classification `.claude/CLAUDE.md`**

- ✅ ESLint + Prettier configurés
- ✅ Pre-commit hooks (husky)
- ✅ TypeScript strict
- ✅ Nomenclature respectée
- ✅ Dernières versions des packages
- ⚠️ Pas de tests (niveau 1)
- ⚠️ Pas de Sentry (niveau 1 - logs Vercel suffisants)
