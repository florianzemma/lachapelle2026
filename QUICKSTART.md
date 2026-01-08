# 🚀 Démarrage Rapide

Guide ultra-rapide pour lancer votre site de campagne en 15 minutes.

## ⚡ Installation (2 minutes)

```bash
cd chapelle-tour-2026
npm install
cp .env.example .env.local
```

## 🎨 Configurer Prismic (5 minutes)

### 1. Créer un compte

→ [prismic.io](https://prismic.io) → **Sign Up** (gratuit)

### 2. Créer un repository

- Nom : `chapelle-tour-2026`
- Plan : **Free**

### 3. Créer le Custom Type "Homepage"

**Custom Types** → **Create** → **Single Type**

- Nom : `Homepage`
- API ID : `homepage`

### 4. Ajouter les 3 Slices

Dans le builder, ajouter :

#### ✅ Slice "Hero"

- title (Rich Text)
- description (Rich Text)
- background_image (Image)
- logo (Image)
- cta_text (Text)

#### ✅ Slice "Team"

- section_title (Rich Text)
- section_description (Rich Text)
- **Repeatable** : name, role, photo, bio

#### ✅ Slice "Contact"

- section_title (Rich Text)
- section_description (Rich Text)
- email, phone, submit_button_text (Text)

### 5. Créer le document Homepage

**Documents** → **Create** → **Homepage**

Ajouter les 3 slices et remplir le contenu → **Publish**

### 6. Configurer .env.local

```env
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=chapelle-tour-2026
```

(Remplacer par le nom de VOTRE repository)

## 💻 Tester localement (1 minute)

```bash
npm run dev
```

→ Ouvrir [http://localhost:3000](http://localhost:3000)

## 🌍 Déployer sur Vercel (5 minutes)

### Option A : Interface (facile)

1. Pousser sur GitHub :

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOUS/chapelle-tour-2026.git
git push -u origin main
```

2. [vercel.com](https://vercel.com) → **Import Project** → Sélectionner votre repo

3. Ajouter la variable :
   - `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` = `chapelle-tour-2026`

4. **Deploy** → Attendre 2 min → ✅ Site en ligne !

### Option B : CLI (rapide)

```bash
npm i -g vercel
vercel login
vercel
```

## 📱 Votre site est en ligne !

URL : `https://chapelle-tour-2026.vercel.app`

## 🎯 Prochaines étapes

### Personnaliser le contenu dans Prismic

1. **Hero** :
   - Titre : "Ensemble pour La Chapelle de la Tour"
   - Slogan de campagne
   - Photo de la commune en background

2. **Team** :
   - Ajouter chaque membre de votre liste
   - Photos professionnelles (500x500px minimum)
   - Bio courte (2-3 phrases)

3. **Contact** :
   - Email de campagne
   - Téléphone (optionnel)

### Personnaliser les couleurs

Éditer `tailwind.config.ts` et remplacer `indigo` par votre couleur :

```typescript
colors: {
  primary: {
    50: '#eff6ff',
    // ... votre palette
  }
}
```

Puis dans les composants, remplacer `indigo-*` par `primary-*`

### Domaine personnalisé (optionnel)

Vercel → Settings → Domains → Ajouter votre domaine

Exemples :

- `chapellelatour2026.fr`
- `ensemble-chapelle.fr`

## 📚 Documentation complète

- **Configuration Prismic détaillée** : `PRISMIC_SETUP.md`
- **Déploiement Vercel détaillé** : `VERCEL_DEPLOYMENT.md`
- **Guide complet** : `README.md`

## 🆘 Problèmes courants

### Erreur "Repository not found"

→ Vérifier que `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` correspond au nom exact de votre repository Prismic

### Site vide au démarrage

→ Vérifier que vous avez bien **publié** le document Homepage dans Prismic

### Images ne s'affichent pas

→ Dans Prismic, vérifier que les images sont bien uploadées et que les champs ne sont pas vides

## ✅ Checklist

```
□ npm install terminé
□ Compte Prismic créé
□ Repository Prismic créé
□ Custom Type Homepage configuré
□ 3 Slices ajoutés (Hero, Team, Contact)
□ Document Homepage rempli et publié
□ .env.local configuré
□ npm run dev fonctionne localement
□ Code poussé sur GitHub
□ Déployé sur Vercel
□ Variables d'environnement configurées sur Vercel
□ Site accessible en ligne
```

## 🎉 Félicitations !

Votre site de campagne est opérationnel !

**Temps total : ~15 minutes** ⚡

---

**Besoin d'aide ?** Consultez les guides détaillés dans le dossier du projet.
