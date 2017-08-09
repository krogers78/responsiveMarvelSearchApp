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
      searchSection.innerHTML = `<div class="wrapper">
                  <h2>Results for ${input.value}</h2>
                  <p>No results to show</p>
                  <p class="button"><a href="#">View More on Marvel</a></p>
                  </div>`
    })
})

let results = ""

const renderData = (data) => {
  results += `<div class="wrapper">
              <h2>Results for ${input.value}</h2>`

  data.forEach((item, index) => {
    if(item.title) {

      results += `<a href="${item.urls[0].url}" target="_blank"><article>
                  <img src="${item.thumbnail.path}.${item.thumbnail.extension}">
                  <h3>${item.title}</h3>
                  <p>Issue Number ${item.issueNumber}</p>
                </article></a>`
  }
})
  //to keep the footer at the bottom of the page
  document.querySelector('footer').style.position = 'static'
  results += '<p class="button"><a href="#">View More on Marvel</a></p>'
  results += '</div>'
  searchSection.innerHTML = results
  results = ""
}
