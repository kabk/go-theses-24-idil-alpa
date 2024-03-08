document.addEventListener("DOMContentLoaded", function () {
  let isEnabled = window.innerWidth >= 900; // Initial check for enabling/disabling the functionality

  function initializeGridScroll() {
    let locations = [];

    function updateLocations() {
      const gridItems = document.querySelectorAll(".grid-header");
      locations = Array.from(gridItems).map((item) => ({
        left: item.offsetLeft,
        top: item.offsetTop,
        width: item.offsetWidth,
        height: item.offsetHeight,
      }));
    }

    function scrollToLocation(location) {
      const scrollTop = location.top;
      const scrollLeft = location.left;

      window.scrollTo({
        top: scrollTop,
        left: scrollLeft,
        behavior: "smooth",
      });
    }

    let currentLocationIndex = 0;

    function scrollNextLocation() {
      currentLocationIndex = (currentLocationIndex + 1) % locations.length;
      scrollToLocation(locations[currentLocationIndex]);
    }

    function scrollPreviousLocation() {
      currentLocationIndex =
        (currentLocationIndex - 1 + locations.length) % locations.length;
      scrollToLocation(locations[currentLocationIndex]);
    }

    document.addEventListener("click", function (event) {
      if (!isEnabled) return; // Exit if functionality is disabled

      const screenWidth = window.innerWidth;
      const clickX = event.clientX;

      if (clickX >= screenWidth / 2) {
        scrollNextLocation();
      } else {
        scrollPreviousLocation();
      }
    });

    updateLocations();
    const gridItem1Location = locations[0];
    scrollToLocation(gridItem1Location);

    window.addEventListener("resize", function () {
      isEnabled = window.innerWidth >= 900; // Update isEnabled flag based on window width
      if (!isEnabled) {
        locations = []; // Clear locations if functionality is disabled
      }
    });
  }

  // Initialize or disable grid scrolling based on window width
  if (isEnabled) {
    initializeGridScroll();
  }

  // Listen for resize events to adjust functionality based on window width
  window.addEventListener("resize", function () {
    isEnabled = window.innerWidth >= 900;
    if (isEnabled) {
      initializeGridScroll();
    }
  });
});
