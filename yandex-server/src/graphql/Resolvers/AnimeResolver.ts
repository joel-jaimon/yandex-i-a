import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
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
