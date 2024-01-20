let body = document.querySelector("body");
body.prepend(createForm());
let form = document.querySelector('form');
let searchTerm = document.querySelector('#searchTerm');
let ul = document.querySelector("#giphyList");

function createForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let searchButton = document.createElement('button');
    searchButton.innerText = "Search Giphy!";
    let removeButton = document.createElement('button');
    removeButton.innerText = "Remove Images";
    input.setAttribute("id", "searchTerm");
    input.setAttribute("placeholder", "Enter a search term")
    form.append(input);
    form.append(searchButton);
    form.append(removeButton);
    return form;
}

function apiKey() {
    return "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
}
async function searchGiphy(term, key) {
    try {
        let res = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=${key}`);

        let {data} = res.data;
        let randIndx = Math.floor(Math.random() * data.length)
        let {url} = data[randIndx].images.original;
        let {title} = data[randIndx];
        displayGiphy(url,title);
    } catch(e) {
        alert("Invalid term entered for search");
    }
}

function displayGiphy(img,title) {
    ul.append(createNewGipsyLi(img, title));
}

function createNewGipsyLi(gif, title) {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.setAttribute('src', gif);
    img.setAttribute('alt', title);
    li.append(img);
    return li;
}

function formSubmission(e) {
    e.preventDefault();
    if(e.target.tagName === "INPUT") {

    }else if(e.target.innerText === "Search Giphy!") {
        let {value} = searchTerm;
        searchGiphy(value.toLowerCase(), apiKey());            
    }else if(e.target.innerText.includes("Remove")) {
        ul.innerHTML = "";
    }
    searchTerm.value = "";
}

function headerRandomColors() {
   let header = document.querySelectorAll(".changeColor");
   setInterval(() => {
    for(let word of header) {
        let r = Math.floor(Math.random() * 240);
        let g = Math.floor(Math.random() * 100);
        let b = Math.floor(Math.random() * 50);
        word.style.color =  `rgb(${r}, ${g}, ${b})`;
    }
   },800);
}

document.addEventListener('DOMContentLoaded', headerRandomColors);

form.addEventListener('click', formSubmission);
