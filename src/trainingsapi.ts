const BASE_URL = import.meta.env.VITE_API_URL;
import type { Customer, TrainingsData } from "./types";

const withBase = (url: string) =>
  url.startsWith("http") ? url : `${BASE_URL}${url}`;

type GetTrainingsResponse = {
  id: number;
  date: string;
  duration: number;
  activity: string;
  customer: (Customer & { id: number }) | null;
};
 

export const fetchTrainings = () => {
  return fetch(`${BASE_URL}/gettrainings`)
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching training");

      return response.json();
    })
     .then((data: GetTrainingsResponse[]): TrainingsData[] => {
      return data.map(training => {
        const customerLink = training.customer
          ? `${BASE_URL}/customers/${training.customer.id}`
          : "";
 
        return {
          id: training.id,
          date: training.date,
          duration: training.duration,
          activity: training.activity,
          customer: customerLink,
          customerData: training.customer,
          _links: {
            self: {
              href: `${BASE_URL}/trainings/${training.id}`,
            },
            customer: customerLink
              ? {
                  href: customerLink,
                }
              : undefined,
          },
        };
      });
    });
 
};

export const deleteTraining = (url: string) => {
  return fetch(withBase(url), {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting training");

    return response.json();
  });
};