# Configuration DNS Resend sur Hostinger

Ce guide vous explique comment configurer les enregistrements DNS nécessaires pour que Resend puisse envoyer des emails depuis votre domaine `lachapelledelatour2026.fr`.

## Prérequis

- Compte Resend créé sur [resend.com](https://resend.com)
- Accès à votre panneau de configuration Hostinger
- Clé API Resend configurée dans `.env.local`

## Étapes de configuration

### 1. Créer un compte Resend

1. Aller sur [https://resend.com](https://resend.com)
2. Créer un compte gratuit (100 emails/jour inclus)
3. Confirmer votre email

### 2. Obtenir votre clé API

1. Dans le dashboard Resend, aller sur **API Keys**
2. Cliquer sur **Create API Key**
3. Donner un nom (ex: "La Chapelle 2026 Production")
4. Copier la clé API (elle ne sera affichée qu'une seule fois)
5. Ajouter la clé dans votre fichier `.env.local` :
   ```
   RESEND_API_KEY=re_votre_cle_api_ici
   ```

### 3. Ajouter votre domaine dans Resend

1. Dans le dashboard Resend, aller sur **Domains**
2. Cliquer sur **Add Domain**
3. Entrer : `lachapelledelatour2026.fr`
4. Cliquer sur **Add**

Resend va vous afficher **2 enregistrements DNS** à configurer :

- Un enregistrement **SPF** (TXT)
- Un enregistrement **DKIM** (TXT)

**⚠️ Important** : Notez bien ces 2 enregistrements, vous en aurez besoin à l'étape suivante.

### 4. Configurer DNS sur Hostinger

1. Se connecter à votre compte Hostinger
2. Aller dans **Hébergement** → **Gérer** (pour votre site)
3. Dans le menu latéral, cliquer sur **Domaines**
4. Trouver `lachapelledelatour2026.fr` et cliquer sur **Gérer**
5. Cliquer sur **Zone DNS** ou **DNS Zone**

### 5. Ajouter les enregistrements TXT

Pour chaque enregistrement fourni par Resend :

**Enregistrement 1 (SPF) :**

- Type : `TXT`
- Nom/Host : `@` ou le nom fourni par Resend
- Valeur : La valeur fournie par Resend (commence généralement par `v=spf1`)
- TTL : `3600` (ou laisser par défaut)

**Enregistrement 2 (DKIM) :**

- Type : `TXT`
- Nom/Host : Le nom fourni par Resend (ex: `resend._domainkey`)
- Valeur : La valeur fournie par Resend (longue chaîne commençant par `p=`)
- TTL : `3600` (ou laisser par défaut)

Cliquer sur **Enregistrer** ou **Ajouter** pour chaque enregistrement.

### 6. Vérification DNS

**⏰ Propagation DNS** : Les changements DNS peuvent prendre de **quelques minutes à 48 heures** pour se propager. Généralement, c'est effectif en 1-2 heures.

**Vérifier la propagation** :

1. Retourner sur Resend → **Domains**
2. Votre domaine `lachapelledelatour2026.fr` devrait afficher un statut
3. Cliquer sur **Verify DNS** si le statut n'est pas automatiquement mis à jour
4. Si tout est correct, le statut passera à **Verified** ✅

**En cas de problème** :

- Attendre quelques heures pour la propagation
- Vérifier que les valeurs DNS copiées sont exactes (pas d'espaces en trop)
- Utiliser [https://dnschecker.org](https://dnschecker.org) pour vérifier la propagation mondiale

## Test de fonctionnement

### En développement (avant DNS)

Avant que le DNS soit vérifié, vous pouvez tester avec l'adresse par défaut de Resend :

Dans `/app/api/contact/route.ts`, la ligne 69 utilise :

```typescript
from: "La Chapelle 2026 <onboarding@resend.dev>",
```

Cette adresse fonctionne toujours, même sans DNS configuré. Les emails seront envoyés correctement à `contact@lachapelledelatour2026.fr`.

### En production (après DNS)

Une fois le DNS vérifié, vous pouvez (optionnel) changer l'adresse d'envoi pour utiliser votre domaine :

```typescript
from: "La Chapelle 2026 <contact@lachapelledelatour2026.fr>",
```

**⚠️ Note** : Ce changement est optionnel. Même avec `onboarding@resend.dev`, les emails fonctionnent parfaitement et le `replyTo` sera toujours l'email du visiteur.

## Déploiement sur Vercel

Une fois le DNS configuré et vérifié :

1. Aller sur votre dashboard Vercel
2. Sélectionner votre projet
3. Aller dans **Settings** → **Environment Variables**
4. Ajouter les variables :
   - `RESEND_API_KEY` : Votre clé API Resend
   - `CONTACT_EMAIL` : `contact@lachapelledelatour2026.fr`
5. Redéployer votre site

## Test final

1. Aller sur votre site en production
2. Remplir le formulaire de contact
3. Vérifier la réception sur `contact@lachapelledelatour2026.fr`
4. Vérifier le statut dans Resend Dashboard → **Logs**

## Limites du plan gratuit

- **100 emails/jour**
- Idéal pour un site associatif avec peu de contacts
- Si vous dépassez, Resend vous notifiera

## Support

- Documentation Resend : [https://resend.com/docs](https://resend.com/docs)
- Support Hostinger : Via leur chat en ligne
- En cas de problème : Vérifier les logs dans Resend Dashboard

---

**✅ Configuration terminée !** Votre formulaire de contact est maintenant fonctionnel.
