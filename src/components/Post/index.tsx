import React from 'react'
import withObservables from '@nozbe/with-observables'
import EnhancedComment from '../Comment'
import {Text, View} from 'react-native'

const Post = ({post, comments}: any) => (
  <View>
    <Text>{post.name}</Text>
    <Text>{post.body}</Text>
    <Text>Comments</Text>
    {comments.map((comment: {id: string}) => (
      <EnhancedComment key={comment.id} comment={comment} />
    ))}
  </View>
)

const enhance = withObservables(['post'], ({post}) => ({
  post,
  comments: post.comments
}))

const EnhancedPost = enhance(Post)
export default EnhancedPost
