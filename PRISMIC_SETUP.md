# Guide de Configuration Prismic

Ce guide vous accompagne étape par étape pour configurer votre CMS Prismic.

## 1. Créer un compte Prismic

1. Aller sur [https://prismic.io](https://prismic.io)
2. Cliquer sur "Start for free"
3. Créer un compte avec votre email

## 2. Créer un repository

1. Une fois connecté, cliquer sur "Create repository"
2. Nom du repository : `chapelle-tour-2026` (ou votre choix)
3. Plan : **Free** (suffisant pour ce projet)
4. Créer le repository

## 3. Configurer le Custom Type "Homepage"

### Étape 3.1 : Créer le Custom Type

1. Dans le menu de gauche, aller dans **Custom Types**
2. Cliquer sur **Create custom type**
3. Sélectionner **Single Type** (il n'y aura qu'une seule page d'accueil)
4. Nom : `Homepage`
5. API ID : `homepage` (important !)
6. Cliquer sur **Create**

### Étape 3.2 : Ajouter les Slices

Dans l'éditeur de Custom Type :

1. **Onglet "Slices"** (sur la droite)
2. Cliquer sur **Add a Slice Zone**
3. Label : `Slices`
4. Cliquer sur **Add new Slice**

#### Slice 1 : Hero (Bannière principale)

1. Nom : `Hero`
2. API ID : `hero`
3. Ajouter les champs suivants :

**Primary Fields (champs uniques) :**

| Field Name         | Type      | Config                            |
| ------------------ | --------- | --------------------------------- |
| `title`            | Rich Text | Single line (Heading 1)           |
| `description`      | Rich Text | Single paragraph                  |
| `background_image` | Image     | Optionnel                         |
| `logo`             | Image     | Optionnel                         |
| `cta_text`         | Text      | Exemple: "Découvrir notre équipe" |

#### Slice 2 : Team (Équipe)

1. Nom : `Team`
2. API ID : `team`
3. Ajouter les champs suivants :

**Primary Fields :**

| Field Name            | Type      | Config                  |
| --------------------- | --------- | ----------------------- |
| `section_title`       | Rich Text | Single line (Heading 2) |
| `section_description` | Rich Text | Single paragraph        |

**Repeatable Zone (champs répétables pour chaque membre) :**

Cliquer sur **Add repeatable zone** et ajouter :

| Field Name | Type      | Config                   |
| ---------- | --------- | ------------------------ |
| `name`     | Text      | Nom du membre            |
| `role`     | Text      | Exemple: "Tête de liste" |
| `photo`    | Image     | Photo du membre          |
| `bio`      | Rich Text | Multi-paragraph          |

#### Slice 3 : Contact (Formulaire)

1. Nom : `Contact`
2. API ID : `contact`
3. Ajouter les champs suivants :

**Primary Fields :**

| Field Name            | Type      | Config                  |
| --------------------- | --------- | ----------------------- |
| `section_title`       | Rich Text | Single line (Heading 2) |
| `section_description` | Rich Text | Single paragraph        |
| `submit_button_text`  | Text      | Exemple: "Envoyer"      |
| `email`               | Text      | Email de contact        |
| `phone`               | Text      | Téléphone (optionnel)   |

### Étape 3.3 : Sauvegarder

1. Cliquer sur **Save** en haut à droite

## 4. Créer le document Homepage

1. Aller dans **Documents** (menu de gauche)
2. Cliquer sur **Create new**
3. Sélectionner **Homepage**
4. Vous verrez la Slice Zone vide

### Remplir le contenu :

#### Ajouter le Slice Hero

1. Cliquer sur **Add a Slice**
2. Sélectionner **Hero**
3. Remplir :
   - **Title** : "Ensemble pour La Chapelle de la Tour"
   - **Description** : Votre slogan de campagne (ex: "Une équipe engagée pour notre commune")
   - **Background Image** : Importer une photo de la commune (optionnel)
   - **Logo** : Logo de votre liste (optionnel)
   - **CTA Text** : "Découvrir notre équipe"

#### Ajouter le Slice Team

1. Cliquer sur **Add a Slice**
2. Sélectionner **Team**
3. Remplir :
   - **Section Title** : "Notre équipe"
   - **Section Description** : "Découvrez les membres de notre liste"
   - **Team Members** : Pour chaque membre, cliquer sur **Add item** :
     - **Name** : Prénom NOM
     - **Role** : Tête de liste / Premier adjoint / Conseiller, etc.
     - **Photo** : Photo professionnelle (format carré recommandé, 500x500px minimum)
     - **Bio** : Courte présentation (2-3 phrases)

#### Ajouter le Slice Contact

1. Cliquer sur **Add a Slice**
2. Sélectionner **Contact**
3. Remplir :
   - **Section Title** : "Contactez-nous"
   - **Section Description** : "Une question ? N'hésitez pas à nous écrire"
   - **Submit Button Text** : "Envoyer"
   - **Email** : contact@votreliste.fr
   - **Phone** : +33 X XX XX XX XX (optionnel)

### Publier

1. Cliquer sur **Save**
2. Cliquer sur **Publish** (en haut à droite)

## 5. Récupérer les informations de connexion

### Repository Name

1. Aller dans **Settings** → **API & Security**
2. Copier le **Repository Name** (ex: `chapelle-tour-2026`)
3. Dans votre projet Next.js, éditer `.env.local` :

```env
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=chapelle-tour-2026
```

Remplacer `chapelle-tour-2026` par votre repository name.

## 6. Tester localement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

Vous devriez voir votre site avec le contenu de Prismic !

## 7. Mode Preview (optionnel)

Pour prévisualiser les modifications avant publication :

1. Dans Prismic : **Settings** → **Previews**
2. Ajouter un nouveau Preview :
   - **Site Name** : Dev
   - **Domain** : `http://localhost:3000`
   - **Link Resolver** : `/api/preview`

## Astuces

### Images optimales

- **Logo** : Format PNG transparent, 400x400px minimum
- **Background Hero** : 1920x1080px (paysage)
- **Photos membres** : Format carré, 500x500px minimum

### Textes recommandés

- **Title Hero** : Maximum 60 caractères
- **Description Hero** : Maximum 200 caractères
- **Bio membres** : 100-300 caractères

### Organisation des membres

Ordonnez les membres par importance :

1. Tête de liste
2. Adjoints
3. Conseillers

L'ordre dans Prismic sera l'ordre d'affichage sur le site.

## Support

En cas de problème :

- Documentation Prismic : [https://prismic.io/docs](https://prismic.io/docs)
- Support Prismic : help@prismic.io

---

**Une fois configuré, votre site sera administrable depuis Prismic sans toucher au code ! 🎉**
