import 'react-native-gesture-handler';
import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from './src/app/screens/SplashScreen';
import LandingActivity from './src/app/screens/LandingActivity';
import SearchActivity from './src/app/screens/SearchActivity';
import LyricsActivity from './src/app/screens/LyricsActivity';
import AuthorActivity from './src/app/screens/AuthorActivity';
import CategoryActivity from './src/app/screens/CategoryActivity';
import AuthorSearchActivity from './src/app/screens/AuthorSearchActivity';
import SettingActivity from './src/app/screens/SettingActivity';
import LoginActivity from './src/app/screens/LoginActivity';
import ProfileActivity from './src/app/screens/ProfileActivity';
import PlayerActivity from './src/app/screens/PlayerActivity';
import { DrawerContent } from './src/app/screens/DrawerContent';
import MembershipActivity from './src/app/screens/MembershipActivity';
import PaymentActivity from './src/app/screens/PaymentActivity';
import SigninActivity from './src/app/screens/SigninActivity';
import CategorySongList from './src/app/screens/CategorySongList';
import AuthorSongList from './src/app/screens/AuthorSongList';
import FavouriteActivity from './src/app/screens/FavouriteActivity';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainEntry() {
  console.log();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LandingActivityRef" component={LyricsDrawer} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}
//TODO style heading
//TODO headerLeft for dev remove while production the name
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="LandingActivity" component={LandingActivity} />
      <Stack.Screen name="Search" component={SearchActivity} />
      <Stack.Screen name="Lyrics" component={LyricsActivity} />
      <Stack.Screen name="Author" component={AuthorActivity} />
      <Stack.Screen name="Profile" component={ProfileActivity} />
      <Stack.Screen name="Player" component={PlayerActivity} />
      <Stack.Screen name="Login" component={LoginActivity} />
      <Stack.Screen name="Setting" component={SettingActivity} />
      <Stack.Screen name="Category" component={CategoryActivity} />
      <Stack.Screen name="AuthorSearch" component={AuthorSearchActivity} />
      <Stack.Screen name="MembershipActivity" component={MembershipActivity} />
      <Stack.Screen name="PaymentActivity" component={PaymentActivity} />
      <Stack.Screen name="SigninActivity" component={SigninActivity} />
      <Stack.Screen name="CategorySongList" component={CategorySongList} />
      <Stack.Screen name="AuthorSongList" component={AuthorSongList} />
      <Stack.Screen name="FavouriteActivity" component={FavouriteActivity} />
    </Stack.Navigator>
  );
}
function LyricsDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      drawerPosition="right"
      overlayColor="transparent"
      drawerStyle={{ width: 82, backgroundColor: '#404040' }} >
      <Drawer.Screen name="MainStackRef" component={MainStack} />
    </Drawer.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <MainEntry />
    </NavigationContainer>
  );
}

export default App;