import { View, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Tile from '../../components/Tile/Tile';

import { RootStackParamList } from '../../interfaces/types';

import { championships } from '../../utils/championshipsData';

import styles from './styles';

type ChampionshipListProp = StackNavigationProp<
	RootStackParamList,
	'ChampionshipList'
>;

type Props = {
	navigation: ChampionshipListProp;
};

const ChampionshipList: React.FC<Props> = ({ navigation }) => {
	const goToClubList = (championship: string, championshipName: string) => {
		navigation.navigate('ClubList', { championship, championshipName });
	};

	return (
		<View style={styles.container}>
			{championships.map(championship => (
				<TouchableOpacity
					key={championship.id}
					onPress={() => goToClubList(championship.id, championship.name)}
				>
					<Tile name={championship.name} image={championship.img} />
				</TouchableOpacity>
			))}
		</View>
	);
};

export default ChampionshipList;
