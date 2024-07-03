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
const buttons = document.querySelectorAll('button');
const imageGrid = document.getElementById('imageGrid');

const images = {
    'illustration': [
        'https://img.freepik.com/premium-vector/journey-across-river-characters-quest-adventure_1175259-952.jpg?w=740',
        'https://img.freepik.com/premium-vector/painting-man-suit-with-cane-front-garden-with-flowers-background_608297-32701.jpg?w=740',
        'https://img.freepik.com/premium-vector/hand-hold-lantern-lighting-forest_871228-1852.jpg?w=740',
        'https://img.freepik.com/premium-vector/cat-kitten-image_1138544-29750.jpg?w=740'
    ],
    'concept-art': [
        'https://img.freepik.com/free-photo/3d-rendering-fantasy-building_23-2150920961.jpg?t=st=1720001943~exp=1720005543~hmac=9d36c852c5feb549c602bfecc9852f64eb12e091cd95a4aa3cacdce51268931b&w=740',
        'https://img.freepik.com/free-photo/surreal-easter-egg-with-fantasy-world-landscape_23-2151200041.jpg?t=st=1720001923~exp=1720005523~hmac=b1a564086680d15efb02df47f09c4e26008c7b9dc080061c9c63c840def0f52a&w=740',
        'https://img.freepik.com/premium-photo/stock-photo-wallpaper_1137879-129136.jpg?w=740',
        'https://img.freepik.com/free-photo/fantasy-style-scene-with-mountains-landscape_23-2151124413.jpg?t=st=1720001867~exp=1720005467~hmac=708c5ab9428d64de6d718e80d3d8bf7b590d6ae7caa3cae40d2b8e706dab491b&w=740'
    ],
    '3d': [
        'https://img.freepik.com/free-photo/futuristic-fantastical-light-lamp-design_23-2151101630.jpg?t=st=1720002251~exp=1720005851~hmac=2dfb6058388d88963e08e226a3fe7b8211d616a0e6d6c63fe59b8584bfbb74bf&w=740',
        'https://img.freepik.com/free-photo/view-brain-depicted-as-fantastical-tree_23-2150834091.jpg?t=st=1720002280~exp=1720005880~hmac=058bec42ce48619917ed119799af1ab7dcd1ba1a76fec4c7e71ed0b44f2edd8f&w=740',
        'https://img.freepik.com/premium-photo/there-is-boat-that-is-floating-water-near-tree-generative-ai_958192-16946.jpg?w=740',
        'https://img.freepik.com/free-photo/medium-shot-robots-hugging-fantasy-world_23-2150900551.jpg?t=st=1720002347~exp=1720005947~hmac=716b529e16b7d0d7f7c3bc11d98bbaf8e03cb4b30bbf1fbe53ccecac95b57250&w=740'
    ],
    'cartoon': [
        'https://img.freepik.com/free-photo/3d-rendering-cute-little-boy-with-backpack-city_1142-54456.jpg?t=st=1720002744~exp=1720006344~hmac=977cf1f82a69c755d411d65a69973fdf011ecdfd77bfec7e8e372478146ed551&w=740',
        'https://img.freepik.com/free-photo/cute-tiger-studio_23-2150875469.jpg?t=st=1720002692~exp=1720006292~hmac=fa63dd0f1e8adaab28f90068d65f45117c3ecbdd3882bfcce57d07f4ff96a2b1&w=740',
        'https://img.freepik.com/free-photo/portrait-cute-3d-elephant_23-2151533163.jpg?t=st=1720002548~exp=1720006148~hmac=95b874458b70fa1a84d172b8eec3252c9f931291944a4bd3e494be4112ceef18&w=740',
        'https://img.freepik.com/free-photo/easter-bunnies-eggs_1450-501.jpg?t=st=1720002600~exp=1720006200~hmac=557a2ed6560e95b396f38638f4e2b50c140ff3c8be1b7f4169e57336bd45bd8a&w=740'
    ],
    'cyberpunk': [
        'https://img.freepik.com/premium-photo/woman-middle-futuristic-city-with-80s-cyberpunk-image-style_952477-75.jpg?w=740',
        'https://img.freepik.com/free-photo/high-tech-portrait-young-girl-with-futuristic-style_23-2151133569.jpg?t=st=1720002885~exp=1720006485~hmac=3acb6b8f4101e7c6a90c9010cae86640a647a27a19121ae877864299099a7c91&w=740',
        'https://img.freepik.com/premium-photo/woman-photo-is-wearing-neon-lights-with-styles-such-as-vray-track_1050186-3642.jpg?w=740',
        'https://img.freepik.com/free-photo/high-tech-portrait-young-girl-with-futuristic-style_23-2151133576.jpg?t=st=1720002993~exp=1720006593~hmac=8ad05343019184aaa17d7aee1bc078699034329ce886845819fcb62193825f62&w=740'
    ],
    'oil-painting': [
        'https://img.freepik.com/free-photo/elf-woman_71767-114.jpg?t=st=1720003231~exp=1720006831~hmac=aac56f1b464019ddc3ec0dda82f9141befd5fd6da68d88de7fcae1f943aada8c&w=740',
        'https://img.freepik.com/premium-photo/colorful-hair-digital-painting-woman-with-intense-gaze_899449-388776.jpg?w=740',
        'https://img.freepik.com/free-photo/digital-art-style-pirate-character-portrait_23-2151486745.jpg?t=st=1720003360~exp=1720006960~hmac=61bcdbd3b27bcc7f66fa9f6eecbf2308b3aac55dedb3abf8adf8104eea817720&w=740',
        'https://img.freepik.com/premium-photo/abstract-portrait-woman-with-glitch-effect-illustration-generative-ai_691560-8498.jpg?w=740'
    ]
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const style = button.getAttribute('data-style');
        updateImages(style);
    });
});

function updateImages(style) {
    const newImages = images[style];
    imageGrid.innerHTML = '';
    newImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `AI generated ${style}`;
        img.className = 'w-full rounded';
        imageGrid.appendChild(img);
    });
}
// Function to create the button
function createButton() {
    const button = document.createElement('button');
    button.id = 'generate-button';
    button.textContent = 'Generate';
    document.body.appendChild(button);
    return button;
}

// Function to handle button click and scrolling
function clickAndScroll(targetSelector) {
    const button = document.getElementById('generate-button');
    if (!button) {
        console.error('Button not found');
        return;
    }

    button.addEventListener('click', function() {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            console.error('Target element not found');
            return;
        }

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Main function to set up everything
function setup() {
    createButton();
    clickAndScroll('#targetElement'); // Replace with your target element's selector
}

// Run the setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setup);

// Function to handle link click and scrolling
function setupGalleryLink() {
    const galleryLink = document.getElementById('gallery');
    if (!galleryLink) {
        console.error('Gallery link not found');
        return;
    }

    galleryLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        const targetElement = document.querySelector('#gallery-section'); // Replace with your actual gallery section ID
        if (!targetElement) {
            console.error('Gallery section not found');
            return;
        }

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Run the setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupGalleryLink);