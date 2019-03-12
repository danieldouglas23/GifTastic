// Initial array of topics
var topics = ["Crying", "Dancing", "Eating", "Finger Guns", "Laughing", "Fighting",
    "Slapping", "Middle Finger", "Cooking", "Fainting", "Tossing Drink",
    "Breaking Up", "Spinning", "Smoking", "Cooking"];

// displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {

    var action = $(this).attr("data-name");
    var apiKey = "98mhv5XsGca2pklqn8vGNCjrH3JUcAUc";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=" + apiKey + "&limit=10";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            // var imageUrl = response.data.url;

            //assigns variable to a blank image
            var actionImage = $("<img>");

            //adds images from API into the blank image variable assigned above
            actionImage.attr("src", results[i].images.fixed_height.url);
            actionImage.attr("alt", "action image");

            //adds image into "images" div prior to or above previous image
            $("#gif-container").prepend(actionImage);
            console.log(response);
        }
    });

}

function renderButtons() {

    // Deletes the actions prior to adding new actions
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var newButton = $("<button>");
        // Adds a class of movie to our button
        newButton.addClass("action");
        // Added a data-attribute
        newButton.attr("data-name", topics[i]);
        // Provided the initial button text
        newButton.text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(newButton);
    }
}

// This function handles events where the submit button is clicked
$("#add-action").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var newAction = $("#action-input").val().trim();

    // The action from the textbox is then added to our array
    topics.push(newAction);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Adding click event listeners to all elements with a class of "action"
$(document).on("click", ".action", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();