import { ScrollView, Text, View } from 'react-native';

import { IPlayerStats } from '../../interfaces/IPlayer';

import QuotationItem from '../QuotationItem/QuotationItem';

import styles from './styles';
import { generalStyles } from '../../styles';

const QuotesHistory = ({ playerStats }: { playerStats: IPlayerStats }) => {
	return (
		<View style={generalStyles.container}>
			<Text style={generalStyles.subTitle}>Historique des cotes</Text>
			<ScrollView horizontal>
				<View style={styles.quotation}>
					{playerStats?.total.quotations.reverse().map((quotation, index) => (
						<QuotationItem key={index} quotation={quotation} />
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default QuotesHistory;
