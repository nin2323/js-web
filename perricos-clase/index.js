// antes tenía urls ahora va a tener un objeto con url de la imagen y la raza.
const perricosArray = [];
// Me va a guardar cuántos perricos hay de cada raza, va a guardar algo tipo chihuahua: 2
const breedsCount = {};

const filtersApplied = {
  dislike: false,
  like: false,
  breeds: []
};

const timeoutId = setTimeout(() => {
  document.querySelector('#add-warning').style.display = '';
}, 3000);
// console.log(getRandomDogImage());

// addPerrico();

async function createBreedsSelect() {
  // llamo a la función del endpoint;
  // cojo la respuesta que es un objeto clave valor donde la clave es el nombre de la raza y el valor un array con subrazas
  // y lo convierto en un array solo con las claves utilizando Object.keys
  // recorro el array de Object keys creando el html del select
  const breeds = await getBreeds();
  const breedsList = Object.keys(breeds);

  let breedsOptions = ''; //'<option value="">Random</option>';
  breedsList.forEach((breed) => {
    breedsOptions += `<option value="${breed}">${breed}</option>`;
  });

  document.querySelector('#breeds-picker').innerHTML = breedsOptions;
}

createBreedsSelect();

function clearWarningMessage() {
  clearTimeout(timeoutId);
  document.querySelector('#add-warning').style.display = 'none';
}

function renderPerricoArray() {
  const hasAnyFiltersApplied = filtersApplied.breeds.length > 0 || filtersApplied.like || filtersApplied.dislike;

  const filteredArray = !hasAnyFiltersApplied
    ? perricosArray
    : perricosArray.filter((perrico) => {
        if (filtersApplied.breeds.length > 0 && !filtersApplied.breeds.includes(perrico.breed)) {
          return false;
        }

        if (filtersApplied.like && filtersApplied.dislike) {
          return perrico.likeCount > 0 || perrico.dislikeCount > 0;
        }

        if (filtersApplied.like && perrico.likeCount === 0) {
          return false;
        }

        if (filtersApplied.dislike && perrico.dislikeCount === 0) {
          return false;
        }

        return true;
      });

  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';
  filteredArray.forEach((perricoInfo) => {
    renderPerrico(perricoInfo);
  });
}

function disableAllAddPerricoButtons() {
  document.querySelectorAll('.add-button').forEach((buttonNode) => {
    buttonNode.disabled = true;
  });
}

function enableAllAddPerricoButtons() {
  document.querySelectorAll('.add-button').forEach((buttonNode) => {
    buttonNode.disabled = false;
  });
}

function updateBreedsFilters(breed) {
  const breedsFiltersNode = document.querySelector('.breed-filters');

  breedsFiltersNode.style.display = '';

  const buttonId = `${breed}-filter`;

  if (!breedsCount[breed]) {
    breedsCount[breed] = 1;

    const filterNode = document.createElement('button');
    filterNode.id = buttonId;
    filterNode.innerText = `${breed} (1)`;
    breedsFiltersNode.appendChild(filterNode);

    filterNode.addEventListener('click', function () {
      const index = filtersApplied.breeds.indexOf(breed);

      if (index === -1) {
        filtersApplied.breeds.push(breed);
        filterNode.classList.add('filter-selected');
      } else {
        filtersApplied.breeds.splice(index, 1);
        filterNode.classList.remove('filter-selected');
      }

      renderPerricoArray();
    });
    return;
  }

  breedsCount[breed] += 1;
  const filterButtonNode = breedsFiltersNode.querySelector(`#${buttonId}`);
  filterButtonNode.innerHTML = `${breed} (${breedsCount[breed]})`;
}

function renderPerrico(perricoInfo, addToStart) {
  const dogList = document.querySelector('#dog-list');

  const perricoCardElement = document.createElement('div');
  perricoCardElement.className = 'card';

  perricoCardElement.innerHTML = `
  <img src="${perricoInfo.imgUrl}" alt="Perro" />
  <br />
  <p><span class="like-count">${perricoInfo.likeCount}</span>❤️ <span class="dislike-count">${perricoInfo.dislikeCount}</span>🤮</p>
  <button class="like">Preciosísimo</button> <button class="dislike">Feísisimo</button>`;

  if (addToStart) {
    dogList.prepend(perricoCardElement);
  } else {
    dogList.appendChild(perricoCardElement);
  }

  const likeButton = perricoCardElement.querySelector('.like');

  likeButton.addEventListener('click', function () {
    const likeCountNode = perricoCardElement.querySelector('.like-count');
    perricoInfo.likeCount += 1;
    likeCountNode.innerText = perricoInfo.likeCount;
  });

  const dislikeButton = perricoCardElement.querySelector('.dislike');
  dislikeButton.addEventListener('click', function () {
    const dislikeCount = perricoCardElement.querySelector('.dislike-count');
    perricoInfo.dislikeCount += 1;
    dislikeCount.innerText = perricoInfo.dislikeCount;
  });
}

const addPerrico = async (addToStart) => {
  const breed = document.querySelector('[name=breeds]').value;
  const perricoInfo = await getRandomDogImage(breed);

  if (addToStart) {
    perricosArray.unshift(perricoInfo);
  } else {
    perricosArray.push(perricoInfo);
  }
  updateBreedsFilters(breed);

  if (!filtersApplied.breeds.length || filtersApplied.breeds.includes(breed)) {
    renderPerrico(perricoInfo, addToStart);
  }
};

document.querySelector('#add-1-perrico').addEventListener('click', async function () {
  clearWarningMessage();

  disableAllAddPerricoButtons();
  await addPerrico();
  enableAllAddPerricoButtons();
});

document.querySelector('#add-1-perrico-start').addEventListener('click', async function () {
  clearWarningMessage();

  disableAllAddPerricoButtons();
  await addPerrico(true);
  enableAllAddPerricoButtons();
});

document.querySelector('#add-5-perricos').addEventListener('click', async function () {
  clearWarningMessage();

  disableAllAddPerricoButtons();
  await Promise.all([addPerrico(), addPerrico(), addPerrico(), addPerrico(), addPerrico()]);
  enableAllAddPerricoButtons();
});

const likeFilterButton = document.querySelector('#like-filter');

likeFilterButton.addEventListener('click', function () {
  likeFilterButton.classList.toggle('filter-selected');
  filtersApplied.like = !filtersApplied.like;
  renderPerricoArray();
});

const dislikeFilter = document.querySelector('#dislike-filter');

dislikeFilter.addEventListener('click', function () {
  dislikeFilter.classList.toggle('filter-selected');
  filtersApplied.dislike = !filtersApplied.dislike;
  renderPerricoArray();
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

renderPerricoArray();

// let automaticPerrosCount = 0;
// const intervalId = setInterval(() => {
//   addPerrico();
//   automaticPerrosCount++;

//   if (automaticPerrosCount === 2) {
//     clearInterval(intervalId);
//   }
// }, 1000);