let url = 'https://dummyjson.com/products';

fetch(url)
.then(res => {
    if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }
    return res.json();
})
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
