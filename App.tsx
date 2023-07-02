import {
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import Player from './screens/Player/Player';
import ClubList from './screens/ClubList/ClubList';
import PlayerList from './screens/PlayerList/PlayerList';
import { IPlayer } from './interfaces/IPlayer';
import SelectChampionship from './screens/ChampionshipList/ChampionshipList';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
	headerTitleAlign: 'center',
	headerStyle: { backgroundColor: '#45C945' },
	headerTintColor: '#ffffff',
};

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen
					name="SelectChampionships"
					component={SelectChampionship as React.ComponentType}
					options={{
						title: 'Championnats',
					}}
				/>
				<Stack.Screen
					name="ClubList"
					component={ClubList as React.ComponentType}
					options={({ route }) => ({
						title: (route.params as { championshipName?: string })
							?.championshipName,
					})}
				/>
				<Stack.Screen
					name="PlayerList"
					component={PlayerList as React.ComponentType}
					options={({ route }) => ({
						title: (route.params as { clubName?: string })?.clubName,
					})}
				/>
				<Stack.Screen
					name="Player"
					component={Player as React.ComponentType}
					options={({ route }) => {
						const player = (route.params as { player: IPlayer })?.player;
						const title =
							player.firstName != null
								? `${player.firstName} ${player.lastName}`
								: `${player.lastName}`;

						return { title };
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
