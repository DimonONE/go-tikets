import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import ErrorBoundary from 'react-native-error-boundary';
import * as Location from 'expo-location';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import NoInternetConnection from '@Components/NoInternetConnection';
import GlobalLoader from '@Components/GlobalLoader';
import SignInContainer from '@Containers/SignInContainer';
import SignInConfirmContainer from '@Containers/SignInConfirmContainer';
import SignUpProfileContainer from '@Containers/SignUpProfileContainer';
import ErrorBoundaryContent from '@Components/ErrorBoundaryContent';
import { FollowingOrganizersList } from '@Screens/FavOrganizers/FollowingOrganizersList';
// import { StateProvider } from "./globalState";

import TabNavigation from '@Navigation/TabNavigation';
import { FollowingOrganizersEvents } from '@Screens/FavOrganizers/FollowingOrganizersEvents';
import initApp from './initApp';
import NotificationsScene from '@Screens/Notifications/Notifications';
import OrganizerProfile from '@Screens/OrganizerProfile/OrganizerProfile';
import { HomeFilters } from '@Components/Home/Filter/Filters';
import EventHistory from '@Screens/Profile/EventHistory';
import SelectedEvents from '@Screens/Profile/SelectedEvents/SelectedEvents';
import AddBankAccount from '@Screens/BankAccounts/AddBankAccount';
import { HomeSearch } from '@Components/Home/Search';
import { CitySelect } from '@Components/Home/CitySelect';
import { BuyTickets } from '@Components/Home/BuyTickets';
import { BuyTickets2 } from '@Components/Home/BuyTickets2';
import { BuyTickets3 } from '@Components/Home/BuyTickets3';
import ProfileEditContainer from '@Containers/Profile/ProfileEditContainer';
import { SuccessBuy } from '@Components/Home/SuccessBuy';
import { SuccessBook } from '@Components/Home/SuccessBook';
import { useSnapshot } from 'valtio';
import { store } from './globalState';
import { setToken } from '@/token';
import { actions } from './actions';
import GuestList from '@Screens/Event/GuestList';
import EventInfo from '@Screens/Events/EventInfo';
import CreateEvent from '@Screens/Event/CreateEvent';
import { ThemeOptions } from '@/themeOptions';
import Wallet from '@Screens/Profile/Wallet';
import AddCard from '@Screens/CardPatment/AddCard';
import SuccesCardCreate from '@Screens/CardPatment/SuccesCardCreate';
import SuccesBankAccountCreate from '@Screens/BankAccounts/SuccesBankAccountCreate';
import { DownloadChek } from '@Screens/Tikets/DownloadChek';
import QRScaner from '@Screens/QRScaner/QRScaner';
import { QRInfo } from '@Screens/QRScaner/QRInfo';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const Stack = createNativeStackNavigator();

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('authStatus', authStatus);
  }
}

async function getPushData(message) {
  PushNotification.createChannel({
    channelId: 'default_notification_channel_id',
    channelName: 'default_notification_channel',
  });

  PushNotification.getChannels((channels) => console.log('channels', channels));

  PushNotification.localNotification({
    message: message.notification.body,
    title: message.notification.title,
    channelId: 'default_notification_channel_id',
    ...message,
  });

  console.log('getPushData message', message);
}

const App = () => {
  const { authorized } = useSnapshot(store);
  const [connected, setConnected] = useState(null);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    (async () => {
      await requestUserPermission();
      messaging().onMessage(getPushData);
      messaging().setBackgroundMessageHandler(getPushData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission to access location was denied',
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const locationFormatted =
        location.coords.latitude + ', ' + location.coords.longitude;
      actions.setUserLocation(locationFormatted);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { token } = await initApp();
      if (token) {
        actions.setAuthorized(true);
        actions.setAccessToken(token);
        setToken(token);
        return;
      }
      actions.setAccessToken(null);
      actions.setAuthorized(false);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (connected === null || !fontsLoaded || authorized === null) {
    return <GlobalLoader />;
  }

  if (connected === false) {
    return <NoInternetConnection />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryContent}>
      <SafeAreaProvider>
        <NavigationContainer theme={ThemeOptions}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={authorized ? 'TabNavigation' : 'SignIn'}
          >
            <Stack.Screen name='TabNavigation' component={TabNavigation} />
            <Stack.Screen name='HomeFilters' component={HomeFilters} />
            <Stack.Screen name='HomeSearch' component={HomeSearch} />
            <Stack.Screen name='CitySelect' component={CitySelect} />
            <Stack.Screen name='BuyTickets' component={BuyTickets} />
            <Stack.Screen name='BuyTickets2' component={BuyTickets2} />
            <Stack.Screen name='BuyTickets3' component={BuyTickets3} />
            <Stack.Screen name='SuccessBuy' component={SuccessBuy} />
            <Stack.Screen name='SuccessBook' component={SuccessBook} />
            <Stack.Screen name='DownloadChek' component={DownloadChek} />

            <Stack.Group>
              <Stack.Screen name='QRScaner' component={QRScaner} />
              <Stack.Screen name='QRInfo' component={QRInfo} />
            </Stack.Group>

            <Stack.Group>
              <Stack.Screen name='CreateEvent' component={CreateEvent} />
            </Stack.Group>

            <Stack.Group>
              <Stack.Screen
                name='ProfileEdit'
                component={ProfileEditContainer}
              />
              <Stack.Screen
                name='FollowingOrganizersEvents'
                component={FollowingOrganizersEvents}
              />
              <Stack.Screen
                name='OrganizerProfile'
                component={OrganizerProfile}
              />
              <Stack.Screen
                name='FollowingOrganizersList'
                component={FollowingOrganizersList}
              />
              <Stack.Screen name='EventHistory' component={EventHistory} />
              <Stack.Screen name='SelectedEvents' component={SelectedEvents} />
              <Stack.Screen name='EventInfo' component={EventInfo} />
              <Stack.Screen name='GuestList' component={GuestList} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name='AddBankAccount' component={AddBankAccount} />
              <Stack.Screen name='AddCard' component={AddCard} />
              <Stack.Screen
                name='SuccesCardCreate'
                component={SuccesCardCreate}
              />
              <Stack.Screen
                name='SuccesBankAccountCreate'
                component={SuccesBankAccountCreate}
              />
              <Stack.Screen name='Wallet' component={Wallet} />
            </Stack.Group>

            <Stack.Screen
              name='NotificationsScene'
              component={NotificationsScene}
            />

            <Stack.Group>
              <Stack.Screen name='SignIn' component={SignInContainer} />
              <Stack.Screen
                name='SignInConfirm'
                component={SignInConfirmContainer}
              />
              <Stack.Screen
                name='SignUpProfile'
                component={SignUpProfileContainer}
              />
            </Stack.Group>
          </Stack.Navigator>
          <StatusBar styles='auto' />
        </NavigationContainer>

        <Toast />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
