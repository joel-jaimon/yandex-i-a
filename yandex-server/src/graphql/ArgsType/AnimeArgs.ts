import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateAnimeArgs {
  @Field(() => String)
  title: string;

  @Field(() => String)
  type: string;

  @Field(() => Number)
  episodes: number;

  @Field(() => String)
  status: string;

  @Field(() => String)
  start_airing: string;

  @Field(() => String)
  end_airing: string;

  @Field(() => String)
  starting_season: string;

  @Field(() => String)
  broadcast_time: string;

  @Field(() => String)
  producers: string;

  @Field(() => String)
  licensors: string;

  @Field(() => String)
  studios: string;

  @Field(() => String)
  sources: string;

  @Field(() => String)
  genres: string;

  @Field(() => String)
  duration: string;

  @Field(() => String)
  rating: string;

  @Field(() => Number)
  score: number;

  @Field(() => Number)
  scored_by: number;

  @Field(() => Number)
  members: number;

  @Field(() => Number)
  favorites: number;

  @Field(() => String)
  desc: string;
}
