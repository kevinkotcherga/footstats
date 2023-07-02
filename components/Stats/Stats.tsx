import { Text, View } from 'react-native';

import { IPlayerStats } from '../../interfaces/IPlayer';

import StatItem from '../StatItem/StatItem';

import { generalStyles } from '../../styles';

const Stats = ({ playerStats }: { playerStats: IPlayerStats }) => {
	const allStatsZero =
		playerStats?.total.stats.totalPlayedMatches === 0 &&
		playerStats?.total.stats.totalStartedMatches === 0 &&
		playerStats?.total.stats.totalMinutesPlayed === 0;

	if (allStatsZero) {
		return null;
	}

	return (
		<View style={generalStyles.container}>
			<Text style={generalStyles.subTitle}>Stats</Text>
			<StatItem
				label="Total matches joués"
				value={playerStats?.total.stats.totalPlayedMatches || 0}
			/>
			<StatItem
				label="Total matches démarrés"
				value={playerStats?.total.stats.totalStartedMatches || 0}
			/>
			<StatItem
				label="Totales minutes jouées"
				value={playerStats?.total.stats.totalMinutesPlayed || 0}
			/>
		</View>
	);
};

export default Stats;
