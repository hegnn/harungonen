import { Stack } from 'expo-router';

export default function GamesLayout() {
  return (
    <Stack  initialRouteName='games'>
      <Stack.Screen name='games' options={{title: "Game List"}} />
      <Stack.Screen name='details' options={{title: "Details"}}/>
    </Stack>
  );
}
