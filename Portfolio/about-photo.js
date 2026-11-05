const photoEditor = document.querySelector(".about-photo-wrap");

if (photoEditor && new URLSearchParams(window.location.search).get("owner") === "1") {
    const image = photoEditor.querySelector(".about-profile-photo");
    const editButton = photoEditor.querySelector(".about-photo-edit");
    const fileInput = photoEditor.querySelector(".about-photo-input");
    const status = photoEditor.querySelector(".about-photo-status");
    const storageKey = "neelam-portfolio-profile-photo";

    if (!image || !editButton || !fileInput || !status) {
        throw new Error("Profile photo editor is missing a required element.");
    }

    document.body.classList.add("photo-owner-mode");

    try {
        const savedPhoto = window.localStorage.getItem(storageKey);
        if (savedPhoto && /^data:image\/(?:png|jpeg|webp);base64,/i.test(savedPhoto)) {
            image.src = savedPhoto;
        }
    } catch (error) {
        status.textContent = "This browser does not allow local photo storage. You can still preview a photo for this visit.";
    }

    editButton.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", () => {
        const [file] = fileInput.files;

        if (!file) {
            return;
        }

        if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
            status.textContent = "Choose a PNG, JPEG, or WebP image.";
            fileInput.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            status.textContent = "Choose an image smaller than 5 MB.";
            fileInput.value = "";
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            if (typeof reader.result !== "string") {
                status.textContent = "The selected photo could not be read.";
                return;
            }

            image.src = reader.result;

            try {
                window.localStorage.setItem(storageKey, reader.result);
                status.textContent = "Profile photo saved in this browser only.";
            } catch (error) {
                status.textContent = "Photo updated for this visit only; browser storage is unavailable or full.";
            }
        });
        reader.addEventListener("error", () => {
            status.textContent = "The selected photo could not be read.";
        });
        reader.readAsDataURL(file);
    });
}
