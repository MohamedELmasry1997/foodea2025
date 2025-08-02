
let myArray = [];

let searchInput = document.getElementById("searchInput");

let myBtn = document.querySelector(".btn-warning");

let loading = document.querySelector('.loading')

getRecipes("pasta");


myBtn.addEventListener('click', function () {
    getRecipes(searchInput.value)
})

async function getRecipes(meal) {
    try {
        loading.classList.remove("d-none");

        let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
        let data = await response.json()
        myArray = data.recipes;
        console.log(myArray);
        loading.classList.add("d-none");

        displayData();
    } catch (error) {
        loading.classList.add("d-none");
        
    }
}

getRecipes();
function displayData() {
    let box = ''
    for (let i = 0; i < myArray.length; i++){
        box += `
        <div class="col-md-3 ">
                            <div class="card text-center my-5 pb-5">
                                <div class="card-img rounded ">
                                    <img src="${myArray[i].image_url}" class="w-100" alt="">
                                    <h4>${myArray[i].title.split(' ').splice(0,3).join(' ')}.</h4>
                                    <a class="py-5" href="${myArray[i].source_url}">${myArray[i].source_url.split('').splice(0,20).join('')}</a>
                                </div>
                            </div>
                        </div>
        `;
    }
    document.getElementById('rowData').innerHTML = box
}
