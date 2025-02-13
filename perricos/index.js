const perricosArray = ['https://images.dog.ceo/breeds/affenpinscher/n02110627_10439.jpg'];
console.log(perricosArray);

const timeoutId = setTimeout(() => {
  document.querySelector('#add-warning').style.display = '';
}, 3000);
//  console.log(getRandomDogImage());

// addPerrico();

function clearWarningMessage() {
  clearTimeout(timeoutId);
  document.querySelector('#add-warning').style.display = 'none';
}

function addSocialListeners() {
  document.querySelectorAll('.like').forEach((buttonNode) => {
    buttonNode.addEventListener('click', function () {
      const hermanico = buttonNode.previousElementSibling;
      const likeCountNode = hermanico.querySelector('.like-count');
      likeCountNode.innerText = Number(likeCountNode.innerText) + 1;
    });
  });

  document.querySelectorAll('.dislike').forEach((buttonNode) => {
    buttonNode.addEventListener('click', function () {
      console.log(buttonNode.closest('.card'));
      const likeCountNode = buttonNode.closest('.card').querySelector('.dislike-count');
      likeCountNode.innerText = Number(likeCountNode.innerText) + 1;
    });
  });
}

function renderPerricoArray() {
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';

  perricosArray.forEach((dogImage, index) => {
    const cardNode = document.createElement('div');
    cardNode.className = 'card';

    cardNode.innerHTML = 
     `<img src="${dogImage}" alt="Perro" />
      <br />
      <p><span class="like-count"></span>❤️ <span class="dislike-count"></span>🤮</p>
      <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>`

    // const htmlAdd = 
    // `<div class="card">
    //   <img src="${dogImage}" alt="Perro" />
    //   <br />
    //   <p><span class="like-count"></span>❤️ <span class="dislike-count"></span>🤮</p>
    //   <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>
    // </div>`;

    dogList.appendChild(cardNode)
  });

  addSocialListeners();
}


const addPerrico = async (addToStart) => {
  document.querySelector('#add-1-perrico').disabled = true;

  const breed = document.querySelector('select').value;
  
  const perricoImg = await getBreeds(breed);

  

  if (addToStart) {
    perricosArray.unshift(perricoImg);
  } else {
    perricosArray.push(perricoImg);
  }
  

  const dogList = document.querySelector('#dog-list');

  const isAnyFilterSelected = document.querySelector('.filter-selected');

  const cardNode = document.createElement('div');
  cardNode.className = 'card';
  cardNode.style.display = isAnyFilterSelected ? 'none' : '';

  cardNode.innerHTML = ` <img src="${perricoImg}" alt="Perro" />
  <br />
  <p><span class="like-count"></span>❤️ <span class="dislike-count"></span>🤮</p>
  <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>`

//   const htmlAdd = `<div class="card" ${isAnyFilterSelected ? 'style="display:none"' : ''}>
//   <img src="${perricoImg}" alt="Perro" />
//   <br />
//   <p><span class="like-count"></span>❤️ <span class="dislike-count"></span>🤮</p>
//   <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>
// </div>`;

  if (addToStart) {
    dogList.prepend(cardNode); // usar prepend para ponerlo al principio
  } else {
    dogList.appendChild(cardNode); // usar appendchild para ponerlo al final
  }
  
  const likeButton = cardNode.querySelector('.like');

  likeButton.addEventListener('click', function () {
    const hermanico = likeButton.previousElementSibling;
    const likeCountNode = hermanico.querySelector('.like-count');
    likeCountNode.innerText = Number(likeCountNode.innerText) + 1;
  });

  const dislikeButton = cardNode.querySelector('.dislike');

  dislikeButton.addEventListener('click', function () {
    console.log(dislikeButton.closest('.card'));
    const likeCountNode = dislikeButton.closest('.card').querySelector('.dislike-count');
    likeCountNode.innerText = Number(likeCountNode.innerText) + 1;
  });

  document.querySelector('#add-1-perrico').disabled = false;
};



document.querySelector('.select').addEventListener('change', () =>{
  addPerrico()
})

document.querySelector('#add-1-perrico').addEventListener('click', function () {
  clearWarningMessage();
  
  addPerrico();
});

document.querySelector('#add-1-perrico-first').addEventListener('click', function () {
  clearWarningMessage();

  addPerrico(true);
});

document.querySelector('#add-5-perricos').addEventListener('click', function () {
  clearWarningMessage();

  addPerrico();
  addPerrico();
  addPerrico();
  addPerrico();
  addPerrico();
});

const likeFilterButton = document.querySelector('#like-filter');

likeFilterButton.addEventListener('click', function () {
  likeFilterButton.classList.toggle('filter-selected');
  filterPerricos();
});

const dislikeFilter = document.querySelector('#dislike-filter');

dislikeFilter.addEventListener('click', function () {
  dislikeFilter.classList.toggle('filter-selected');
  filterPerricos();
});

function filterPerricos() {
  const isLikeFilterSelected = likeFilterButton.classList.contains('filter-selected');
  const isDislikeSelected = dislikeFilter.classList.contains('filter-selected');
  console.log('filtering', {
    isLikeFilterSelected,
    isDislikeSelected
  });

  document.querySelectorAll('.card').forEach((perricoNode) => {
    // si no hay ningún filtro aplicado, lo muestra
    if (!isLikeFilterSelected && !isDislikeSelected) {
      perricoNode.style.display = '';
      return;
    }
    // si preciosismo aplicado y hay preciosisimo lo muestra
    const likeCount = perricoNode.querySelector('.like-count').innerText;
    if (likeCount !== '' && isLikeFilterSelected) {
      perricoNode.style.display = '';
      return;
    }

    // si feísimo aplicado y hay feísimo lo muestra
    const dislikeCount = perricoNode.querySelector('.dislike-count').innerText;
    if (dislikeCount !== '' && isDislikeSelected) {
      perricoNode.style.display = '';
      return;
    }

    perricoNode.style.display = 'none';
  });
}

document.querySelector('#dislike-filter').addEventListener('click', function () {
  console.log('dislike filter clicked');
});

renderPerricoArray();

// let automaticPerrosCount = 0;
// const intervalId = setInterval(() => {
//   addPerrico();
//   automaticPerrosCount++;

//   if (automaticPerrosCount === 2) {
//     clearInterval(intervalId);
//   }
// }, 1000);

