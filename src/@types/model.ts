import {Model} from '@nozbe/watermelondb'

export interface IComment extends Model {
  id: string
  body?: string
  post_id?: string
}

export interface IComments {
  comments: IComment[]
}

export interface IPost extends Model {
  id: string
  title: string
  subtitle: string
  body: string
  is_pinned: boolean
}

export interface IPosts {
  posts: IPost[]
}
