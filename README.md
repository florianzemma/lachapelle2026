# Ensemble pour La Chapelle de la Tour 2026

Site de campagne électorale pour les élections municipales 2026 à La Chapelle de la Tour.

## 🚀 Technologies

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS
- **CMS**: Prismic
- **Deployment**: Vercel
- **Language**: TypeScript

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Un compte Prismic (gratuit)
- Un compte Vercel (gratuit)

## 🛠️ Installation

1. **Cloner le projet**

```bash
cd chapelle-tour-2026
npm install
```

2. **Configurer Prismic**

- Aller sur [prismic.io](https://prismic.io) et créer un compte
- Créer un nouveau repository nommé `chapelle-tour-2026`
- Dans Prismic, aller dans **Settings → Custom Types**
- Créer un **Single Type** nommé `homepage` avec les slices suivants :
  - Hero
  - Team
  - Contact
- Les modèles JSON des slices sont dans `/slices/*/model.json`

3. **Configurer les variables d'environnement**

```bash
cp .env.example .env.local
```

Éditer `.env.local` et remplacer `chapelle-tour-2026` par le nom de votre repository Prismic si différent.

4. **Lancer le serveur de développement**

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Configuration du contenu dans Prismic

### 1. Créer le Custom Type "Homepage"

Dans Prismic, créer un **Single Type** avec :

**API ID**: `homepage`

**Slices Zone**: Ajouter les slices suivants :

- Hero (pour la bannière principale)
- Team (pour la liste électorale)
- Contact (pour le formulaire de contact)

### 2. Remplir le contenu

#### Slice Hero

- **Title**: "Ensemble pour La Chapelle de la Tour"
- **Description**: Votre slogan de campagne
- **Background Image**: Photo de la commune (optionnel)
- **Logo**: Logo de votre liste (optionnel)
- **CTA Text**: "Découvrir notre équipe"

#### Slice Team

- **Section Title**: "Notre équipe"
- **Section Description**: Présentation de votre liste
- **Team Members**: Ajoutez chaque membre avec :
  - Nom complet
  - Rôle (Tête de liste, Adjoint, etc.)
  - Photo (format carré recommandé)
  - Courte biographie

#### Slice Contact

- **Section Title**: "Contactez-nous"
- **Section Description**: "Une question ? N'hésitez pas à nous écrire"
- **Email**: Votre email de campagne
- **Phone**: Numéro de téléphone (optionnel)
- **Submit Button Text**: "Envoyer"

## 🚀 Déploiement sur Vercel

### Option 1: Via l'interface Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer votre repository Git
4. Configurer les variables d'environnement :
   - `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` = votre repository Prismic
5. Déployer

### Option 2: Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Suivre les instructions
# Configurer les variables d'environnement quand demandé
```

### Variables d'environnement Vercel

Dans les **Project Settings → Environment Variables**, ajouter :

- `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` = `chapelle-tour-2026` (ou votre nom de repository)

## 📦 Scripts disponibles

```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Build de production
npm run start        # Lancer le serveur de production
npm run lint         # Vérifier le code
npm run lint:fix     # Corriger automatiquement les erreurs
npm run format       # Formater le code avec Prettier
```

## 🎨 Personnalisation

### Couleurs

Les couleurs principales sont dans `tailwind.config.ts`. Par défaut :

- Primaire: Indigo (bleu)
- Pour changer, modifier les classes `indigo-*` dans les composants

### Typographie

La police par défaut est system (Arial/Helvetica). Pour personnaliser :

1. Ajouter une Google Font dans `app/layout.tsx`
2. Mettre à jour `app/globals.css`

## 📁 Structure du projet

```
chapelle-tour-2026/
├── app/                  # Pages Next.js (App Router)
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Page d'accueil
│   └── globals.css      # Styles globaux
├── slices/              # Composants Prismic Slices
│   ├── Hero/
│   ├── Team/
│   └── Contact/
├── public/              # Fichiers statiques
├── prismicio.ts         # Configuration Prismic
└── slicemachine.config.json
```

## 🔒 Sécurité

- Pas de données sensibles dans le code
- Variables d'environnement pour les secrets
- TypeScript strict mode activé
- ESLint avec règles de sécurité

## 📄 Licence

Projet open-source pour usage électoral.

## 🤝 Support

Pour toute question :

- Email : [votre-email]
- Issues GitHub : [lien-vers-repo]

---

**Bonne campagne ! 🎉**
