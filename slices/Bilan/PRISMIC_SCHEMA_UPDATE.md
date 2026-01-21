# Mise à jour du schéma Prismic pour la section Bilan

## 📋 Champs à ajouter dans Prismic

### Dans `bilan_items` (Groupe répétable existant)

#### 1. Photo de thématique

```
Nom du champ: thematic_image
Type: Image
Description: Photo principale illustrant la thématique
Obligatoire: Non
```

#### 2. Actions détaillées (Nouveau groupe répétable)

```
Nom du champ: action_details
Type: Group (Groupe répétable)
Description: Liste des actions avec photo et description

Champs dans le groupe:
  - title (Text)
    - Titre de l'action
    - Exemple: "Rénovation de la place du village"

  - description (Rich Text)
    - Description de l'action réalisée
    - Peut contenir plusieurs paragraphes

  - image (Image)
    - Photo de l'action réalisée
    - Format recommandé: 800x600px minimum
    - Ratio: 4:3 ou 16:9
```

## 🎨 Structure du nouveau design

### Chaque thématique affiche:

1. **En-tête** avec icône, badge numérique et titre
2. **Photo de thématique** (optionnelle) - Grande image d'illustration
3. **Texte d'introduction** (description existante)
4. **Grille de réalisations** avec photos (nouveau)
   - Chaque action est une card avec:
     - Photo en plein format
     - Numéro de l'action
     - Titre de l'action
     - Description détaillée

### Layout

- Cards pleine largeur (non plus en grille 3 colonnes)
- Design "magazine éditorial" avec typographie hiérarchisée
- Animations au scroll pour révéler progressivement le contenu
- Hover effects sur les cards d'actions

## 🔧 Migration des données

### Option 1: Conserver les anciennes actions (Recommandé)

Le composant affiche automatiquement:

- **Si `action_details` existe**: Grille de cards avec photos
- **Si `action_details` est vide**: Fallback sur l'ancien format `actions` (liste simple)

### Option 2: Migration complète

1. Ajouter les nouveaux champs dans Prismic
2. Pour chaque thématique, créer des `action_details` à partir des `actions` existantes
3. Ajouter des photos pour chaque action
4. (Optionnel) Supprimer l'ancien champ `actions`

## 📐 Spécifications des images

### Photo de thématique (`thematic_image`)

- **Dimensions recommandées**: 1200x800px
- **Ratio**: 3:2 ou 16:10
- **Poids max**: 500KB (optimisé pour le web)
- **Format**: JPG ou WebP

### Photos d'actions (`action_details[].image`)

- **Dimensions recommandées**: 800x600px
- **Ratio**: 4:3
- **Poids max**: 300KB par image
- **Format**: JPG ou WebP
- **Composition**: Privilégier des photos montrant l'action concrètement

## 🎯 Exemple de données

```json
{
  "bilan_items": [
    {
      "icon": "environnement",
      "title": "Transition Écologique",
      "description": "Notre engagement pour un territoire durable...",
      "thematic_image": {
        "url": "https://...",
        "alt": "Parc naturel de La Chapelle"
      },
      "action_details": [
        {
          "title": "Installation de panneaux solaires sur la mairie",
          "description": "100% d'autoconsommation atteinte...",
          "image": {
            "url": "https://...",
            "alt": "Panneaux solaires sur le toit de la mairie"
          }
        },
        {
          "title": "Création d'une forêt urbaine",
          "description": "500 arbres plantés...",
          "image": {
            "url": "https://...",
            "alt": "Plantation d'arbres avec les citoyens"
          }
        }
      ]
    }
  ]
}
```

## ✅ Checklist développeur

- [ ] Créer le groupe répétable `action_details` dans Prismic
- [ ] Ajouter les champs `title`, `description`, `image` dans `action_details`
- [ ] Ajouter le champ `thematic_image` dans `bilan_items`
- [ ] Régénérer les types TypeScript: `npm run slicemachine`
- [ ] Tester l'affichage avec et sans photos
- [ ] Migrer les données existantes (optionnel)

## 🚀 Comportement actuel

Le composant fonctionne déjà avec les données existantes en mode "fallback". Les nouvelles fonctionnalités s'activeront automatiquement une fois les champs ajoutés dans Prismic.
