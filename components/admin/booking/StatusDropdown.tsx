"use client";

import React, { useState } from "react";
import { updateBookingStatus } from "@/actions/Booking";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusOptions = ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"];

const StatusDropdown = ({ bookingId, currentStatus }:{bookingId:string,currentStatus:string}) => {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus: string) => {
    const response = await updateBookingStatus(bookingId, newStatus);
    if (response.success) {
      setStatus(newStatus);
      window.alert(`Status updated to ${newStatus}`);
    } else {
      window.alert(`Failed to update status: ${response.error}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        {status}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statusOptions.map((statusOption) => (
          <DropdownMenuItem
            key={statusOption}
            onClick={() => handleStatusChange(statusOption)}
          >
            {statusOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
