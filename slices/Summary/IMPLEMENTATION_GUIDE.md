# Guide d'implémentation - Section Bilan redesignée

## 🎯 Objectif

Ajouter les champs nécessaires dans Prismic pour supporter le nouveau design avec photos.

## 📋 Étape 1: Ouvrir Slice Machine

```bash
npm run slicemachine
```

Cela ouvrira l'interface Slice Machine sur `http://localhost:9999`

## 🔨 Étape 2: Modifier le Slice "Bilan"

1. Dans Slice Machine, naviguer vers **Slices** → **Bilan**
2. Sélectionner la variation **"Default"**
3. Dans la section **Primary** → **Bilan Items** (le groupe répétable existant)

## ➕ Étape 3: Ajouter les nouveaux champs

### 3.1 Ajouter "Photo de thématique"

Dans le groupe `bilan_items`, ajouter:

```
Type: Image
API ID: thematic_image
Label: Photo de thématique
Description: Image principale illustrant la thématique (optionnel)
```

**Configuration de l'image:**

- Constraint: Width - 1200px
- Thumbnail: large (optionnel)

---

### 3.2 Ajouter "Actions détaillées" (Groupe répétable)

Dans le groupe `bilan_items`, ajouter:

```
Type: Group
API ID: action_details
Label: Actions détaillées avec photos
Description: Liste des réalisations avec titre, description et photo
```

**Champs à l'intérieur du groupe `action_details`:**

#### a) Titre de l'action

```
Type: Text
API ID: title
Label: Titre de l'action
Placeholder: Ex: Rénovation de la place du village
```

#### b) Description de l'action

```
Type: Rich Text
API ID: description
Label: Description détaillée
Placeholder: Décrivez l'action réalisée...
Configuration: Autoriser les paragraphes, gras, italique, listes
```

#### c) Photo de l'action

```
Type: Image
API ID: image
Label: Photo de l'action
Description: Photo illustrant cette réalisation concrète
```

**Configuration de l'image:**

- Constraint: Width - 800px
- Thumbnail: medium

---

## 💾 Étape 4: Sauvegarder et synchroniser

1. Cliquer sur **"Save"** dans Slice Machine
2. Cliquer sur **"Push to Prismic"** pour synchroniser avec votre repository Prismic

## 🔄 Étape 5: Régénérer les types TypeScript

Une fois les champs sauvegardés dans Slice Machine:

```bash
npm run slicemachine
```

Puis dans l'interface Slice Machine, cliquer sur **"Sync Types"** ou exécuter:

```bash
# Les types seront automatiquement générés dans prismicio-types.d.ts
```

## 📝 Étape 6: Remplir les données dans Prismic

1. Aller dans **Prismic Dashboard** → Votre document avec la slice Bilan
2. Pour chaque thématique dans `bilan_items`:
   - (Optionnel) Ajouter une `thematic_image`
   - Cliquer sur **"Add item"** dans `action_details`
   - Remplir: `title`, `description`, `image`
   - Répéter pour chaque réalisation (3-6 actions recommandées par thématique)

## ✅ Vérification

Après l'ajout des champs, le composant React détectera automatiquement:

- Si `action_details.length > 0` → Affiche la grille avec photos
- Sinon → Affiche le fallback (ancienne liste simple)

## 🎨 Recommandations pour les photos

### Photos de thématiques (`thematic_image`)

- **Dimensions**: 1200x800px minimum
- **Ratio**: 3:2 ou 16:10
- **Style**: Photo large, représentative de la thématique
- **Exemples**: Vue du village, paysage, activité communautaire

### Photos d'actions (`action_details[].image`)

- **Dimensions**: 800x600px minimum
- **Ratio**: 4:3
- **Style**: Photo de l'action concrète réalisée
- **Exemples**: Chantier, inauguration, avant/après, équipement installé

## 🚨 Notes importantes

1. **Les @ts-ignore dans le code** sont temporaires et disparaîtront une fois les types régénérés
2. **Compatibilité**: Le site continue de fonctionner avec les anciennes données
3. **Performance**: Les images sont automatiquement optimisées par Prismic + Next.js
4. **Accessibilité**: Toujours remplir les champs `alt` des images

## 🐛 Dépannage

### Les types TypeScript ne se mettent pas à jour

```bash
# Arrêter le serveur dev
# Supprimer le cache
rm -rf .next
# Relancer Slice Machine
npm run slicemachine
# Synchroniser les types
```

### Les images ne s'affichent pas

- Vérifier que `PrismicNextImage` est bien importé
- Vérifier que l'image a une URL dans Prismic
- Vérifier la console pour les erreurs

## 📞 Support

Si besoin d'aide, se référer à:

- [Documentation Prismic Slice Machine](https://prismic.io/docs/slice-machine)
- [Documentation des champs d'image](https://prismic.io/docs/image)
- Le fichier `PRISMIC_SCHEMA_UPDATE.md` pour la structure complète
