//I combined these two in class activities: ButtonTriggeredAJAX and ClickJSON to obtain my below coding

$(document).ready(function () {

    // Initial array of topics
    let topics = ["Beyonce", "Jay-Z", "Tupac", "Justin Timberlake", "Jennifer Lopez", "Rihanna", "Whitney Houston", "Micheal Jackson",
        "DJ Snake", "Ariana Grande", "Katy Perry", "Bruno Mars", "Kanye West", "Khalid", "Mariah Carey"];


    // Function for putting the JSON content for each button into the div
    function displayCelebGif(evt) {



        let person = $(this).attr("data-person")
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=zU2CODu6jPmisRlsMJnncF52J89fLzoK&limit=10";

        //The ajax request code to get data from the above url
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            //This function obtains the response of the AJAX code and turns it into data
            .then(function (response) {
                let results = response.data;

                //deleting the 10 set of gifs so that only the new music artists' gifs appear per click
                $("#gifs-appear-here").empty();

                //For loop of adding the gifs and the ratings of them
                for (let i = 0; i < results.length; i++) {

                    let gifDiv = $("<div>");

                    let rating = results[i].rating;

                    let p = $("<p>").text("Rating: " + rating);

                    let celebImage = $("<img>");

                    celebImage.addClass("gif")

                    //Cited: https://stackoverflow.com/questions/44298501/how-to-pause-and-start-gif-using-jquery-ajax
                    //From the above site, I learned to add the word still before the .url to make the gift non-animated
                    celebImage.attr("src", results[i].images.fixed_height_still.url);


                    gifDiv.prepend(celebImage);
                    gifDiv.prepend(p);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    }

    //Cited: https://stackoverflow.com/questions/44298501/how-to-pause-and-start-gif-using-jquery-ajax
    //This function plays and stops the gif with every click. It toggles gif play on click
    $('div').on('click', '.gif', function () {
        let src = $(this).attr("src");

        if ($(this).hasClass('playing')) {
            //This stops the gif from animating by removing the playing class
            $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
            $(this).removeClass('playing');
        } else {
            //With another click, this code will animate the gif by adding the play class.
            $(this).addClass('playing');
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
        }
    });


    // Function for displaying the celeb data
    function renderButtons() {

        // Deleting the buttons prior to adding new topics
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (let i = 0; i < topics.length; i++) {

            //Dynamicaly generating buttons for each celeb in the array
            let a = $("<button>");
            // Adding a class of celeb to the button
            a.addClass("celeb");
            // Adding a data-attribute
            a.attr("data-person", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#add-celeb").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        let celeb = $("#celeb-input").val().trim();

        // The celeb from the textbox is then added to our array
        topics.push(celeb);

        // Calling renderButtons which handles the processing of the celeb array
        renderButtons();

    });

    // Click function for displaying the celeb info
    $(document).on("click", ".celeb", displayCelebGif);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});