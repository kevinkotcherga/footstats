import axios from 'axios';
import { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';

import { IPlayerStats } from '../../interfaces/IPlayer';
import { RootStackParamList } from '../../interfaces/types';

import Stats from '../../components/Stats/Stats';
import StatsSummary from '../../components/StatsSummary/StatsSummary';
import QuotesHistory from '../../components/QuotesHistory/QuotesHistory';

import styles from './styles';
import { loaderStyles, generalStyles } from '../../styles/index';

type PlayerRouteProp = RouteProp<RootStackParamList, 'Player'>;

type Props = {
	route: PlayerRouteProp;
};

const getPositionLabel = (ultraPosition: number) => {
	switch (ultraPosition) {
		case 10:
			return 'Gardien';
		case 20:
			return 'Defenseur';
		case 21:
			return 'Lateral';
		case 30:
			return 'Milieu défensif';
		case 31:
			return 'Milieu offensif';
		default:
			return 'Attaquant';
	}
};

const Player: React.FC<Props> = ({ route }) => {
	const { player, championship } = route.params;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [playerStats, setPlayerStats] = useState<IPlayerStats>();

	useEffect(() => {
		const getPlayers = async () => {
			try {
				const response = await axios.get(
					`https://api.mpg.football/api/data/championship-player-stats/${player.id}/2022`,
				);
				setPlayerStats(response.data.championships[championship.toString()]);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};

		getPlayers();
	}, []);

	if (isLoading) {
		return (
			<View style={loaderStyles.loader}>
				<ActivityIndicator size="large" color="#000000" />
			</View>
		);
	}

	if (!playerStats) {
		return <Text>Erreur de chargement..</Text>;
	}

	return (
		<ScrollView>
			<View style={generalStyles.container}>
				<Text style={styles.title}>
					{getPositionLabel(player.ultraPosition)}
				</Text>
			</View>

			{playerStats && player && (
				<View>
					<StatsSummary playerStats={playerStats} player={player} />
					<QuotesHistory playerStats={playerStats} />
					<Stats playerStats={playerStats} />
				</View>
			)}
		</ScrollView>
	);
};

export default Player;
