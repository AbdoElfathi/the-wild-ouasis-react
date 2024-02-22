import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { compareValues } from "../../utils/helpers";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  // if is loading return a spinner
  if (isLoading) return <Spinner />;

  if (cabins.length === 0) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins =
    filterValue === "all"
      ? cabins
      : filterValue === "no-discount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : filterValue === "with-discount"
      ? cabins.filter((cabin) => cabin.discount > 0)
      : [];

  // 2) SORT
  const SortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = SortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  // console.log(filteredCabins.at(0)[field]);

  const sortedCabins = filteredCabins.sort(
    (a, b) => compareValues(a[field], b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
