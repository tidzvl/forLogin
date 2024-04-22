const form = document.querySelector(".popup-confirm-add");
const infoSickInput = form.querySelector(".info_sick");
form.querySelector(".switch-input").addEventListener("change", function () {
  if (this.checked) {
    infoSickInput.readOnly = true;
    var text = infoSickInput.value;
    (async () => {
      try {
        form.querySelector(".room").value = "";
        form.querySelector(".spin").innerHTML = `<div class="col">
          <!-- Wave -->
          <div class="sk-wave sk-primary">
            <div class="sk-wave-rect"></div>
            <div class="sk-wave-rect"></div>
            <div class="sk-wave-rect"></div>
            <div class="sk-wave-rect"></div>
            <div class="sk-wave-rect"></div>
          </div>
        </div>`
        const responsePost = await fetch("../../api/AI/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        if (!responsePost.ok) {
          throw new Error("Network response for POST was not ok");
        }
        const dataPost = await responsePost.json();
        const { answer } = dataPost;
        console.log(answer);
        form.querySelector(".room").value = answer;
        form.querySelector(".spin").innerHTML = ''
        return
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    })();
  } else {
    infoSickInput.readOnly = false;
    form.querySelector(".spin").innerHTML = ''
  }
});
