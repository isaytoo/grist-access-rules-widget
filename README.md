# 🔐 Grist Access Rules Manager Widget

**Author / Auteur : Said Hamadou (HmD)**
**License / Licence : Apache-2.0**

---

## 🇬🇧 English

### Description

A Grist custom widget to visually manage document access rules. Control read/write permissions per table, column, and row — all from a simple interface.

**This widget is for document Owners only.** Other users (Editors, Viewers) do not need it — they are simply subject to the rules configured by the Owner.

### Features

- **Auto-detection**: Grist instance URL and document ID are detected automatically
- **Users tab**: View and change user roles (Owner, Editor, Viewer)
- **Tables tab**: Visual matrix of read/write permissions per table
- **Columns tab**: Detailed permissions per column for each table
- **Rules tab**: View all custom ACL rules with conditions and permissions
- **Bilingual**: French / English interface (auto-detected from browser)
- **Secure**: API key stored in session only (or optionally in local storage)
- **Compatible**: Works with Grist SaaS (docs.getgrist.com) and self-hosted instances

### Setup

1. Add the widget to your Grist document as a custom widget
2. Use the URL: `https://grist-access-rules-widget.vercel.app/`
3. Grant **full access** when prompted
4. Enter your **API key** (Owner rights required)
5. The widget auto-detects your Grist URL and document ID

### Where to find your API key

1. Click your avatar in the top right corner of Grist
2. Go to **"Account Settings"**
3. Section **"API Key"** → click **"Create"**
4. Copy the key and paste it in the widget

### Files

| File | Description |
|------|-------------|
| `index.html` | Widget UI (HTML + CSS) |
| `widget.js` | JavaScript logic (i18n, API, ACL management) |
| `package.json` | Metadata with grist widget configuration |
| `LICENSE` | Apache-2.0 license |

### API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /api/docs/{docId}/access` | List users and roles |
| `PATCH /api/docs/{docId}/access` | Change user roles |
| `GET /api/docs/{docId}/tables` | List tables |
| `GET /api/docs/{docId}/tables/{id}/columns` | List columns |
| `GET /api/docs/{docId}/tables/_grist_ACLRules/records` | Read ACL rules |
| `GET /api/docs/{docId}/tables/_grist_ACLResources/records` | Read ACL resources |

### Access Level

Requires `full` document access and an **Owner-level API key**.

---

## 🇫🇷 Français

### Description

Widget Grist personnalisé pour gérer visuellement les règles d'accès d'un document. Contrôlez les permissions de lecture/écriture par table, colonne et ligne — depuis une interface simple.

**Ce widget est réservé aux propriétaires (Owners) du document.** Les autres utilisateurs (Editors, Viewers) n'en ont pas besoin — ils sont simplement soumis aux règles configurées par l'Owner.

### Fonctionnalités

- **Auto-détection** : L'URL de l'instance Grist et l'ID du document sont détectés automatiquement
- **Onglet Utilisateurs** : Voir et modifier les rôles (Owner, Editor, Viewer)
- **Onglet Tables** : Matrice visuelle des permissions lecture/écriture par table
- **Onglet Colonnes** : Permissions détaillées par colonne pour chaque table
- **Onglet Règles** : Voir toutes les règles ACL personnalisées avec conditions et permissions
- **Bilingue** : Interface français / anglais (détection automatique du navigateur)
- **Sécurisé** : Clé API stockée en session uniquement (ou optionnellement en stockage local)
- **Compatible** : Fonctionne avec Grist SaaS (docs.getgrist.com) et instances auto-hébergées

### Installation

1. Ajoutez le widget à votre document Grist comme widget personnalisé
2. Utilisez l'URL : `https://grist-access-rules-widget.vercel.app/`
3. Accordez l'**accès complet** quand demandé
4. Entrez votre **clé API** (droits Owner requis)
5. Le widget détecte automatiquement votre URL Grist et l'ID du document

### Où trouver votre clé API

1. Cliquez sur votre avatar en haut à droite dans Grist
2. Allez dans **"Paramètres du compte"**
3. Section **"API Key"** → cliquez **"Créer"**
4. Copiez la clé et collez-la dans le widget

### Fichiers

| Fichier | Description |
|---------|-------------|
| `index.html` | Interface du widget (HTML + CSS) |
| `widget.js` | Logique JavaScript (i18n, API, gestion ACL) |
| `package.json` | Métadonnées avec configuration widget Grist |
| `LICENSE` | Licence Apache-2.0 |

### Niveau d'accès

Nécessite l'accès `full` au document et une **clé API de niveau Owner**.

---

## References / Références

- [Grist Access Rules Documentation](https://support.getgrist.com/access-rules/)
- [Grist REST API](https://support.getgrist.com/api/)
- [Grist Plugin API](https://support.getgrist.com/code/modules/grist_plugin_api/)
- [Grist Custom Widgets](https://support.getgrist.com/widget-custom/)
