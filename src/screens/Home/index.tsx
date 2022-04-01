import React from 'react'
import { FlatList, StatusBar, StyleSheet, View } from 'react-native'

import { database } from '../../services/watermelon'
import withObservables from '@nozbe/with-observables'
import ListItem from '../../components/ListItem'

/* import {IComments} from '../../@types/model' */
import AddComment from '../../components/AddComment'

const db = database.collections.get('comments')
const observeComments = () => db.query().observe()

const enhanceComments = withObservables([], () => ({
  comments: observeComments()
}))

const CommentList: React.FC<any> = ({ comments }) => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#222" barStyle="light-content" />
    <FlatList
      data={comments}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ListItem comment={item} />}
      ListHeaderComponent={() => <AddComment />}
    />
  </View>
)

const CommentListRender = enhanceComments(CommentList)

const Home = () => <CommentListRender />

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', paddingTop: 20 }
})

export default Home
