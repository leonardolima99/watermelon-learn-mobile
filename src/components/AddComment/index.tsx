import React, {useState} from 'react'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'

import {database} from '../../services/watermelon'
import {IComment} from '../../@types/model'

const AddComment = () => {
  const [commentBody, setCommentBody] = useState<string>()

  const handleAddComment = async () => {
    if (commentBody) {
      await database.write(async () => {
        await database.get('comments').create((comment: IComment) => {
          comment.body = commentBody
        })
      })
    } else {
      console.log('Vazio')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Começe uma discução"
        value={commentBody}
        onChangeText={setCommentBody}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handleAddComment}>
        <Text>Adicionar comentario</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#222',
    margin: 8
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    color: '#222'
  },
  button: {
    backgroundColor: '#f30051',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  }
})

export default AddComment
