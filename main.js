"use strict";
var theInput = document.querySelector("input"),
  button = document.querySelector("button"),
  userName = document.querySelector(".name"),
  show1 = document.querySelector(".show1"),
  show2 = document.querySelector(".show2"),
  show3 = document.querySelector(".show3"),
  visit = document.querySelector(".visit");

button.onclick = function () {
  getData();
};
function getData() {
  if (theInput.value === "") {
    visit.innerHTML = "Please Write A GitHup Username";
  } else {
    userName.innerHTML = visit.innerHTML = show1.innerHTML = show2.innerHTML = show3.innerHTML =
      "";
    fetch(`https://api.github.com/users/${theInput.value}`)
      .then((res) => res.json())
      .then((data) => {
        userName.appendChild(
          document
            .createElement("p")
            .appendChild(document.createTextNode(data.name))
        );
      });
    fetch(`https://api.github.com/users/${theInput.value}`)
      .then((res) => res.json())
      .then((data) => {
        var theUrl = document.createElement("a"),
          theUrlText = document.createTextNode("Visit Profile");
        theUrl.appendChild(theUrlText);
        theUrl.href = `https://github.com/${theInput.value}`;
        theUrl.setAttribute("target", "_blank");
        visit.appendChild(theUrl);
      });
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((data) => {
        show1.innerHTML = "";
        var p1 = document.createElement("p"),
          txt1 = document.createTextNode("REPOSITORIES : ");
        p1.appendChild(txt1);
        show1.appendChild(p1);
        data.forEach((repo) => {
          var mainDiv1 = document.createElement("div"),
            repoName = document.createTextNode(repo.name);
          mainDiv1.appendChild(repoName);
          show1.appendChild(mainDiv1);
        });
      });
    fetch(`https://api.github.com/users/${theInput.value}/following`)
      .then((res) => res.json())
      .then((data) => {
        var p2 = document.createElement("p"),
          txt2 = document.createTextNode("FOLLOWING : ");
        p2.appendChild(txt2);
        show2.appendChild(p2);
        data.forEach((following) => {
          var mainDiv2 = document.createElement("div"),
            followName = document.createTextNode(following.login);
          mainDiv2.appendChild(followName);

          show2.appendChild(mainDiv2);
        });
      });
    fetch(`https://api.github.com/users/${theInput.value}/followers`)
      .then((res) => res.json())
      .then((data) => {
        var p3 = document.createElement("p"),
          txt3 = document.createTextNode("FOLLOWERS : ");
        p3.appendChild(txt3);
        show3.appendChild(p3);
        data.forEach((follower) => {
          var mainDiv3 = document.createElement("div"),
            followerName = document.createTextNode(follower.login);
          mainDiv3.appendChild(followerName);

          show3.appendChild(mainDiv3);
        });
      });
  }
}
