import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { Game, GamesContext } from '@/store/gamesProvider';
import Ionicons from '@expo/vector-icons/Ionicons';

const BORDER_RADIUS = 10;

const GameCard = ({ data, goToDetails }: { data: Game; goToDetails: (id: number) => void }) => {
  const gamesContext = useContext(GamesContext);
  const isLiked = gamesContext.checkIsLiked(data.id);
  
  return (
    <View key={data.id} style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.iconURL }} style={styles.iconImage} />
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} style={styles.titleText}>
              {data.title}
            </Text>
            <Pressable onPress={() => gamesContext.favouriteClickHandle(data.id)}>
              <Ionicons color={"red"} size={20} name={isLiked ? 'heart' : 'heart-outline'} />
            </Pressable>
          </View>
          <Text>{data.rating}</Text>
        </View>
      </View>
      <Pressable style={styles.detailsButton} onPress={() => goToDetails(data.id)}>
        <Text>Details</Text>
      </Pressable>
    </View>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: BORDER_RADIUS,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  iconImage: {
    height: 80,
    width: 80,
    borderRadius: BORDER_RADIUS,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    padding: 8,
    borderRadius: BORDER_RADIUS,
  },
});
