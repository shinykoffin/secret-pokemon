let flagStart = false

const API_URL = 'https://pokeapi.co/api/v2/pokemon/:x:/'

const firstNameInput = document.querySelector('#first-name')
const lastNameInput = document.querySelector('#last-name')
const monthSelector = document.querySelector('#month')
const daySelector = document.querySelector('#day')
const yearSelector = document.querySelector('#year')
const goButton = document.querySelector('#submit-button')
const inputCard = document.querySelector('.input-card-container')

const pokemonIdSpan = document.querySelector('.pokemon-id')
const pokemonNameTitle = document.querySelector('.pokemon-name')
const pokemonImageContainer = document.querySelector('.pokemon-sprite-container')

initializeSelectElements()

function initializeSelectElements(){
   const currentYear = new Date().getFullYear()

   for(let i = 1; i <= 31; i++){
      const dayOpt = document.createElement('option')
      dayOpt.value = i
      dayOpt.innerHTML = i
      daySelector.appendChild(dayOpt)
   }

   for (let i = 1; i <=12 ; i++) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const monthOpt = document.createElement('option')
      monthOpt.value = i
      monthOpt.innerHTML = months[i-1]
      monthSelector.appendChild(monthOpt)
   }

   for (let i = 1950; i <= currentYear; i++) {
      const yearOpt = document.createElement('option')
      yearOpt.value = i
      yearOpt.innerHTML = i
      yearSelector.appendChild(yearOpt)
   }

   yearSelector.selectedIndex = yearSelector.options.length-1
}
async function getPokemon(){
   flagStart = true



   const firstLetter = getLetterValue(firstNameInput.value)
   const secondLetter = getLetterValue(lastNameInput.value)

   const day = parseInt(daySelector.value)
   const month = parseInt(monthSelector.value)
   const year = parseInt(yearSelector.value.slice(-2))

   inputCard.classList.add('invisible')

   const pokemonId = calcSecretPokemon(day, month, year, firstLetter, secondLetter)

   const response = await fetch(API_URL.replace(':x:',pokemonId))
   const json = await response.json()
   
   pokemonIdSpan.innerHTML += pokemonId
   pokemonNameTitle.innerHTML = json.name

   const pokemonImage = document.createElement('img')
   pokemonImage.src = json.sprites.front_default
   pokemonImage.classList.add('pokemon-sprite')
   pokemonImageContainer.appendChild(pokemonImage)
   console.log(json)
}



function getLetterValue(string){
   const letter = string.slice(0,1).toUpperCase()
   const letterValue = (letter.charCodeAt(0)-64)* 0.1
   return parseFloat(letterValue.toFixed(1))
}

function calcSecretPokemon(day, month, year, firstLetterValue, secondLetterValue){
   const firstNumber = day + month + year
   const secondNumber = firstLetterValue + secondLetterValue

   return Math.round(firstNumber * secondNumber)
}

goButton.addEventListener('click', getPokemon)
