function initApp(element) {
  $(`#${element}`).draggable({
    containment: "document",
    handle: `#${element}-app-top-header`,
  });

  $(`#${element}`).mousedown(() => placeElementOnTop(element));
}
