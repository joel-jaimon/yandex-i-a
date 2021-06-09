import { gql } from "@apollo/client";

export const MODAL_DATA_TYPE = gql`
  query FetchAnime($id: Float!) {
    anime(id: $id) {
      id
      title
      type
      episodes
      status
      start_airing
      end_airing
      starting_season
      broadcast_time
      producers
      licensors
      studios
      sources
      genres
      duration
      rating
      score
      scored_by
      members
      favorites
      desc
    }
  }
`;

export const FTECH_SEARCH_COUNTS = gql`
  query FetchCount($search_query: String!) {
    countAnimes(search_query: $search_query)
  }
`;

export const FETCH_SEARCH_RESULTS = gql`
  query FetchAnime($search_query: String!, $take: Float!, $skip: Float!) {
    searchAnime(search_query: $search_query, take: $take, skip: $skip) {
      id
      title
      type
      status
      start_airing
      genres
      duration
    }
  }
`;
