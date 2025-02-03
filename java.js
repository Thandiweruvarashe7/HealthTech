document.addEventListener("DOMContentLoaded", () => {
    // Handle the contact form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            if (name && email && message) {
                alert("We have received your message and we will answer shortly.");
                console.log("Form Submitted Successfully:", { name, email, message });
                contactForm.reset();
            } else {
                alert("Please fill out all fields before submitting.");
            }
        });
    }

    // Handle the signup form submission
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;

            if (name && email) {
                alert("You have purchased a ticket and will receive it through email.");
                console.log("Signup Form Submitted Successfully:", { name, email });
                signupForm.reset();
            } else {
                alert("Please fill out all fields before submitting.");
            }
        });
    }

    // Fetch health technology news from an API
    async function fetchHealthTechNews() {
        const newsContainer = document.getElementById("newsContainer");
        if (!newsContainer) return; // Ensure news section exists before fetching

        const API_URL = "https://newsapi.org/v2/everything?q=health+technology&apiKey=94b9067a5c5d4f8eb9e1ad40126adf96";

        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            
            if (data.articles && data.articles.length > 0) {
                newsContainer.innerHTML = "";
                data.articles.slice(0, 5).forEach(article => {
                    const articleElement = document.createElement("div");
                    articleElement.classList.add("news-article");
                    articleElement.innerHTML = `
                        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                        <p>${article.description || "No description available."}</p>
                        <small>Published on: ${new Date(article.publishedAt).toLocaleDateString()}</small>
                        <hr>
                    `;
                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = "<p>No recent news available.</p>";
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
        }
    }

    // Call the function to fetch and display news
    fetchHealthTechNews();

    // Handle clickable links for workshop topics
    document.querySelectorAll(".workshop-link").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const topic = event.target.getAttribute("data-topic");

            const topics = {
                "technology-innovations": "Read more about Technology Innovations: Innovations shaping the future of healthcare.",
                "tech-advancements": "Discover Tech Advancements: Breakthroughs in medical equipment and hospital machinery."
            };
            
            alert(topics[topic] || "Topic not recognized.");
        });
    });
});
