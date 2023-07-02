# Mini application mobile pour afficher une fiche détaillée de joueur.

Ce projet est réalisé avec expo.

Il est disponible en ligne à ce lien : 
https://expo.dev/accounts/kevinkotcherga/projects/mpg-app/updates/7eaa6797-2a42-425c-b9e0-f64c488e5f90

Pour lancer le projet localement, vous devez installer les dépendances NPM en exécutant :

```
npm i
```

Pour lire le projet vous devez lancer les commandes :

```
npx expo start 
```
ou
```
npx expo start --tunnel
```

## Détail du projet
1) L'utilisateur est invité à sélectionner un championnat.
2) L'utilisateur est invité à choisir un club. La data est filtré pour afficher les clubs actifs du championnat. Les images de maillots sont gérées avec `react-native-expo-image-cache` pour de meilleures performances.
3) L'utilisateur peut effectuer une sélection parmi les joueurs. Il peut filtrer la liste en fonction du nom et de la position d'un joueur, ainsi que la trier selon la cote ou la position du joueur.
4) La data d'un joueur est affiché selon sa position. Si la donnée est inexistante dans un composant, il ne s'affichera pas.

Le code est automatiquement indenté avec Visual Studio. Si votre éditeur de code affiche un code incorrectement indenté, je vous recommande d'utiliser Visual Studio pour ouvrir le projet.

J'ai choisi de ne pas utiliser redux car l'application est relativement simple avec une hiérarchie de composants linéaire, la data passe directement de composant en composant.

