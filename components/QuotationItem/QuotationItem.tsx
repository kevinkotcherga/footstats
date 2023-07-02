import { format } from 'date-fns';
import { Text, View } from 'react-native';

import styles from './styles';
import { dataTileStyles } from '../../styles';

const QuotationItem = ({
	quotation,
}: {
	quotation: {
		quotation: number;
		date: Date;
	};
}) => (
	<View>
		<Text style={(styles.quotationContent, dataTileStyles.dataTile)}>
			{quotation.quotation}
		</Text>
		<Text style={(styles.quotationContent, styles.quoationDate)}>
			{format(new Date(quotation.date), 'dd/MM')}
		</Text>
	</View>
);

export default QuotationItem;
