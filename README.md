# Mini application mobile pour afficher une fiche détaillée de joueur.

Ce projet est réalisé avec expo.

Il est disponible en ligne à ces liens : 
- Android: `exp://u.expo.dev/update/72e042e4-88c3-46f6-8a5f-23aec576386b`
- IOS: `exp://u.expo.dev/update/e617c032-d829-42ca-8b08-801da300cee4`

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
![1](https://github.com/kevinkotcherga/react-native-app/assets/78493094/e94a7289-6c32-4c75-8e04-0ce47d75b38a)

2) L'utilisateur est invité à choisir un club. La data est filtré pour afficher les clubs actifs du championnat. Les images de maillots sont gérées avec `react-native-expo-image-cache` pour de meilleures performances.
![2](https://github.com/kevinkotcherga/react-native-app/assets/78493094/3fbdb853-d933-4bfa-961f-07079b5b6059)

3) L'utilisateur peut effectuer une sélection parmi les joueurs. Il peut filtrer la liste en fonction du nom et de la position d'un joueur, ainsi que la trier selon la cote ou la position du joueur.
![3](https://github.com/kevinkotcherga/react-native-app/assets/78493094/c1ac42c4-214a-4a0a-b26b-ea5faea6df7a)
![4](https://github.com/kevinkotcherga/react-native-app/assets/78493094/58355b4f-f628-4029-92af-e3e761b26d31)

4) La data d'un joueur est affiché selon sa position. Si la donnée est inexistante dans un composant il ne s'affichera pas.
![5](https://github.com/kevinkotcherga/react-native-app/assets/78493094/c8b99d3c-fece-4b68-ac5e-fca72257afd4)


Le code est automatiquement indenté avec Visual Studio. Si votre éditeur de code affiche un code incorrectement indenté, je vous recommande d'utiliser Visual Studio pour ouvrir le projet.

J'ai choisi de ne pas utiliser redux car l'application est relativement simple avec une hiérarchie de composants linéaire, la data passe directement de composant en composant.

