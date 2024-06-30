const generateForm = document.querySelector(".generate-form");
const generateBtn = generateForm.querySelector(".generate-btn");
const imageGallery = document.querySelector(".image-gallery");

const PIXABAY_API_KEY = "44688882-d89f0abfdb3b762c77755c17f";
let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadBtn = imgCard.querySelector(".download-btn");

        imgElement.src = imgObject.webformatURL;
        imgElement.alt = imgObject.tags || "Pixabay image";

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            downloadBtn.setAttribute("href", imgObject.largeImageURL);
            downloadBtn.setAttribute("download", `Pixabay_image_${index + 1}.jpg`);
        }

        imgElement.onerror = () => {
            imgCard.classList.remove("loading");
            imgCard.classList.add("error");
            imgElement.alt = "Failed to load image";
        }
    });
}

const generateImages = async (userPrompt, userImgQuantity) => {
    try {
        console.log("Fetching images...");
        const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(userPrompt)}&per_page=${userImgQuantity}&image_type=photo`;
        console.log("Request URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("API Error Response:", errorBody);
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        
        if (!data.hits || data.hits.length === 0) {
            throw new Error("No images were found");
        }
        updateImageCard(data.hits);
    } catch (error) {
        console.error("Error fetching images:", error);
        alert(`Failed to fetch images: ${error.message}`);
        // Clear loading state
        imageGallery.innerHTML = '';
    } finally {
        generateBtn.removeAttribute("disabled");
        generateBtn.innerText = "Generate";
        isImageGenerating = false;
    }
}

const handleImageGeneration = (e) => {
    e.preventDefault();
    if (isImageGenerating) return;

    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = parseInt(e.srcElement[1].value);

    if (!userPrompt) {
        alert("Please enter a prompt for image search.");
        return;
    }

    generateBtn.setAttribute("disabled", true);
    generateBtn.innerText = "Searching...";
    isImageGenerating = true;

    const imgCardMarkup = Array.from({ length: userImgQuantity }, () =>
        `<div class="img-card loading">
            <img src="loader.svg" alt="Loading image">
            <a class="download-btn" href="#">
                <img src="download.svg" alt="download icon">
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateImages(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleImageGeneration);

// Test API connection
const testApiConnection = async () => {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=test`);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }
        const data = await response.json();
        console.log("API connection successful:", data);
    } catch (err) {
        console.error("API connection failed:", err);
    }
};

testApiConnection();

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click',function clicklogin() {
        // Open the login page
        window.location.href = 'login.html';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('signInForm');

    loginButton.addEventListener('click',function clicksignin() {
        // Open the login page
        window.location.href = 'signin.html';
    });
});

const socialProfiles = {
    instagram: 'darshuuu_xx',
    twitter: '@Darshan2071243',
    facebook: 'darshan2308',  // This might be a page name or ID
    linkedin: 'DarshanPatel'   // This is usually a combination of letters and numbers
};

document.getElementById('instagramIcon').addEventListener('click', function() {
    window.open(`https://www.instagram.com/${socialProfiles.instagram}/`, '_blank');
});

document.getElementById('twitterIcon').addEventListener('click', function() {
    window.open(`https://twitter.com/${socialProfiles.twitter}`, '_blank');
});

document.getElementById('facebookIcon').addEventListener('click', function() {
    window.open(`https://www.facebook.com/${socialProfiles.facebook}`, '_blank');
});

document.getElementById('linkedinIcon').addEventListener('click', function() {
    window.open(`https://www.linkedin.com/in/${socialProfiles.linkedin}/`, '_blank');
});
