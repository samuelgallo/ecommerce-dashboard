; (function () {
  feather.replace()

  // Auto generate paths based on title
  const input = document.querySelector(".name")
  const output = document.querySelector(".path")

  if (input) {
    input.addEventListener("input", function (event) {
      window.setTimeout(function () {
        output.value = event.target.value
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s/g, "-")
          .replace("--", "-");
      }, 1)
    })
  }

}())
