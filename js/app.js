function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  var spaceships = userDatas[2].data;
  //ki(spaceships);
  //sortCostInCredits(spaceships);
  deleteNull(spaceships);
  nulltoUnknown(spaceships);
  shipDetailsToDiv(spaceships);
  statisztika("Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.", );
  statisztika("A legnagyobb cargo_capacity-vel rendelkező hajó neve");
  statisztika("Az összes hajó utasainak (passengers) összesített száma");
  statisztika("A leghosszabb(lengthiness) hajó képe");
  darabszam(spaceships);
  allPassengers(spaceships);
  biggestCargo(spaceships);
  lengthiness(spaceships);


}

getData('/json/spaceships.json', successAjax);


function sortCostInCredits(array) {
  var nulls = [];
  var notNulls = [];
  for (var i = 0; i < array.length; i++) {

    if (array[i].cost_in_credits == null) {
      nulls.push(array[i]);
      continue;
    } else {
      notNulls.push(array[i]);
    }
  }
  for (var j = 0; j < notNulls.length - 1; j++) {
    for (var c = 1; c < notNulls.length; c++) {
      var arr1 = parseInt(notNulls[j].cost_in_credits);
      var arr2 = parseInt(notNulls[c].cost_in_credits);
      if (arr1 > arr2) {
        var temp = [notNulls[j], notNulls[c]];
        notNulls[j] = temp[1];
        notNulls[c] = temp[0];
      }
    }

  }
  console.log(notNulls);
}






function deleteNull(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].consumables == null) {
      array.splice(i, 1);
      i--;
    }
  }
  console.log(array);
}

function nulltoUnknown(array) {
  for (var i = 0; i < array.length; i++) {
    for (var k in array[i]) {
      if (array[i][k] == null) {
        array[i][k] = "unknown";
      }
    }
  }
  console.log(array);
}

function shipDetailsToDiv(array) {

  var divForCharacters = document.querySelector(".shapceship-list");

  for (var i = 0; i < array.length; i++) {

    var div = document.createElement('DIV');
    var details = document.createElement('DIV');
    var img = document.createElement('IMG');
    var br = document.createElement("BR");

    div.setAttribute('id', "character");

    div.appendChild(details);
    div.appendChild(img);

    img.setAttribute('src', 'starwars-basiczaro/img/' + array[i].image);

    details.innerText = array[i].model;

    divForCharacters.appendChild(div);


  }

}


function searchInSpaceShips(array, searchString) {
  for (var i in array) {
    if (array[i].model.indexof(searchstring.toLowerCase())) {
      return array[i];
    }
  }
  return "Nincs találat!";
}


function initSearch(array) {
  var button = document.querySelector("#search-button");
  button.addEventListener("click", function () {
    var input = document.querySelector("input").value;
    var shapceship = searchInSpaceships(array, input);
    showSpaceshipDetail();
  })
}


function statisztika(string, parameter2) {
  var table = document.createElement('TABLE');
  table.setAttribute('class', 'table');

  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell = row.insertCell(0);
  var row2 = header.insertRow(0);
  var cell2 = row.insertCell(0);


  var div = document.querySelector(".shapceship-list");
  div.appendChild(table);

  cell2.innerHTML = string;



}

function darabszam(array) {
  var db = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i].crew == 1) {
      db += 1;
    }
  }
  return db;
}

function biggestCargo(array) {
  var biggest = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i].cargo_capacity === "unknown") {
      continue;
    } else if (parseInt(array[i].cargo_capacity) > parseInt(biggest.cargo_capacity)) {
      biggest = array[i];
    }
  }

  return biggest.model;
}


function allPassengers(array) {
  var sum = 0
  for (var i = 0; i < array.length; i++) {
    if (array[i].passengers === "unknown") {
      continue;
    }
    sum += parseInt(array[i].passengers);
  }
  console.log(sum);
}

function lengthiness(array) {
  var length = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i].lengthiness === "unknown") {
      continue;
    } else if (parseInt(array[i].lengthiness) > parseInt(length.lengthiness)) {
      length = array[i];
    }
  }
  console.log(length);
}
//function

//function ki(array) {
//console.log(parseInt(array[2].cost_in_credits));
//console.log(parseInt(array[8].cost_in_credits))
//};

/*function showdetails(array) {
  for (var i = 0; i < array.length; i++) {
    var arrayObject;
    for (var k in ){

  }

}*/

alert("siker");