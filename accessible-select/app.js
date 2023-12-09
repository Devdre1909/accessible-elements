function app() {
  const selectButton = document.querySelector("#select__input");
  const selectDropdown = document.querySelector("#select__dropdown");

  selectButton.addEventListener("click", toggleSelectDropdown);
  selectButton.addEventListener("focus", handleFocus);

  function handleFocus(event) {
    selectButton.addEventListener("keydown", handleAltKey);
  }

  function toggleSelectDropdown() {
    const isDropdownActive = selectDropdown.classList.contains(
      "select__dropdown--open"
    );
    if (isDropdownActive) {
      closeSelectDropdown();
    } else {
      openSelectDropdown();
    }
  }

  function openSelectDropdown() {
    selectButton.setAttribute("aria-expanded", true);
    selectDropdown.classList.add("select__dropdown--open");

    const activeDescendant = selectButton.getAttribute("aria-activedescendant");
    const activeDescendantElement = document.getElementById(activeDescendant);

    console.log({ activeDescendant, activeDescendantElement });

    if (activeDescendantElement) {
      activeDescendantElement.focus();
    } else {
      selectDropdown.firstElementChild.focus();
    }

    const allOptions = selectDropdown.querySelectorAll(
      ".select__dropdown__item"
    );
    allOptions.forEach((option) => {
      option.addEventListener("click", handleEnterKey);
    });
    window.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("keydown", handleKeyboardNavigation);
  }

  function closeSelectDropdown() {
    const allOptions = selectDropdown.querySelectorAll(
      "select__dropdown__item"
    );
    allOptions.forEach((option) => {
      option.removeEventListener("click", handleEnterKey);
    });

    selectButton.setAttribute("aria-expanded", false);
    selectDropdown.classList.remove("select__dropdown--open");
    selectButton.focus();

    window.removeEventListener("keydown", handleEscapeKey);
    window.removeEventListener("keydown", handleKeyboardNavigation);
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      closeSelectDropdown();
    }
  }

  function handleAltKey(event) {
    const isAltKey = event.altKey;
    const isArrowDown = event.key === "ArrowDown";

    if (isArrowDown) {
      event.preventDefault();
      openSelectDropdown();
    }

    if (isArrowDown && isAltKey) {
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role#alt
      event.preventDefault();
      openSelectDropdown();
      selectButton.focus();
    }
  }

  function handleEnterKey(event) {
    event.preventDefault();
    selectButton.firstElementChild.textContent = event.target.textContent;
    selectButton.setAttribute("aria-activedescendant", event.target.id);
    closeSelectDropdown();
  }

  function handleKeyboardNavigation(event) {
    const isForward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const isBackward = event.key === "ArrowUp" || event.key === "ArrowLeft";
    const isEnter = event.key === "Enter";

    if (isForward) {
      event.preventDefault();
      const nextItem = event.target.nextElementSibling;
      if (nextItem) nextItem.focus();
      else event.target.parentElement.firstElementChild.focus();
    } else if (isBackward) {
      event.preventDefault();
      const previousItem = event.target.previousElementSibling;
      if (previousItem) previousItem.focus();
      else event.target.parentElement.lastElementChild.focus();
    } else if (isEnter) {
      handleEnterKey(event);
    }
  }
}

app();
