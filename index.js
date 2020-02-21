const burguerIcon = document.querySelector('#burger')
const aboutLink = document.querySelector('.about-link')
const howToLink = document.querySelector('.howTo-link')

burguerIcon.addEventListener('click', function (){
   const menu = document.querySelector('.menu')
   menu.classList.toggle('menuShow')
})

aboutLink.onclick = () => {
   const title = 'About'
   const text = 'This site will calculate a Pokemon for you using an algorithm based on <a href="https://imgur.com/gallery/mKd3DSM/new" target="_blank">this</a> image. <br > It was made by shinykoffin for Coding Garden\'s Seedling School'
   callModal(title, text)
}

howToLink.onclick = () =>{
   const title = 'How to Use'
   const text = 'Click the Start button, a new page will load. There you’ll need to enter your first name, last name, day, month and year of your birthday. Then click the go button and your Pokemon will appear in your screen! You can start over by clicking the reset button, or you can learn more about your Pokemon by clicking the More info button.'
   callModal(title, text)
}

function callModal(title, text){
   const modal = document.querySelector('.modal')
   const modalContent = document.querySelector('.modal-content')
   const modalCloseButton = document.querySelector('.modal-close')
   const titleContainer = document.querySelector('.modal-title')
   const textContainer = document.querySelector('.modal-text')

   titleContainer.innerHTML = title
   textContainer.innerHTML = text
   
   toggleVisibility(modal)
   
   modalCloseButton.addEventListener('click',function closeModal(){
      toggleVisibility(modal)
      titleContainer.innerHTML = ''
      textContainer.innerHTML = ''

      modalCloseButton.removeEventListener('click',closeModal)
   })
}

function toggleVisibility (element){
   element.classList.toggle('show')
}