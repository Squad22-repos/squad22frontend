import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';

const Collapsible = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapsed} style={styles.collapsible}>
        <Text style={styles.collapsibleTitle}>{title}</Text>
      </TouchableOpacity>
      {!collapsed && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  collapsible: {
    backgroundColor: '#61a4cdcf',
    border: '2px solid black',
    borderRadius: '8%',
    marginTop: '2%',
    marginBottom: '2%',
    width: '160px',
  },
  collapsibleTitle: {
    textAlign: 'center',
    fontSize: '24px',
    fontFamily: 'Arial',
  }
});

export default Collapsible;