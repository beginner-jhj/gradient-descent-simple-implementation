export async function getData(fileName) {
  const path = `./data/${fileName}.csv`;
  return fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const rows = data
        .split("\n")
        .slice(1)
        .map((row) => row.split(",").map(Number));
      return rows;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
