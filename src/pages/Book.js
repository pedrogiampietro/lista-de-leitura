import React, { useState } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  AsyncStorage
  } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Book = ({ navigation }) => { 
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [photo, setPhoto] = useState()

  const isValid = () => {

    if (title !== undefined && title !== '') {
      return true
    } else {
      return false
    }
  }

  const onSave = async () => {

    console.log(`Title: ${title}`)
    console.log(`Description: ${description}`)

    if (isValid()) {
      console.log('Válido.')

      const id = 1

      const data = {
        id,
        title,
        description,
        photo,
      }

      await AsyncStorage.setItem('books', JSON.stringify(data))
      navigation.goBack()
    } else {
      console.log('Inválido.')
    }
  }


  return (
  <View style={styles.container}>
    <Text style={styles.pageTitle}>Inclua seu novo livro</Text>
    <TextInput 
      style={styles.inputText}
      placeholder="Título"
      value={title}
      onChangeText={(text) => {
        setTitle(text)
      }}
    />

    <TextInput 
      style={styles.inputText}
      placeholder="Descrição"
      multiline={true}
      numberOfLines={4}
      value={description}
      onChangeText={(text) => {
        setDescription(text)
      }}
    />

    <TouchableOpacity style={styles.cameraButton}>
      <Icon name="photo-camera" size={18} color="#FFF"/>
    </TouchableOpacity>         

     <TouchableOpacity 
     style={[styles.saveButton, (!isValid()) ? styles.saveButtonInvalid : '']}
     onPress={onSave}>
      <Text style={styles.saveButtonText}>Cadastrar</Text>
    </TouchableOpacity>

     <TouchableOpacity
      style={styles.cancelButton}
      onPress={() => {
        navigation.goBack()
      }}>
      <Text style={styles.cancelButtonText}>Cancelar</Text>
    </TouchableOpacity>



  </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    borderBottomColor: "#f39c12",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  cameraButton: {
    backgroundColor: "#f39c12",
    borderRadius: 50,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#f39c12",
    alignSelf: "center",
    borderRadius: 8,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  saveButtonInvalid: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  cancelButton: {
    alignSelf: "center"
  },
  cancelButtonText: {
    color: "#95a5a6"
  },
})

export default Book