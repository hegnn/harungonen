import { StyleSheet, FlatList, View } from 'react-native';
import { useContext } from 'react';
import { GamesContext } from '@/store/gamesProvider';
import GameCard from '@/components/GameCard';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const gamesContext = useContext(GamesContext);
  const router = useRouter();

  const data = gamesContext.games.filter((game) =>
    gamesContext.likedGames.includes(game.id)
  );
  const navigate = (id: number) =>
    router.navigate({ pathname: 'details', params: { id } });

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <GameCard data={item} goToDetails={navigate} />
        )}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  flatList: {
    gap: 20,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
