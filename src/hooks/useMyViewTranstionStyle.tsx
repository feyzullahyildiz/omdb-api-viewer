import { useViewTransitionState } from "react-router";

export const useMyViewTransitionStyle = (href: string, name: string) => {
  const isTransitioning = useViewTransitionState(href);
  return {
    viewTransitionName: isTransitioning ? name : "none",
  };
};
