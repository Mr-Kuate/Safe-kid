import { signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth, user } from '@/firebaseConfig'
import { getDoc } from 'firebase/firestore'
import { router } from "expo-router";

const User = () => {
    const [isLogoutEnabled, setIsLogoutEnabled] = useState(false);
    const [time, setTime] = useState(Date());
    const [userSession, setUserSession] = useState(null)
    const [userDataError, setUserDataError] = useState("")
    const [userData, setUserData] = useState({})
  
    useEffect(()=> {
      setInterval(() => {
      const date = Date();
      setTime(date)
    }, 1000);
  })
    
    const fakeData = [
        { latitude: '48.8566', longitude: '2.3522' },
        { latitude: '40.7128', longitude: '-74.0060' },
        { latitude: '34.0522', longitude: '-118.2437' },
        { latitude: '51.5074', longitude: '-0.1278' },
        { latitude: '35.6895', longitude: '139.6917' },
        { latitude: '35.6895', longitude: '139.6917' },
        { latitude: '35.6895', longitude: '139.6917' },
        { latitude: '35.6895', longitude: '139.6917' },
        { latitude: '35.6895', longitude: '139.6917' },
    ];

    const handleSignout = () => {
        setIsLogoutEnabled(!isLogoutEnabled);
        if (!isLogoutEnabled) {
              signOut(auth)
              .then(() => {
                router.replace('/login')
              }).catch((error) => {
                Alert.alert(error.code)
                });
        }
    }
  return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/logoProfile.jpg')} style={styles.headerImage} />
          <Text style={styles.headerTitle}>Page Utilisateur</Text>
          <View style={styles.logoutContainer}>
            <Switch
              onValueChange={handleSignout}
              value={isLogoutEnabled}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.userProfile}>
            <Image source={require('@/assets/images/parent.png')} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Parent</Text>
              <Text style={styles.userPhone}>+237 655577378</Text>
            </View>
          </View>
          <View style={styles.userProfile}>
            <Image source={require('@/assets/images/enfant.png')} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Enfant</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.batteryStatus}>
            <Text style={styles.footerText}> {time}</Text>
          </View>
          <View style={styles.moduleActivity}>
            <Text style={styles.footerText}>Activité du module: Verte
              <View className='rounded-full items-center justify-center bg-green-400 h-[10px] w-[10px]'></View>
            </Text>
          </View>
        </View>
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Historique des déplacements</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Latitude</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Longitude</Text>
            </View>

            {fakeData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.latitude}</Text>
                <Text style={styles.tableCell}>{item.longitude}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F5F5F5',
    },
    safe :{
      flex : 1
    },
    header: {
      flexDirection: 'row', 
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 25
    },
    headerImage: {
      width: 100,
      height: 100,
      borderRadius: 25,
      marginRight: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
    },
    logoutContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      transform: [{ scaleX: 1.6 }, { scaleY: 1.5 }],
      marginRight: 10
    },
    logoutLabel: {
      fontSize: 16,
      marginRight: 10,
    },
    switchContainer: {
      transform: [{ scaleX: 2 }, { scaleY: 2 }],
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    userProfile: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
      marginRight: 10,
      alignItems: 'center',
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    userInfo: {
      alignItems: 'center',
      marginBottom: 10,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    userPhone: {
      fontSize: 16,
      color: '#666',
    },
    editButton: {
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    editText: {
      color: '#FFF',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    batteryStatus: {
      flex: 1,
      padding: 10,
      backgroundColor: '#E0E0E0',
      borderRadius: 5,
      marginRight: 10,
      alignItems: 'center',
    },
    moduleActivity: {
      flex: 1,
      padding: 10,
      backgroundColor: '#E0E0E0',
      borderRadius: 5,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 16,
    },
    historySection: {
      marginTop: 20,
    },
    historyTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    table: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      overflow: 'hidden',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    tableCell: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
    },
    tableHeader: {
      backgroundColor: '#F0F0F0',
      fontWeight: 'bold',
    },
    switch: {
      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
  });

export default User
