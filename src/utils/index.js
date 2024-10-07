export function* getId() {
  let id = 1;

  while (true) {
    yield id;
    id++;
  }
}

export function debounce(func, delay) {
  let debounceTimer;

  return function (...args) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      func.apply(this, args); // Call the function with the provided arguments
    }, delay);
  };
}
