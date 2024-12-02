import {
  useQuery,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import { api } from "../api";
import { IDetailedMovie } from "../model/IDetailedMovie";
const fetcher = async (context: QueryFunctionContext<QueryKey>) => {
  const [_, id] = context.queryKey as any;

  const { data } = await api.get<IDetailedMovie>("/", {
    params: {
      i: id,
    },
  });
  if (data.Response !== "True") {
    throw new Error("No data found");
  }
  return data;
};
export const useFetchMovieById = (id: string) => {
  return useQuery({
    queryKey: ["getById", id],
    queryFn: fetcher,
  });
};
