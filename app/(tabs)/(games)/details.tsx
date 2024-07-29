import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { GameDetails, GamesContext } from '@/store/gamesProvider';
import Ionicons from '@expo/vector-icons/Ionicons';

const ICON_SIZE = 80;
const BACKGROUND_IMAGE_SIZE = 300;

const Details = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params?.id);
  const [details, setDetails] = useState<GameDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const gamesContext = useContext(GamesContext);
  const isLiked = gamesContext.checkIsLiked(id);

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `https://mock-game-api-9a408f047f23.herokuapp.com/api/games/${id}`,
        {
          headers: {
            'x-api-Key': '01964fa8-f0e5-40fc-a13b-9f5c3a5415f3',
          },
        }
      );
      const result = await response.json();
      setDetails(result);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = async() => {
    setRefreshing(true);
    await fetchDetails()
    setRefreshing(false)
  }

  useEffect(() => {
    setLoading(true);
    fetchDetails();
  }, [params.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
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

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl onRefresh={refreshHandler} refreshing={refreshing}/>}
          >
          <ImageBackground
            source={{ uri: details?.bannerURL }}
            style={styles.imageBackground}>
            <Pressable
              style={styles.favouriteButton}
              onPress={() => gamesContext.favouriteClickHandle(id)}>
              <Ionicons
                color={'red'}
                size={30}
                name={isLiked ? 'heart' : 'heart-outline'}
              />
            </Pressable>
            <Image
              source={{ uri: details?.iconURL }}
              style={styles.iconImage}
            />
          </ImageBackground>
          <View style={styles.detailsContainer}>
            <Text style={styles.titleText}>{details?.title}</Text>
            <Text style={styles.ratingText}>{details?.rating}</Text>
            <Text style={styles.descriptionText}>{details?.description}</Text>
          </View>
        </ScrollView>
    
  );
};

export default Details;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  imageBackground: {
    height: BACKGROUND_IMAGE_SIZE,
    width: '100%',
    marginBottom: ICON_SIZE / 2 + 20,
  },
  favouriteButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  iconImage: {
    width: ICON_SIZE,
    aspectRatio: 1,
    borderRadius: 10,
    bottom: -BACKGROUND_IMAGE_SIZE + ICON_SIZE / 2,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  detailsContainer: {
    marginHorizontal: 20,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  descriptionText: {
    marginTop: 20,
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
