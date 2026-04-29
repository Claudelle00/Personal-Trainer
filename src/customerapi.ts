export const fetchCustomer = () => {
  return fetch(import.meta.env.VITE_API_URL + "/customers")
  .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching customer");

    return response.json();
  })
}

export const deleteCustomer = (url: string) => {
  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting customer");

    return response.json();
  })
}