const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    const status = document.querySelector("#form-status");
    const setStatus = (message, type) => {
        status.textContent = message;
        status.dataset.state = type;
    };

    if (!status) {
        throw new Error("Contact form is missing its status message.");
    }

    contactForm.addEventListener("invalid", () => {
        setStatus("Please complete all fields and enter a valid email address.", "error");
    }, true);

    contactForm.addEventListener("input", () => {
        setStatus("", "");
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);
        const subject = `Portfolio contact from ${formData.get("name")}`;
        const body = [
            `Name: ${formData.get("name")}`,
            `Email: ${formData.get("email")}`,
            "",
            formData.get("message")
        ].join("\n");
        const query = new URLSearchParams({ subject, body });
        const recipient = contactForm.dataset.recipient;

        if (!recipient) {
            throw new Error("Contact form is missing its email recipient.");
        }

        setStatus("Your email draft is ready. Review and send it in your email app; this site cannot confirm delivery.", "info");
        window.location.href = `mailto:${recipient}?${query.toString()}`;
    });
}
