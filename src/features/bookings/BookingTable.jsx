import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  // const [searchParams] = useSearchParams();

  // const filterValue = searchParams.get("status") || "all";

  if (isLoading) return <Spinner />;

  if (bookings.length === 0) return <Empty resourceName="bookings" />;

  // let filteredBookings = bookings.filter((booking) => {
  //   if (filterValue === "all") return true;
  //   return booking.status === filterValue; // "all", "unconfirmed", "checked-in" etc.
  // });

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
