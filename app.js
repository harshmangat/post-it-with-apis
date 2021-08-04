let title = document.querySelector("#title");
let paragraph = document.querySelector("#paragraph");
let imageUrl = document.querySelector("#url");
let postBtn = document.querySelector("#post");
let category = document.querySelector("#category");
let form = document.querySelector("form");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  newPost();
  e.target.reset();
});

 


  title.value = "";
  paragraph.value = "";
  imageUrl.value = "";
  category.value = "";
async function newPost() {
  const response = await axios.request({
    method: "post",
    url: 'https://peerup-web-dev-srv.herokuapp.com/parse/classes/PostIt',
    headers: {
      "X-Parse-Application-Id": "MVV6avFp",
      "Content-Type": "application/json",
    },
    data: {
      "title": title.value,
      "description": paragraph.value,
      "image": imageUrl.value,
      "category": category.value
    },
  });
  
  getData()
}



async function getData() {
  const response = await axios.request({
    method: "get",
    url: "https://peerup-web-dev-srv.herokuapp.com/parse/classes/PostIt",
    headers: {
      "X-Parse-Application-Id": "MVV6avFp",
      "Content-Type": "application/json",
    },
    data: {},
  });
  // console.log(response.data);

  for (let postDetails of response.data.results.reverse()) {
    console.log(postDetails);

    const postTemplate = `
    <div class="post">
      <img class="img" src="${postDetails.image}" />
      <h1 class="imgTitle">${postDetails.title}</h1>
      <div class="para">
        <p class="text">${postDetails.description}</p>
      </div>
      <button class="category">${postDetails.category}</button>
    </div>
  `;
    let bodyElement = document.body;
    const post = document.createElement("div");
    post.innerHTML = postTemplate;
    bodyElement.appendChild(post);
    
  }
}

getData();

