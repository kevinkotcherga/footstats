import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { SearchBar } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import MultipleSelect from 'react-native-multiple-select';
import { StackNavigationProp } from '@react-navigation/stack';
import { Row, Table, TableWrapper } from 'react-native-table-component';

import { IPlayer } from '../../interfaces/IPlayer';
import { RootStackParamList } from '../../interfaces/types';

import styles from './styles';
import { loaderStyles } from '../../styles/index';

type PlayerListNavigationProp = StackNavigationProp<
	RootStackParamList,
	'ClubList'
>;
type PlayerListRouteProp = RouteProp<RootStackParamList, 'PlayerList'>;

type Props = {
	route: PlayerListRouteProp;
	navigation: PlayerListNavigationProp;
};

const positionOptions = [
	{ label: 'Gardien', value: 10 },
	{ label: 'Défenseur', value: 20 },
	{ label: 'Latéral', value: 21 },
	{ label: 'Milieu défensif', value: 30 },
	{ label: 'Milieu offensif', value: 31 },
	{ label: 'Attaquant', value: 40 },
];

const PlayerList: React.FC<Props> = ({ route, navigation }) => {
	const { clubId, championship } = route.params;
	const [search, setSearch] = useState<string>('');
	const [players, setPlayers] = useState<IPlayer[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
	const [selectedPositions, setSelectedPositions] = useState<number[]>([]);

	useEffect(() => {
		const getPlayers = async () => {
			try {
				const response = await axios.get(
					`https://api.mpg.football/api/data/championship-players-pool/${championship}`,
				);
				setPlayers(response.data.poolPlayers);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};

		getPlayers();
	}, []);

	const goToPlayer = (player: IPlayer, championship: string[] | string) => {
		navigation.navigate('Player', {
			player,
			championship,
		});
	};

	const sortPlayers = (property: keyof IPlayer) => {
		const sortedPlayers = [...players].sort((a, b) => {
			if (sortOrder === 'asc') {
				return a[property] < b[property] ? -1 : 1;
			} else {
				return a[property] > b[property] ? -1 : 1;
			}
		});

		setPlayers(sortedPlayers);
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
	};

	const updateSearch = (value: string) => {
		setSearch(value);
	};

	const updateSelectedPositions = (positions: number[]) => {
		setSelectedPositions(positions);
	};

	if (isLoading) {
		return (
			<View style={loaderStyles.loader}>
				<ActivityIndicator size="large" color="#000000" />
			</View>
		);
	}

	if (!players) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorMessage}>Erreur de chargement..</Text>
			</View>
		);
	}

	if (
		players.filter((player: IPlayer) => player.clubId === clubId).length === 0
	) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorMessage}>Aucune donnée disponible.</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<View>
				<SearchBar
					value={search}
					placeholder="Rechercher.."
					onChangeText={updateSearch}
					inputContainerStyle={{
						height: 30,
						backgroundColor: '#e7e7e7',
					}}
					placeholderTextColor="#000"
					inputStyle={{ backgroundColor: '#e7e7e7' }}
					containerStyle={{ backgroundColor: '#ffffff' }}
				/>
				<MultipleSelect
					items={positionOptions}
					uniqueKey="value"
					onSelectedItemsChange={updateSelectedPositions}
					selectedItems={selectedPositions}
					selectText="Filtrer les postes"
					searchInputPlaceholderText="Rechercher.."
					submitButtonText="Valider"
					submitButtonColor="#4054CC"
					tagRemoveIconColor="#CCC"
					tagBorderColor="#CCC"
					tagTextColor="#CCC"
					selectedItemTextColor="#CCC"
					selectedItemIconColor="#CCC"
					itemTextColor="#000"
					displayKey="label"
				/>
				<Table>
					<TableWrapper>
						{players
							.filter((player: IPlayer) => player.clubId === clubId)
							.filter((player: IPlayer) => {
								const fullName = player.firstName
									? `${player.firstName} ${player.lastName}`
									: player.lastName;
								return fullName.includes(search);
							})
							.filter((player: IPlayer) => {
								if (selectedPositions.length === 0) {
									return true;
								} else {
									return selectedPositions.includes(player.ultraPosition);
								}
							}).length === 0 ? (
							<Text style={styles.noResultMessage}>
								Aucun résultat pour cette recherche..
							</Text>
						) : (
							<Table>
								<TableWrapper>
									<Row
										style={styles.headerRow}
										data={[
											<Text style={styles.headerText}>Joueurs</Text>,
											<TouchableOpacity
												onPress={() => sortPlayers('quotation')}
											>
												<Text style={styles.headerText}>Cote</Text>
											</TouchableOpacity>,
											<TouchableOpacity
												onPress={() => sortPlayers('ultraPosition')}
											>
												<Text style={styles.headerText}>Poste</Text>
											</TouchableOpacity>,
										]}
										flexArr={[2, 1, 1]}
									/>
								</TableWrapper>
								<TableWrapper>
									{players
										.filter((player: IPlayer) => player.clubId === clubId)
										.filter((player: IPlayer) => {
											const fullName = player.firstName
												? `${player.firstName} ${player.lastName}`
												: player.lastName;
											return fullName.includes(search);
										})
										.filter((player: IPlayer) => {
											if (selectedPositions.length === 0) {
												return true;
											} else {
												return selectedPositions.includes(player.ultraPosition);
											}
										})
										.map((player: IPlayer) => {
											const fullName = player.firstName
												? `${player.firstName} ${player.lastName}`
												: player.lastName;

											return (
												<TouchableOpacity
													key={player.id}
													onPress={() => goToPlayer(player, championship)}
													style={styles.tile}
												>
													<Row
														data={[
															<Text style={styles.players}>{fullName}</Text>,
															<Text style={styles.quotation}>
																{player.quotation}
															</Text>,
															<Text style={styles.poste}>
																{player.ultraPosition === 10
																	? 'G'
																	: player.ultraPosition === 20
																	? 'D'
																	: player.ultraPosition === 21
																	? 'L'
																	: player.ultraPosition === 30
																	? 'MD'
																	: player.ultraPosition === 31
																	? 'MO'
																	: 'A'}
															</Text>,
														]}
														flexArr={[2, 1, 1]}
													/>
												</TouchableOpacity>
											);
										})}
								</TableWrapper>
							</Table>
						)}
					</TableWrapper>
				</Table>
			</View>
		</ScrollView>
	);
};

export default PlayerList;
