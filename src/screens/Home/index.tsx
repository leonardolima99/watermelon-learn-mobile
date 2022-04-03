import React from 'react'
import { FlatList, StatusBar, StyleSheet, View } from 'react-native'

import { database } from '../../services/watermelon'
import withObservables from '@nozbe/with-observables'
import { ListItem } from '../../components/ListItem'

import { IComments2 } from '../../types/model'
import { AddComment } from '../../components/AddComment'

const db = database.collections.get('comments')
const observeComments = () => db.query().observe()

const enhanceComments = withObservables(['comments'], () => ({
  comments: observeComments()
}))

const CommentList = ({ comments }: IComments2) => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#222" barStyle="light-content" />
    <AddComment />
    {/* {comments.map(comment => (
      <ListItem comment={comment} key={comment.id} />
    ))} */}
    <FlatList
      data={comments}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ListItem comment={item} />}
    />
  </View>
)

const CommentListRender = enhanceComments(CommentList)

export const Home = () => <CommentListRender />

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', paddingTop: 20 }
})
