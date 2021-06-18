console.log("Lekan is Live");
const sideNav = document.querySelector(".fa-bars");
const submitBtn = document.querySelector(".submit");
const thankYou = document.querySelector(".thank-you-msg");

sideNav.addEventListener("click", () => {
    sideNav.classList.toggle("fa-times");
});

// submitBtn.addEventListener("click", function(e) {
//     e.preventDefault();
//     thankYou.innerHTML = "😁 Thank You, I'll get back to you shortly!";
// })

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
   navigator.serviceWorker.register('../sw.js').then( () => {
    console.log('Service Worker Registered')
   })
 })
}