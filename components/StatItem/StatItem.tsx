import { Text, View } from 'react-native';

import styles from './styles';
import { dataTileStyles } from '../../styles';

const StatItem = ({
	label,
	value,
}: {
	label?: string;
	value?: string | number;
}) => (
	<View style={styles.wrapper}>
		<Text>{label}</Text>
		<Text style={dataTileStyles.dataTile}>{value}</Text>
	</View>
);

export default StatItem;
