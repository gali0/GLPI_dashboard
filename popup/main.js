document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("glpi-link")) {
    return;
  }

  browser.tabs.create({
    url: e.target.getAttribute("data")
  });

});

function InitSession(UserToken, apiURL) {
  var URL = apiURL + '/initSession/';

  let request = new XMLHttpRequest();
  request.open("GET", URL);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'user_token ' + UserToken);
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var json_response = JSON.parse(request.response);
      return json_response.session_token;
    } else {
      console.log('error ' + request.status + request.statusTest);
    }
  }
}

function KillSession(sessionToken) {
  var URL = apiURL + '/killSession/';

  var request = new XMLHttpRequest();
  request.open("GET", URL);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Session-Token', sessionToken);
  request.send();
  request.onload = () => {
    if (request.status != 200) {
      console.log('error ' + request.status + request.statusTest);
    }
  }
}

function get_data_from_api(sessionToken) {
  var urlvariable;

  urlvariable = "/search/Ticket?is_deleted=0&as_map=0&criteria[0][link]=AND&criteria[0][field]=5&criteria[0][searchtype]=contains&criteria[0][value]=laborie&criteria[1][link]=AND&criteria[1][field]=12&criteria[1][searchtype]=equals&criteria[1][value]=process&criteria[2][link]=AND&criteria[2][field]=1&criteria[2][searchtype]=notcontains&criteria[2][value]=[Jouvence]&search=Rechercher&itemtype=Ticket";

  URL = "https://glpi.mri.cnrs.fr/apirest.php" + urlvariable;  //Your URL

  var request = new XMLHttpRequest();
  request.open("GET", URL);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Session-Token', sessionToken);
  request.send();
  request.onload = () => {
    if (request.status == 200) {
      var json_response = JSON.parse(request.response);
      console.log(JSON.parse(JSON.stringify(json_response)));
      console.log('valeur : ' + json_response.totalcount);
    } else {
      console.log('error ' + request.status + request.statusTest);
    }
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function load_data(savedData) {
  sessionToken = InitSession(savedData.user_token, savedData.api_url);
  get_data_from_api(sessionToken);

}

browser.storage.local.get().then(load_data, onError);
