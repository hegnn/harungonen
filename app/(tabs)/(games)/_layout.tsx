import { Stack } from 'expo-router';

export default function GamesLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title: "Game List"}} />
      <Stack.Screen name='details' options={{title: "Details"}}/>
    </Stack>
  );
}
