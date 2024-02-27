import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),

    onSuccess: () => {
      toast.success(`Booking deleted successfully`);
      queryClient.invalidateQueries(["bookings"]);
      //   navigate("/bookings");
    },
    onError: () => toast.error("There was an error while deleting the booking"),
  });

  return { isDeleting, deleteBooking };
}
