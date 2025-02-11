"use client";

import React, { useActionState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/actions/Booking";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

const FormBooking = ({
  userId,
  roomId,
  roomName,
}: {
  userId: string;
  roomId: string;
  roomName: string;
}) => {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createBooking, null);

  useEffect(() => {
    if (state?.error) {
      toast({ title: "Error", description: state.error });
    }
    if (state?.success) {
      toast({
        title: "Booking Created",
        description: "Your booking has been created successfully.",
      });
      setTimeout(() => {
        redirect(`/rooms/${roomId}`);
      }, 1000);
    }
  }, [state, toast]);

  return (
    <div className="w-full px-10">
      <Card className="p-10">
        <h1 className="text-2xl font-bold mb-4">Booking for {roomName}</h1>
        <form action={formAction}>
          <Input type="hidden" name="userId" value={userId} />

          <Input type="hidden" name="roomId" value={roomId} />
          <Input type="hidden" name="roomName" value={roomName} />
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className="w-full mb-4"
            required
          />
          <Label htmlFor="checkIn">Check-In Date</Label>
          <Input
            id="checkIn"
            name="checkIn"
            type="date"
            className="w-full mb-4"
            required
          />
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            className="w-full mb-6"
            required
          />
          <Button type="submit" className="w-full">
            Confirm Booking
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default FormBooking;
