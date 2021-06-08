import { gql } from "@apollo/client";

export const CREATE_ANIME_MUTATION_CLIENT = gql`
  mutation createAnimeInfo(
    $title: String
    $type: String
    $episodes: Number
    $status: String
    $start_airing: String
    $end_airing: String
    $starting_season: String
    $broadcast_time: String
    $producers: String
    $licensors: String
    $studios: String
    $sources: String
    $genres: String
    $duration: String
    $rating: String
    $score: Number
    $scored_by: Number
    $members: Number
    $favorites: Number
    $desc: String
  ) {
    createAnimeInfo(
      title: $title
      type: $type
      episodes: $episodes
      status: $status
      start_airing: $start_airing
      end_airing: $end_airing
      starting_season: $starting_season
      broadcast_time: $broadcast_time
      producers: $producers
      licensors: $licensors
      studios: $studios
      sources: $sources
      genres: $genres
      duration: $duration
      rating: $rating
      score: $score
      scored_by: $scored_by
      members: $members
      favorites: $favorites
      desc: $desc
    ) {
      id
      #   title
      #   type
      #   episodes
      #   status
      #   start_airing
      #   end_airing
      #   starting_season
      #   broadcast_time
      #   producers
      #   licensors
      #   studios
      #   sources
      #   genres
      #   duration
      #   rating
      #   score
      #   scored_by
      #   members
      #   favorites
      #   desc
    }
  }
`;
