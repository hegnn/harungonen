import { ActivityIndicator, FlatList, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { GamesContext } from '@/store/gamesProvider';
import GameCard from '@/components/GameCard';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const gamesContext = useContext(GamesContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchGames = async () => {
    try {
      const response = await fetch('https://mock-game-api-9a408f047f23.herokuapp.com/api/games', {
        headers: {
          'x-api-Key': '01964fa8-f0e5-40fc-a13b-9f5c3a5415f3',
        },
      });
      const result = await response.json();
      gamesContext.setGames(result);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = async() => {
    setRefreshing(true);
    await fetchGames()
    setRefreshing(false)
  }

  const navigate = (id: number) => router.navigate({ pathname: "details", params: { id } });

  useEffect(() => {
    setLoading(true);
    fetchGames();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{"Unexpected error occured, Please try again!"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <FlatList
          data={gamesContext.games}
          renderItem={({ item }) => <GameCard data={item} goToDetails={navigate} />}
          contentContainerStyle={styles.flatListContent}
          refreshControl={<RefreshControl onRefresh={refreshHandler} refreshing={refreshing}/>}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,

  },
  flatListContent: {
    gap: 20,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});
