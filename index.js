const burguerIcon = document.querySelector('#burger')
const howToModal = document.querySelector('.howTo')
const aboutLink = document.querySelector('.about-link')
const useLink = document.querySelector('.use-link')

const howToModalCloseButton = document.querySelector('.modal-close.howTo')

burguerIcon.addEventListener('click', function (){
   const menu = document.querySelector('.menu')
   menu.classList.toggle('menuShow')
})

aboutLink.onclick = function() {
   const aboutModal = document.querySelector('.about')
   const aboutModalCloseButton = document.querySelector('.modal-close.about')

   aboutModal.classList.toggle('modal-show')
   
   aboutModalCloseButton.addEventListener('click', function closeModal(){
      aboutModal.classList.toggle('modal-show')
      aboutModalCloseButton.removeEventListener('click',closeModal)
   })
}

