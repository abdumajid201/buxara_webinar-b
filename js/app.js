// ===== MODAL =====
const modal = document.getElementById("modal");
const openBtns = document.querySelectorAll(".head__row__btn");
const closeBtn = document.getElementById("closeModal");

function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        openModal();
    });
});

closeBtn.addEventListener("click", () => {
    closeModal();
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

const phoneInput = document.getElementById("phoneInput");
phoneInput.value = "+998";

phoneInput.addEventListener("input", (e) => {
    let numbers = e.target.value.replace(/\D/g, "");

    if (!numbers.startsWith("998")) {
        numbers = "998" + numbers;
    }

    numbers = numbers.slice(0, 12);

    let formatted = "+998";

    if (numbers.length > 3) {
        formatted += " (" + numbers.slice(3, 5);
    }
    if (numbers.length >= 5) {
        formatted += ") " + numbers.slice(5, 8);
    }
    if (numbers.length >= 8) {
        formatted += "-" + numbers.slice(8, 10);
    }
    if (numbers.length >= 10) {
        formatted += "-" + numbers.slice(10, 12);
    }

    e.target.value = formatted;
});

const modalForm = document.getElementById("modalForm");
const submitBtn = modalForm.querySelector(".modal__submit");

// Google Apps Script Web App URL manzilini shu yerga qo'ying.
const GOOGLE_SHEETS_WEBHOOK_URL = "1b9E4ZogcGocg7tXTCDgFHiwIOPVGB4sLSC5Zpg-jMsyCPA_zvvkeUHep";

modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const phone = phoneInput.value;
    const numbers = phone.replace(/\D/g, "");
    const nameInput = document.getElementById("nameInput");

    if (nameInput.value.trim().length < 2) {
        alert("Ismingizni to'g'ri kiriting!");
        nameInput.focus();
        return;
    }

    if (numbers.length !== 12 || !numbers.startsWith("998")) {
        alert("To'g'ri telefon kiriting!\nMasalan: +998 (90) 123-45-67");
        phoneInput.focus();
        return;
    }

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
        alert("Google Sheets URL hali kiritilmagan. `js/Modal2.js` faylida URL ni qo'shing.");
        return;
    }

    submitBtn.disabled = true;
    const oldBtnText = submitBtn.textContent;
    submitBtn.textContent = "Yuborilmoqda...";

    const payload = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        createdAt: new Date().toISOString(),
        page: window.location.href,
    };

    try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload),
        });

        alert("Ma'lumot Google Sheets'ga yuborildi!");
        modalForm.reset();
        closeModal();
        phoneInput.value = "+998";
    } catch (error) {
        console.error("Google Sheets yuborishda xatolik:", error);
        alert("Yuborishda xatolik bo'ldi. Iltimos, yana urinib ko'ring.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = oldBtnText;
    }
});
