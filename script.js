const url = `https://api.tvmaze.com/shows/82/episodes`;
const container = document.querySelector(".seri");
const select = document.querySelector(".list");
const search = document.querySelector("#search");

const createCard = (data) => {
  for (const response of data) {
    const section = document.createElement("section");
    section.classList.add("episode");

    const img = document.createElement("img");
    img.classList.add("episode__img");
    img.src = response.image.medium;

    const div = document.createElement("div");
    div.classList.add("episode__data");

    const episodeName = document.createElement("h3");
    episodeName.classList.add("episode__name");

    const play = document.createElement("a");
    play.textContent = "Paly";
    play.href = response.url;
    play.target = "_blank";
    play.classList.add("play-btn");

    episodeName.textContent = `${response.name} - S${
      (response.season < 10 ? "0" : "") + response.season
    }E${(response.number < 10 ? "0" : "") + response.number}`;

    const summary = document.createElement("h4");
    summary.classList.add("episode__summery");

    const summaryText = response.summary.substring(
      3,
      response.summary.length - 4
    );
    summary.textContent = summaryText;

    div.append(summary, episodeName, play);
    section.append(img, div);

    container.append(section);
    container.style.opacity = 1;
  }
};

const removeCard = () => {
  container.innerHTML = "";
};

const createList = (data) => {
  for (const response of data) {
    const option = document.createElement("option");
    option.textContent = `S${
      (response.season < 10 ? "0" : "") + response.season
    }E${(response.number < 10 ? "0" : "") + response.number}-${response.name} `;
    select.append(option);
  }
  createCard(data);
};

async function getData() {
  const response = await axios.get(url);
  const movies = response.data;

  createList(movies);

  //search
  search.addEventListener("input", (e) => {
    const SearchData = movies.filter(
      (movie) =>
        movie.name.includes(e.target.value) ||
        movie.summary.includes(e.target.value)
    );
    console.log(SearchData);
    removeCard();
    createCard(SearchData);
  });

  //select
  select.addEventListener("change", function (e) {
    let movieName = select.value.split("-")[1];

    if (select.value === "All episode") {
      removeCard();
      createCard(movies);
    } else {
      const SelectData = movies.filter((movie) => movie.name === movieName);
      removeCard();
      createCard(SelectData);
    }
  });

  container.addEventListener("click", function (e) {
    if (
      e.target instanceof HTMLImageElement &&
      e.target.nextElementSibling.firstChild.style.display === "block"
    ) {
      e.target.nextElementSibling.firstChild.style.display = "none";
    } else if (e.target instanceof HTMLImageElement) {
      e.target.nextElementSibling.firstChild.style.display = "block";
    }
  });
}

getData();
