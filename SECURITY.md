Je m'excuse pour le malentendu. Je comprends que vous souhaitez voir des exemples de codes d'attaques et comment les prévenir. Voici quelques exemples d'attaques courantes avec des codes d'attaque, ainsi que des mesures préventives :

**1. Attaque par injection SQL :**
   - **Exemple d'attaque** : Un attaquant peut injecter du code SQL malveillant pour accéder ou manipuler une base de données.
   - **Code d'attaque** : Supposons que l'attaquant entre `'; DROP TABLE users; --` dans un champ de saisie.
   - **Prévention** : Utilisez des requêtes préparées pour éviter l'injection SQL.

**Code préventif contre l'injection SQL** :
   ```javascript
   // Mauvaise pratique (vulnérable à l'injection SQL)
   const query = `SELECT * FROM users WHERE username = '${userInput}'`;

   // Bonne pratique (requête préparée)
   const query = 'SELECT * FROM users WHERE username = ?';
   connection.query(query, [userInput], (error, results) => {
       // ...
   });
   ```

**2. Attaque par injection XSS (Cross-Site Scripting) :**
   - **Exemple d'attaque** : Un attaquant peut insérer du code JavaScript malveillant dans une application Web pour voler des informations ou compromettre la sécurité.
   - **Code d'attaque** : Supposons que l'attaquant entre `<script>alert('XSS')</script>` dans un champ de saisie.
   - **Prévention** : Échappez correctement les données avant de les afficher.

**Code préventif contre l'injection XSS** :
   ```javascript
   const escapeHTML = require('escape-html');

   // Mauvaise pratique (vulnérable à l'injection XSS)
   const userInput = '<script>alert("XSS");</script>';
   const html = `<p>${userInput}</p>`;

   // Bonne pratique (échappement HTML)
   const safeInput = escapeHTML('<script>alert("XSS");</script>');
   const safeHtml = `<p>${safeInput}</p>`;
   ```

**3. Attaque par vol de session :**
   - **Exemple d'attaque** : Un attaquant peut voler la session d'un utilisateur authentifié pour usurper son identité.
   - **Code d'attaque** : L'attaquant peut intercepter le cookie de session d'un utilisateur.
   - **Prévention** : Utilisez `express-session` avec des options de sécurité appropriées.

**Code préventif contre le vol de session** :
   ```javascript
   const session = require('express-session');
   const express = require('express');
   const app = express();

   app.use(session({
       secret: 'votre_clé_secrète',
       resave: false,
       saveUninitialized: true,
       cookie: {
           secure: true, // Utilisez HTTPS en production
           httpOnly: true,
           sameSite: 'strict',
       },
   }));
   ```

**4. Attaque CSRF (Cross-Site Request Forgery) :**
   - **Exemple d'attaque** : Un attaquant peut inciter un utilisateur à effectuer une action non voulue en exploitant son authentification.
   - **Code d'attaque** : L'attaquant peut créer un formulaire malveillant qui soumet une requête à un site Web où l'utilisateur est authentifié.
   - **Prévention** : Utilisez le middleware `csurf` pour protéger contre les attaques CSRF.

**Code préventif contre les attaques CSRF** :
   ```javascript
   const csurf = require('csurf');
   const express = require('express');
   const app = express();

   app.use(csurf());

   app.get('/mon-formulaire', (req, res) => {
       res.render('mon-formulaire', { csrfToken: req.csrfToken() });
   });
   ```

Ces exemples illustrent comment les attaques peuvent se produire et comment les prévenir dans votre application Express. La prévention des attaques est essentielle pour garantir la sécurité de votre application.