import { useSearchParams } from "react-router-dom";

export function useUrl({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  const setUrl = (value) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return [currentFilter, setUrl];
}
