# 💬 Dwibook

![Dwibook](https://via.placeholder.com/800x400?text=Dwibook)

> **Chat. Connect. Repeat.**

Une application moderne de messagerie instantanée développée avec la stack MERN et le framework Fresh, utilisant la technologie WebSocket pour une communication en temps réel.

## ✨ Fonctionnalités

- **Communication en temps réel** : Messagerie instantanée grâce à l'implémentation de WebSocket
- **Interface moderne** : Interface élégante avec thème sombre conçue pour une expérience utilisateur optimale
- **Authentification sécurisée** : Authentification et autorisation des utilisateurs basées sur JWT
- **Design responsive** : Fonctionne parfaitement sur ordinateurs et appareils mobiles
- **Support multimédia** : Partagez des images et des fichiers grâce à l'intégration de Cloudinary

## 🛠️ Stack Technique

- **Frontend** : React.js, TailwindCSS
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB
- **Communication en temps réel** : WebSockets
- **Stockage cloud** : Cloudinary
- **Authentification** : JWT (JSON Web Tokens)

## 🚀 Mise en route

### Prérequis

- Node.js (v14.0 ou ultérieur)
- Deno (v1.30 ou ultérieur)
- npm ou yarn
- MongoDB (instance locale ou Atlas)
- Compte Cloudinary

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votrenomdutilisateur/Dwibook.git
   cd Dwibook
   ```

2. **Configuration du backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configuration du frontend**
   ```bash
   cd ../frontend
   # Si vous utilisez Fresh avec Deno
   deno task start
   # Ou si vous utilisez npm
   npm install
   ```

4. **Variables d'environnement**
   
   Créez un fichier `.env` dans le répertoire backend avec les variables suivantes :
   ```
   MONGODB_URI=votre_chaine_de_connexion_mongodb
   PORT=5001
   JWT_SECRET=votre_secret_jwt
   CLOUDINARY_CLOUD_NAME=votre_nom_cloudinary
   CLOUDINARY_API_KEY=votre_clé_api_cloudinary
   CLOUDINARY_API_SECRET=votre_secret_api_cloudinary
   NODE_ENV=development
   ```

5. **Démarrer les serveurs de développement**
   
   Backend :
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend avec Fresh :
   ```bash
   cd frontend
   deno task start
   ```

---

*Note : Ce README a été mis à jour le 16 avril 2025.*
