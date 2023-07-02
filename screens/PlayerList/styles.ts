import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	headerRow: {
		padding: 10,
		backgroundColor: '#ffffff',
	},
	headerText: {
		color: '#393D3F',
		fontWeight: '700',
	},
	tile: {
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: '#d9d9d9',
		backgroundColor: '#ffffff',
	},
	quotation: {
		fontWeight: 'bold',
	},
	players: {
		color: '#1B7ADA',
	},
	poste: {
		color: '#546A7B',
	},
	errorMessage: {
		textAlign: 'center',
		color: 'red',
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noResultMessage: {
		marginTop: 10,
		textAlign: 'center',
		color: 'red',
	},
});

export default styles;
