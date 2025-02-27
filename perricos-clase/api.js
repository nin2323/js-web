function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  async function getRandomDogImage(breed) {
    const url =
      breed === '' ? 'https://dog.ceo/api/breeds/image/random' : `https://dog.ceo/api/breed/${breed}/images/random`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
  
      // TODO random breed
      return {
        id: Date.now() + Math.random(),
        breed,
        imgUrl: json.message,
        dislikeCount: getRandomInt(0, 2),
        likeCount: getRandomInt(0, 1)
      };
    } catch (error) {
      console.error(error.message);
    }
  }
  
  async function getBreeds() {
    const url = 'https://dog.ceo/api/breeds/list/all';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
  
      return json.message;
    } catch (error) {
      console.error(error.message);
    }
  }