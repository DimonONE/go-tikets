import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#636366' }} />
);

const renderTabBarC = (props) => (
  <View
    style={{
      backgroundColor: '#FFFFFF',
    }}
  >
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#FFDBAA',
        height: '100%',
        borderRadius: 9,
      }}
      initialLayout={{ backgroundColor: '#FF9100' }}
      tabStyle={{
        minHeight: 32,
        padding: 0,
        borderRadius: 9,
      }}
      renderLabel={({ route, focused }) => (
        <Text
          style={{
            color: focused ? '#FF9100' : '#999999',
          }}
        >
          {route.title}
        </Text>
      )}
      labelStyle={styles.tabLabel}
      style={styles.tab}
    />
  </View>
);

export const TabsCustom = ({
  routes = [{ key: 'first', title: 'First' }],
  renderScene,
  renderTabBar = renderTabBarC,
  defaultIndex = 0,
  onSelect,
  style,
}) => {
  const [index, setIndex] = React.useState(defaultIndex);

  useEffect(() => {
    if (onSelect) onSelect(index);
  }, [index]);

  return (
    <View
      style={[
        {
          width: '100%',
          height: '100%',
        },
        style,
      ]}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={(props) => renderScene(props)}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    margin: 0,
    padding: 0,
  },

  tabLabel: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    textTransform: 'capitalize',
  },
});
