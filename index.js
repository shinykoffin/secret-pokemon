const burguerIcon = document.querySelector('#burger')
const howToModal = document.querySelector('.howTo')
const aboutLink = document.querySelector('.about-link')
const howToLink = document.querySelector('.howTo-link')

const howToModalCloseButton = document.querySelector('.modal-close.howTo')

burguerIcon.addEventListener('click', function (){
   const menu = document.querySelector('.menu')
   menu.classList.toggle('menuShow')
})

aboutLink.onclick = () => {
   const aboutModal = document.querySelector('.modal.about')
   const aboutModalCloseButton = document.querySelector('.modal-close.about')
   
   toggleVisibility(aboutModal)
   
   aboutModalCloseButton.addEventListener('click', function closeModal(){
      toggleVisibility(aboutModal)
      aboutModal.removeEventListener('click',closeModal)
      aboutModalCloseButton.removeEventListener('click',closeModal)
   })
}

howToLink.onclick = () =>{
   const howToModal = document.querySelector('.modal.howTo')
   const howToModalCloseButton = document.querySelector('.modal-close.howTo')

   toggleVisibility(howToModal)
   howToModalCloseButton.addEventListener('click', function closeModal(){
      toggleVisibility(howToModal)
      howToModalCloseButton.removeEventListener('click',closeModal)
   })
}



function toggleVisibility (element){
   element.classList.toggle('modal-show')
}