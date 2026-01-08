# Guide de Déploiement Vercel

Ce guide explique comment déployer votre site sur Vercel, plateforme d'hébergement gratuite et performante.

## Prérequis

- Un compte GitHub, GitLab ou Bitbucket
- Votre code poussé sur un repository Git
- Un compte Vercel (gratuit)

## Méthode 1 : Déploiement via l'interface Vercel (Recommandé)

### Étape 1 : Pousser le code sur Git

Si ce n'est pas déjà fait :

```bash
cd chapelle-tour-2026

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Site campagne électorale"

# Créer un repository sur GitHub et suivre les instructions pour le push
# Exemple :
git remote add origin https://github.com/votre-username/chapelle-tour-2026.git
git push -u origin main
```

### Étape 2 : Créer un compte Vercel

1. Aller sur [https://vercel.com](https://vercel.com)
2. Cliquer sur **Sign Up**
3. Connectez-vous avec GitHub/GitLab/Bitbucket (recommandé)

### Étape 3 : Importer le projet

1. Une fois connecté, cliquer sur **Add New...** → **Project**
2. Vercel détectera automatiquement vos repositories Git
3. Chercher `chapelle-tour-2026` dans la liste
4. Cliquer sur **Import**

### Étape 4 : Configurer le projet

Vercel détecte automatiquement qu'il s'agit d'un projet Next.js.

**Configuration :**

- **Framework Preset** : Next.js (auto-détecté)
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `.next` (par défaut)
- **Install Command** : `npm install` (par défaut)

**Variables d'environnement :**

Cliquer sur **Environment Variables** et ajouter :

| Name                              | Value                |
| --------------------------------- | -------------------- |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | `chapelle-tour-2026` |

(Remplacer par le nom de votre repository Prismic)

### Étape 5 : Déployer

1. Cliquer sur **Deploy**
2. Vercel va :
   - Cloner votre repository
   - Installer les dépendances
   - Builder le projet
   - Déployer sur un CDN global

Temps estimé : 2-3 minutes

### Étape 6 : Accéder au site

Une fois le déploiement terminé :

- Vercel vous donne une URL : `https://chapelle-tour-2026.vercel.app`
- Cliquer sur **Visit** pour voir votre site en ligne !

## Méthode 2 : Déploiement via CLI Vercel

### Installation de la CLI

```bash
npm install -g vercel
```

### Connexion

```bash
vercel login
```

Suivre les instructions pour vous connecter.

### Déploiement

```bash
cd chapelle-tour-2026
vercel
```

Répondre aux questions :

- **Set up and deploy ?** → Yes
- **Which scope ?** → Votre compte
- **Link to existing project ?** → No
- **Project name ?** → chapelle-tour-2026
- **Directory ?** → ./ (racine)
- **Override settings ?** → No

La CLI va :

1. Uploader votre code
2. Builder le projet
3. Vous donner l'URL de déploiement

### Configurer les variables d'environnement

```bash
vercel env add NEXT_PUBLIC_PRISMIC_ENVIRONMENT
```

Entrer la valeur : `chapelle-tour-2026`

Puis redéployer :

```bash
vercel --prod
```

## Configuration du nom de domaine personnalisé

### Domaine gratuit Vercel

Votre site est accessible sur : `https://chapelle-tour-2026.vercel.app`

### Domaine personnalisé (optionnel)

Si vous avez un nom de domaine (ex: `chapellelatour2026.fr`) :

1. Dans le dashboard Vercel, aller dans votre projet
2. **Settings** → **Domains**
3. Ajouter votre domaine personnalisé
4. Suivre les instructions pour configurer les DNS

**Exemples de domaines :**

- `chapellelatour2026.fr`
- `ensemble-chapelle.fr`
- `vote2026-chapelle.fr`

Vercel génère automatiquement un certificat SSL (HTTPS) gratuit.

## Déploiements automatiques

### Branches principales

Chaque push sur la branche `main` déclenche automatiquement :

1. Un nouveau build
2. Un déploiement en production
3. Purge du cache CDN

### Preview Deployments

Les Pull Requests et autres branches créent des **Preview Deployments** :

- URL unique par PR
- Parfait pour tester avant de merger

## Optimisations Vercel

### Edge Network

Vercel déploie votre site sur un CDN global :

- **Temps de chargement** : < 100ms partout dans le monde
- **Régions** : Plus de 100 edge locations

### Image Optimization

Next.js optimise automatiquement les images Prismic :

- Format moderne (WebP, AVIF)
- Lazy loading
- Responsive

### Analytics (optionnel)

Activer **Vercel Analytics** pour suivre :

- Nombre de visiteurs
- Pages les plus visitées
- Performance (Core Web Vitals)

**Gratuit jusqu'à 100k événements/mois**

1. Dashboard → Projet → **Analytics**
2. **Enable**

## Monitoring et Logs

### Logs de déploiement

Dashboard → Projet → **Deployments** → Cliquer sur un déploiement

Vous verrez :

- Build logs (étapes de compilation)
- Runtime logs (erreurs en production)

### Alerts (optionnel)

Configurer des alertes pour :

- Échecs de déploiement
- Erreurs runtime
- Performance dégradée

**Settings** → **Notifications**

## Mises à jour du site

### Workflow recommandé

```bash
# 1. Faire vos modifications localement
# 2. Tester
npm run dev

# 3. Commit
git add .
git commit -m "Update: description des changements"

# 4. Push
git push origin main

# Vercel déploie automatiquement !
```

### Rollback (retour en arrière)

Si un déploiement pose problème :

1. Dashboard → **Deployments**
2. Trouver la version précédente qui fonctionnait
3. Cliquer sur **...** → **Promote to Production**

Instant rollback !

## Performance

Vercel optimise automatiquement :

- ✅ Compression Brotli/Gzip
- ✅ HTTP/2 et HTTP/3
- ✅ Smart CDN caching
- ✅ Image optimization
- ✅ Code splitting
- ✅ Edge functions

Résultat : **Score 90+ sur Google PageSpeed** garantis

## Sécurité

- ✅ HTTPS automatique (certificat SSL gratuit)
- ✅ DDoS protection
- ✅ Firewall intégré
- ✅ Headers de sécurité (CORS, CSP, etc.)

## Coûts

**Plan Hobby (Gratuit) :**

- Projets illimités
- 100 GB bandwidth/mois
- Déploiements illimités
- SSL automatique
- Analytics de base

**Largement suffisant pour un site de campagne !**

## Support

- **Documentation** : [https://vercel.com/docs](https://vercel.com/docs)
- **Discord** : [https://vercel.com/discord](https://vercel.com/discord)
- **Email** : support@vercel.com

## Checklist finale

Avant de partager votre site :

```
□ Site déployé sur Vercel ?
□ HTTPS activé (automatique) ?
□ Variables d'environnement configurées ?
□ Contenu Prismic rempli et publié ?
□ Testé sur mobile et desktop ?
□ Domaine personnalisé configuré (optionnel) ?
□ Analytics activé (optionnel) ?
□ Partage du lien avec votre équipe ?
```

## URL finale

Votre site sera accessible sur :

```
https://chapelle-tour-2026.vercel.app
```

(ou votre domaine personnalisé)

---

**Félicitations ! Votre site est en ligne ! 🚀**

Vous pouvez maintenant le partager sur :

- Réseaux sociaux
- Tracts et affiches
- Email aux électeurs
- Presse locale
