const userNameInput = document.getElementById("username");
const showDetailsButton = document.getElementById("showDetails");
const profileInfoDiv = document.getElementById("profileInfo");
const reposInfoDiv = document.getElementById("reposInfo");
const reposFilterLanguage = document.getElementById("reposFilterLanguage");

async function showReposInfo(userName) {
  const res = await fetch(`https://api.github.com/users/${userName}/repos`);
  const projects = await res.json();

  console.log(projects);

  for (let i = 0; i < projects.length; i++) {
    reposInfoDiv.innerHTML += `
          <div class="repos-card">
              
          
              <div class="repos-card-body">
                  <h2 class="repos-card-title"> ${projects[i].name}</h2>
                  <h4 class="repos-card-subHeading"> ${projects[i].description}</h4>
                  <h5 class="repos-card-language"> ${projects[i].language}</h5>
                  
                  <div class="repos-card-button">
                      <button class="btn">
                          <a href=${projects[i].html_url} target="_blank">Do checkout the project</a>
                      </button>
              
                  </div>
      
              </div>

          </div>`;
  }
}

reposFilterLanguage.addEventListener("input", function () {
  const filterValue = reposFilterLanguage.value.toLowerCase();

  //storing all repos-card in the repos variable
  const repos = document.querySelectorAll(".repos-card");

  //this function will compare the langue text for all repos-card and if it matches the input text it shows the repo and hides the other repos

  repos.forEach(function (repo) {
    const language = repo
      .querySelector(".repos-card-language")
      .innerText.toLowerCase();

    if (language.includes(filterValue)) {
      repo.style.display = "flex";
    } else {
      repo.style.display = "none";
    }
  });
});

showDetailsButton.addEventListener("click", () => {
  const userName = userNameInput.value;
  // i have to request for the data from the github server : for this we use fetch API
  fetch(`https://api.github.com/users/${userName}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      profileInfoDiv.innerHTML = `
          <div class="card">
              <div class="card-img">
                  <img src=${data.avatar_url} alt= ${data.name}>

              </div>
              <div class="card-body">
                  <div class="card-title"> <h2>${data.name}</h2></div>
                  <div class="card-subHeading"> <h4>${data.login}</h4></div>
                  <div class="card-text">
                      <p class="bio">${data.bio}</p>
                      <p class="follower-following-details">${data.followers} followers ${data.following} following</p>
                  </div>
      
              </div>
          

          </div>
      
      
      `;
      showReposInfo(userName);
    });
});
