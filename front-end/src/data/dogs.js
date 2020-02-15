export default async function fetchDogs() {
  try {
    const response = await fetch("http://localhost:5000/dogs");

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
