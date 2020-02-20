export default async function fetchDogs() {
  const response = await fetch("http://localhost:3000/dogs");
  const json = await response.json();
  return json;
}
