import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any };
};

/** New comment data */
export type AddCommentInput = {
  content: Scalars['String']['input'];
};

/** New trip data */
export type AddTripInput = {
  description: Scalars['String']['input'];
  label: Scalars['String']['input'];
};

/** Comment model */
export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** MongoDB _id */
  id: Scalars['ID']['output'];
  trip: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add new comment to trip */
  AddCommentToTrip: Comment;
  /** Create a new trip */
  CreateTrip: Trip;
};

export type MutationAddCommentToTripArgs = {
  data: AddCommentInput;
  id: Scalars['String']['input'];
};

export type MutationCreateTripArgs = {
  data: AddTripInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get trip by id */
  Trip: Trip;
  /** Get trip comments */
  TripComments: Array<Comment>;
  /** Get all the trips */
  Trips: Array<Trip>;
};

export type QueryTripArgs = {
  id: Scalars['String']['input'];
};

export type QueryTripCommentsArgs = {
  id: Scalars['String']['input'];
};

/** Trip model */
export type Trip = {
  __typename?: 'Trip';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  /** MongoDB _id */
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TripsQueryVariables = Exact<{ [key: string]: never }>;

export type TripsQuery = { __typename?: 'Query'; Trips: Array<{ __typename?: 'Trip'; label: string; createdAt: any }> };

export const TripsDocument = gql`
  query Trips {
    Trips {
      label
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TripsGQL extends Apollo.Query<TripsQuery, TripsQueryVariables> {
  override document = TripsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
