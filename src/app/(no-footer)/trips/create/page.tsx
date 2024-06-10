"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// https://developers.google.com/maps/documentation/places/web-service/autocomplete  --> use this api

const formSchema = z.object({
  tripName: z.string().min(2).max(50, {
    message: "Trip name must be between 2 and 50 characters",
  }),
  location: z.string().min(2).max(50, {
    message: "Location must be between 2 and 50 characters",
  }),
  dateRange: z.object(
    {
      startDate: z.date(),
      endDate: z.date(),
    },
    {
      message: "Invalid date range",
    },
  ),
});

export default function CreateTrip() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripName: "",
      location: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <div className="text-center flex flex-col gap-y-2">
        <h1 className="text-2xl font-semibold">Create a trip</h1>
        <p className="text-muted-foreground text-sm">
          Don&apos;t worry, you can always edit this information later.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-y-4"
        >
          <FormField
            control={form.control}
            name="tripName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where off?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Vancouver"
                    {...field}
                    className="h-12 w-full bg-background border-none rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tripName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Range (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Trip to Vancouver"
                    {...field}
                    className="h-12 bg-background border-none rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create trip</Button>
        </form>
      </Form>
    </div>
  );
}
