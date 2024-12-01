import { Link } from "react-router";
import { IMovie } from "../model/IMovie";
import { useMyViewTransitionStyle } from "../hooks/useMyViewTranstionStyle";

interface Props {
  movie: IMovie;
}
export const ContentCard = ({ movie }: Props) => {
  const href = "/" + movie.imdbID;
  const imgStyle = useMyViewTransitionStyle(href, "image-expand");
  const titleStyle = useMyViewTransitionStyle(href, "title-expand");
  const cardStyle = useMyViewTransitionStyle(href, "card-expand");

  return (
    <Link viewTransition to={href} state={movie}>
      <div
        key={movie.imdbID}
        className="overflow-hidden rounded-lg bg-white shadow-md"
        style={cardStyle}
      >
        <img
          src={movie.Poster}
          alt={movie.Title}
          style={imgStyle}
          className="h-64 w-full object-cover contain-layout"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-black" style={titleStyle}>
            {movie.Title}
          </h2>
          <p className="text-gray-600">{movie.Year}</p>
          <p className="mt-2 text-sm text-gray-500">{movie.Type}</p>
        </div>
      </div>
    </Link>
  );
};
