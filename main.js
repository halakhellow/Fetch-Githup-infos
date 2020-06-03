"use strict";
let username = document.querySelector("input"),
  button = document.querySelector("button"),
  fullName = document.querySelector(".name"),
  linkContainer = document.querySelector(".linkContainer"),
  alertMsg = document.querySelector(".alert"),
  repos = document.querySelector(".repos"),
  followings = document.querySelector(".followings"),
  followers = document.querySelector(".followers");

username.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getData();
  }
});

button.onclick = function () {
  getData();
};

function clearInfos() {
  fullName.innerHTML = linkContainer.innerHTML = repos.innerHTML = followings.innerHTML = followers.innerHTML =
    "";
}

function getData() {
  if (username.value === "") {
    clearInfos();
    alertMsg.setAttribute("style", "display: block");
  } else {
    clearInfos();
    alertMsg.setAttribute("style", "display: none");
    fetch(`https://api.github.com/users/${username.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Not Found") {
          clearInfos();
          linkContainer.innerHTML = "There is no account with this username";
        } else {
          fullName.appendChild(
            document
            .createElement("p")
            .appendChild(document.createTextNode(data.name))
          );

          let profilePic = document.createElement("img");
          profilePic.setAttribute("src", data.avatar_url);
          profilePic.setAttribute("alt", "Profile Picture");
          fullName.appendChild(profilePic);
          let profileLink = document.createElement("a"),
            profileLinkText = document.createTextNode("Visit Profile");
          profileLink.appendChild(profileLinkText);
          profileLink.href = `https://github.com/${username.value}`;
          profileLink.setAttribute("target", "_blank");
          linkContainer.appendChild(profileLink);
        }
      });
    fetch(`https://api.github.com/users/${username.value}/repos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Not Found") {
          clearInfos();
          linkContainer.innerHTML = "There is no account with this username";
        } else {
          let p1 = document.createElement("h4"),
            txt1 = document.createTextNode("REPOSITORIES : ");
          p1.appendChild(txt1);
          repos.appendChild(p1);
        }
        data.map((repo) => {
          let repoContainer = document.createElement("p"),
            repoName = document.createTextNode(repo.name);
          repoContainer.appendChild(repoName);
          repos.appendChild(repoContainer);
        });
      });
    fetch(`https://api.github.com/users/${username.value}/following`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Not Found") {
          clearInfos();
          linkContainer.innerHTML = "There is no account with this username";
        } else {
          let p2 = document.createElement("h4"),
            txt2 = document.createTextNode("FOLLOWING : ");
          p2.appendChild(txt2);
          followings.appendChild(p2);
        }
        data.map((following) => {
          let followingContainer = document.createElement("p"),
            followName = document.createTextNode(following.login);
          followingContainer.appendChild(followName);
          followings.appendChild(followingContainer);
        });
      });
    fetch(`https://api.github.com/users/${username.value}/followers`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Not Found") {
          clearInfos();
          linkContainer.innerHTML = "There is no account with this username";
        } else {
          let p3 = document.createElement("h4"),
            txt3 = document.createTextNode("FOLLOWERS : ");
          p3.appendChild(txt3);
          followers.appendChild(p3);
        }

        data.map((follower) => {
          let followerContainer = document.createElement("p"),
            followerName = document.createTextNode(follower.login);
          followerContainer.appendChild(followerName);
          followers.appendChild(followerContainer);
        });
      });
  }
}