// js solution if the blocks are larger than the screen
// 


scrollNow('css')

function scrollNow(config) {
  if (config == 'css') {
    console.log('config!')
    return
  }
    document.querySelectorAll('nav a').forEach(a => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({behavior: 'smooth', left: document.querySelector(a.hash).offsetLeft - 20});
      })
  
    })
  
}
