function app() {
  const profileButton = document.querySelector("#profile-menu");
  const profileMenu = document.querySelector("#profile-menu-content");

  function openMenu() {
    profileButton.setAttribute("aria-expanded", true);
    const firstItem = profileMenu.firstElementChild;
    firstItem.firstElementChild.focus();

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keydown", handleKeyNavigation);
  }

  function closeMenu() {
    profileButton.setAttribute("aria-expanded", false);
    const isMenuActive = profileMenu.classList.contains("menu-active");
    if (isMenuActive) profileMenu.classList.remove("menu-active");
    profileButton.focus();

    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keydown", handleKeyNavigation);
  }

  function toggleMenu() {
    const isMenuExpanded =
      profileButton.getAttribute("aria-expanded") === "true" || false;
    profileMenu.classList.toggle("menu-active");

    if (isMenuExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleKeydown(event) {
    const isMenuExpanded =
      profileButton.getAttribute("aria-expanded") === "true" || false;
    const isMenuActive = profileMenu.classList.contains("menu-active");

    if (isMenuActive && event.key === "Escape") {
      closeMenu();
    }

    if (isMenuExpanded && event.key === "Tab") {
      event.preventDefault();
      closeMenu();
    }
  }

  function handleKeyNavigation(event, index) {
    const menuItems = profileMenu.querySelectorAll(
      "#profile-menu-content button[role='menuitem']"
    );
    const focusedMenuItem = document.activeElement;

    const indexOfFocusedItem = Array.from(menuItems).indexOf(focusedMenuItem);

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      const nextItem = menuItems[indexOfFocusedItem + 1];
      if (nextItem) nextItem.focus();
      else menuItems[0].focus();
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      const previousItem = menuItems[indexOfFocusedItem - 1];
      if (previousItem) previousItem.focus();
      else menuItems[menuItems.length - 1].focus();
    }
  }

  profileButton.addEventListener("click", toggleMenu);
}

app();
