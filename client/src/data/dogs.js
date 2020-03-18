export default async function fetchDogs() {
  const dogsApi = () => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://spotifind-sabrina.herokuapp.com/api/dogs';
    } else {
      return 'http://localhost:5000/api/dogs';
    }
  }

  const response = await fetch(dogsApi());
  const json = await response.json();
  return json;
}
