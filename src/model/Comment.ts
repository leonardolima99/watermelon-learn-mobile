import {Model} from '@nozbe/watermelondb'
import {text} from '@nozbe/watermelondb/decorators'

export default class Comment extends Model {
  static table = 'comments'
  static associations: {
    posts: {type: 'belongs_to'; key: 'post_id'}
  }

  @text('body') body: string | undefined
  @text('post_id') postId: string | undefined
}
