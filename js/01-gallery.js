import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector(".gallery");
galleryContainer.innerHTML = creatElements(galleryItems);
function creatElements(gallery) {
  const imageEl = gallery
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
      <a class = "gallery__link"
      href="${original}">
      <img class = "gallery__image"
      src = "${preview}"
      data-source =  "${original}"
      alt = "${description}"
      />
      </a>
      </div>`
    )
    .join("");
  return imageEl;
}
let modalWindow = null;

function showModalWindow() {
  const modalLightBox = ({ alt, dataset: { source } }) => {
    modalWindow = basicLightbox.create(
      `<img style="color: #fff" src="${source}" alt="${alt}" width="800" height="600">`,
      {
        onShow: addKeyboardControl,
        onClose: removeKeyboardControl,
      }
    );
    modalWindow.show();
  };

  const addKeyboardControl = () =>
    window.addEventListener("keydown", onWindowKeyDown);
  const removeKeyboardControl = () =>
    window.removeEventListener("keydown", onWindowKeyDown);

  const onWindowKeyDown = ({ code }) => {
    if (code !== "Escape") return;
    modalWindow.close();
  };
  const onGalleryContainerClick = (evt) => {
    evt.preventDefault();
    if (evt.target.nodeName !== "IMG") return;
    modalLightBox(evt.target);
  };

  galleryContainer.addEventListener("click", onGalleryContainerClick);
}
showModalWindow();
