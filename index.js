const perricosArray = [
    'https://images.dog.ceo/breeds/affenpinscher/n02110627_10439.jpg',
    'https://images.dog.ceo/breeds/affenpinscher/n02110627_10439.jpg'
  ];
  console.log(perricosArray);
  // cxreamos un objeto por cada perrico de nuestro array donde gusradamos los likes y los dislikes
  const likesPerrico = perricosArray.map(() => ({
    likes: 0,
    dislikes: 0
  }));

function renderPerrico(dogImage, dogList, index) {
  // creamos la tarjeta con datos dinamicos, la imagen, los likes y los dislikes  
  const htmlAdd = 
      `<div class="card" id="card-${index}">
        <img src="${dogImage}" alt="Perro" />
        <br />
        <p><span class="like-count">${likesPerrico[index].likes}</span>❤️ 🤮<span class="dislike-count">${likesPerrico[index].likes}</span></p>
        <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>
      </div>`;

    dogList.innerHTML += htmlAdd;

    // const botonLike = document.querySelectorAll('.like');
    // const likeCountNodes = document.querySelectorAll('.like-count');
    // botonLike.addEventListener('click', () => {
    //   likes++;
    //   likeCountNodes.innerHTML = likes;
    // });

  // votar preciosisimo
  document.querySelectorAll('.like').forEach((buttonNode, index) => {
    buttonNode.addEventListener('click', function () {
      likesPerrico[index].likes++;
      const likeCountNodes = document.querySelectorAll('.like-count')[index];
      likeCountNodes.innerText = likesPerrico[index].likes;
    });
  });

  //votar feisimo
  document.querySelectorAll('.dislike').forEach((buttonNode, index) => {
    buttonNode.addEventListener('click', function () {
      likesPerrico[index].dislikes++;
      const dislikeCountNodes = document.querySelectorAll('.dislike-count')[index];
      dislikeCountNodes.innerText = likesPerrico[index].dislikes;
    });
  });
};


function renderPerricoArray() {
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';
  perricosArray.forEach((dogImage, index) => {
    renderPerrico(dogImage, dogList, index);
});
}


// Añadir un perrico al final
const addPerrico = async () => {
  const perricoImg = await getRandomDogImage();
  perricosArray.push(perricoImg);
  likesPerrico.push({ likes: 0, dislikes: 0 }); // Añadimos datos para el nuevo perrico
  const dogList = document.querySelector('#dog-list');
  renderPerrico(perricoImg, dogList, perricosArray.length - 1);
};

  document.querySelector('#add-1-perrico-first').addEventListener('click', () => addPerricoFirst());

// Añadir un perrico al principio
const addPerricoFirst = async () => {
  const perricoImg = await getRandomDogImage();
  perricosArray.unshift(perricoImg);
  likesPerrico.unshift({ likes: 0, dislikes: 0 }); // Añadimos datos al principio
  renderPerricoArray(); // Re-renderizamos todo para mantener el orden
};

  document.querySelector('#add-1-perrico').addEventListener('click', () => addPerrico());

// Añadir múltiples perricos
const addMultiplePerricos = async (count) => {
  for (let i = 0; i < count; i++) {
    await addPerrico();
  }
};

  document.querySelector('#add-5-perricos').addEventListener('click', () => addMultiplePerricos(5));


// Filtrar perricos con likes y guardarlos en un array
function getPerricosWithLikes() {
  const likedPerricos = perricosArray.filter((_, index) => likesPerrico[index].likes > 0);
  console.log('Perricos con likes:', likedPerricos);
  return likedPerricos;
}

  document.querySelector('#perricos-preciosisimos').addEventListener('click', () => getPerricosWithLikes());

// Pintar los perritos con likes
function renderLikedPerricos() {
  const dogList = document.querySelector('#dog-list'); 
  dogList.innerHTML = ''; 

  likedPerricos.forEach((dogImage, index) => {
    // Renderiza una tarjeta para cada perrito con likes
    const htmlAdd = `
      <div class="card">
        <img src="${dogImage}" alt="Perro" />
        <br />
        <p><span class="like-count">${likesPerrico[index].likes}</span>❤️ 🤮<span class="dislike-count">${likesPerrico[index].dislikes}</span></p>
      </div>
    `;
    dogList.innerHTML += htmlAdd;
  });
}

// Renderizar los perricos iniciales
renderPerricoArray();
  
  

  
  

  