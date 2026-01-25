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
cp .env.example .env
```

Éditer `.env` avec les valeurs suivantes :

```bash
# Prismic
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=chapelle-tour-2026  # Nom de votre repository Prismic

# Webhook Prismic (sécurité)
# Générer avec : openssl rand -base64 32
PRISMIC_WEBHOOK_SECRET=your_webhook_secret_here

# Resend (envoi d'emails)
# Obtenir sur : https://resend.com/api-keys
RESEND_API_KEY=your_resend_api_key_here

# Email de destination pour le formulaire de contact
CONTACT_EMAIL=contact@lachapelledelatour2026.fr

# URL de votre site (pour protection CSRF)
NEXT_PUBLIC_SITE_URL=https://lachapelledelatour2026.fr
```

**Générer le secret webhook :**

```bash
openssl rand -base64 32
```

Copier le résultat dans `PRISMIC_WEBHOOK_SECRET`.

4. **Configurer Resend (envoi d'emails)**

- Créer un compte sur [resend.com](https://resend.com)
- Aller dans **API Keys** et créer une nouvelle clé
- Copier la clé dans `RESEND_API_KEY` de votre `.env`
- Vérifier votre domaine d'envoi (ou utiliser le domaine de test)

5. **Configurer le webhook Prismic** (pour le cache)

Une fois déployé sur Vercel :

- Aller dans Prismic → **Settings → Webhooks**
- Cliquer sur **Create a webhook**
- **Name**: "Cache Revalidation"
- **URL**: `https://votre-domaine.fr/api/revalidate`
- **Secret**: Copier votre `PRISMIC_WEBHOOK_SECRET`
- Ajouter le header personnalisé :
  - **Name**: `Authorization`
  - **Value**: `Bearer VOTRE_PRISMIC_WEBHOOK_SECRET`
- **Triggers**: Cocher "A document is published" et "A document is unpublished"
- Sauvegarder

6. **Lancer le serveur de développement**

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

| Variable                          | Valeur                                 | Environment                      |
| --------------------------------- | -------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | `chapelle-tour-2026`                   | Production, Preview, Development |
| `PRISMIC_WEBHOOK_SECRET`          | Générer avec `openssl rand -base64 32` | Production, Preview              |
| `RESEND_API_KEY`                  | Votre clé API Resend                   | Production, Preview              |
| `CONTACT_EMAIL`                   | `contact@lachapelledelatour2026.fr`    | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL`            | `https://lachapelledelatour2026.fr`    | Production                       |
| `NEXT_PUBLIC_SITE_URL`            | `https://votre-preview.vercel.app`     | Preview                          |

**Important :** Après avoir ajouté les variables, redéployer le site pour qu'elles soient prises en compte.

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

Le site implémente plusieurs couches de protection contre les vulnérabilités web courantes (OWASP Top 10) :

### Headers de Sécurité (next.config.ts)

| Header                        | Protection               | Description                                               |
| ----------------------------- | ------------------------ | --------------------------------------------------------- |
| **Content-Security-Policy**   | XSS, injection de code   | Contrôle les sources autorisées (scripts, images, styles) |
| **Strict-Transport-Security** | Man-in-the-Middle        | Force HTTPS pendant 1 an (HSTS)                           |
| **X-Frame-Options**           | Clickjacking             | Empêche l'affichage du site dans une iframe externe       |
| **X-Content-Type-Options**    | MIME Sniffing            | Force le respect du Content-Type déclaré                  |
| **X-XSS-Protection**          | XSS (navigateurs legacy) | Active le filtre XSS des anciens navigateurs              |
| **Referrer-Policy**           | Fuite d'informations     | Contrôle les infos envoyées dans le header Referer        |
| **Permissions-Policy**        | Abus de permissions      | Désactive caméra, micro, géolocalisation                  |

### Protection API

#### Endpoint `/api/revalidate` (webhook Prismic)

- ✅ Authentification Bearer token
- ✅ Protection contre DoS (spam de revalidation)
- ✅ Vérification du secret webhook

#### Endpoint `/api/contact` (formulaire)

- ✅ **CSRF Protection** : Validation de l'origine de la requête
- ✅ **Email Injection** : Blocage des caractères CRLF (`\r\n`)
- ✅ **Sanitisation** : Nettoyage HTML et limitation de longueur
- ✅ **Rate Limiting** : Client-side (5 soumissions/15 min)

### Variables d'Environnement Sécurisées

- ❌ Jamais commité dans Git (`.env` dans `.gitignore`)
- ✅ Fichier `.env.example` avec placeholders génériques
- ✅ Validation Zod au runtime
- ✅ TypeScript strict mode activé
- ✅ ESLint avec règles de sécurité

### Bonnes Pratiques Appliquées

- Respect de la norme RFC 5321 pour les emails (max 254 caractères)
- Validation stricte avec Zod sur tous les inputs utilisateurs
- Subject email fixe (pas de contenu utilisateur)
- Pas de `any` en TypeScript
- Aucune dépendance avec vulnérabilité connue (`npm audit` clean)

### Tests de Sécurité

Pour vérifier les headers en production :

```bash
curl -I https://lachapelledelatour2026.fr
```

Vous devriez voir tous les headers de sécurité listés ci-dessus.

## 🔧 Dépannage

### Erreur : "Webhook not configured" (500)

**Cause :** Variable `PRISMIC_WEBHOOK_SECRET` manquante

**Solution :**

```bash
# Générer un secret
openssl rand -base64 32

# L'ajouter dans .env
echo "PRISMIC_WEBHOOK_SECRET=votre_secret_genere" >> .env
```

### Erreur : "Requête non autorisée" (403) sur le formulaire de contact

**Cause :** Protection CSRF active, l'origine de la requête n'est pas autorisée

**Solution :**

- Vérifier que `NEXT_PUBLIC_SITE_URL` correspond à votre domaine
- En développement local, mettre `http://localhost:3000`
- En production, mettre `https://votre-domaine.fr`

### Erreur : "Email contient des caractères invalides"

**Cause :** L'email contient des retours à la ligne (`\r` ou `\n`)

**Solution :** C'est normal, c'est une protection contre l'injection d'en-têtes. Vérifier que l'email est bien formaté.

### Le webhook Prismic ne fonctionne pas

**Vérifier :**

1. Le secret est bien configuré dans Prismic (Settings → Webhooks)
2. Le header `Authorization: Bearer VOTRE_SECRET` est bien ajouté
3. L'URL du webhook est correcte : `https://votre-domaine.fr/api/revalidate`
4. Tester le webhook manuellement :

```bash
curl -X POST https://votre-domaine.fr/api/revalidate \
  -H "Authorization: Bearer VOTRE_SECRET"

# Réponse attendue : {"revalidated":true,"now":1234567890}
```

### Content Security Policy bloque des ressources

Si vous voyez des erreurs CSP dans la console :

1. Identifier la source bloquée dans l'erreur
2. Ajouter le domaine dans `next.config.ts` :

```typescript
// Exemple pour autoriser un nouveau CDN
"img-src 'self' data: https://images.prismic.io https://nouveau-cdn.com",
```

3. Redémarrer le serveur de développement

## 📄 Licence

Projet open-source pour usage électoral.

## 🤝 Support

Pour toute question :

- Email : [votre-email]
- Issues GitHub : [lien-vers-repo]

---

**Bonne campagne ! 🎉**
