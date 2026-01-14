document.getElementById("soilForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const nitrogen = parseFloat(document.getElementById("nitrogen").value);
    const phosphorus = parseFloat(document.getElementById("phosphorus").value);
    const potassium = parseFloat(document.getElementById("potassium").value);
    const ph = parseFloat(document.getElementById("ph").value);
    const moisture = parseFloat(document.getElementById("moisture").value);

    let score = 0;
    let advice = [];

    if (nitrogen >= 40 && nitrogen <= 80) score++;
    else advice.push("Adjust nitrogen levels for better plant growth.");

    if (phosphorus >= 20 && phosphorus <= 50) score++;
    else advice.push("Improve phosphorus levels to support root development.");

    if (potassium >= 120 && potassium <= 200) score++;
    else advice.push("Potassium levels should be optimized to enhance crop strength.");

    if (ph >= 6 && ph <= 7.5) score++;
    else advice.push("Soil pH should be maintained between 6 and 7.5.");

    if (moisture >= 30 && moisture <= 70) score++;
    else advice.push("Ensure proper soil moisture through irrigation or drainage.");

    let status = "Poor Soil Health";
    let reason = "Multiple soil parameters are outside optimal ranges.";

    if (score >= 4) {
        status = "Healthy Soil";
        reason = "Most soil parameters fall within recommended ranges.";
        advice = ["Maintain current soil management practices."];
    } else if (score >= 2) {
        status = "Moderate Soil Health";
        reason = "Some soil parameters need improvement for better productivity.";
    }

    localStorage.setItem("soilStatus", status);
    localStorage.setItem("soilReason", reason);
    localStorage.setItem("soilAdvice", JSON.stringify(advice));

    window.location.href = "result.html";
});

window.onload = function () {
    const status = localStorage.getItem("soilStatus");
    if (!status) return;

    document.getElementById("healthStatus").innerText = status;
    document.getElementById("healthReason").innerText =
        localStorage.getItem("soilReason");

    const adviceList = document.getElementById("adviceList");
    JSON.parse(localStorage.getItem("soilAdvice")).forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        adviceList.appendChild(li);
    });
};