import {
  useQuery,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import { IMovie } from "../model/IMovie";
import { api } from "../api";

const fetcher = async (context: QueryFunctionContext<QueryKey>) => {
  const [_, search, type, page] = context.queryKey as any;

  const { data } = await api.get<{
    Search: IMovie[];
    Response: string;
    totalResults: string;
  }>("/", {
    params: {
      s: search,
      type: type === "all" ? null : type,
      page,
    },
  });
  if (data.Response !== "True") {
    throw new Error("Hata");
  }
  return { ...data, totalResults: +data.totalResults };
};

export const useFetchMovies = (search: string, type: string, page: number) => {
  return useQuery({
    queryKey: ["search", search, type, page],
    queryFn: fetcher,
    enabled: !!(search && search.length >= 2),
  });
};
