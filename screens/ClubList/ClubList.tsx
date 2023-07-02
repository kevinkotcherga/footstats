import {
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import axios from 'axios';
import Tile from '../../components/Tile/Tile';
import { IClub } from '../../interfaces/IClub';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../interfaces/types';

import { loaderStyles } from '../../styles/index';

type ClubListNavigationProp = StackNavigationProp<
	RootStackParamList,
	'ClubList'
>;
type ClubListRouteProp = RouteProp<RootStackParamList, 'ClubList'>;

type Props = {
	route: ClubListRouteProp;
	navigation: ClubListNavigationProp;
};

const ClubList: React.FC<Props> = ({ route, navigation }) => {
	const { championship } = route.params;
	const [clubs, setClubs] = useState<IClub[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const getClubs = async () => {
			try {
				const response = await axios.get(
					'https://api.mpg.football/api/data/championship-clubs',
				);
				setClubs(Object.values(response.data.championshipClubs));
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};

		getClubs();
	}, []);

	const goToPlayerList = (
		clubId: string,
		clubName: string,
		championship: string,
	) => {
		navigation.navigate('PlayerList', {
			clubId,
			clubName,
			championship,
		});
	};

	if (isLoading) {
		return (
			<View style={loaderStyles.loader}>
				<ActivityIndicator size="large" color="#000000" />
			</View>
		);
	}

	if (!clubs) {
		return <Text>Erreur de chargement..</Text>;
	}

	return (
		<ScrollView>
			<View>
				{clubs
					.filter(
						club =>
							club.championships.hasOwnProperty(championship) &&
							club.championships[parseInt(championship)].active === true,
					)
					.map((club: IClub) => (
						<TouchableOpacity
							key={club.id}
							onPress={() =>
								goToPlayerList(club.id, club.name['fr-FR'], championship)
							}
						>
							<Tile
								name={club.name['fr-FR']}
								jerseys={Object.values(club.championships)[0].jerseys}
							/>
						</TouchableOpacity>
					))}
			</View>
		</ScrollView>
	);
};

export default ClubList;
