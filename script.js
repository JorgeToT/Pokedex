const fetchPokemon = () => {
    let pokeNameInput = document
        .getElementById("pokeNameInput")
        .value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNameInput}`;
    fetch(url)
        .then((res) => {
            if (res.status != "200") {
            } else {
                return res.json();
            }
        })
        .then((data) => {
            if (data) {
                let pokeImg = data.sprites.other.home;
                let namePoke = data.name;
                let typePoke = data.types;
                let statsPoke = data.stats;
                let pokeAbilities = data.abilities;
                let movesPoke = data.moves;
                pokeImage(pokeImg);
                pokeName(namePoke);
                pokeType(typePoke);
                pokeStats(statsPoke);
                abilitiesPoke(pokeAbilities);
                pokeMoves(movesPoke);
            }
        });
};
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url.front_default;
    document.getElementById("pokeImgS").src = url.front_shiny;
    document.getElementById("stats").className = "datos textCapitalize";
};
const pokeName = (url) => {
    document.getElementById("pokeName").innerHTML = url;
};
const pokeType = (url) => {
    let type1 = url[0].type.name;
    document.getElementById("pokeType1").innerHTML =
        "<div class='format " + type1 + "'>" + type1 + "</div>";
    document.getElementById("pokeImg").className = type1 + " format2";
    document.getElementById("pokeImgS").className = type1 + " format2";
    if (url.length == 2) {
        let type2 = url[1].type.name;
        document.getElementById("pokeType2").innerHTML =
            "<div class='format " + type2 + "'>" + type2 + "</div>";
    } else {
        document.getElementById("pokeType2").innerHTML = "";
    }
};
const pokeStats = (url) => {
    document.getElementById("hpPoke").innerHTML =
        "HP:<span>" + url[0].base_stat + "</span>";
    document.getElementById("atkPoke").innerHTML =
        "ATK:<span>" + url[1].base_stat + "</span>";
    document.getElementById("atkSpePoke").innerHTML =
        "SP. ATK:<span>" + url[2].base_stat + "</span>";
    document.getElementById("defPoke").innerHTML =
        "DEF:<span>" + url[3].base_stat + "</span>";
    document.getElementById("defSpePoke").innerHTML =
        "SP. DEF:<span>" + url[4].base_stat + "</span>";
    document.getElementById("speedPoke").innerHTML =
        "SPD:<span>" + url[5].base_stat + "</span>";
};
const abilitiesPoke = (url) => {
    let abilities = "Ability:<br>";
    url.forEach((element) => {
        abilities += element.ability.name + "   <br>";
    });
    document.getElementById("pokeAbilities").innerHTML = abilities;
};
const pokeMoves = (url) => {
    let movimientos = [];
    url.forEach((element) => {
        let last = element.version_group_details.length - 1;
        let mov = {
            name: element.move.name,
            level: element.version_group_details[last].level_learned_at,
            method: element.version_group_details[last].move_learn_method.name,
            version: element.version_group_details[last].version_group.name,
        };
        movimientos.push(mov);
    });
    movimientos.sort(sortBy("level"));
    document.getElementById("tablaMovimientos").innerHTML =
        createTable(movimientos);
};
const createTable = (array) => {
    let stringTable =
        "<tr><th>Nombre de Movimiento</th><th>Nivel</th><th>Método</th><th>Desde la Versión</th></tr>";
    array.forEach((element) => {
        let fila = "<tr><td>";
        fila += element.name + "</td>";
        fila += "<td>" + element.level + "</td>";
        fila += "<td>" + element.method + "</td>";
        fila += "<td>" + element.version + "</td>";
        stringTable += fila;
    });
    return stringTable;
};
document.getElementById("button").addEventListener("click", function () {
    fetchPokemon();
});
pokeNameInput.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        button.click();
    }
});
function sortBy(key, reverse) {
    var moveSmaller = reverse ? 1 : -1;
    var moveLarger = reverse ? -1 : 1;
    /**
     * @param  {*} a
     * @param  {*} b
     * @return {Number}
     */
    return function (a, b) {
        if (a[key] < b[key]) {
            return moveSmaller;
        }
        if (a[key] > b[key]) {
            return moveLarger;
        }
        return 0;
    };
}
