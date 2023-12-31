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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
};

export type Query = {
  __typename?: 'Query';
  /** Get all the trips */
  Trips: Array<Trip>;
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

export type TripsQueryVariables = Exact<{ [key: string]: never; }>;


export type TripsQuery = { __typename?: 'Query', Trips: Array<{ __typename?: 'Trip', label: string, createdAt: any }> };

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