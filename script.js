const button = document.getElementById('search');
button.addEventListener('click', () => {
const clientInput = document.getElementById('clientInput');
const form = document.getElementById('form');

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${clientInput.value}`)
    .then(response => response.json())
    .then(data => {
      let html = " ";
    if (data.meals) {
      data.meals.forEach(meal => {
     html += `
    <div class="col-md-3" style="margin-top: 20px;" data-id="${meal.idMeal}">
    <div class=" card text-center " >
      <img src="${meal.strMealThumb} " data-id="${meal.idMeal}" class="card-img-top " >
    <div class="card-body " data-id="${meal.idMeal}">
      <h3 class="card-text text-center " data-id="${meal.idMeal}" >${meal.strMeal}</h3>
    </div>
    </div>
    </div>
     `;
     });
     } else {
        html = " Sorry ! Requested meal not available.";
        form.classList.add('not-available');
        }
        form.innerHTML = html;
        })
});

form.addEventListener('click', (event) => {
    const idfind = event.target;
    const detailsId = idfind.dataset.id;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsId}`)
        .then(response => response.json())
        .then(data => {
            const details = document.getElementById('details');
            details.style.display = 'block';
            let itemDetails = " ";
            if (data.meals) {
                data.meals.forEach(meal => {

    itemDetails += `
        <div class="card mb-3">
        <button type="button" class="close" area-label="Close">
        <span area-hidden="true" id= "close" >&times;</span>
        </button>
        <img class="card-img-top" style="width: 40%; border-top-right-radius: 2%; border-top-left-radius: 2%; margin-top:20px; " src="${meal.strMealThumb}" data-id="${meal.idMeal}" alt="Card image cap">
        <div class="card-body">
            <h4>Category: <span>${meal.strCategory}</span></h4>
            <h5 class="card-title text-lite">Item: <span>${meal.strArea}</span></h5>
            <p class="card-text text-center" >${meal.strInstructions}</p>
        </div>
        </div>
 
          `
         });
        details.innerHTML = itemDetails;
            }
        const close = document.getElementById('close');
        close.addEventListener('click', () => {
        const details = document.getElementById('details');
        details.style.display = 'none';
            })
        })
})
