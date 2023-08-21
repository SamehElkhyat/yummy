let sliderWidth;
let items;
let moreItem;

window.onload = function () {
  $("#loading").fadeOut(1000, function () {
    $("body").css("overflow", "auto");
  });
};

$(".nav-virtical").css("left",-sliderWidth)
$(".slider li").animate({ top: "2000px" }, 1000);
$(".slider li").css("top", "0px");
document.querySelector(".but").addEventListener("click", () => {
   sliderWidth = $(".slider").outerWidth();
  if ($(".nav-virtical").css("left") === "0px") {
    $(".nav-virtical").css("left", -sliderWidth);
    $("#list").removeClass("d-none");
    $("#close").addClass("d-none");
    $(".slider li").animate({ top: "2000px" }, 1000);
  } else {
    $(".nav-virtical").css("left", "0px");
    $("#list").addClass("d-none");
    $("#close").removeClass("d-none");
    $(".liHead1").animate({ top: "0px" }, 600);
    $(".liHead2").animate({ top: "0px" }, 800);
    $(".liHead3").animate({ top: "0px" }, 1000);
    $(".liHead4").animate({ top: "0px" }, 1200);
    $(".liHead5").animate({ top: "0px" }, 1400);
  }
});

 async function display() {
  items = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  response = await response.json();
  let meal = await response.meals;
  for (let i = 0; i < meal.length; i++) {
    items += `<div class="col-md-3">
    <div  class="imgIcon position-relative overflow-hidden">
        <img class="product w-100 rounded" src="${meal[i].strMealThumb}" alt="">
        <div class="overlay d-flex align-items-center rounded">
            <h3 class="header fw-lighter">${meal[i].strMeal}</h3>
        </div>
    </div>
    </div> `;  
  }
  document.querySelector(".items").innerHTML = items;
  $(".overlay").on("click", (e) => {
      showItems(e)})}
;
display()
  async function showItems(e){
    console.log(e.target.children[0].innerHTML);

  let mealName = e.target.children[0].innerHTML;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  response = await response.json();
  let meal = await response.meals;
  let description;
  let recipe;
  description = `<div class="col-md-4 text-white">
                              <img class="w-100" src="${
                meal[0].strMealThumb
                }" alt="">
                <h3 class="header fw-lighter">${
                meal[0].strMeal
                }</h3>
            </div>
            <div class="col-md-8 text-white">
                <h2 class="fw-light">Instructions</h2>
                <p class="fw-lighter mb-4">${
                meal[0].strInstructions
                }</p>
                <h6 class="mb-3"><span>Area :</span>${
                meal[0].strArea
                }</h6>
                <h6 class="mb-3"><span>Category :</span>${
                meal[0].strCategory
                }</h6>
                <h3 class="fw-light"><span>Recipes :</span></h3>
                <ul class="liLoop d-flex flex-wrap p-0">
                    ${liLoop(meal)}
                </ul>
                <h3 class="fw-light mb-4"><span>Tags :</span>${
                meal[0].strTags
                }</h3>
                <button class="btn btn-success fw-light"><a class="text-decoration-none text-white"  target="_blank" href="${
                meal[0].strSource
                }" >source</a></button>
                <button class="btn btn-danger fw-light"><a class="text-decoration-none text-white"  target="_blank" href="${
                meal[0].strYoutube
                }" >Youtub</a></button>`;
  function liLoop(meal) {
    recipe = "";
    for (let i = 1; i < 20; i++) {
      if (meal[0][`strIngredient${i}`] !== "")
        recipe += `<li class="recipe">${meal[0][`strMeasure${i}`]} ${
            meal[0][`strIngredient${i}`]
        }</li>`;
    }
    return recipe;
}

document.querySelector(".items").innerHTML = description;
};
document.querySelector(".searchPage").addEventListener("click",()=>{
    items ="";
    moreItem = "";
     $(".nav-virtical").css("left", -sliderWidth);
     $("#list").removeClass("d-none");
     $("#close").addClass("d-none");
     moreItem =`
             <div class="col-md-6">
             <input id="name" class="form-control mb-2 " placeholder="Search By Name">
         </div>
         <div class="col-md-6">
             <input id="FLitter" class="form-control mb-2 " placeholder="Search By First Litter.">
         </div>`
    document.querySelector(".search").innerHTML = moreItem;
    document.querySelector(".items").innerHTML = items;
 
     $("#name").on("keyup", async (e) => {
       let name = e.target.value;
       items = "";
       let response = await fetch(
         `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
         );
         response = await response.json();
         let meal = response.meals;
         if(name == ""){items = ""
         }else{
           if(meal !== null ){
           for (let i = 0; i < meal.length; i++) {
             if((e.code) !== "Enter"){
                 if (meal[i].strMeal.toLowerCase().includes(e.target.value.toLowerCase())) {
                     items += `<div class="col-md-3">
                     <div class="imgIcon position-relative overflow-hidden">
                         <img class="product w-100 rounded" src="${meal[i].strMealThumb}" alt="">
                             <div class="overlay d-flex align-items-center rounded">
                             <h3 class="header fw-lighter">${meal[i].strMeal}</h3>
                         </div>
                         </div>
                     </div>`;
                 }
             } }
         }else{
             items=""
         }}
           document.querySelector(".items").innerHTML = items;
           $(".overlay").on("click",async (e) => {
             showItems(e)})
});
     $("#FLitter").on("keyup", async (e) => {
         let l;
         if(  e.target.value.length === 1){
             l= e.target.value;
             items = "";
             let response = await fetch(
           `https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`
           );
           response = await response.json();
           let meal = await response.meals;
            for (let i = 0; i < meal.length; i++) {
             if((e.code) !== "Enter"){
                 if (meal[i].strMeal[0].toLowerCase() == (l.toLowerCase())) {
                     items += `<div class="col-md-3">
                     <div class="imgIcon position-relative overflow-hidden">
                     <img class="product w-100 rounded" src="${meal[i].strMealThumb}" alt="">
                     <div class="overlay d-flex align-items-center rounded">
                     <h3 class="header fw-lighter">${meal[i].strMeal}</h3>
                     </div>
                     </div>
                     </div>`;
                 }
             }
         }
           document.querySelector(".items").innerHTML = items;
           $(".overlay").on("click",async (e) => {
             showItems(e)})
         }
     });
//  }

})



document.querySelector(".categoriesP").addEventListener("click",ShowCategory) 
  async function ShowCategory(){
    console.log("category")
    $(".nav-virtical").css("left", -sliderWidth);
    $("#list").removeClass("d-none");
    $("#close").addClass("d-none");
    items = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  let meal = await response.categories;
  for (let i = 0; i < 14; i++) {
    items += `<div class="col-md-3">
        <div  class="imgIcon position-relative overflow-hidden">
            <img class="product w-100 rounded" src="${meal[i].strCategoryThumb}" alt="">
            <div class="overlay text-center p-2 rounded overflow-hidden">
                <h2 class="header mt-2 fw-normal">${meal[i].strCategory}</h2>
                <p>${meal[i].strCategoryDescription}</p>
            </div>
        </div>
        </div> `;
    }
    document.querySelector(".items").innerHTML = items;
    $(".imgIcon").on("click",async (e) => { 
     let category =(e.currentTarget.children[1].children[0].innerHTML)
     items = "";
     let response = await fetch(
       `https://www.themealdb.com/api/json/v1/1/categories.php/`
     );
     response = await response.json();
     let meal = await response.meals;
     console.log(meal);
     displayItems(meal);
   
         document.querySelector(".items").innerHTML = items;
         $(".overlay").on("click", (e) => {
             showItems(e)})}
)};
  
document.querySelector(".areaP").addEventListener("click", async function (){
      $(".nav-virtical").css("left", -sliderWidth);
      $("#list").removeClass("d-none");
      $("#close").addClass("d-none");
      items = "";
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    response = await response.json();
    let meal = await response.meals;
    for (let i = 0; i < 20; i++) {
      items += `<div class="col-md-3 p-5">
          <div  class="imgIcon position-relative text-center text-white overflow-hidden">
          <i class="fa-solid fa-city fa-3x"></i>              
          <h2 class="header mt-2 fw-normal">${meal[i].strArea}</h2>
              </div>
          </div>
          </div> `;
      }
      document.querySelector(".items").innerHTML = items;
      $(".imgIcon").on("click", async (e) => { 
       let area =(e.currentTarget.children[1].innerHTML)
       items = "";
       let response = await fetch(
         `https://www.themealdb.com/api/json/v1/1/random.php`
       );
       response = await response.json();
       let meal = await response.meals;
       console.log(meal);
       for (let i = 0; i < meal.leanght; i++) {
        items += `<div class="col-md-3">
            <div  class="imgIcon position-relative overflow-hidden">
                <img class="product w-100 rounded" src="${meal[i].strMealThumb}" alt="">
                <div class="overlay d-flex align-items-center rounded">
                    <h3 class="header fw-lighter">${meal[i].strMeal}</h3>
                </div>
            </div>
            </div> `;
     
      document.querySelector(".items").innerHTML = items;
      $(".overlay").on("click", (e) => {
          showItems()})}
    })});
  


document.querySelector(".IngredientsP").addEventListener("click", async function (){
  $(".nav-virtical").css("left", -sliderWidth);
  $("#list").removeClass("d-none");
  $("#close").addClass("d-none");
  items = "";
let response = await fetch(
  `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
);
response = await response.json();
let meal = await response.meals;
for (let i = 0; i < 25; i++) {
  items += `<div class="col-md-3 p-1">
      <div  class="imgIcon position-relative text-center text-white overflow-hidden">
        <i class="fa-solid fa-bowl-food fa-3x"></i>          
        <h2 class="header m-2 fw-normal">${meal[i].strIngredient}</h2>
        <p>${meal[i].strDescription.slice(0,80)}</p>
          </div>
      </div>
      </div> `;
  }
  document.querySelector(".items").innerHTML = items;
  $(".imgIcon").on("click", async (e) => { 
    console.log(e.currentTarget.children[1].innerHTML)
    let ingredient =(e.currentTarget.children[1].innerHTML)
    items = "";
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    response = await response.json();
    let meal = await response.meals;
    console.log(meal);
    for (let i = 0; i < 25; i++) {
    items += `<div class="col-md-3">
        <div  class="imgIcon position-relative overflow-hidden">
            <img class="product w-100 rounded" src="${meal[i].strMealThumb}" alt="">
            <div class="overlay d-flex align-items-center rounded">
                <h3 class="header fw-lighter">${meal[i].strMeal}</h3>
            </div>
        </div>
        </div> `;
  
  document.querySelector(".items").innerHTML = items;
  $(".overlay").on("click", (e) => {
      showItems(e)})}
})});


document.querySelector(".ContactP").addEventListener("click", async function (){
  $(".nav-virtical").css("left", -sliderWidth);
  $("#list").removeClass("d-none");
  $("#close").addClass("d-none");
  $(".thefirstapi").addClass("d-none");
  items = `
  <div class="m-1 text-center">
                    <h2 class="mx-auto text-white">ContacUs...</h2>
                    <div class="row">
                        <div class="col-md-6 px-4">
                            <div class="form-group">
                            <input class="form-control valid shadow my-4"  id="name" type="text" placeholder="Enter Your Name">
                            <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                            Special Characters and Numbers not allowed
                            </div>
                            </div>
                                <div class="form-group">
                            <input class="form-control shadow my-4"  id="phone" type="number" placeholder="Enter Phone">
                            <div class="alert mt-1 alert-danger d-none" id="phonealert" role="alert">
                            Enter valid Phone Number
                            </div>
                            </div>
                                <div class="form-group">
                            <input class="form-control shadow my-4"  id="password" type="password" placeholder="Enter Password">
                            <div class="alert mt-1 alert-danger d-none" id="passwordalert" role="alert">
                                        Enter valid password *Minimum eight characters, at least one letter and one number:*						
                                    </div>
                            </div>
                            </div>
                        <div class="col-md-6 px-4">
                                <div class="form-group">
                            <input class="form-control shadow my-4"  id="email" type="email" placeholder="Enter Email">
                            <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                                        Enter valid email. *Ex: xxx@yyy.zzz
                            </div>
                            </div>
                                <div class="form-group">
                            <input class="form-control shadow my-4"  id="age" type="number" placeholder="Enter Age">
                            <div class="alert mt-1 alert-danger d-none" id="phonealert" role="alert">
                                        Enter valid Age
                            </div>
                            </div>
                                <div class="form-group">
                            <input class="form-control shadow my-4"  id="Repassword" type="password" placeholder="Enter Repassword">
                            <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                                        Enter valid Repassword                        
                                    </div>
                            </div>
                        </div>
                    </div>
                     <button class="btn btn-outline-danger">Submit</button>
  </div>`;
  

  document.querySelector(".items").innerHTML = items;
})

