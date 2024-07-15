// varibales
var intg=document.getElementById('recInt')
searchByName=document.getElementById('byName')
var closeAsideBtn = document.getElementById('closeAside')
var links = document.querySelectorAll('.links-container a')
var inputs = document.querySelectorAll('#validationContainer input')
var showpass=document.querySelectorAll('.pass-input i')
var searchbyliter=document.getElementById('byFirstLetter')
 
//main loading page
$(document).ready(()=>{
  $('.main-loader').fadeOut(500)
  $('body').removeClass('overflow-hidden')
  
})
//display random meals in main section
getMeals()
// -----------------------------------------all function---------------------------------------------

//function of get random meals 
async function getMeals() {
    $('.loader').removeClass('d-none')
    var api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    var res = await api.json()
    $('.loader').fadeOut(500)
    console.log(res.meals);
    dislplayMeals(res.meals)
  }
  //display meals
  function dislplayMeals(res){
    let box = '';
    for (let i = 0; i < res.length; i++) {
      box+=
      `<div class="col-md-3">
        <div onclick='getid(${res[i].idMeal})' class=" rounded-2 mealbox position-relative overflow-hidden">
          <img src='${res[i].strMealThumb}' class='w-100 h-100'>
          <div class="meal-overlay position-absolute w-100 h-100  vstack">
            <h3 class="fw-bold text-capitalize overlay-text">${res[i].strMeal}</h3>
          </div>
        </div>
      </div>`
    }
    $('#mealbox').html(box)
  } 
 
  //get data details of  meal
  async function getid(id){
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    var res = await api.json()
    $('.loader').fadeOut(500)
    $('#mealbox').addClass('d-none')
    $('#mealDetails').removeClass('d-none')
    var recIntbox = []
    var recInt =[]
    for (var i = 1; i <= 20; i++) {
      recIntbox.push('strIngredient' + `${i}`)
    }
    for (var i = 0; i < recIntbox.length; i++) {
      if (res.meals[0][recIntbox[i]] != '' && res.meals[0][recIntbox[i]] != null && res.meals[0][recIntbox[i]] != ' ' ) {
        recInt.push(res.meals[0][recIntbox[i]])
      }
    }

    var recMeabox = []
    var recMea =[]
    for (var i = 1; i <= 20; i++) {
      recMeabox.push('strMeasure' + `${i}`)
    }
    for (var i = 0; i < recMeabox.length; i++) {
      if (res.meals[0][recMeabox[i]] != ' ' && res.meals[0][recMeabox[i]] != '' && res.meals[0][recMeabox[i]] != null) {
        recMea.push(res.meals[0][recMeabox[i]])
      }
    }
    var tags = res.meals[0].strTags
    var finalTags = [];
    if (tags != null) {
      finalTags = res.meals[0].strTags.split(',')
    }else{
      finalTags = ['No Tags For This Meal']
    }
  
    dislplaydetofMeal(res.meals[0])
    displayInt(recInt , recMea )
    displayTag(finalTags)
    $('.serach').addClass('d-none')
    $('main').removeClass('d-none')
  }
  
  //function of display details of meal
  function dislplaydetofMeal(res){
    let box =
      ` <div class="col-md-4">
        <div class=" rounded-2 position-relative overflow-hidden">
          <img src="${res.strMealThumb}" class="w-100 h-100" alt="meal photo">
        </div>
        <h2 class="text-white ms-1 meal-caption">
          ${res.strMeal}
        </h2>
      </div>
      <div class="col-md-8">
        <div class="text-white Instructions-caption">
          <h1>Instructions:</h1>
          <p>
          ${res.strInstructions}
          </p>
          <h2>Area : <span class="h3">${res.strArea}</span></h2>
          <h2>Category  : <span class="h3">${res.strCategory}</span></h2>
          <h3 class="mt-1">Recipes   :</h3>
          <div class="mt-3 container">
            <div class="row gy-3 gx-1" id='recInt'>
              <!--recipes intgridents-->
            </div>
          </div>
          <h3 class="mt-3">Tags    :</h3>
          <div class="mt-3 container">
            <div class="row gy-3" id='tagContainer'>
            <!--recipes Tags-->
            </div>
          </div>
          <div class="mt-5 footer-btn">
            <a href="${res.strSource}" target='_blank' class="btn btn-success">Source</a>
            <a href="${res.strYoutube}" target='_blank' class="btn btn-danger">Youtube</a>
          </div>
        </div>
      </div>
      `
      $('#mealDetails').html(box)
  }
  //display Intgreident of meal
  function displayInt(arr1 , arr2){
    let box= ''
    for (let i = 0; i < arr1.length; i++) {
      box+=
      `<div class="col-md-4">
        <span class="alert alert-info p-1" role="alert">
          ${arr2[i]} ${arr1[i]}
        </span>
      </div>`
      
    }
    // #####################################33
    intg.innerHTML = box;
  }
  //Tags of meal
  function displayTag(arr){
    let box = '';
    for (let i = 0; i < arr.length; i++) {
      box +=
      `<div class="col-md-4">
        <span class="alert alert-danger p-1" role="alert">
          ${arr[i]}
        </span>
      </div>`
    }
    $('#tagContainer').html(box)
  }
  //get data,in search by name
  async function serachByName(meal){
    $('.search ').removeClass('d-none')
    $('.search').fadeIn(500)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    var res = await api.json()
    console.log(res);
    displaySerachByName(res.meals)
    $('.search').fadeOut(500)
  }
  //display,in search by name 
  function displaySerachByName(res){
    let box = ''
    for (let i = 0; i < res.length; i++) {
      box +=
      `<div class="col-md-3">
        <div  onclick='getid(${res[i].idMeal})' class=" rounded-2 meal-container position-relative overflow-hidden">
          <img src='${res[i].strMealThumb}' class='w-100 h-100'>
          <div class="meal-overlay position-absolute w-100 h-100 " >
            <h3 class="my-auto fw-bold text-capitalize">${res[i].strMeal}</h3>
          </div>
        </div>
      </div>
      `
    }
    $('#serachContainer').html(box)
  }
  //get data,in search with first char.
  async function serachByFirstLetter(char){
    $('.loader').fadeIn(500)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
    var res = await api.json()
    console.log(res);
  
    displaySerachByFirstLetter(res.meals)
    $('.loader').fadeOut(500)
  
  }
  //display data, in search with first char.
  function displaySerachByFirstLetter(res){
    let box = ''
    for (let i = 0; i < res.length; i++) {
      box +=
      `<div class="col-md-3">
          <div onclick='getid(${res[i].idMeal})' class=" rounded-2 meal-container position-relative overflow-hidden">
            <img src='${res[i].strMealThumb}' class='w-100 h-100'>
            <div  class="meal-overlay position-absolute w-100 h-100  vstack ">
              <h3 class="my-auto fw-bold text-capitalize">${res[i].strMeal}</h3>
            </div>
          </div>
        </div>
      `
    }
    $('#serachContainer').html(box)
  }
  //get data of categories 
  async function catrgory(){
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    var res = await api.json()
    console.log(res.categories);
    displayCatrgory(res.categories)
    $('.loader').fadeOut(500)
  }
  //display data of categories 
  function displayCatrgory(res){
    let box = ''
    for (let i = 0; i < res.length; i++) {
      box +=
      `
      <div class="col-md-3">
        <div onclick='displayCategorydata("${res[i].strCategory }")'  class=" rounded-2 meal-container position-relative overflow-hidden">
          <img src='${res[i].strCategoryThumb}' class='w-100 h-100'>
          <div class="meal-overlay position-absolute w-100 h-100  vstack ">
            <h3 class="my-auto fw-bold text-capitalize text-center">${res[i].strCategory}</h3>
            <p class="my-auto text-center text-capitalize">${res[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
          </div>
        </div>
      </div>
      `
    }
    $('#mealbox').html(box)
  }
  //display meal of categories 
  async function displayCategorydata(cate){
    console.log(cate);
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`)
    var res = await api.json()
    console.log(res.meals.slice(0,20));
    dislplayMeals(res.meals.slice(0,20))
    $('.loader').fadeOut(500)
  }
  //get data of area 
  async function Area(){
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    var res = await api.json()
    console.log(res.meals);
    displayArea(res.meals)
    $('.loader').fadeOut(500)
  }
  // display data of area 
  function displayArea(res){
    let box = ''
    for (let i = 0; i < res.length; i++) {
      box +=
      `
      <div class="col-md-3">
          <div class=" rounded-2 meal-container d-flex flex-column align-items-center justify-content-center overflow-hidden text-white"onclick='displayAreadata("${res[i].strArea }")'>
            <i class="fa-solid fa-house-laptop fa-4x d-block"></i>
            <h3 class="mt-2 fw-bold text-capitalize text-center">${res[i].strArea}</h3>
          </div>
        </div>
      `
    }
    $('#mealbox').html(box)
  }
  //display meal of area 
  async function displayAreadata(area){
    $(window).scrollTop(0)
    console.log(area);
    $('.loader').fadeIn(0)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    var res = await api.json()
    console.log(res.meals);
    dislplayMeals(res.meals)
    $('.loader').fadeOut(500)
  }
  //get data of Ingredients 
  async function Ingredients(){
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    var res = await api.json()
    console.log(res.meals.slice(0,20));
    displayIngredients(res.meals.slice(0,20))
    $('.loader').fadeOut(500)
  }
  //display data of Ingredients
  function displayIngredients(res){
    let box = ''
    for (let i = 0; i < res.length; i++) {
      box +=
      `
      <div class="col-md-3">
          <div class=" rounded-2 meal-container d-flex flex-column align-items-center justify-content-center overflow-hidden text-white"onclick='displayIngredientsdata("${res[i].strIngredient }")'>
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="mt-2 fw-bold text-capitalize text-center">${res[i].strIngredient}</h3>
            <p class="mt-2 fw-bold text-capitalize text-center">${res[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
          </div>
        </div>
      `
    }
    $('#mealbox').html(box)
  }
  //display data 
  async function displayIngredientsdata(Ingredients){
    console.log(Ingredients);
    $(window).scrollTop(0)
    $('.loader').fadeIn(0)
    var api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
    var res = await api.json()
    console.log(res.meals);
    dislplayMeals(res.meals)
    $('.loader').fadeOut(500)
  }


//  -------------------------------------all events------------------------------------------

//close and open aside
$('#closeAside').click(function(){
  if ($(this).hasClass('fa-bars')) {
    $(this).removeClass('fa-bars')
    $(this).addClass('fa-xmark')
    $('aside').animate({
      'left' : '0'
    } , 500)
    $('.links-container a').animate({
      'marginTop' : '0%'
    } , 750)
  }else{
    $(this).addClass('fa-bars')
    $(this).removeClass('fa-xmark')
    if ($('aside').innerWidth() == $('body').innerWidth() ) {
    $('aside').animate({
      'left' : '-75%'
      } , 500)
    }else{
      $('aside').animate({
        'left' : '-22.5%'
        } , 500)
  }
    $('.links-container a').animate({
      'marginTop' : '150%'
    } , 1000)
  }
})
 
// seacrh butt
links[0].addEventListener('click' , (e)=>{
  e.preventDefault()
  $('main').addClass('d-none')
  $('.serach').removeClass('d-none')
  if ($('body').innerWidth() < 600) {
    $('aside').animate({
      'left' : '-75%'
      } , 500)
    }else{
      $('aside').animate({
        'left' : '-22.5%'
        } , 500)
    }
    $('#closeAside').addClass('fa-bars')
    $('#closeAside').removeClass('fa-xmark')
    $('.links-container a').animate({
      'marginTop' : '150%'
    } , 1000)
})
//search by name 
searchbyname.addEventListener('keyup' , function(){
  console.log(this.value);
  let searchInputValue = this.value;
  serachByName(searchInputValue)
})
//search by first letter
searchbyliter.addEventListener('keyup' , function(){
  let searchInputValue = this.value;
  if (searchInputValue.length == 1) {
    serachByFirstLetter(searchInputValue)
  }
})
//bopen category section
links[1].addEventListener('click' , (e)=>{
  e.preventDefault()
  $('main').removeClass('d-none')
  $('#mealDetails').addClass('d-none')
  $('#validationContainer').addClass('d-none')
  $('#mealbox').removeClass('d-none')
  $('.serach').addClass('d-none')
  if ($('body').innerWidth() < 600 ) {   
    $('aside').animate({
      'left' : '-75%'
    } , 500)
  }else{
    $('aside').animate({
      'left' : '-22.5%'
    } , 500)
  }
  $('#closeAside').addClass('fa-bars')
  $('#closeAside').removeClass('fa-xmark')
  $('.links-container a').animate({
    'marginTop' : '150%'
  } , 1000)
  catrgory()
})
//open area section
links[2].addEventListener('click' , (e)=>{
  e.preventDefault()
  $('main').removeClass('d-none')
  $('#mealDetails').addClass('d-none')
  $('#validationContainer').addClass('d-none')
  $('#mealbox').removeClass('d-none')
  $('.serach').addClass('d-none')
  if ($('body').innerWidth() < 600 ) {
    $('aside').animate({
      'left' : '-75%'
    } , 500)
  }else{
    $('aside').animate({
      'left' : '-22.5%'
    } , 500)
  }
  $('#closeAside').addClass('fa-bars')
  $('#closeAside').removeClass('fa-xmark')
  $('.links-container a').animate({
    'marginTop' : '150%'
  } , 1000)
  Area()
})
//open Ingredients section
links[3].addEventListener('click' , (e)=>{
  e.preventDefault()
  $('main').removeClass('d-none')
  $('#mealDetails').addClass('d-none')
  $('#validationContainer').addClass('d-none')
  $('#mealbox').removeClass('d-none')
  $('.serach').addClass('d-none')
  if ($('body').innerWidth() < 600) {
    $('aside').animate({
      'left' : '-75%'
    } , 500)
  }else{
    $('aside').animate({
      'left' : '-22.5%'
    } , 500)
  }
  $('#closeAside').addClass('fa-bars')
  $('#closeAside').removeClass('fa-xmark')
  $('.links-container a').animate({
    'marginTop' : '150%'
  } , 1000)
  Ingredients()    
})
//open conact section
links[4].addEventListener('click' , (e)=>{
  e.preventDefault()
  $('main').removeClass('d-none')
  $('#mealDetails').addClass('d-none')
  $('#validationContainer').removeClass('d-none')
  $('#mealbox').addClass('d-none')
  $('.serach').addClass('d-none')
  if ($('body').innerWidth() < 600 ) {
    $('aside').animate({
      'left' : '-75%'
    } , 500)
  }else{
    $('aside').animate({
      'left' : '-22.5%'
    } , 500)
  }
  $('#closeAside').addClass('fa-bars')
  $('#closeAside').removeClass('fa-xmark')
  $('.links-container a').animate({
    'marginTop' : '150%'
  } , 1000)
})
 
document.forms[0].addEventListener('submit' , (e)=>{
  e.preventDefault()
})
 
document.forms[0].addEventListener('keyup' , (e)=>{
  if (Nameinp() && Emailinp() && Phoneinp() && Ageinp() && Passwordinp() && Repasswordinp() )  {
    $('#sunmitBtn').removeAttr('disabled')
    $('#sunmitBtn').addClass('btn-success')
    $('#sunmitBtn').removeClass('btn-outline-danger')
  }else{
    
    $('#sunmitBtn').attr('disabled' , 'true')
    $('#sunmitBtn').removeClass('btn-success')
    $('#sunmitBtn').addClass('btn-outline-danger')
  }
})
//show password

showpass.forEach(ele => {
  ele.addEventListener('click' , function(){
    if ($(this).next().val().length > 0 && $(this).hasClass('fa-eye') ) {
      $(this).removeClass('fa-eye')
      $(this).addClass('fa-eye-slash')
      $(this).next().attr('type' , 'text')
    } else {
      $(this).addClass('fa-eye')
      $(this).removeClass('fa-eye-slash')
      $(this).next().attr('type' , 'password')
    }
  })
})
//media query for side bar
window.addEventListener('resize' , ()=>{
  if ($('body').innerWidth() < 600) {
    $('aside').css({
      'left' : '-75%'
      })
    $('#closeAside').addClass('fa-bars')
    $('#closeAside').removeClass('fa-xmark')
  }else{
    $('aside').css({
      'left' : '-22.5%'
    })
    $('#closeAside').addClass('fa-bars')
    $('#closeAside').removeClass('fa-xmark')
  }
})


//------------------------------------valid-contact-sec---------------------------------------

function Nameinp(){
  var regex = /^[A-Za-z][A-z a-z]*$/

  if (regex.test(inputs[0].value)) {
    $(inputs[0]).addClass('is-valid')
    $(inputs[0]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[0]).addClass('is-invalid')
    $(inputs[0]).removeClass('is-valid')
    return false
  }
}
function Emailinp(){
  var regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

  if (regex.test(inputs[1].value)) {
    $(inputs[1]).addClass('is-valid')
    $(inputs[1]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[1]).addClass('is-invalid')
    $(inputs[1]).removeClass('is-valid')
    return false
  }
}
function Phoneinp(){
  var regex = /^(02)?(01)[0125][0-9]{8}$/

  if (regex.test(inputs[2].value)) {
    $(inputs[2]).addClass('is-valid')
    $(inputs[2]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[2]).addClass('is-invalid')
    $(inputs[2]).removeClass('is-valid')
    return false
  }
}
function Ageinp(){
  var regex = /^([1-7][0-9]|80)$/

  if (regex.test(inputs[3].value)) {
    $(inputs[3]).addClass('is-valid')
    $(inputs[3]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[3]).addClass('is-invalid')
    $(inputs[3]).removeClass('is-valid')
    return false
  }
}
function Passwordinp(){
  var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (regex.test(inputs[4].value)) {
    $(inputs[4]).addClass('is-valid')
    $(inputs[4]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[4]).addClass('is-invalid')
    $(inputs[4]).removeClass('is-valid')
    return false
  }
}
function Repasswordinp(){
  var checkPassword = (inputs[4].value == inputs[5].value) 
  if (checkPassword) {
    $(inputs[5]).addClass('is-valid')
    $(inputs[5]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[5]).addClass('is-invalid')
    $(inputs[5]).removeClass('is-valid')
    return false
  }
}