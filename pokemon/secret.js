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
const typeContainer = document.querySelector('.type-container')
const resetButton = document.querySelector('.button-reset')
const buttonsContainer = document.querySelector('.buttons-container')

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

   const OFFICIAL_POKEDEX = 'https://api.pokemon.com/us/pokedex/'

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

   json.types.forEach(t => {
      const typeDiv = document.createElement('div')
      typeDiv.classList.add('type')
      typeDiv.classList.add(t.type.name)
      typeDiv.innerHTML = t.type.name
      typeContainer.appendChild(typeDiv)
   });

   const moreInfoButton = document.createElement('a')
   moreInfoButton.classList.add('button-second')
   moreInfoButton.href = OFFICIAL_POKEDEX +json.name
   moreInfoButton.target = '_blank'
   moreInfoButton.innerHTML = 'More info...'
   buttonsContainer.appendChild(moreInfoButton)
}

function checkInput(input){
   const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
   const errorMessage = document.createElement('span')
   errorMessage.classList.add('error-text')
   if(input.value == ''){
      input.classList.add('error-red')
      errorMessage.innerHTML = 'Please fill this'
      input.parentNode.insertBefore(errorMessage, input.nextSibling)
      return false
   }else if(!input.value.match(letters)){
      input.classList.add('error-red')
      errorMessage.innerHTML = 'Characters not allowed'
      input.parentNode.insertBefore(errorMessage, input.nextSibling)
      return false
   }
   return true
}

function getLetterValue(string){
   const letter = string.slice(0,1).toUpperCase()
   const letterValue = (letter.charCodeAt(0)-64)* 0.1
   return parseFloat(letterValue.toFixed(1))
}

function calcSecretPokemon(day, month, year, firstLetterValue, secondLetterValue){
   const POKEMON_LIMIT = 807
   const firstNumber = day + month + year
   const secondNumber = firstLetterValue + secondLetterValue
   
   let pokemonId = Math.round(firstNumber * secondNumber)
   console.log(pokemonId)
   while(pokemonId > POKEMON_LIMIT){
      pokemonId -= POKEMON_LIMIT
      console.log(pokemonId)
   }
   return pokemonId
}

function resetApp(){
   if(flagStart){
      pokemonIdSpan.innerHTML = '#'
      pokemonNameTitle.innerHTML = ''
      
      pokemonImageContainer.removeChild(pokemonImageContainer.firstChild)
      
      while(typeContainer.firstChild){
         typeContainer.removeChild(typeContainer.firstChild)
      }
      inputCard.classList.remove('invisible')
      buttonsContainer.removeChild(buttonsContainer.childNodes[3])

      flagStart = false
   }
}

// function correctingInput(){

// }
goButton.addEventListener('click', () => {
   const firstChek = checkInput(firstNameInput)
   const secondCheck = checkInput(lastNameInput)
   if(firstChek && secondCheck){
      getPokemon()
   }
})
resetButton.addEventListener('click', resetApp)
