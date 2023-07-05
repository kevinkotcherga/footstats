import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#ffffff",
  },
  headerText: {
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#ffffff",
  },
  players: {
    flex: 2,
  },
  cell: {
    flex: 1,
  },
	headerRow: {
		padding: 10,
		backgroundColor: '#ffffff',
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
