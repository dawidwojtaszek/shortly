const app = () => {
  const navigation = document.querySelector(".navigation-position");

  const handleClick = (e) => {
    navigation.classList.toggle("hidden");
    e.preventDefault();
  };

  const hamburger = document.querySelector(".hamburger");
  hamburger.addEventListener("click", handleClick);
};

app();
