const apikey = "65dfee2afdc04c5da0d384fa386abcf3";

const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", fetchdata("india"));

async function fetchdata(query) {
    const res = await fetch(`${url}${query}&apiKey=${apikey}`);
    const data = await res.json();
    BindData(data.articles);
}

function BindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const new_card_temp = document.getElementById("news-card-template");

    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = new_card_temp.content.cloneNode(true);
        FillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function FillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#card-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}