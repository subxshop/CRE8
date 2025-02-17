document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("contentGrid");

    function loadContent() {
        for (let i = 0; i < 4; i++) {
            let div = document.createElement("div");
            div.classList.add("grid-item");
            div.innerHTML = `
                <img src="images/Placeholder image1.jpg" alt="Thumbnail">
                <h3>Your Title ${Math.floor(Math.random() * 100)}</h3>
                <p>Tag: Art, Music, Writing</p>
                <p>By: Creator Name</p>
            `;
            gridContainer.appendChild(div);
        }
    }

    // Initial Load
    loadContent();

    // Infinite Scroll
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadContent();
        }
    });
});
var modal = document.getElementById("modal");

var images = document.querySelectorAll(".grid-item");
var modalImg = document.getElementById("modal-img");
var caption = document.getElementById("caption");

images.forEach(function(image) {
  image.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    caption.innerHTML = this.alt;
  };
});

var closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function() {
  modal.style.display = "none";
};