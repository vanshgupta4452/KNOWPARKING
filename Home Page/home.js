document.addEventListener("DOMContentLoaded", function() {
  const places = [
      { name: "Rithala Parking 1", parking: "" },
      { name: "NSP", parking: "Parking 2" },
      { name: "Pritampura", parking: "Parking 3" },
      { name: "Begumpur", parking: "Parking 4" },
      { name: "Kohat Enclave", parking: "Parking 5" },
      { name: "Inderlok", parking: "Parking 6" }
      // Add more place objects as needed
  ];

  const searchBar = document.querySelector("#searchBar input");
  const searchResults = document.querySelector("#searchResults");
  const searchIcon = document.querySelector("#searchicon");

  // Function to perform search and display dropdown
  function performSearchAndDisplayDropdown() {
      const query = searchBar.value.trim();
      if (query === "") {
          searchResults.innerHTML = ""; // Clear dropdown if search bar is empty
          resetBorderRadius();
          return;
      }

      // Filter places based on the query
      const filteredPlaces = places.filter(place =>
          place.name.toLowerCase().includes(query.toLowerCase())
      );

      // Display dropdown if there are search results
      if (filteredPlaces.length > 0) {
          searchResults.innerHTML = ""; // Clear previous results

          // Display search results
          filteredPlaces.forEach(place => {
              const resultItem = document.createElement("div");
              resultItem.textContent = `${place.name} - ${place.parking}`; // Include parking number
              resultItem.classList.add("searchResultItem"); // Add class for styling

              // Add click event listener to populate search bar with place name
              resultItem.addEventListener("click", function() {
                  searchBar.value = place.name;
                  searchResults.innerHTML = ""; // Hide dropdown after selecting a result
                  resetBorderRadius();
              });

              searchResults.appendChild(resultItem);
          });

          // Calculate total width of search bar and search icon
          const totalWidth = searchBar.offsetWidth + searchIcon.offsetWidth;

          // Set dropdown width and position to align with search bar and icon
          searchResults.style.width = totalWidth + "px";
          const searchBarPosition = searchBar.getBoundingClientRect();
          searchResults.style.left = searchBarPosition.left + "px";
          searchResults.style.top = (searchBarPosition.top + searchBarPosition.height) + "px";

          // Adjust border radius of search bar and search icon
          searchBar.style.borderBottomLeftRadius = "0";
          searchIcon.style.borderBottomRightRadius = "0";
      } else {
          searchResults.innerHTML = ""; // Hide dropdown if there are no search results
          resetBorderRadius();
      }
  }

  // Function to reset the border radius of search bar and search icon
  function resetBorderRadius() {
      searchBar.style.borderBottomLeftRadius = "52px";
      searchIcon.style.borderBottomRightRadius = "52px";
  }

  // Event listener for search input
  searchBar.addEventListener("input", performSearchAndDisplayDropdown);

  // Event listener for form submission (optional)
  const searchForm = document.querySelector("#centerpiece");
  searchForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission
      performSearchAndDisplayDropdown();
  });

  // Event listener for search icon click to navigate to test.html
  searchIcon.addEventListener("click", function() {
      const query = searchBar.value.trim();
      if (query !== "") {
          window.location.href = `result.html?place=${encodeURIComponent(query)}`;
      }
  });
});
