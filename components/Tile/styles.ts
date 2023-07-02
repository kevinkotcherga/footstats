import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#ffffff',
		justifyContent: 'space-between',
	},
	description: {
		gap: 10,
		alignItems: 'center',
		flexDirection: 'row',
	},
	image: {
		width: 35,
		height: 35,
	},
	chevron: {
		width: 20,
		height: 20,
	},
	text: {
		fontSize: 16,
		fontWeight: '500',
	},
});

export default styles;
