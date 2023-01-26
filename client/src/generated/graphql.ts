import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  children: Array<Comment>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  likes: Array<Likes>;
  message: Scalars['String'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['String']>;
  post: Post;
  postId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type CommentsInputs = {
  message: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type Likes = {
  __typename?: 'Likes';
  comment: Comment;
  commentId: Scalars['String'];
  id: Scalars['ID'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
};


export type MutationCreateCommentArgs = {
  options: CommentsInputs;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  comments: Array<Comment>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  post: Post;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  id: Scalars['ID'];
  likes: Array<Likes>;
  username: Scalars['String'];
};

export type PostDataFragment = { __typename?: 'Post', title: string, id: string, body: string };

export type CreateCommentMutationVariables = Exact<{
  options: CommentsInputs;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, createdAt: any, updatedAt: any, message: string, parentId?: string | null, user: { __typename?: 'User', id: string, username: string } } };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', title: string, id: string, body: string, comments: Array<{ __typename?: 'Comment', id: string, createdAt: any, message: string, parentId?: string | null, user: { __typename?: 'User', id: string, username: string } }> } };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', title: string, id: string, body: string }> };

export const PostDataFragmentDoc = `
    fragment postData on Post {
  title
  id
  body
}
    `;
export const CreateCommentDocument = `
    mutation createComment($options: CommentsInputs!) {
  createComment(options: $options) {
    id
    createdAt
    updatedAt
    message
    parentId
    user {
      id
      username
    }
  }
}
    `;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['createComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    );
export const PostDocument = `
    query post($id: String!) {
  post(id: $id) {
    comments {
      id
      createdAt
      message
      parentId
      user {
        id
        username
      }
    }
    ...postData
  }
}
    ${PostDataFragmentDoc}`;
export const usePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostQueryVariables,
      options?: UseQueryOptions<PostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostQuery, TError, TData>(
      ['post', variables],
      fetcher<PostQuery, PostQueryVariables>(client, PostDocument, variables, headers),
      options
    );
export const PostsDocument = `
    query posts {
  posts {
    ...postData
  }
}
    ${PostDataFragmentDoc}`;
export const usePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PostsQueryVariables,
      options?: UseQueryOptions<PostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsQuery, TError, TData>(
      variables === undefined ? ['posts'] : ['posts', variables],
      fetcher<PostsQuery, PostsQueryVariables>(client, PostsDocument, variables, headers),
      options
    );