import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AppText from '@Components/AppText';
import ArrowRight from '@Assets/svg/ArrowRight.svg';
import { SvgXml } from 'react-native-svg';

export const Params = ({
  text,
  contentWithRights = null,
  isArrow = false,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <View>
      <Pressable style={styles(theme).paramsButton} onPress={onPress}>
        <AppText style={styles(theme).paramsText}>{text}</AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {contentWithRights ? (
            typeof contentWithRights === 'string' ? (
              <AppText style={styles(theme).contentWithRights}>
                {contentWithRights}
              </AppText>
            ) : (
              contentWithRights
            )
          ) : null}
          {isArrow ? (
            <SvgXml xml={ArrowRight} style={{ marginLeft: 10 }} />
          ) : null}
        </View>
      </Pressable>
    </View>
  );
};

export const ParamsSkeleton = ({ contentWithRights, isArrow }) => {
  const theme = useTheme();

  return (
    <View>
      <Pressable style={styles(theme).paramsButton}>
        <Text
          style={{ backgroundColor: '#BDBDBD', width: '20%', height: '100%' }}
        />
        {isArrow && (
          <View style={{ width: 24, height: 12, backgroundColor: '#BDBDBD' }} />
        )}
        {contentWithRights && (
          <View style={{ width: 40, height: 12, backgroundColor: '#5B5B5B' }} />
        )}
      </Pressable>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    paramsButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      alignItems: 'center',
    },
    paramsText: {
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 24,
      letterSpacing: 0.2,
      color: theme.colors.text,
    },
    contentWithRights: {
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 16,
      color: theme.colors.text,
    },
  });
