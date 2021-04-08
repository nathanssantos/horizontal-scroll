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
      getWidth(view) +
      getWidth(track) -
      getHeight(header) -
      scrollBarWidth;

    view.scrollLeft =
      window.scrollY -
      getHeight(horizontalScrollPreviousSibling) -
      getHeight(header);

    if (window.scrollY < topLimit) {
      view.style = "";

      return;
    }

    if (window.scrollY >= topLimit && window.scrollY < bottomLimit) {
      view.style = `
        position: fixed;
        top: ${getHeight(header)}px;
        width: ${window.innerWidth - scrollBarWidth}px;
      `;

      return;
    }

    view.style = `
      position: fixed;
      top: ${bottomLimit - window.scrollY + getHeight(header)}px;
      width: ${window.innerWidth - scrollBarWidth}px;
    `;
  };

  const setup = () => {
    horizontalScroll.style.height = `${getWidth(track)}px`;
  };

  const bindEvents = () => {
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("scroll", handleScroll);
    });
  };

  (() => {
    setup();
    bindEvents();
  })();
};

horizontalScroll();
