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
const firsrtNameError = document.querySelector('#first-name-error')
const lastNameError = document.querySelector('#last-name-error')

initializeSelectElements()

function initializeSelectElements(){
   const currentYear = new Date().getFullYear()
   //Fill day dropdown selector
   for(let i = 1; i <= 31; i++){
      const dayOpt = document.createElement('option')
      dayOpt.value = i
      dayOpt.innerHTML = i
      daySelector.appendChild(dayOpt)
   }
   //Fill month selector
   for (let i = 1; i <=12 ; i++) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const monthOpt = document.createElement('option')
      monthOpt.value = i
      monthOpt.innerHTML = months[i-1]
      monthSelector.appendChild(monthOpt)
   }
   //Fill year selector
   for (let i = 1950; i <= currentYear; i++) {
      const yearOpt = document.createElement('option')
      yearOpt.value = i
      yearOpt.innerHTML = i
      yearSelector.appendChild(yearOpt)
   }
   //Current year as default option
   yearSelector.selectedIndex = yearSelector.options.length-1
}

function pokemonSetup(){
   const loadingAnimation = document.querySelector('.lds-spinner')
   if(flagStart == false){
      inputCard.classList.remove('visibleCard')
   }
   flagStart = true
   inputCard.classList.add('invisibleCard')
   
   const firstLetterValue = getLetterValue(firstNameInput.value)
   const secondLetterValue = getLetterValue(lastNameInput.value)
   const day = parseInt(daySelector.value)
   const month = parseInt(monthSelector.value)
   const year = parseInt(yearSelector.value.slice(-2))
   
   const pokemonId = calcSecretPokemon(day, month, year, firstLetterValue, secondLetterValue)
   
   loadingAnimation.style.display = 'inline-block'
   getPokemon(pokemonId)
   .then(pokemon =>{
      createPokemon(pokemon, pokemonId)
      loadingAnimation.style.display = 'none'
   })
   .catch(err => {
      loadingAnimation.style.display = 'none'
      callModal('','An error was ocurred: '+err)
      flagStart = false
   })
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

   while(pokemonId > POKEMON_LIMIT){
      pokemonId -= POKEMON_LIMIT
   }
   return pokemonId
}

async function getPokemon(pokemonId){
   const response = await fetch(API_URL.replace(':x:', pokemonId))
   const json = await response.json()
   return json
}

function createPokemon(pokemon, pokemonId){
   const OFFICIAL_POKEDEX_URL = 'https://api.pokemon.com/us/pokedex/'

   pokemonIdSpan.innerHTML += pokemonId
   pokemonNameTitle.innerHTML = pokemon.name

   const pokemonImage = document.createElement('img')
   pokemonImage.src = pokemon.sprites.front_default
   pokemonImage.classList.add('pokemon-sprite')
   pokemonImage.classList.add('fadeIn')
   pokemonImageContainer.appendChild(pokemonImage)

   pokemon.types.forEach(t => {
      const typeDiv = document.createElement('div')
      typeDiv.classList.add('type')
      typeDiv.classList.add(t.type.name)
      typeDiv.classList.add('fadeIn')
      typeDiv.innerHTML = t.type.name
      typeContainer.appendChild(typeDiv)
   });

   const moreInfoButton = document.createElement('a')
   moreInfoButton.classList.add('button-second')
   moreInfoButton.href = OFFICIAL_POKEDEX_URL + pokemon.name
   moreInfoButton.target = '_blank'
   moreInfoButton.innerHTML = 'More info...'
   buttonsContainer.appendChild(moreInfoButton)
}

function checkInput(){
   const letters = /^[a-zA-ZÀ-ÿ].*/
   let flag = true
   //First input
   if(firstNameInput.value == ''){
      firstNameInput.classList.add('error-border')
      firsrtNameError.innerHTML = 'Please enter your first name'
      flag = false
   }else if(!firstNameInput.value.match(letters)){
      firstNameInput.classList.add('error-border')
      firsrtNameError.innerHTML = 'Characters not allowed'
      flag = false
   }
   //Second Input
   if(lastNameInput.value == ''){
      lastNameInput.classList.add('error-border')
      lastNameError.innerHTML = 'Please enter your last name'
      flag = false
   }else if(!lastNameInput.value.match(letters)){
      lastNameInput.classList.add('error-border')
      lastNameError.innerHTML = 'Characters not allowed'
      flag = false
   }
   return flag
}

function resetApp(){
   if(flagStart){
      pokemonIdSpan.innerHTML = '#'
      pokemonNameTitle.innerHTML = ''
      firstNameInput.value = ''
      lastNameInput.value = ''
      
      pokemonImageContainer.removeChild(document.querySelector('.pokemon-sprite'))
      
      while(typeContainer.firstChild){
         typeContainer.removeChild(typeContainer.firstChild)
      }
      inputCard.classList.remove('invisibleCard')
      inputCard.classList.add('visibleCard')
      buttonsContainer.removeChild(buttonsContainer.childNodes[3])
      
      flagStart = false
   }else{
      inputCard.classList.remove('invisibleCard')
      inputCard.classList.add('visibleCard')
   }
}

function correctingInput(input, errorSpan){
   console.log(input.value)
   if(input.classList.contains('error-border')){
      input.classList.remove('error-border')
   }
   if(errorSpan.innerHTML){
      errorSpan.innerHTML = ''
   }
}

goButton.addEventListener('click', () => {
   if(checkInput()){
      pokemonSetup()
   }else{
      firstNameInput.addEventListener('focus', function callCorrect(){
         correctingInput(firstNameInput, firsrtNameError)
         firstNameInput.removeEventListener('focus', callCorrect)
      })
      lastNameInput.addEventListener('focus', function callCorrect(){
         correctingInput(lastNameInput, lastNameError)
         lastNameInput.removeEventListener('focus', callCorrect)
      })
   }
})

resetButton.addEventListener('click', resetApp)
