const accessKey = "JT99iosTc_mNnRgwPiV59hfCtQ7fPy3CIcsr-muVlU4";  // Ensure no trailing space

const SearchForm = document.getElementById("search-form");
const SearchBox = document.getElementById("search-box");
const SearchResult = document.getElementById("search-result");
const ShowMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = SearchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            SearchResult.innerHTML = "";  // Clear previous results when a new search is made
        }

        const results = data.results;

        // Handle if there are no results
        if (results.length === 0) {
            SearchResult.innerHTML = "<p>No results found. Try a different search term.</p>";
            ShowMoreBtn.style.display = "none";  // Hide ShowMore button if no results
            return;
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            SearchResult.appendChild(imageLink);
        });

        // If there are less than 12 results, hide the "Show More" button
        if (results.length < 12) {
            ShowMoreBtn.style.display = "none";
        } else {
            ShowMoreBtn.style.display = "block";  // Otherwise, show the "Show More" button
        }

    } catch (error) {
        console.error("Error fetching images:", error);
        SearchResult.innerHTML = "<p>There was an error fetching images. Please try again later.</p>";
    }
}

SearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;  // Reset the page to 1 when a new search is made
    searchImages();
});

ShowMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
