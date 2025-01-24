const perricosArray = [
    'https://images.dog.ceo/breeds/affenpinscher/n02110627_10439.jpg',
    'https://images.dog.ceo/breeds/affenpinscher/n02110627_10439.jpg'
  ];
  console.log(perricosArray);
  
  // console.log(getRandomDogImage());
  
  // addPerrico();
  
  function renderPerricoArray() {
    const dogList = document.querySelector('#dog-list');
    dogList.innerHTML = '';
  
    perricosArray.forEach((dogImage, index) => {
      const htmlAdd = `<div class="card">
    <img src="${dogImage}" alt="Perro" />
    <br />
    <p>❤️ <span id="like-count-${index}">0</span> 🤮</p>
    <button class="btn-preciosisimo" data-index=${index}>Preciosísimo</button> <button>Feísisimo</button>
  </div>`;
  
      console.log('innerHtml posición', index, dogList.innerHTML);
  
      dogList.innerHTML += htmlAdd;
    });
    document.querySelectorAll('.btn-preciosisimo').forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');
            const likeCount = document.querySelector(`#like-count-${index}`);
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        });
      });
  }
  
  const addPerrico = async () => {
    const perricoImg = await getRandomDogImage();
    console.log(perricoImg);
    perricosArray.push(perricoImg);
    renderPerricoArray();
  };
  
  renderPerricoArray();
  
  document.querySelector('#add-1-perrico').addEventListener('click', function () {
    addPerrico();
  });

  // add 5 perricos

  document.querySelector('#add-5-perricos').addEventListener('click', function() {
    for (let perrico = 0; perrico < 5; perrico++) {
        addPerrico();
    };
  });

  // votar preciosisimo 

  
  

  