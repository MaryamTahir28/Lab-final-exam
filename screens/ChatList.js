// ChatList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useChatData from '../hooks/useChatData';
import CustomButton from '../components/CustomButton';
import styles from '../styles/styles';
import { phoneNumber } from './global';

const ChatList = () => {
  const navigation = useNavigation();
  const userPhone = phoneNumber;

  const predefinedContacts = [
    { id: '1', phone: '+923163002350', name: 'Emergency Chat' },
    // Add more predefined contacts here with unique ids
  ];

  const { combinedData, loading } = useChatData(userPhone, predefinedContacts);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#A94064', // Pink color for the header background
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const handleChatSelect = (recipientPhone) => {
    navigation.navigate('LiveChat', { recipientPhone });
  };

  const renderItem = ({ item }) => (
    <CustomButton onPress={() => handleChatSelect(item.phone)} style={styles.conversationItem}>
      <View style={styles.conversationTextContainer}>
        <Text style={item.name === 'Emergency Chat' ? styles.emergencyConversationName : styles.conversationName}>
          {item.name}
        </Text>
        {item.lastMessage && (
          <Text style={styles.conversationMessage}>
            {item.lastMessage}
          </Text>
        )}
      </View>
      {item.lastMessage && item.lastMessageDate && (
        <Text style={styles.conversationDate}>
          {new Date(item.lastMessageDate.seconds * 1000).toLocaleDateString()} {new Date(item.lastMessageDate.seconds * 1000).toLocaleTimeString()}
        </Text>
      )}
    </CustomButton>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#800080" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={combinedData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ChatList;
