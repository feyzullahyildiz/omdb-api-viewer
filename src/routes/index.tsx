import { useCallback } from "react";
import {
  useQuery,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import { IMovie } from "../model/IMovie";
import { api } from "../api";
import { ContentCard } from "../components/ContentCard";
import { Paginator } from "../components/Paginator";
import { Outlet } from "react-router";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";

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
export const IndexPage = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [type, setType] = useQueryState(
    "type",
    parseAsStringEnum(["all", "movie", "series", "episode"]).withDefault("all"),
  );
  const [search, setSearch] = useQueryState("search", {
    throttleMs: 400,
    defaultValue: "ali",
  });
  // TODO add skeleton cards with isLoading
  const { data, error } = useQuery({
    queryKey: ["search", search, type, page],
    queryFn: fetcher,
    enabled: !!(search && search.length >= 2),
  });

  // Type değişince sayfa 1'e gitmeliyiz
  const wrappedOnSetType = useCallback((e: any) => {
    setPage(1);
    setType(e);
  }, []);
  // Search değişince sayfa 1'e gitmeliyiz
  const wrappedOnSearchChange = useCallback((e: any) => {
    setPage(1);
    setSearch(e);
  }, []);

  return (
    <>
      <div className="flex justify-between gap-4 px-4">
        <input
          className="border-2 p-2"
          placeholder="SEARCH"
          value={search}
          onChange={(e) => wrappedOnSearchChange(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => wrappedOnSetType(e.target.value as any)}
        >
          <option value="all">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      {error && <div>Error</div>}
      {data && (
        <>
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.Search.map((m) => (
                <ContentCard key={m.imdbID} movie={m} />
              ))}
            </div>
          </div>
          <Paginator
            totalResults={data.totalResults}
            page={page}
            setPage={setPage}
          />
          <Outlet />
        </>
      )}
    </>
  );
};
