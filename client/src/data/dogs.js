export default async function fetchDogs() {
  const response = await fetch("http://localhost:5000/api/dogs");
  const json = await response.json();
  return json;
}
