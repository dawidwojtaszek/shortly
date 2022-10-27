const app = () => {
  // ============Mobile Menu==================
  const navigation = document.querySelector(".navigation-position");

  const handleClick = (e) => {
    navigation.classList.toggle("hidden");
    e.preventDefault();
  };

  const hamburger = document.querySelector(".hamburger");
  hamburger.addEventListener("click", handleClick);

  // ============Render Elements==================
  let linkList = [];
  const renderElement = (original, short, copy) => {
    const boxElement = document.createElement("div");
    boxElement.classList = "shorten-card";
    const originalLink = document.createElement("sapn");
    originalLink.classList.add("link-original");
    originalLink.innerText = original;
    boxElement.appendChild(originalLink);
    const rightBox = document.createElement("div");
    rightBox.classList.add("right-box");
    const shortLink = document.createElement("span");
    shortLink.classList.add("short-link");
    shortLink.innerText = short;
    rightBox.appendChild(shortLink);
    const button = document.createElement("button");
    if (copy) {
      button.classList = "btn copy-btn copied";
      button.innerText = "Copied!";
    } else {
      button.classList = "btn copy-btn";
      button.innerText = "Copy";
    }

    rightBox.appendChild(button);
    boxElement.appendChild(rightBox);
    return boxElement;
  };
  const renderLinksList = (list) => {
    const linksSection = document.querySelector(".links-section");
    linksSection.innerHTML = "";
    list.forEach((element) =>
      linksSection.appendChild(
        renderElement(element.original, element.short, element.copy)
      )
    );
  };
  // ==============Form Validation=================
  const validateForm = (message) => {
    const input = document.querySelector(".link-input");
    input.classList = "link-input validate-error";
    const messageUi = document.querySelector(".message");
    messageUi.innerText = message;
  };

  const resetValidation = () => {
    const input = document.querySelector(".link-input");
    input.classList = "link-input";
    const message = document.querySelector(".message");
    message.innerText = "";
  };
  // ============Handle new links==================
  const addLink = (link) => {
    console.log(link);
    if (link.ok === true) {
      linkList.push({
        original: link.result.original_link,
        short: link.result.full_short_link3,
        copy: false,
      });
      const input = document.querySelector(".link-input");
      input.value = "";
      renderLinksList(linkList);
      resetValidation();
    } else {
      switch (link.error_code) {
        case 1:
          validateForm("Please add a link");
          break;
        case 2:
          validateForm("This is not a valid URL");
          break;
        default:
          validateForm("Error");
      }
    }
  };
  const showError = (error) => {
    console.log(error);
  };
  // ============Handle Click==================
  function handleSubmit(e) {
    const input = document.querySelector(".link-input").value;

    fetch(`https://api.shrtco.de/v2/shorten?url=${input}`)
      .then((response) => response.json())
      .then((link) => addLink(link))
      .catch((error) => showError(error));

    e.preventDefault();
  }
  // ===========Copy btn============================
  const handleCopyBtn = (e) => {
    if (e.target.classList.contains("copy-btn")) {
      e.target.classList.add("copied");
      e.target.innerText = "Copied!";
      navigator.clipboard.writeText(e.target.previousElementSibling.innerText);
      linkList.forEach((element) => {
        if (element.short === e.target.previousElementSibling.innerText) {
          element.copy = true;
        }
      });
    }
    e.preventDefault();
  };
  const submitForm = document.querySelector(".shorten-box");
  submitForm.addEventListener("submit", handleSubmit);
  const linksSectionCopy = document.querySelector(".links-section");
  linksSectionCopy.addEventListener("click", handleCopyBtn);
};

app();
