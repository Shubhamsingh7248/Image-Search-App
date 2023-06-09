const accessKey = "g076s07IqgAjxgRXqkyUGt18iFdJlBer_5i-DDKeXVA";

const formEl = document.querySelector("form");
const inputEl= document.getElementById("search-input");

const searchResults=document.querySelector(".search-results");
const showMore = document.getElementById("show-button");

let inputData="";
let page= 1;

async function searchImages(){
    inputData= inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results= data.results;

    if(page===1)
    {
        searchResults.innerHTML="";
    }

    results.map((result)=>{
        
        const imageWrapper= document.createElement("div");
        imageWrapper.classList.add("search-result");
        
        const image= document.createElement("img");
        image.src = result.urls.small;
        image.alt=result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);



    });

    page++;
    if(page>1)
    {
        showMore.style.display="block";
    }
}

formEl.addEventListener("submit", (event) =>{
      event.preventDefault()
      page=1;
      searchImages()

})


showMore.addEventListener("click", (event) =>{
    
    searchImages()

})
const initialImages = document.querySelectorAll(".search-result img");
initialImages.forEach((image) => {
  image.addEventListener("click", () => {
    const query = image.alt;
    inputEl.value = query;
    formEl.dispatchEvent(new Event("submit"));
  });
});

// ...

const backButton = document.getElementById("back-button");

// Event listener for back button
backButton.addEventListener("click", () => {
  window.location.href = "index.html"; // Replace "index.html" with your home page URL
});

