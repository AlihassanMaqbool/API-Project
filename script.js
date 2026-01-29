// const api ="https://restcountries.com/v3.1/independent?status=true"
// const data = async ()=>{
//     const respones = await fetch(api)
//     const result = await respones.json()
//     console.log(result);
//     result.forEach(element => {
//     const ali = element.name.common  
//     const heading = document.createElement("h1")  

//     heading.textContent = ali    
//     heading.style.display ="flex"
//     heading.style.flexWrap ="wrap"
//     document.body.append(heading)
//     // heading.className=  "heading"
//     });

// }
// document.addEventListener("DOMContentLoaded", data);

// data()



const api = "https://restcountries.com/v3.1/independent?status=true";

const data = async () => {
    const response = await fetch(api);
    const result = await response.json();
    console.log(result);

    result.forEach(country => {

        // Card
        const card = document.createElement("div");
        card.style.width = "220px";
        card.style.padding = "10px";
        card.style.margin = "10px";
        card.style.border = "1px solid #ccc";
        card.style.borderRadius = "10px";
        card.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
        card.style.display = "inline-block";
        card.style.textAlign = "center";
        card.style.cursor = "pointer";
        card.style.background = "#fff";

        // Flag
        const img = document.createElement("img");
        img.src = country.flags.png;
        img.style.width = "180px";
        img.style.height = "110px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "6px";

        // Name
        const heading = document.createElement("h3");
        heading.textContent = country.name.common;

        // Put inside card
        card.append(img, heading);
        document.body.append(card);

        // CLICK → SHOW POPUP
        card.addEventListener("click", () => showPopup(country));
    });
};

document.addEventListener("DOMContentLoaded", data);


// POPUP FUNCTION
function showPopup(country) {
    const popup = document.getElementById("popup");
    const content = document.getElementById("popupContent");

    // Languages
    const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "Not Available";

    // Popup HTML
    content.innerHTML = `
        <img src="${country.flags.png}" style="width:180px; border-radius:8px;">
        <h2>${country.name.common}</h2>
        <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        <p><b>Languages:</b> ${languages}</p>

        <button id="closeBtn" style="
            padding: 10px 20px;
            margin-top: 15px;
            border: none;
            background: red;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        ">Close</button>
    `;

    popup.style.display = "flex";

    // Close button
    document.getElementById("closeBtn").onclick = () => {
        popup.style.display = "none";
    };
}

































document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "f") {
        event.preventDefault();

        const bar = document.getElementById("searchBar");
        bar.classList.add("show");

        setTimeout(() => {
            document.getElementById("searchInput").focus();
        }, 200);
    }
});

// Close Button
document.getElementById("closeSearch").onclick = () => {
    const bar = document.getElementById("searchBar");
    bar.classList.remove("show");

    document.getElementById("searchInput").value = "";
    filterCards("");
};

// Filtering Cards
document.getElementById("searchInput").addEventListener("input", function () {
    filterCards(this.value.toLowerCase());
});

function filterCards(text) {
    const cards = document.querySelectorAll("div");

    cards.forEach(card => {
        if (card.querySelector("h3")) {
            const name = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = name.includes(text) ? "inline-block" : "none";
        }
    });
}
