// Removed comments for brevity

const contactForm = document.getElementById("contactForm");
const signupForm = document.getElementById("signupForm");
const newsContainer = document.getElementById("newsContainer");

function handleSubmit(event, form) {
  event.preventDefault();
  if (form.checkValidity()) {
    alert("Form submitted successfully!");
    form.reset();
  } else {
    alert("Please fill out all fields before submitting.");
  }
}

async function fetchNews() {
  try {
    const url = "https://newsapi.org/v2/everything?q=health+technology&apiKey=94b9067a5c5d4f8eb9e1ad40126adf96";
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      let newsHTML = "";
      for (let i = 0; i < 5; i++) {
        let article = data.articles[i];
        newsHTML += `
          <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
          <p>${article.description ? article.description : "No description available."}</p>
          <small>Published on: ${new Date(article.publishedAt).toLocaleDateString()}</small>
          <hr>
        `;
      }
      newsContainer.innerHTML = newsHTML;
    } else {
      newsContainer.innerHTML = "<p>No news available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
  }
}

function handleWorkshopLink(event) {
  event.preventDefault();
  const topic = event.target.getAttribute("data-topic");
  const topics = {
    "technology-innovations": "Read more about Technology Innovations: Innovations shaping the future of healthcare.",
    "tech-advancements": "Discover Tech Advancements: Breakthroughs in medical equipment and hospital machinery."
  };
  if (topics[topic]) {
    alert(topics[topic]);
  } else {
    alert("Topic not recognized.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => handleSubmit(event, contactForm));
  }
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => handleSubmit(event, signupForm));
  }
  const workshopLinks = document.querySelectorAll(".workshop-link");
  workshopLinks.forEach(link => {
    link.addEventListener("click", handleWorkshopLink);
  });
  fetchNews();
});