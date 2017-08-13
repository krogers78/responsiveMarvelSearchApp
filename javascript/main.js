//https://gateway.marvel.com:443/v1/public/comics?title=Wolverine&apikey=619e8982dc6d0215038b7966347bc50a

const searchSection = document.querySelector('#results')
const input = document.querySelector('#search input')
const form = document.querySelector('#search form')

let base = 'https://gateway.marvel.com:443/v1/public/comics?title='
const key = '&apikey=619e8982dc6d0215038b7966347bc50a'
const params = "$query="
const options = {
  method: "GET"
}
//get the previous results from local storage and populate if it's there
let previousSearch = localStorage.getItem('userSearch')
if (previousSearch) {
  document.querySelector('footer').style.position = 'static'

  searchSection.innerHTML = previousSearch
}
form.addEventListener('submit', e => {
  e.preventDefault()

  let hero = encodeURI(input.value)
  let url  = `${base}${hero}${key}`

  fetch(url, options)
    .then(response => response.json())
    .then(responseAsJson => {

      let data = responseAsJson.data.results
      renderData(data)

    })
    .catch(error => {
      console.log('An Error Occured:', error)
      searchSection.innerHTML = `
        <h2>Results for <span>${input.value}</span></h2>
                  <div class="wrapper">

                  <p>No results to show</p>
                  <p class="button"><a href="#">View More on Marvel</a></p>
                  </div>`
    })
})

let results = ""

const renderData = (data) => {
  results += `<h2>Results for <span>${input.value}</span></h2>
              <div class="wrapper">`

  data.forEach((item, index) => {
    if(item.title) {

      results += `<a href="${item.urls[0].url}" target="_blank"><article>
                  <img src="${item.thumbnail.path}.${item.thumbnail.extension}">
                  <div class="comicMeta">
                  <h3>${item.title}</h3>
                  <p>Issue Number ${item.issueNumber}</p>
                </div>
                </article></a>`
  }
})
  //to keep the footer at the bottom of the page
  document.querySelector('footer').style.position = 'static'
  results += '</div>'
  results += '<p class="button"><a href="#">View More on Marvel</a></p>'
  //save their results to the local storagae
  localStorage.setItem('userSearch', results)
  searchSection.innerHTML = results
  results = ""
}

// JavaScript for the nav menu
const modal = document.querySelector('#myModal')
const btn = document.querySelector('#openNav')
const span = document.querySelector('#myModal span')

btn.addEventListener('click', () => modal.style.display = 'block')
span.addEventListener('click', () => modal.style.display = 'none')
window.addEventListener('click', e => {
  if(e.target == modal) {
    modal.style.display = 'none'
  }
})
