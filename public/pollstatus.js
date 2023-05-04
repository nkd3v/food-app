function fetchData(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      postMessage(data);
      setTimeout(() => {
        fetchData(apiUrl);
      }, 1000);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

onmessage = (event) => {
  const apiUrl = event.data;
  fetchData(apiUrl);
};

