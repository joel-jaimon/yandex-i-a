import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { ILike } from "typeorm";
import { Animes } from "../../entity/anime";
import { CreateAnimeArgs } from "../ArgsType/AnimeArgs";

@Resolver()
export class AnimeResolver {
  @Query(() => Animes)
  async anime(@Arg("id") id: number): Promise<Animes> {
    const response = await Animes.findOne({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new Error(e);
    });

    return response;
  }

  @Query(() => [Animes])
  async animeList(
    @Arg("skip") skip: number,
    @Arg("take") take: number
  ): Promise<Animes[]> {
    const response = await Animes.find({
      skip: skip,
      take: take,
      order: {
        id: "ASC",
      },
    }).catch((e) => {
      throw new Error(e);
    });

    return response;
  }

  @Query(() => [Animes])
  async searchAnime(
    @Arg("search_query") search_query: string,
    @Arg("skip") skip: number,
    @Arg("take") take: number
  ): Promise<Animes[]> {
    const response = await Animes.find({
      where: [
        {
          genres: ILike(`%${search_query} #%`),
        },
        {
          title: ILike(`%${search_query} #%`),
        },
        {
          type: ILike(`%${search_query} #%`),
        },
      ],
      skip: skip,
      take: take,
      order: {
        id: "ASC",
      },
      cache: true,
    }).catch((e) => {
      throw new Error(e);
    });

    return response;
  }

  @Mutation(() => Animes)
  async createAnimeInfo(
    @Args() CREATE_ANIME_ARGS: CreateAnimeArgs
  ): Promise<Animes> {
    return await Animes.create(CREATE_ANIME_ARGS)
      .save()
      .then((e) => e)
      .catch((e) => e);
  }
}
