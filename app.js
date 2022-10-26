const app = () => {
  const navigation = document.querySelector(".navigation-position");

  const handleClick = (e) => {
    navigation.classList.toggle("hidden");
    e.preventDefault();
  };

  const hamburger = document.querySelector(".hamburger");
  hamburger.addEventListener("click", handleClick);

  fetch("https://api.shrtco.de/v2/shorten?url=dawidwojtaszek.pl")
    .then((response) => response.json())
    .then((data) => console.log(data));
};

app();
