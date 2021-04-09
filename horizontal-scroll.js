const horizontalScroll = (
  horizontalScrollPreviousSibling = document.querySelector("#section-1"),
  horizontalScroll = document.querySelector(".horizontal-scroll"),
  view = document.querySelector(".horizontal-scroll__view"),
  track = document.querySelector(".horizontal-scroll__track"),
  header = document.querySelector(".header")
) => {
  const getWidth = (el) =>
    Number(window.getComputedStyle(el).width.split("px")[0]);

  const getHeight = (el) =>
    Number(window.getComputedStyle(el).height.split("px")[0]);

  const scrollBarWidth = window.innerWidth > 800 ? 17 : 0;

  const handleScroll = () => {
    const topLimit =
      getHeight(horizontalScrollPreviousSibling) - getHeight(header);

    const bottomLimit =
      getHeight(horizontalScrollPreviousSibling) +
      getWidth(track) -
      getWidth(view) +
      getHeight(header) -
      scrollBarWidth;

    horizontalScroll.style.height = `${
      getWidth(track) - scrollBarWidth - getHeight(header) - getHeight(track)
    }px`;

    view.scrollLeft =
      window.scrollY -
      getHeight(horizontalScrollPreviousSibling) -
      getHeight(header);

    if (window.scrollY < topLimit) {
      console.log(1);

      view.removeAttribute("style");

      return;
    }

    if (window.scrollY >= topLimit && window.scrollY < bottomLimit) {
      console.log(2);

      view.style = `
        position: fixed;
        top: ${getHeight(header)}px;
        width: ${window.innerWidth - scrollBarWidth}px;
      `;

      return;
    }

    console.log(3);

    view.style = `
      position: fixed;
      top: ${bottomLimit - window.scrollY + getHeight(header)}px;
      width: ${window.innerWidth - scrollBarWidth}px;
    `;
  };

  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("scroll", handleScroll);
    });
  })();
};
