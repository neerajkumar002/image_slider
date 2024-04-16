const slider = document.querySelector(".slider");
const dotContainer = document.querySelector(".dot-container");

//fetch images function

async function fetchImageData(page, limit) {
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    if (data && data.length > 0) displaySliderImages(data);
  } catch (error) {
    console.log(error);
  }
}

//call the fetchImageData function
fetchImageData(1, 5);

//display all images and dots
function displaySliderImages(imageList) {
  slider.innerHTML = imageList
    .map(
      (imageItem) =>
        `<div class="slide ">
        <img src=${imageItem.download_url} alt=${imageItem.id}/>
        </div>
        `
    )
    .join("");
  console.log(dotContainer);

  dotContainer.innerHTML = imageList
    .map(
      (dotItem, index) => `
     <span class="dot ${
       index === 0 ? "active" : ""
     }"  data-slide=${index}></span>
   `
    )
    .join("");
}

setTimeout(() => {
  //select elements
  const btnNext = document.querySelector(".btn-next");
  const btnPrev = document.querySelector(".btn-prev");
  const slides = document.querySelectorAll(".slide");

  let currentImage = 0;

  //change slide function
  function changeSlide(currentImage) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translate(${100 * (index - currentImage)}%)`;
    });
  }

  changeSlide(currentImage);

  //active dot function

  function activeDot(slide) {
    document
      .querySelectorAll(".dot")
      .forEach((dotItem) => dotItem.classList.remove("active"));

    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("active");
  }

  activeDot(currentImage);

  btnNext.addEventListener("click", () => {
    currentImage++;
    if (currentImage > slides.length - 1) {
      currentImage = 0;
    }
    changeSlide(currentImage);
    activeDot(currentImage);
  });

  btnPrev.addEventListener("click", () => {
    currentImage--;
    if (currentImage < 0) {
      currentImage = slides.length - 1;
    }
    changeSlide(currentImage);
    activeDot(currentImage);
  });

  dotContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("dot")) {
      const currentSlide = event.target.dataset.slide;
      changeSlide(currentSlide);
      activeDot(currentSlide);
    }
  });
}, 1000);
