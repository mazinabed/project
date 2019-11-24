
var category = '';
var apiKey = '9973533';

var randomMealsURL = 'https://www.themealdb.com/api/json/v2/' + apiKey + '/random.php';
var categoryMealURL = 'https://www.themealdb.com/api/json/v2/' + apiKey + '/filter.php?c=' + category;


var alcoholType = '';
var randomDrinksURL = 'https://www.thecocktaildb.com/api/json/v2/' + apiKey + '/random.php';
var alcoholTypeURL = 'https://www.thecocktaildb.com/api/json/v2/' + apiKey + '/search.php?i=' + alcoholType;

function searchDrinkName() {
    event.preventDefault()

    var drinkName = document.getElementById('userInput').value;
    var drinkNameURL = 'https://www.thecocktaildb.com/api/json/v2/' + apiKey + '/search.php?s=' + drinkName;

    $('#mainContent').empty();

    $.ajax({
        url: drinkNameURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.drinks.length; i++) {
            var drinkDiv = $("#mainContent");

            var imgURL = response.drinks[i].strDrinkThumb;
            var image = $("<img>").attr("src", imgURL);
            drinkDiv.append(image);

            var name = response.drinks[i].strDrink;
            var pTwo = $("<h3>").html(name);
            drinkDiv.append(pTwo);
            var drink = response.drinks[i];

            let index = 1;
            let ingredientArray = [];
            while (drink['strIngredient' + index]) {
                ingredientArray.push({ name: drink['strIngredient' + index], amount: drink['strMeasure' + index] ? drink['strMeasure' + index] : "A dash " });
                index++;
            }

            ingredientArray.forEach((ingredient) => {
                var pThree = $("<li>").text(`${ingredient.amount} of ${ingredient.name}`);
                drinkDiv.append(pThree);

            });
            var instruction = response.drinks[i].strInstructions;
            var pFour = $("<p>").html("Instructions: " + instruction);
            drinkDiv.append(pFour);

            const newInnerHTML = `
		<div class="row">
			
		${
                response.drinks[i].strDrinkThumb ? `
		<div class="row">
		</div>`
                    : ''
                }
	`;

            drinkDiv.append(newInnerHTML);
        };


    });

}

function randomRecomendation() {
    event.preventDefault();

    $('#mainContent').empty();

    $.ajax({
        url: randomDrinksURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        var mainContent = $('#mainContent');
        let html = `
        <img src='${response.drinks[0].strDrinkThumb}'>
        <h3>${response.drinks[0].strDrink}</h3>
        `

        for (var i = 1; i <= 15; i++) {
            let ingredient = "strIngredient" + i;
            let measure = "strMeasure" + i;
            if (response.drinks[0][measure] && response.drinks[0][ingredient]) {
                html += `<li>${response.drinks[0][measure]} of ${response.drinks[0][ingredient]}</li>`
            }
        }

        html += `<p> ${response.drinks[0].strInstructions}</p>`

        mainContent.append(html)
    })

    $.ajax({
        url: randomMealsURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        var mainContent = $('#mainContent');
        let html = `
        <img src='${response.meals[0].strMealThumb}'>
        <p>Country: ${response.meals[0].strArea}</p>
        <h3>${response.meals[0].strMeal}</h3>
        `

        for (var i = 1; i <= 15; i++) {
            let ingredient = "strIngredient" + i;
            let measure = "strMeasure" + i;
            if (response.meals[0][measure] && response.meals[0][ingredient]) {
                html += `<li>${response.meals[0][measure]} of ${response.meals[0][ingredient]}</li>`
            }
        }

        html += `<p> ${response.meals[0].strInstructions}</p>`

        mainContent.append(html)
    });
}

function searchMealName() {
    event.preventDefault();

    var mealSpaceName = document.getElementById('userInput').value;

    var mealNameURL = 'https://www.themealdb.com/api/json/v2/' + apiKey + '/search.php?s=' + mealSpaceName;

    $('#mainContent').empty();

    $.ajax({
        url: mealNameURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.meals.length; i++) {
            var mealDiv = $("#mainContent");

            var imgURL = response.meals[i].strMealThumb;
            var image = $("<img>").attr("src", imgURL);
            mealDiv.append(image);

            var area = response.meals[i].strArea;
            var pOne = $("<h5>").html("Country: " + area);
            mealDiv.append(pOne);

            var name = response.meals[i].strMeal;
            var pTwo = $("<h5>").html(name);
            mealDiv.append(pTwo);
            var meal = response.meals[i];

            let index = 1;
            let ingredientArray = [];
            while (meal['strIngredient' + index]) {
                ingredientArray.push({ name: meal['strIngredient' + index], amount: meal['strMeasure' + index] ? meal['strMeasure' + index] : "A dash " });
                index++;
            }

            ingredientArray.forEach((ingredient) => {
                var pThree = $("<li>").text(`${ingredient.amount} of ${ingredient.name}`);
                mealDiv.append(pThree);

            });
            var instruction = response.meals[i].strInstructions;
            var pFour = $("<p>").html("Instructions:  " + instruction, null, 2 );
            mealDiv.append(pFour);

            const newInnerHTML = `
		<div class="row">
			
		${
                response.meals[i].strMealThumb ? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${response.meals[i].strYoutube.slice(-11)}">
				</iframe>
            </div>
            <hr>
		</div>`
                    : ''
                }
	`;

            mealDiv.append(newInnerHTML);
        };


    });

};

$(document).ready(function () {

    event.preventDefault();
    $(".button-collapse").sideNav();
});

$('#randomButton').on('click', randomRecomendation)
$('#searchButton').on('click', function () {
    var optionValue = document.getElementById('dropDownBar').value;
    if (optionValue === '1') {
        searchMealName();
    } else if (optionValue === '2') {
        searchDrinkName();
    }
})
