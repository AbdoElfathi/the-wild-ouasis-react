import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { bookings } from "./../../data/data-bookings";
import { useCabins } from "./../cabins/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isRecentLoading, bookings } = useRecentBookings();
  const {
    isLoadind: isStaysLoading,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { isLoading: isLoadingCabins, cabins } = useCabins();

  if (isRecentLoading || isStaysLoading || isLoadingCabins) return <Spinner />;

  // if is loading return a spinner
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
