import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import withObservables from '@nozbe/with-observables'

import { IComment2 } from '../../types/model'
import { database } from '../../services/watermelon'

interface Props {
  comment: IComment2
}

const RawListItem = ({ comment }: Props) => {
  console.log('COMENTARIO: ', comment)
  const handleDeleteTask = async () => {
    await database.write(async () => {
      const commentFinded = await database.get('comments').find(comment.id)
      await commentFinded.destroyPermanently()
    })
  }
  const handleUpdateTask = async () => {
    await database.write(async () => {
      const commentFinded = (await database
        .get('comments')
        .find(comment.id)) as any
      await commentFinded.update(() => {
        commentFinded.body = 'Editado!'
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{comment.body ? comment.body : 'nada'}</Text>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={handleDeleteTask}>
          <Text style={styles.button_text}>Deletar</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.button_update]}
          onPress={handleUpdateTask}
        >
          <Text style={styles.button_text}>Modificar</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#06d',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    margin: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: { color: '#fff', fontSize: 16 },
  button: { backgroundColor: '#DC3545', padding: 15, borderRadius: 10 },
  button_update: { marginLeft: 5, backgroundColor: '#28A745' },
  button_text: { color: '#fff' },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export const ListItem = withObservables(['comment'], ({ comment }) => {
  comment
})(RawListItem)
