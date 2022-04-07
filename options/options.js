const api_url_doc = document.querySelector("#api_url");
const user_token_doc = document.querySelector("#user_token");
const base_url_doc = document.querySelector("#base_url");
const search_criteria_doc = document.querySelector("#search_criteria");


function saveOptions(e) {
  browser.storage.local.set({
    api_url: api_url_doc.value,
    user_token: user_token_doc.value,
    base_url: base_url_doc.value,
    search_criteria: search_criteria_doc.value
  });
}

function prettyPrint() {
    var ugly = document.getElementById('search_criteria').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    console.log(pretty);
    document.getElementById('search_criteria').value = pretty;
}

function setCurrentChoice(result) {
  api_url_doc.value = result.api_url || "https://glpi.example.com/apirest.php";
  user_token_doc.value = result.user_token || "<user_token>";
  base_url_doc.value = result.base_url || "https://glpi.example.com";
  search_criteria_doc.value = result.search_criteria || '{"label of search": "is_deleted=0&as_map=0&criteria[0][link]=AND&criteria[0][field]=12&criteria[0][searchtype]=equals&criteria[0][value]=notold&search=Rechercher&itemtype=Ticket"}';
  prettyPrint();
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.storage.local.get().then(setCurrentChoice, onError);

document.querySelector("form").addEventListener("submit", saveOptions);
