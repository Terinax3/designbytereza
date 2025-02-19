document.addEventListener("contextmenu", function(event) {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });