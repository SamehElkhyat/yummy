// the slider
let sliderwidth = $(".slider").innerWidth();
$("#sidebar").animate({left:-sliderwidth})

$(".side").click(function(){
  
  let sliderwidth = $(".slider").innerWidth();
  

if($("#sidebar").css("left")=="0px" )
{
  $("#sidebar").animate({left:-sliderwidth} ,  1000 , function(){
    $("#bar").removeClass("d-none");
    $("#x").addClass("d-none");
    // $(".slider li").css("top","0px"); 
    $(".liHead1").animate({ top: "0px" }, 600);
    $(".slider li").animate({ top: "200px" }, 1000);
  })
 

   
}else{


$("#sidebar").animate({left:"0px"} , 1000 , function(){
  $("#bar").addClass("d-none");
$("#x").removeClass("d-none");
// $(".slider li").css("top","0px"); 
$(".liHead1").animate({ top: "0px" }, 600);
$(".liHead2").animate({ top: "0px" }, 800);
$(".liHead3").animate({ top: "0px" }, 1000);
$(".liHead4").animate({ top: "0px" }, 1200);
$(".liHead5").animate({ top: "0px" }, 1400);
})}

})

$("document").ready(function(){
$("#loading").fadeOut(2000)

})
// .....................................................................
// the api http
async function getapi ()
{
let responseapi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
let finalresult = await responseapi.json();
let meal = finalresult.meals;
let cartoona="";
for(let i=0 ;i<meal.length ;i++ )
{
  cartoona+=`
  <div class="thefirstapi  col-md-3">
  <div  class="imgIcon position-relative overflow-hidden text-text-center">
  <img class="product w-100 rounded" src="${meal[i].strMealThumb}" alt="">
  <div class="overlay d-flex align-items-center rounded">
      <h3 class="header fw-lighter">${meal[i].strMeal}</h3>
  </div>
</div>
</div> 
`;
}
document.getElementById('rowdata').innerHTML=cartoona;
}
getapi();
// .....................................................................
// the catogry from slider
document.querySelector(".categoriesP").addEventListener("click",ShowCategory) 
  async function ShowCategory(){

    let sliderwidth = $(".slider").innerWidth();
    $("#sidebar").css("left", -sliderwidth);
    $("#bar").removeClass("d-none");
    $("#x").addClass("d-none");
    
    $(".thefirstapi").addClass("d-none");
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
    //...........................................................................
    document.querySelector(".items").innerHTML = items;
    $(".imgIcon").on("click",async function () { 
     let category =(e.currentTarget.children[1].children[0].innerHTML)
     items = "";
     let response = await fetch(
       `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
     );
     response = await response.json();
     let meal = await response.meals;
     console.log(meal);
     displayItems(meal);

         document.querySelector(".items").innerHTML = items;
    
        })}
;

// .........................................,..................................................




//area...........................................................................................

document.querySelector(".areaP").addEventListener("click", async function (){
  let sliderwidth = $(".slider").innerWidth();
      $("#sidebar").css("left", -sliderwidth);
      $("#bar").removeClass("d-none");
      $("#x").addClass("d-none");
      $(".thefirstapi").addClass("d-none");
      items = "";
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    response = await response.json();
    let meal = await response.meals;
    for (let i = 0; i < 20; i++) {
      items += `<div class="col-md-3 p-5">
          <div  class="img position-relative text-center text-white overflow-hidden">
          <i class="knife fa-solid fa-utensils"></i>              
          <h2 class="header mt-2 fw-normal">${meal[i].strArea}</h2>
              </div>
          </div>
          </div> `;
      }
      document.querySelector(".items").innerHTML = items;
      $(".img").addEventListener("click", async function() { 
       items = "";
       let response = await fetch(
         `https://www.themealdb.com/api/json/v1/1/filter.php?a=`
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
   
        }})});
  







//........................................................................................................................ 
document.querySelector(".IngredientsP").addEventListener("click", async function showIngredientsP (){
  let sliderwidth = $(".slider").innerWidth();
  $("#sidebar").css("left", -sliderwidth);
  $("#bar").removeClass("d-none");
  $("#x").addClass("d-none");
  $(".thefirstapi").addClass("d-none");
  items = "";
let response = await fetch(
  `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
);
response = await response.json();
let meal = await response.meals;
for (let i = 0; i < 25; i++) {
  items += `<div class="col-md-3 p-1">
      <div  class="IngredientsPimg position-relative text-center text-white overflow-hidden">
        <i class="fa-solid fa-bowl-food fa-3x"></i>          
        <h2 class="header m-2 fw-normal">${meal[i].strIngredient}</h2>
        <p>${meal[i].strDescription.slice(0,80)}</p>
          </div>
      </div>
      </div> `;
  }
document.querySelector(".items").innerHTML = items;
$(".IngredientsPimg").addEventListener("click", async function (){ 
  console.log(e.currentTarget.children[1].innerHTML)
  let ingredient =(e.currentTarget.children[1].innerHTML)
  items = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
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
}})});




document.querySelector(".ContactP").addEventListener("click", async function (){
  let sliderwidth = $(".slider").innerWidth();
  $("#sidebar").css("left", -sliderwidth);
  $("#bar").removeClass("d-none");
  $("#x").addClass("d-none");
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
                            Enter your Phone Number
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
                                        Enter valid email.
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





