document.getElementById("seoForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const urlInput = document.getElementById("urlInput").value.trim();
    if (!urlInput) {
        alert("Please enter a URL.");
        return;
    }

    try {
        const response = await fetch("/api/seo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: urlInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Error fetching SEO data:", error);
    }
});

function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <p><strong>SEO Score:</strong> ${data.seoScore}</p>
        <h3>Issues Found</h3>
        <ul>${data.issues.map(issue => `<li class="issues">${issue.issue}: ${issue.explanation}</li>`).join('')}</ul>
        <h3>Good Practices</h3>
        <ul>${data.goodPractices.map(practice => `<li class="good-practices">${practice}</li>`).join('')}</ul>
    `;
}
