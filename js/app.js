/*
step by step task list to be done

1: load phone and log in console 
2: display phone in the ui using tailwind or bootstrap;
3: add search functionality (add handeler on enter button also)
4: add show all button
5: show no phone message if there is no result for the search
6: open moadl for cards button
7: add speener whille loading
*/

const loadData = (searchVAlue = "apple", dataCount) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchVAlue}`;
  fetch(url)
    .then((res) => res.json())
    .then((phonesData) => {
      displayData(phonesData.data, dataCount);
    });
};

// diasply data

const displayData = (phoneData, dataCount) => {
  const showAll = document.getElementById("showAll");
  const noPhoneMessage = document.getElementById("noPhoneMessage");
  if (phoneData.length < 1) {
    noPhoneMessage.classList.remove("hidden");
  } else {
    noPhoneMessage.classList.add("hidden");
  }
  if (phoneData.length > 10 && dataCount) {
    phoneData = phoneData.slice(0, 10);
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  phoneData.forEach((phone) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div
      class="max-w-sm bg-gray-800 text-white rounded-lg border border-gray-50 border-opacity-20 shadow-lg "
    >
      <a href="#">
        <img class="rounded-t-lg mx-auto m-2" src="${phone.image}" alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-300"
          >
            ${phone.phone_name}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-200">
          Here are the biggest enterprise technology acquisitions of 2021
          so far, in reverse chronological order.
        </p>
        <label for="my-modal" onclick="openDetails('${phone.slug}')" class="btn bg-red-500 font-bold capitalize text-white rounded modal-button">See Details</label>
      </div>
    </div>`;

    resultContainer.appendChild(div);
    loadingToogler(false);
  });
};

// heandel search when yser click search button
const btn = document.getElementById("phoneSearch");
btn.addEventListener("click", function () {
  const inputSearch = document.getElementById("inputSearch").value;
  if (inputSearch === "") {
    alert("please Enter a Valid brand name");
    return;
  }
  loadingToogler(true);
  loadData(inputSearch, 10);
});
// heandel search when user press Enter button
const inputSearch = document.getElementById("inputSearch");
inputSearch.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputSearch.value == "") {
      alert("please Enter a Valid brand name");
      return;
    }
    loadData(inputSearch.value, 10);
  }
});

const btnForShowAll = document.getElementById("btnForShowAll");
btnForShowAll.addEventListener("click", function () {
  if (inputSearch.value === "") {
    loadData("iphone");
  }
  loadData(inputSearch.value);
});

loadData("apple", 10);

function openDetails(phoneSlug) {
  loaadPhoneDetails(phoneSlug);
}

const loaadPhoneDetails = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((details) => {
      console.log(details);
      const modalTile = document.getElementById("modalTile");
      const detailsIMage = document.getElementById("detailsIMage");
      const releaseDate = document.getElementById("releaseDate");
      modalTile.innerText = details.data.name;
      detailsIMage.setAttribute("src", details.data.image);
      releaseDate.innerText = details.data.releaseDate
        ? details.data.releaseDate
        : "no release Date found";
    });
};

const loadingToogler = (isLoading) => {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};
