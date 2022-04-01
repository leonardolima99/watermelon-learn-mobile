import React from 'react'
import withObservables from '@nozbe/with-observables'
import { View } from 'react-native'

const Post = () => <View />

const enhance = withObservables(['post'], ({ post }) => ({
  post,
  comments: post.comments
}))

const EnhancedPost = enhance(Post)
export default EnhancedPost
