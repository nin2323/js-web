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
    <p>❤️ <span id="like-count-${index}">0</span>🤮 <span id="dislike-count-span-${index}">0</span></p>
    <button class="btn-preciosisimo" data-index=${index}>Preciosísimo</button> <button class="btn-feisisimo" data-index=${index}>Feísisimo</button>
  </div>`;
  
      console.log('innerHtml posición', index, dogList.innerHTML);
  
      dogList.innerHTML += htmlAdd;
    });
    // votar preciosisimo 
      document.querySelectorAll('.btn-preciosisimo').forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');
            const likeCount = document.querySelector(`#like-count-${index}`);
            // likeCount.textContent = parseInt(likeCount.textContent) + 1;
            let count = parseInt(likeCount.textContent)
            count++;
            likeCount.textContent = count
            if (count >= 4) {
              button.disabled = true;  
            };
        });
      });
      document.querySelectorAll('.btn-feisisimo').forEach(button => {
        button.addEventListener('click', function() {
          const index = button.getAttribute('data-index');
          const likeCountSpan = document.querySelector(`#dislike-count-span-${index}`);
          //likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;
          let count = parseInt(likeCountSpan.textContent)
            count++;
            likeCountSpan.textContent = count
            if (count >= 4) {
              button.disabled = true;  
            };
      });
    });
  };
  // add 1 perrico
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

  

  
  

  