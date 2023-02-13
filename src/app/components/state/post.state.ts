export interface Posts {
  id: string,
  title: string,
  description: string
}

export interface PostState {
  posts: Posts[];
}

export const initialPostState: PostState = {
  posts: [
    {
      id: "1",
      title: "Sample title",
      description: "Sample description"
    }
  ]
}