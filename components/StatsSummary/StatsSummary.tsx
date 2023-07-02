import { Text, View } from 'react-native';

import StatItem from '../StatItem/StatItem';

import { IPlayer, IPlayerStats } from '../../interfaces/IPlayer';

import { generalStyles } from '../../styles/index';

const PlayerStats = ({
	playerStats,
	player,
}: {
	playerStats: IPlayerStats;
	player: IPlayer;
}) => {
	const keyStats = playerStats.keySeasonStats;

	const getStatLabel = (ultraPosition: number) => {
		if (ultraPosition === 10) return 'Arrêts / M.';
		if (ultraPosition === 20 || ultraPosition === 21) return '% clean sheet';
		if (ultraPosition === 30 || ultraPosition === 31 || ultraPosition === 40)
			return 'Buts / M.';
	};

	const getSecondaryStatLabel = (ultraPosition: number) => {
		if (ultraPosition === 10 || ultraPosition === 20 || ultraPosition === 21)
			return 'Buts pris / M.';
		if (ultraPosition === 30 || ultraPosition === 31 || ultraPosition === 40)
			return 'Occas. / M.';
	};

	const getTertiaryStatLabel = (ultraPosition: number) => {
		if (ultraPosition === 10) return '% pénos arrêtés';
		if (ultraPosition === 20 || ultraPosition === 21)
			return 'Interceptions / M.';
		if (ultraPosition === 30 || ultraPosition === 31 || ultraPosition === 40)
			return 'Tirs / Match';
	};

	const getStatText = (ultraPosition: number) => {
		if (ultraPosition === 10) return keyStats?.ratioSaves.toFixed(2) || '0';
		if (ultraPosition === 20 || ultraPosition === 21)
			return keyStats?.percentageCleanSheet.toFixed(0) || '0';
		if (ultraPosition === 30 || ultraPosition === 31 || ultraPosition === 40)
			return keyStats?.ratioGoals || '0';
	};

	const getSecondaryStatText = (ultraPosition: number) => {
		if (ultraPosition === 10 || ultraPosition === 20 || ultraPosition === 21)
			return keyStats?.ratioGoalsConceded || '0';
		if (ultraPosition === 30 || ultraPosition === 40)
			return keyStats?.ratioBigChanceCreated || '0';
		if (ultraPosition === 31) return keyStats?.ratioGoals || '0';
	};

	const getTertiaryStatText = (ultraPosition: number) => {
		if (ultraPosition === 10)
			return keyStats?.percentagePenaltyStopped.toFixed(0) || '0';
		if (ultraPosition === 20 || ultraPosition === 21)
			return keyStats?.ratioInterceptions || '0';
		if (ultraPosition === 30 || ultraPosition === 31 || ultraPosition === 40)
			return keyStats?.ratioScoringAtt || '0';
	};

	const allStatsZero =
		getStatText(player.ultraPosition) === '0' &&
		getSecondaryStatText(player.ultraPosition) === '0' &&
		getTertiaryStatText(player.ultraPosition) === '0';

	if (allStatsZero) {
		return null;
	}

	return (
		<View style={generalStyles.container}>
			<Text style={generalStyles.subTitle}>Résumé stats</Text>
			<StatItem
				label="Note"
				value={playerStats.keySeasonStats?.averageRating.toFixed(1) || '0'}
			/>
			<StatItem
				label="Titu %"
				value={playerStats.keySeasonStats?.percentageStarter?.toFixed(0) || '0'}
			/>
			<StatItem
				label="Cote"
				value={playerStats.keySeasonStats?.quotation?.toFixed(0) || '0'}
			/>
			<StatItem
				label={getStatLabel(player.ultraPosition)}
				value={getStatText(player.ultraPosition)}
			/>
			<StatItem
				label={getSecondaryStatLabel(player.ultraPosition)}
				value={getSecondaryStatText(player.ultraPosition)}
			/>
			<StatItem
				label={getTertiaryStatLabel(player.ultraPosition)}
				value={getTertiaryStatText(player.ultraPosition)}
			/>
		</View>
	);
};

export default PlayerStats;
