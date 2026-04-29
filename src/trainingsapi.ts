const BASE_URL = import.meta.env.VITE_API_URL;

const withBase = (url: string) =>
  url.startsWith("http") ? url : `${BASE_URL}${url}`;

export const fetchTrainings = () => {
  return fetch(`${BASE_URL}/trainings`)
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching training");

      return response.json();
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