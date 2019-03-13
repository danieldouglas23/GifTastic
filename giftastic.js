// Initial array of topics
var topics = ["Crying", "Dancing", "Eating", "Finger Guns", "Laughing", "Fighting",
    "Slapping", "Middle Finger", "Cooking", "Fainting", "Tossing Drink",
    "Breaking Up", "Spinning", "Smoking", "Cooking"];

// displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {

    var action = $(this).attr("data-name");
    var apiKey = "98mhv5XsGca2pklqn8vGNCjrH3JUcAUc";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=" + apiKey + "&limit=10";

    // Creates AJAX call for the specific action button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var actionDiv = $("<div class='action-div'>");
            //
            var actionImage = $("<img class='gif'>");
            var p = $("<p class='rating-text'>");
            // Set the inner text of the paragraph to the rating of the image in results[i].
            p.text("Rating: " + results[i].rating);

            //adds images from API into the blank image variable
            
            actionImage.attr("src", results[i].images.fixed_height_still.url);
            actionImage.attr("alt", "action image");
            actionImage.attr("data-state", "still");
            actionImage.attr("data-still", results[i].images.fixed_height_still.url);
            actionImage.attr("data-animate", results[i].images.fixed_height.url);

            actionDiv.append(p);
            actionDiv.append(actionImage);
            $("#gif-container").prepend(actionDiv);
            console.log(response);
        }
    });

}

$("#gif-container").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    var stillURL = $(this).attr("data-still");
    var animatedURL = $(this).attr("data-animate");

    if (state === "still") {
        $(this).attr("src", animatedURL); 
        $(this).attr("data-state", "animate");

      } else {
        $(this).attr("src", stillURL);
        $(this).attr("data-state", "still");
      }
});


function renderButtons() {

    // Deletes the actions prior to adding new actions so we don't have repeats
    $("#buttons-view").empty();

    // Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        var newButton = $("<button>");
        // Adds a class of action to our button
        newButton.addClass("action");
        // Added a data-attribute
        newButton.attr("data-name", topics[i]);
        // Provided the initial button text
        newButton.text(topics[i]);
        
        // Added the button to the buttons-view div
        $("#buttons-view").append(newButton);
        //Adds CSS styling to the buttons
        $(".action").css({"width": "200px", "height": "35px", "background-color": "darkcyan", "color": "white"});
    }
}

// Adds new buttons to array and calls RenderButtons to display them all
$("#add-action").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var newAction = $("#action-input").val().trim();

    // The action from the textbox is then added to our array
    topics.push(newAction);

    renderButtons();

});

// Adding click event listeners to all elements with a class of "action"
$(document).on("click", ".action", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();