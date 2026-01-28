document.addEventListener("DOMContentLoaded", () => {

    /* Auth State and Page Control */

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const protectedPages = [
        "index.html",
        "dashboard.html",
        "input.html",
        "result.html",
        "about.html"
    ];

    const publicPages = [
        "login.html",
        "signup.html"
    ];

    /* Redirect rules */
    if (!isLoggedIn && protectedPages.includes(currentPage)) {
        window.location.href = "login.html";
        return;
    }

    if (isLoggedIn && publicPages.includes(currentPage)) {
        window.location.href = "dashboard.html";
        return;
    }

    /* Navbar Visibility Control */

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const authLinks = document.querySelectorAll(".auth-only");

    if (isLoggedIn) {
        authLinks.forEach(link => link.style.display = "inline-block");
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
        authLinks.forEach(link => link.style.display = "none");
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "none";
    }

    /* Login */

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "dashboard.html";
        });
    }

    /* Signup */

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "dashboard.html";
        });
    }

    /* Logout */

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "login.html";
        });
    }
});


/* Soil Analysis Logic */

const soilForm = document.getElementById("soilForm");

if (soilForm) {
    soilForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nitrogenVal = parseFloat(document.getElementById("nitrogen").value);
        const phosphorusVal = parseFloat(document.getElementById("phosphorus").value);
        const potassiumVal = parseFloat(document.getElementById("potassium").value);
        const phVal = parseFloat(document.getElementById("ph").value);
        const moistureVal = parseFloat(document.getElementById("moisture").value);

        let score = 0;
        let advice = [];

        if (nitrogenVal >= 40 && nitrogenVal <= 80) score++;
        else advice.push("Adjust nitrogen levels.");

        if (phosphorusVal >= 20 && phosphorusVal <= 50) score++;
        else advice.push("Improve phosphorus levels.");

        if (potassiumVal >= 120 && potassiumVal <= 200) score++;
        else advice.push("Optimize potassium levels.");

        if (phVal >= 6 && phVal <= 7.5) score++;
        else advice.push("Maintain soil pH between 6 and 7.5.");

        if (moistureVal >= 30 && moistureVal <= 70) score++;
        else advice.push("Ensure proper soil moisture.");

        let status = "Poor Soil Health";
        let reason = "Multiple parameters are outside optimal range.";

        if (score >= 4) {
            status = "Healthy Soil";
            reason = "Most parameters are within optimal range.";
            advice = ["Maintain current practices."];
        } else if (score >= 2) {
            status = "Moderate Soil Health";
            reason = "Some parameters need improvement.";
        }

        localStorage.setItem("soilStatus", status);
        localStorage.setItem("soilReason", reason);
        localStorage.setItem("soilAdvice", JSON.stringify(advice));

        window.location.href = "result.html";
    });
}


/* Result Page Rendering */

const healthStatus = document.getElementById("healthStatus");

if (healthStatus) {
    const status = localStorage.getItem("soilStatus");
    const reason = localStorage.getItem("soilReason");
    const advice = JSON.parse(localStorage.getItem("soilAdvice") || "[]");

    healthStatus.innerText = status;
    document.getElementById("healthReason").innerText = reason;

    const adviceList = document.getElementById("adviceList");
    adviceList.innerHTML = "";

    advice.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        adviceList.appendChild(li);
    });
}