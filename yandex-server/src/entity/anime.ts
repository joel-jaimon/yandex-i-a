import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// https://www.kaggle.com/canggih/anime-data-score-staff-synopsis-and-genre

@ObjectType()
@Entity({
  name: "animes",
})
export class Animes extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field()
  @Column({
    type: "text",
  })
  title: string;

  @Field()
  @Column({
    type: "character varying",
    length: 10,
  })
  type: string;

  @Field()
  @Column({
    type: "character varying",
    length: 10,
  })
  episodes: string;

  @Field()
  @Column({
    type: "character varying",
    length: 40,
  })
  status: string;

  @Field()
  @Column({
    type: "character varying",
    length: 12,
  })
  start_airing: string;

  @Field()
  @Column({
    type: "character varying",
    length: 12,
  })
  end_airing: string;

  @Field()
  @Column({
    type: "character varying",
    length: 8,
  })
  starting_season: string;

  @Field()
  @Column({
    type: "text",
  })
  broadcast_time: string;

  @Field()
  @Column({
    type: "text",
  })
  producers: string;

  @Field()
  @Column({
    type: "text",
  })
  licensors: string;

  @Field()
  @Column({
    type: "text",
  })
  studios: string;

  @Field()
  @Column({
    type: "text",
  })
  sources: string;

  @Field()
  @Column({
    type: "text",
  })
  genres: string;

  @Field()
  @Column({
    type: "text",
  })
  duration: string;

  @Field()
  @Column({
    type: "text",
  })
  rating: string;

  @Field()
  @Column({
    type: "float",
  })
  score: number;

  @Field()
  @Column({
    type: "integer",
  })
  scored_by: number;

  @Field()
  @Column({
    type: "integer",
  })
  members: number;

  @Field()
  @Column({
    type: "integer",
  })
  favorites: number;

  @Field()
  @Column({
    type: "text",
  })
  desc: string;
}
