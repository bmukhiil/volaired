import { useInstantSearch } from "react-instantsearch";

const EmptyQueryBoundaryFallback = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-xl font-semibold tracking-tight">
        Search by airport, or city
      </p>
    </div>
  );
};

const EmptyQueryBoundary = ({ children }) => {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return (
      <>
        <EmptyQueryBoundaryFallback />
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
};

export default EmptyQueryBoundary;
