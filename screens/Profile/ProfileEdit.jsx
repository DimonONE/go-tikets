import React, { useEffect, useState } from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Avatar } from '@Components/Profile/Avatar';
import userIMG from '@Assets/User.png';
import AppInput from '@Components/AppInput';
import { NextButton } from '@Components/NextButton';
import useQuery from '@Hooks/useQuery';
import { profile } from '@Server';
import Toast from 'react-native-toast-message';
import { useNavigation, useTheme } from '@react-navigation/native';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { SvgXml } from 'react-native-svg';
import closeIcon from '@Assets/svg/closeIcon.svg';
import warningIcon from '@Assets/svg/Warning.svg';
import arrowDown from '@Assets/svg/ArrowDown.svg';
import AppText from '@Components/AppText';
import { staticFile } from '@/server';
import * as DocumentPicker from 'expo-document-picker';
import * as url from 'url';

const ProfileEdit = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: '',
    surname: '',
    avatar: null,
    email: '',
    birthday: '',
    sex: '',
    idCode: '',
    instagram: '',
    description: '',
  });
  const theme = useTheme();

  const onUpdatePhoto = async (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    const res = await profile.updatePhoto(bodyFormData);

    if (res.data) {
      props.fetching();
      Toast.show({
        type: 'success',
        text1: 'Success!',
        position: 'bottom',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        position: 'bottom',
      });
    }
  };

  const chooseDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*'],
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      const { name, size, uri, mimeType } = result;
      const fileToUpload = {
        id: Date.now(),
        name,
        size,
        uri,
        type: mimeType,
      };
      await onUpdatePhoto(fileToUpload);
    }
  };

  const onSave = async () => {
    const { idCode: IDcode, birthday: birthdate, ...params } = values;
    const { data, ok, message } = await useQuery(
      profile.updateProfile({ IDcode, birthdate, ...params })
    );

    if (ok) {
      if (data) {
        Toast.show({
          type: 'success',
          text1: 'Success!',
          position: 'bottom',
        });
      }
      setLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: message,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.values) setValues(props.values);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView decelerationRate={3}>
        <View style={styles(theme).container}>
          <View style={{ marginBottom: 20 }}>
            <HeaderNavigate
              style={{
                backgroundColor: 'inherit',
                height: 20,
                marginBottom: 21,
              }}
              onBack={() => navigation.navigate('Profile')}
              title='Following organizers'
            >
              <Pressable
                style={{ height: 18 }}
                onPress={() => navigation.navigate('HomeSearch')}
              >
                <SvgXml xml={closeIcon} />
              </Pressable>
            </HeaderNavigate>
          </View>
          <View
            style={{
              marginBottom: 15,
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Avatar
              img={
                values?.avatar ? staticFile.getStatic(values?.avatar) : userIMG
              }
              styleName={styles(theme).styleName}
            />
            <Pressable
              onPress={chooseDocument}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <AppText
                size={14}
                weight={500}
                style={{ color: '#FF9100', textTransform: 'uppercase' }}
              >
                update photo
              </AppText>
            </Pressable>
          </View>
          <View style={{ marginBottom: 45 }}>
            <AppInput
              value={values.name}
              onChangeText={(text) =>
                setValues((prevValue) => ({ ...prevValue, name: text }))
              }
              textAlignVertical='center'
              styleInput={styles(theme).styleInput}
              inputProps={{
                placeholder: 'Name*',
              }}
            />

            <AppInput
              value={values.surname}
              onChangeText={(text) =>
                setValues((prevValue) => ({ ...prevValue, surname: text }))
              }
              styleInput={styles(theme).styleInput}
              inputProps={{
                placeholder: 'Surname*',
              }}
            />
            <AppInput
              value={values.email}
              onChangeText={(text) =>
                setValues((prevValue) => ({ ...prevValue, email: text }))
              }
              styleInput={styles(theme).styleInput}
              inputProps={{
                placeholder: 'Email*',
              }}
            />

            <AppInput
              value={values.sex}
              onChangeText={(text) =>
                setValues((prevValue) => ({ ...prevValue, sex: text }))
              }
              styleInput={styles(theme).styleInput}
              inputProps={{
                placeholder: 'Sex',
              }}
              icon={arrowDown}
            />

            <AppInput
              value={values.birthday}
              onChangeText={(text) =>
                setValues((prevValue) => ({ ...prevValue, birthday: text }))
              }
              styleInput={styles(theme).styleInput}
              inputProps={{
                placeholder: 'Birthday*',
              }}
              icon={warningIcon}
            />

            <AppInput
              value={values.idCode}
              onChangeText={(text) =>
                setValues((prevValue) => ({ ...prevValue, idCode: text }))
              }
              styleInput={styles(theme).styleInput}
              inputProps={{
                placeholder: 'ID code',
              }}
              icon={warningIcon}
            />

            <AppInput
              value={values.instagram}
              onChangeText={(text) =>
                setValues((prevValue) => ({ ...prevValue, instagram: text }))
              }
              styleInput={styles(theme).styleInput}
              inputProps={{
                placeholder: 'Instagram',
              }}
              icon={warningIcon}
            />

            <View>
              <View style={{ marginTop: 24, paddingHorizontal: 5 }}>
                <AppText style={{ fontWeight: '700' }}>Person’s role</AppText>
                <AppText style={{ color: '#999999', marginVertical: 16 }}>
                  Add a description of your organization or yourself. This
                  information will appear on the tab “About” when other users
                  view your account
                </AppText>
              </View>
              <AppInput
                value={values.description}
                onChangeText={(text) =>
                  setValues((prevValue) => ({
                    ...prevValue,
                    description: text,
                  }))
                }
                styleInput={[
                  styles(theme).styleInput,
                  {
                    height: 150,
                    padding: 20,
                  },
                ]}
                inputProps={{
                  textAlignVertical: 'top',
                }}
              />
            </View>
          </View>

          <NextButton onPress={onSave}>Save</NextButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 56,
      paddingHorizontal: 30,
    },

    styleName: {
      textTransform: 'uppercase',
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '800',
    },

    styleInput: {
      borderRadius: 13,
      elevation: 1,
      height: 56,
      margin: 0,

      fontSize: 16,
      fontWeight: '400',

      backgroundColor: '#fff',
      borderColor: '#eaeaea',
      color: theme.colors.text,
    },
  });

export default ProfileEdit;
