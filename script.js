const apiurl = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getuser(username) {
  try {
    const { data } = await axios(apiurl + username);
    createusercard(data);
    getrepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createerrorcard("No github profile with this  username");
    }
  }
}

async function getrepos(username) {
  try {
    const { data } = await axios(apiurl + username + "/repos?sort=created");
    addrepostocard(data);
  } catch (err) {
    createerrorcard("Problem Fetching Repos");
  }
}

function createusercard(user) {
  const cardhtml = `
   <div class="card">
        <div><img src="${user.avatar_url}" alt="${user.name}" class="avatar" /></div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>
            ${user.bio}
          </p>

          <ul>
            <li>${user.followers}<strong>Followers&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</strong> </li><li>${user.following}<strong> Following &nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</strong></li><li>${user.public_repos} 
<strong> Repos </strong> </li>
          </ul>

          <div id="repos"></div>
        </div>
      </div> 
    `;
  main.innerHTML = cardhtml;
}

function createerrorcard(msg) {
  const cardhtml = `
    <div class="card">
    <h1>${msg}<h1>
    <div>
    `;
  main.innerHTML = cardhtml;
}

function addrepostocard(repos) {
  const reposEl = document.getElementById("repos");

  repos.forEach((repo) => {
    const repoel = document.createElement("a");
    repoel.classList.add("repo");
    repoel.href = repo.html_url;
    repoel.target = "_blank";
    repoel.innerText = repo.name;

    reposEl.appendChild(repoel);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getuser(user);

    search.value = "";
  }
});
