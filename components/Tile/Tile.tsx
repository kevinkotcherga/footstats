import { Image } from "expo-image";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Image as ExpoImage } from "react-native-expo-image-cache";

import Images from "../../images/Images";

import styles from "./styles";

const ClubTile = ({
  name,
  image,
  jerseys,
}: {
  name: string;
  image?: string;
  jerseys?: { [year: string]: string };
}) => {
  const [latestJersey, setLatestJersey] = useState<string>("");

  useEffect(() => {
    if (jerseys) {
      setLatestJersey(
        Object.values(jerseys)[Object.values(jerseys).length - 1].toString()
      );
    }
  }, [jerseys]);

  const preview = {
    uri: "https://s3-eu-west-1.amazonaws.com/image.mpg/jersey/2022/6/159.png",
  };

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <View>
          {jerseys ? (
            <ExpoImage
              style={styles.image}
              {...{ preview, uri: latestJersey }}
            />
          ) : (
            <Image style={styles.image} source={image} />
          )}
        </View>
        <Text style={styles.text}>{name}</Text>
      </View>
      <Image style={styles.chevron} source={Images.tile.chevronRight} />
    </View>
  );
};

export default ClubTile;
