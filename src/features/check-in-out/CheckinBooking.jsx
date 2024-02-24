import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBookings";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { bookings } from "./../../data/data-bookings";
import { isPast } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useChecking";
import { useSettings } from "./../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isSettingsLoading } = useSettings();

  const moveBack = useMoveBack();

  const { checkin, isCheckinIn } = useChecking();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  if (isLoading || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionaleBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionaleBreakfastPrice,
          totalPrice: totalPrice + optionaleBreakfastPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionaleBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="paid"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckinIn}
          onChange={() => setConfirmPaid((c) => !c)}
        >
          Confirm that {guests.firllName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionaleBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionaleBreakfastPrice
              )}) `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckinIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
