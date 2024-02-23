import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking, getBookings } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");

  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre fetching if not last page
  if (page < Math.ceil(count / PAGE_SIZE))
    queryClient.prefetchQuery(["bookings", filter, sortBy, page + 1], () =>
      getBookings({ filter, sortBy, page: page + 1 })
    );

  if (page > 1)
    queryClient.prefetchQuery(["bookings", filter, sortBy, page - 1], () =>
      getBookings({ filter, sortBy, page: page - 1 })
    );

  return { isLoading, error, bookings, count };
};

export const useBooking = () => {
  const { bookingId } = useParams();
  console.log(bookingId);
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
};
