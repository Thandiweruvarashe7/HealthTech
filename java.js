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
    const apiKey = "09c839d247c3a3e0152637baba279bab";
    const url = `https://gnews.io/api/v4/search?q=health+technology&lang=en&token=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      let newsHTML = "";
      data.articles.slice(0, 5).forEach(article => {
        newsHTML += `
          <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
          <p>${article.description ? article.description : "No description available."}</p>
          <small>Published on: ${new Date(article.publishedAt).toLocaleDateString()}</small>
          <hr>
        `;
      });
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
