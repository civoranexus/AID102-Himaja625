document.getElementById("soilForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nitrogen = parseFloat(document.getElementById("nitrogen").value);
    const phosphorus = parseFloat(document.getElementById("phosphorus").value);
    const potassium = parseFloat(document.getElementById("potassium").value);
    const ph = parseFloat(document.getElementById("ph").value);
    const moisture = parseFloat(document.getElementById("moisture").value);

    let score = 0;

    if (nitrogen >= 40 && nitrogen <= 80) score++;
    if (phosphorus >= 20 && phosphorus <= 50) score++;
    if (potassium >= 120 && potassium <= 200) score++;
    if (ph >= 6 && ph <= 7.5) score++;
    if (moisture >= 30 && moisture <= 70) score++;

    let result = "Poor Soil Health";
    if (score >= 4) result = "Healthy Soil";
    else if (score >= 2) result = "Moderate Soil Health";

    alert("Soil Health Result: " + result);
});