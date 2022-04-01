import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Post extends Model {
  static table = 'posts'
  static associations = {
    comments: { type: <const>'has_many', foreignKey: 'post_id' }
  }

  @text('title') title: string | undefined
  @text('body') body: string | undefined
  @field('is_pinned') isPinned: boolean | undefined
}
