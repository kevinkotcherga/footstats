import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { SearchBar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import MultipleSelect from "react-native-multiple-select";
import { StackNavigationProp } from "@react-navigation/stack";

import { IPlayer } from "../../interfaces/IPlayer";
import { RootStackParamList } from "../../interfaces/types";

import styles from "./styles";

import { loaderStyles } from "../../styles/index";

type PlayerListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ClubList"
>;
type PlayerListRouteProp = RouteProp<RootStackParamList, "PlayerList">;

type Props = {
  route: PlayerListRouteProp;
  navigation: PlayerListNavigationProp;
};

const positionOptions = [
  { label: "Gardien", value: 10 },
  { label: "Défenseur", value: 20 },
  { label: "Latéral", value: 21 },
  { label: "Milieu défensif", value: 30 },
  { label: "Milieu offensif", value: 31 },
  { label: "Attaquant", value: 40 },
];

const PlayerList: React.FC<Props> = ({ route, navigation }) => {
  const { clubId, championship } = route.params;
  const [search, setSearch] = useState<string>("");
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await axios.get(
          `https://api.mpg.football/api/data/championship-players-pool/${championship}`
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
    navigation.navigate("Player", {
      player,
      championship,
    });
  };

  const sortPlayers = (property: keyof IPlayer) => {
    const sortedPlayers = [...players].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return a[property] > b[property] ? -1 : 1;
      }
    });

    setPlayers(sortedPlayers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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

  if (!players.filter((player: IPlayer) => player.clubId === clubId).length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.noResultMessage}>Aucune donnée disponible.</Text>
      </View>
    );
  }

  const filteredPlayers = players
    .filter((player: IPlayer) => player.clubId === clubId)
    .filter((player: IPlayer) => {
      const fullName = player.firstName
        ? `${player.firstName} ${player.lastName}`
        : player.lastName;
      return fullName.toLowerCase().includes(search.toLowerCase());
    })
    .filter((player: IPlayer) => {
      if (!selectedPositions.length) {
        return true;
      } else {
        return selectedPositions.includes(player.ultraPosition);
      }
    });

  const renderItem = ({ item }: { item: IPlayer }) => {
    const fullName = item.firstName
      ? `${item.firstName} ${item.lastName}`
      : item.lastName;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => goToPlayer(item, championship)}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.players}>{fullName}</Text>
          <Text style={[styles.cell, styles.quotation]}>{item.quotation}</Text>
          <Text style={[styles.cell, styles.poste]}>
            {item.ultraPosition === 10
              ? "G"
              : item.ultraPosition === 20
              ? "D"
              : item.ultraPosition === 21
              ? "L"
              : item.ultraPosition === 30
              ? "MD"
              : item.ultraPosition === 31
              ? "MO"
              : "A"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <SearchBar
        value={search}
        placeholder="Rechercher.."
        onChangeText={updateSearch}
        inputContainerStyle={{
          height: 30,
          backgroundColor: "#e7e7e7",
        }}
        placeholderTextColor="#000"
        inputStyle={{ backgroundColor: "#e7e7e7" }}
        containerStyle={{ backgroundColor: "#ffffff" }}
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
      {!filteredPlayers.length ? (
        <View>
          <Text>Aucun résultat pour cette recherche..</Text>
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Text style={[styles.headerText, styles.players]}>Joueurs</Text>

            <TouchableOpacity
              style={styles.cell}
              onPress={() => sortPlayers("quotation")}
            >
              <Text style={styles.headerText}>Cote</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cell}
              onPress={() => sortPlayers("ultraPosition")}
            >
              <Text style={styles.headerText}>Position</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredPlayers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

export default PlayerList;
