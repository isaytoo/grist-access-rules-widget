# 📖 Guide débutant — Gestion des accès avec Grist

> Ce guide vous explique comment gérer les permissions d'accès à vos documents Grist, étape par étape, avec des exemples concrets.

---

## 🎯 C'est quoi les "accès" dans Grist ?

Imaginez que votre document Grist est un **immeuble de bureaux**. Chaque personne qui y entre a un badge différent :

| Rôle | Badge | Ce qu'il peut faire |
|------|-------|-------------------|
| **Propriétaire** (Owner) | 🟡 Badge Or | Tout faire : lire, écrire, supprimer, gérer les accès des autres |
| **Éditeur** (Editor) | 🔵 Badge Bleu | Lire et modifier les données, mais pas gérer les accès |
| **Lecteur** (Viewer) | 🟢 Badge Vert | Uniquement regarder, aucune modification possible |

---

## 📋 Exemple concret : L'association "Les Jardins Partagés"

L'association gère un document Grist avec 3 tables :

| Table | Contenu |
|-------|---------|
| **Membres** | Liste des adhérents (nom, email, téléphone) |
| **Parcelles** | Les parcelles du jardin (numéro, surface, état) |
| **Récoltes** | Suivi des récoltes (date, légume, quantité) |

### Les personnes impliquées

| Personne | Rôle dans l'asso | Email |
|----------|-----------------|-------|
| **Marie** | Présidente | marie@jardins-partages.org |
| **Thomas** | Trésorier | thomas@jardins-partages.org |
| **Léa** | Responsable parcelles | lea@jardins-partages.org |
| **Hugo** | Simple adhérent | hugo@jardins-partages.org |

---

## 1️⃣ Gérer les utilisateurs (onglet 👥 Utilisateurs)

C'est ici que vous décidez **qui a accès** au document et avec quel rôle.

### Ajouter un utilisateur

Marie (propriétaire) veut donner accès au document :

1. Allez dans l'onglet **👥 Utilisateurs**
2. Dans la section **➕ Ajouter un utilisateur** :
   - Tapez l'email : `thomas@jardins-partages.org`
   - Choisissez le rôle : **✏️ Éditeur**
   - Cliquez sur **➕**

Thomas peut maintenant modifier les données, mais pas gérer les accès.

### Changer un rôle

Hugo était Lecteur, mais il devient responsable des récoltes. Marie change son rôle :

1. Trouvez Hugo dans la liste
2. Cliquez sur le menu déroulant de son rôle
3. Changez de **👁️ Lecteur** à **✏️ Éditeur**

### Retirer un utilisateur

Un adhérent quitte l'association :

1. Trouvez son nom dans la liste
2. Cliquez sur le bouton **✕** à droite
3. Confirmez la suppression

---

## 2️⃣ Les règles d'accès avancées

Les rôles de base (Propriétaire, Éditeur, Lecteur) s'appliquent à **tout le document**. Mais parfois, on veut être plus précis.

### Le problème

> Thomas est Éditeur, donc il peut modifier **toutes** les tables. Mais Marie ne veut pas qu'il modifie la table **Membres** (données personnelles sensibles). Il devrait seulement pouvoir lire les membres, mais modifier les **Récoltes**.

C'est là qu'interviennent les **règles d'accès par table**.

---

## 3️⃣ Règles par table (onglet ⚙️ Configurer)

### Exemple : Protéger la table Membres

Marie veut que seuls les Propriétaires puissent modifier la table **Membres** :

1. Allez dans l'onglet **⚙️ Configurer**
2. Choisissez :
   - **Portée** : Table
   - **Table** : Membres
   - **Type de condition** : Rôle
   - **Rôle** : Éditeur
   - **Permissions** : Lecture ✅ | Écriture ❌
3. Cliquez sur **Appliquer**

**Résultat** : Les Éditeurs (Thomas, Léa, Hugo) peuvent **voir** les membres mais pas les modifier. Seule Marie (Propriétaire) peut les modifier.

### Exemple : Protéger certaines colonnes

Marie veut que tout le monde puisse voir les noms des membres, mais pas leurs numéros de téléphone :

1. Dans **⚙️ Configurer** :
   - **Portée** : Colonnes
   - **Table** : Membres
   - **Colonnes** : Telephone
   - **Rôle** : Éditeur
   - **Permissions** : Lecture ❌ | Écriture ❌
2. Cliquez sur **Appliquer**

**Résultat** : La colonne Téléphone est invisible pour les Éditeurs.

---

## 4️⃣ Les attributs utilisateur (onglet 👤 Attributs)

Les attributs permettent de créer des **règles personnalisées par utilisateur**, pas juste par rôle.

### Le problème

> Léa est responsable des parcelles 1 à 10. Hugo est responsable des parcelles 11 à 20. Chacun ne devrait voir et modifier **que ses propres parcelles**.

Les rôles ne suffisent plus — il faut des **attributs**.

### Comment ça marche ?

Un attribut, c'est comme une **étiquette personnalisée** collée sur chaque utilisateur.

#### Étape 1 : Créer l'attribut

1. Allez dans l'onglet **👤 Attributs**
2. Cliquez sur **Créer un attribut**
3. Donnez-lui un nom : `Zone`
4. Le widget crée automatiquement une table `Utilisateurs_Zone`

#### Étape 2 : Remplir les valeurs

Dans la table `Utilisateurs_Zone`, ajoutez :

| Email | Zone |
|-------|------|
| lea@jardins-partages.org | Nord |
| hugo@jardins-partages.org | Sud |

#### Étape 3 : Utiliser l'attribut dans une règle

1. Dans **⚙️ Configurer** :
   - **Table** : Parcelles
   - **Type de condition** : Attribut
   - **Attribut** : Zone
   - **Colonne de la table** : Secteur (la colonne qui contient "Nord" ou "Sud")
   - **Permissions** : Lecture ✅ | Écriture ✅
2. Cliquez sur **Appliquer**

**Résultat** :
- Léa voit uniquement les parcelles du secteur **Nord**
- Hugo voit uniquement les parcelles du secteur **Sud**
- Marie (Propriétaire) voit tout

---

## 5️⃣ Visualiser les permissions (onglets 📊 Tables et 📋 Colonnes)

Ces onglets affichent une **matrice visuelle** de toutes les permissions en place.

### Onglet 📊 Tables

Montre pour chaque table, qui peut lire et écrire :

| | Propriétaire | Éditeur | Lecteur |
|---|---|---|---|
| **Membres** | ✅ Lecture ✅ Écriture | ✅ Lecture ❌ Écriture | ✅ Lecture ❌ Écriture |
| **Parcelles** | ✅ Lecture ✅ Écriture | ✅ Lecture ✅ Écriture | ✅ Lecture ❌ Écriture |
| **Récoltes** | ✅ Lecture ✅ Écriture | ✅ Lecture ✅ Écriture | ✅ Lecture ❌ Écriture |

### Onglet 📋 Colonnes

Montre les permissions colonne par colonne pour une table donnée.

---

## 6️⃣ Voir les règles actives (onglet 📜 Règles)

Cet onglet liste toutes les règles d'accès configurées dans le document, en langage clair.

Exemple de ce que vous verriez :

```
📋 Table "Membres" — Éditeurs : Lecture seule
📋 Table "Membres", colonne "Telephone" — Éditeurs : Accès refusé
📋 Table "Parcelles" — Attribut "Zone" = colonne "Secteur" : Lecture + Écriture
```

---

## 🔑 Récapitulatif

| Je veux... | J'utilise... |
|------------|-------------|
| Ajouter/retirer des personnes | 👥 **Utilisateurs** |
| Protéger une table entière | ⚙️ **Configurer** → Portée "Table" |
| Cacher une colonne | ⚙️ **Configurer** → Portée "Colonnes" |
| Donner des accès personnalisés par personne | 👤 **Attributs** + ⚙️ **Configurer** |
| Voir un résumé des permissions | 📊 **Tables** / 📋 **Colonnes** |
| Voir toutes les règles actives | 📜 **Règles** |

---

## 💡 Bonnes pratiques

1. **Commencez simple** : donnez les rôles de base (Propriétaire, Éditeur, Lecteur) avant de créer des règles avancées
2. **Principe du moindre privilège** : donnez le minimum d'accès nécessaire. Un Lecteur suffit si la personne n'a pas besoin de modifier
3. **Protégez les données sensibles** : masquez les colonnes contenant des données personnelles (téléphone, adresse, etc.)
4. **Testez vos règles** : connectez-vous avec un compte Éditeur ou Lecteur pour vérifier que les restrictions fonctionnent
5. **Un seul Propriétaire suffit** : évitez de donner le rôle Propriétaire à tout le monde

---

*Guide créé par Said Hamadou (HmD) — 2026*
*Widget : [Grist Access Rules Manager](https://grist-access-rules-widget.vercel.app)*
