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
L'utilisateur est invité à sélectionner un championnat :

![1](https://github.com/kevinkotcherga/react-native-app/assets/78493094/ea41a342-421a-4d49-915d-4768f3f60da5)


L'utilisateur est invité à choisir un club. La data est filtré pour afficher les clubs actifs du championnat. Les images de maillots sont gérées avec `react-native-expo-image-cache` pour de meilleures performances :
   
![2](https://github.com/kevinkotcherga/react-native-app/assets/78493094/e23e59c5-3acf-4627-87a7-a88f3f556eb6)


L'utilisateur peut effectuer une sélection parmi les joueurs. Il peut filtrer la liste en fonction du nom et de la position d'un joueur, ainsi que la trier selon la cote ou la position du joueur :

![3](https://github.com/kevinkotcherga/react-native-app/assets/78493094/b825fd2e-e7b9-4654-9484-92f8d51a363a)
![4](https://github.com/kevinkotcherga/react-native-app/assets/78493094/998e402d-60db-4697-ba92-9342e6b3b757)


La data d'un joueur est affiché selon sa position. Si la donnée est inexistante dans un composant il ne s'affichera pas :
   
![5](https://github.com/kevinkotcherga/react-native-app/assets/78493094/3c23e303-4541-4a6c-af3c-8c0790f10df6)


J'ai choisi de ne pas utiliser redux car l'application est relativement simple avec une hiérarchie de composants linéaire, la data passe directement de composant en composant.

