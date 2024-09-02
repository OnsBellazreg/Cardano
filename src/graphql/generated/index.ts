import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

/** A `Lift` is a chairlift, gondola, tram, funicular, pulley, rope tow, or other means of ascending a mountain. */
export type Lift = {
  __typename?: 'Lift';
  /** The number of people that a `Lift` can hold */
  capacity: Scalars['Int']['output'];
  /** The number of feet in elevation that a `Lift` ascends */
  elevationGain: Scalars['Int']['output'];
  /** The unique identifier for a `Lift` (id: "panorama") */
  id: Scalars['ID']['output'];
  /** The name of a `Lift` */
  name: Scalars['String']['output'];
  /** A boolean describing whether a `Lift` is open for night skiing */
  night: Scalars['Boolean']['output'];
  /** The current status for a `Lift`: `OPEN`, `CLOSED`, `HOLD` */
  status?: Maybe<LiftStatus>;
  /** A list of trails that this `Lift` serves */
  trailAccess: Array<Trail>;
};

/** An enum describing the options for `LiftStatus`: `OPEN`, `CLOSED`, `HOLD` */
export enum LiftStatus {
  Closed = 'CLOSED',
  Hold = 'HOLD',
  Open = 'OPEN'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Sets a `Lift` status by sending `id` and `status` */
  setLiftStatus: Lift;
  /** Sets a `Trail` status by sending `id` and `status` */
  setTrailStatus: Trail;
};


export type MutationSetLiftStatusArgs = {
  id: Scalars['ID']['input'];
  status: LiftStatus;
};


export type MutationSetTrailStatusArgs = {
  id: Scalars['ID']['input'];
  status: TrailStatus;
};

export type Query = {
  __typename?: 'Query';
  /** Returns a `Lift` by `id` (id: "panorama") */
  Lift: Lift;
  /** Returns a `Trail` by `id` (id: "old-witch") */
  Trail: Trail;
  /** A list of all `Lift` objects */
  allLifts: Array<Lift>;
  /** A list of all `Trail` objects */
  allTrails: Array<Trail>;
  /** Returns an `Int` of `Lift` objects with optional `LiftStatus` filter */
  liftCount: Scalars['Int']['output'];
  /** Returns a list of `SearchResult` objects based on `term` or `status` */
  search: Array<SearchResult>;
  /** Returns an `Int` of `Trail` objects with optional `TrailStatus` filter */
  trailCount: Scalars['Int']['output'];
};


export type QueryLiftArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTrailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAllLiftsArgs = {
  status?: InputMaybe<LiftStatus>;
};


export type QueryAllTrailsArgs = {
  status?: InputMaybe<TrailStatus>;
};


export type QueryLiftCountArgs = {
  status?: InputMaybe<LiftStatus>;
};


export type QuerySearchArgs = {
  status?: InputMaybe<LiftStatus>;
  term?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTrailCountArgs = {
  status?: InputMaybe<TrailStatus>;
};

/** This union type returns one of two types: a `Lift` or a `Trail`. When we search for a letter, we'll return a list of either `Lift` or `Trail` objects. */
export type SearchResult = Lift | Trail;

export type Subscription = {
  __typename?: 'Subscription';
  /** Listens for changes in lift status */
  liftStatusChange?: Maybe<Lift>;
  /** Listens for changes in trail status */
  trailStatusChange?: Maybe<Trail>;
};

/** A `Trail` is a run at a ski resort */
export type Trail = {
  __typename?: 'Trail';
  /** A list of Lifts that provide access to this `Trail` */
  accessedByLifts: Array<Lift>;
  /** The difficulty rating for a `Trail` */
  difficulty: Scalars['String']['output'];
  /** A boolean describing whether or not a `Trail` is groomed */
  groomed: Scalars['Boolean']['output'];
  /** A unique identifier for a `Trail` (id: 'hemmed-slacks') */
  id: Scalars['ID']['output'];
  /** The name of a `Trail` */
  name: Scalars['String']['output'];
  /** A boolean describing whether or not a `Trail` is open for night skiing */
  night: Scalars['Boolean']['output'];
  /** The current status for a `Trail`: OPEN, CLOSED */
  status?: Maybe<TrailStatus>;
  /** A boolean describing whether or not a `Trail` has trees */
  trees: Scalars['Boolean']['output'];
};

/** An enum describing the options for `TrailStatus`: `OPEN`, `CLOSED` */
export enum TrailStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type AllTrailsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTrailsQuery = { __typename?: 'Query', allTrails: Array<{ __typename?: 'Trail', id: string, name: string, status?: TrailStatus | null, difficulty: string, groomed: boolean, trees: boolean, night: boolean, accessedByLifts: Array<{ __typename?: 'Lift', id: string, name: string, status?: LiftStatus | null, capacity: number, night: boolean, elevationGain: number }> }> };

export type TrailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TrailQuery = { __typename?: 'Query', Trail: { __typename?: 'Trail', id: string, name: string, status?: TrailStatus | null, difficulty: string, groomed: boolean, trees: boolean, night: boolean, accessedByLifts: Array<{ __typename?: 'Lift', id: string, name: string, status?: LiftStatus | null, capacity: number, night: boolean, elevationGain: number }> } };


export const AllTrailsDocument = gql`
    query AllTrails {
  allTrails {
    id
    name
    status
    difficulty
    groomed
    trees
    night
    accessedByLifts {
      id
      name
      status
      capacity
      night
      elevationGain
    }
  }
}
    `;

/**
 * __useAllTrailsQuery__
 *
 * To run a query within a React component, call `useAllTrailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTrailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTrailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTrailsQuery(baseOptions?: Apollo.QueryHookOptions<AllTrailsQuery, AllTrailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTrailsQuery, AllTrailsQueryVariables>(AllTrailsDocument, options);
      }
export function useAllTrailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTrailsQuery, AllTrailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTrailsQuery, AllTrailsQueryVariables>(AllTrailsDocument, options);
        }
export function useAllTrailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllTrailsQuery, AllTrailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllTrailsQuery, AllTrailsQueryVariables>(AllTrailsDocument, options);
        }
export type AllTrailsQueryHookResult = ReturnType<typeof useAllTrailsQuery>;
export type AllTrailsLazyQueryHookResult = ReturnType<typeof useAllTrailsLazyQuery>;
export type AllTrailsSuspenseQueryHookResult = ReturnType<typeof useAllTrailsSuspenseQuery>;
export type AllTrailsQueryResult = Apollo.QueryResult<AllTrailsQuery, AllTrailsQueryVariables>;
export const TrailDocument = gql`
    query Trail($id: ID!) {
  Trail(id: $id) {
    id
    name
    status
    difficulty
    groomed
    trees
    night
    accessedByLifts {
      id
      name
      status
      capacity
      night
      elevationGain
    }
  }
}
    `;

/**
 * __useTrailQuery__
 *
 * To run a query within a React component, call `useTrailQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrailQuery(baseOptions: Apollo.QueryHookOptions<TrailQuery, TrailQueryVariables> & ({ variables: TrailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrailQuery, TrailQueryVariables>(TrailDocument, options);
      }
export function useTrailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrailQuery, TrailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrailQuery, TrailQueryVariables>(TrailDocument, options);
        }
export function useTrailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TrailQuery, TrailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TrailQuery, TrailQueryVariables>(TrailDocument, options);
        }
export type TrailQueryHookResult = ReturnType<typeof useTrailQuery>;
export type TrailLazyQueryHookResult = ReturnType<typeof useTrailLazyQuery>;
export type TrailSuspenseQueryHookResult = ReturnType<typeof useTrailSuspenseQuery>;
export type TrailQueryResult = Apollo.QueryResult<TrailQuery, TrailQueryVariables>;