import React from 'react';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@Screens/HomeScreen';
import TicketsScreen from '@Screens/Tikets/TicketsScreen';
import AppText from '@Components/AppText';

import ProfileContainer from '@Containers/Profile/ProfileContainer';
import { SvgXml } from 'react-native-svg';
import tabNavigationStar from '@Assets/tabNavigationStar.svg';
import tabNavigationStarOn from '@Assets/tabNavigationStarOn.svg';
import Events from '@Screens/Events/Events';

import events from '@/assets/svg/navigation/events.svg';
import eventsActive from '@/assets/svg/navigation/eventsActive.svg';
import tickets from '@/assets/svg/navigation/tickets.svg';
import ticketsActive from '@/assets/svg/navigation/ticketsActive.svg';
import profile from '@/assets/svg/navigation/profile.svg';
import profileActive from '@/assets/svg/navigation/profileActive.svg';
import home from '@/assets/svg/navigation/home.svg';
import homeActive from '@/assets/svg/navigation/homeActive.svg';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const Tab = createBottomTabNavigator();

const HomeIcon = ({ focused }) => (
  <TabBarIcon focused={focused} activeIcon={homeActive} defaultIcon={home} />
);

const TicketsIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    activeIcon={ticketsActive}
    defaultIcon={tickets}
  />
);

const EventsIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    activeIcon={eventsActive}
    defaultIcon={events}
  />
);

const ProfileIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    activeIcon={profileActive}
    defaultIcon={profile}
  />
);

const TabBarIcon = ({ focused, activeIcon, defaultIcon }) =>
  focused ? (
    <SvgXml width='20' height='20' xml={activeIcon} />
  ) : (
    <SvgXml width='20' height='20' xml={defaultIcon} />
  );

const TabNavigation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function openNotification(message) {
      console.log('openNotification message', message);
      const { screen, ...params } = message.data;
      navigation.navigate(screen, params);
    }

    messaging().onNotificationOpenedApp(openNotification);
    messaging().getInitialNotification().then(openNotification);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={() => ({
          tabBarLabel: ({ focused }) => {
            return (
              <AppText
                style={{ fontSize: 10, color: focused ? '#4F4F4F' : '#BDBDBD' }}
              >
                Home
              </AppText>
            );
          },
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        })}
      />
      <Tab.Screen
        name='Tickets'
        component={TicketsScreen}
        options={() => ({
          tabBarLabel: ({ focused }) => (
            <AppText
              style={{ fontSize: 10, color: focused ? '#4F4F4F' : '#BDBDBD' }}
            >
              Tickets
            </AppText>
          ),
          tabBarIcon: ({ focused }) => <TicketsIcon focused={focused} />,
        })}
      />
      <Tab.Screen
        name='Events'
        component={Events}
        options={() => ({
          tabBarLabel: ({ focused }) => (
            <AppText
              style={{ fontSize: 10, color: focused ? '#4F4F4F' : '#BDBDBD' }}
            >
              Events
            </AppText>
          ),
          tabBarIcon: ({ focused }) => <EventsIcon focused={focused} />,
        })}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileContainer}
        options={() => ({
          tabBarLabel: ({ focused }) => (
            <AppText
              style={{ fontSize: 10, color: focused ? '#4F4F4F' : '#BDBDBD' }}
            >
              Profile
            </AppText>
          ),
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
