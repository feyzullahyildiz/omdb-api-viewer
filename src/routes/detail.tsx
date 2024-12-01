import { useParams, useLocation, useNavigate, Navigate } from "react-router";
import { IMovie } from "../model/IMovie";
import { useClickOutside } from "@mantine/hooks";
import { useMyViewTransitionStyle } from "../hooks/useMyViewTranstionStyle";
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

export const DetailPage = () => {
  const params = useParams();
  const href = `/${params.id}`;

  const { data } = useQuery({
    queryKey: ["getById", params.id],
    queryFn: fetcher,
  });
  const location = useLocation();
  const navigatiton = useNavigate();

  const modalRef = useClickOutside(() => {
    navigatiton(-1);
    // navigatiton(, { viewTransition: true });
  });

  const imgStyle = useMyViewTransitionStyle(href, "image-expand");
  const titleStyle = useMyViewTransitionStyle(href, "title-expand");
  const cardStyle = useMyViewTransitionStyle(href, "card-expand");

  const movie = location.state as IMovie;
  if (!movie) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="container mx-auto flex cursor-pointer py-8 text-2xl">
        <h1 className="text-2xl" style={titleStyle}>
          {movie.Title}
        </h1>
      </div>
      <div
        ref={modalRef}
        className="container mx-auto flex min-h-60 min-w-60 flex-row justify-between gap-16 rounded-lg bg-gray-200 p-8"
        style={cardStyle}
      >
        <div className="flex flex-col">
          <p>Release Date: {movie.Year}</p>

          {data && (
            <>
              <div>Actors: {data.Actors}</div>
              <div>Genre: {data.Genre}</div>
              <div>Director: {data.Director}</div>
              <div>Awards: {data.Awards}</div>
              <div>Language: {data.Language}</div>
              <div>IMDB: {data.imdbRating} / 10</div>
              <div>Metascore: {data.Metascore}</div>
              <div>Country: {data.Country}</div>
              <div>Writer: {data.Writer}</div>

              <div className="flex-1"></div>
              <div>{data.Plot}</div>
            </>
          )}
        </div>
        <img
          src={movie.Poster}
          alt={movie.Title}
          style={imgStyle}
          className="object-contain"
        />
      </div>
    </div>
  );
};
