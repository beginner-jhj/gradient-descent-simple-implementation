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
      const lines = data.trim().split("\n");
      const headers = lines[0].split(",");
      const rows = lines
        .slice(1)
        .map((row) => row.split(",").map(Number));
      return { data: rows, headers };
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

export async function getColumns(fileName) {
  const path = `./data/${fileName}.csv`;
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const text = await response.text();
  const firstLine = text.split("\n")[0].trim();
  return firstLine.split(",");
}
