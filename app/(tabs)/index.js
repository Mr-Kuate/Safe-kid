import MapView, {Marker} from 'react-native-maps';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import { router } from 'expo-router';

export default function MapPage () {
    const regionInfos={
        latitude: 4.086140,
        longitude: 9.739183
      }

    return (
        <View className='flex-1'>
           <MapView style={{flex: 1}} region={regionInfos}>
                <Marker coordinate={{latitude: regionInfos.latitude, longitude: regionInfos.longitude}} />
           </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    pp: {
        height: 40,
        width: 90
    },
  });