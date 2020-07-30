import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Main = ({ navigation }) => {

  const [books, setBooks] = useState([])

  useEffect(() => {
   AsyncStorage.getItem('books')
   .then(data => {
     const book = JSON.parse(data)
     setBooks(book)
   })

  }, [])

  const onNewBook = () => { 
    navigation.navigate('Book')
  }

  const onBookEdit = (bookId) => {
    const book = books.find(item => item.id === bookId)
    navigation.navigate('Book', { book: book, isEdit: true })
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolbox}>
      <Text style={styles.title}>Lista de Leitura</Text>

      <TouchableOpacity 
      style={styles.toolboxButton}
      onPress={onNewBook}>
        <Icon name="add" size={14} color="#FFF"/>
      </TouchableOpacity>
      </View>

      <FlatList 
      data={books}
      keyExtractor={item => item.id}

      renderItem={({ item }) => (
        <View style={styles.itemsContainer}>
          <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => onBookEdit(item.id)}>
            <Icon name="create" size={14} color="#2ecc71"/>
          </TouchableOpacity>
        </View>
      )}
      
       />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  toolbox: {
    flexDirection: "row",
    marginBottom: 5,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "#3498db",
  },
  toolboxButton: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  itemsContainer: {
    flexDirection: "row",
  },
  itemText: {
    fontSize: 16,
  },
  itemButton: {
    flex: 1,
  },
  editButton: {

  },
})


export default Main