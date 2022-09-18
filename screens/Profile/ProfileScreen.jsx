import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { LogOut, LogOutSkeleton } from '@Components/Profile/LogOut';
import {
  ParamsContainer,
  ParamsContainerSkeleton,
} from '@Containers/ParamsContainer';
import { Avatar, AvatarSkeleton } from '@Components/Profile/Avatar';
import {
  HeaderNavigate,
  HeaderNavigateSkeleton,
} from '@Components/Profile/HeaderNavigate';
import userIMG from '@Assets/User.png';
import { useNavigation, useTheme } from '@react-navigation/native';
import { staticFile } from '@/server';

const ProfileScreen = ({ user, logOut }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <SafeAreaView>
      <ScrollView decelerationRate={3}>
        <HeaderNavigate
          style={{
            backgroundColor: theme.colors.primary,
          }}
          notifications
          onNotifications={() => navigation.navigate('NotificationsScene')}
        />
        <View style={styles(theme).wrapper}>
          <View style={styles(theme).container}>
            <View style={styles(theme).containerHeading}>
              <Avatar
                name={`${user?.name} ${user?.surname}`}
                img={
                  user?.avatar ? staticFile.getStatic(user?.avatar) : userIMG
                }
              />
              <View style={styles(theme).infoWrap}>
                <View style={styles(theme).infoContent}>
                  <Text style={styles(theme).infoCount}>
                    {user?.events?.length || 0}
                  </Text>
                  <Text style={styles(theme).infoName}>Events</Text>
                </View>
                <View
                  style={[
                    styles(theme).infoContent,
                    {
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderColor: '#C4C4C4',
                    },
                  ]}
                >
                  <Text style={styles(theme).infoCount}>
                    {user?.tickets?.length || 0}
                  </Text>
                  <Text style={styles(theme).infoName}>Tickets</Text>
                </View>
                <View style={styles(theme).infoContent}>
                  <Text style={styles(theme).infoCount}>0</Text>
                  <Text style={styles(theme).infoName}>Following</Text>
                </View>
              </View>
            </View>
            <ParamsContainer />
            <LogOut onPress={logOut} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const ProfileScreenSkeleton = () => {
  return (
    <SafeAreaView>
      <ScrollView decelerationRate={3}>
        <HeaderNavigateSkeleton
          style={{ paddingHorizontal: 25 }}
          notifications
        />
        <View style={styles.container}>
          <View style={styles.containerHeading}>
            <AvatarSkeleton />
            <View style={styles.infoWrap}>
              <View style={styles.infoContent}>
                <Text style={styles.infoCountSkeleton} />
                <Text style={styles.infoNameSkeleton} />
              </View>
              <View
                style={[
                  styles.infoContent,
                  {
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#C4C4C4',
                  },
                ]}
              >
                <Text style={styles.infoCountSkeleton} />
                <Text style={styles.infoNameSkeleton} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoCountSkeleton} />
                <Text style={styles.infoNameSkeleton} />
              </View>
            </View>
          </View>
          <ParamsContainerSkeleton />
          <LogOutSkeleton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    wrapper: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: -40,
      backgroundColor: theme.background,
    },
    container: {
      marginTop: -40,
    },
    containerHeading: {
      display: 'flex',
      alignItems: 'center',
    },

    infoWrap: {
      flexDirection: 'row',
      marginTop: 21,
      width: '100%',
    },
    infoContent: {
      width: '33.3%',
    },
    infoName: {
      textAlign: 'center',
      color: theme.colors.text,
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 19,
    },
    infoCount: {
      fontWeight: '700',
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 19,
      color: theme.colors.text,
    },
    infoCountSkeleton: {
      backgroundColor: '#BDBDBD',
      width: '50%',
      alignSelf: 'center',
      marginBottom: 2,
    },
    infoNameSkeleton: {
      backgroundColor: '#BDBDBD',
      width: '60%',
      alignSelf: 'center',
    },
  });

export default ProfileScreen;
