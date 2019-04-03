$("#storySubmit").on("click", function(event) {
    event.preventDefault();
    var story = {
        newStory: $("#newStoryInput").val().trim(),
        mature: $("#matureCheck").prop("checked")
    }
    console.log(story);
    
    $.post("/api/new", story)
    .then(alert("New story started!")
    )
    $("#newStoryInput").val("")
})

$("#newUnfinished").on("click", function(event) {
    event.preventDefault();
    console.log($("#countHolder").text().trim())
    
    $.get("/api/unfinished/", function(data) {
        console.log(data)
        $("#continueStory").text(data[0].recentText).attr("dbID",data[0].id)
        $("#numberStory").text((data[0].storyCount + 1) + " out of 10").attr("storyCount",data[0].storyCount)
    })
})

$("#newFinished").on("click", function(event) {
    event.preventDefault();
    console.log($("#countHolder").text().trim())
    
    $.get("/api/finished/", function(data) {
        console.log(data)
        var arr = data[0].mainText.split("[.]")
        $.each(arr, function (index, value) {
            var d = $("<div>").text(value)
            $("#continueStory").append(d).append("<br>")
        })
        $("#continueStory").attr("dbID",data[0].id)
        $("#numberStory").text((data[0].storyCount + 1) + " out of 10").attr("storyCount",data[0].storyCount)
    })
})


$("#storyUpdate").on("click", function(event) {
    event.preventDefault();
    var story = {
        id: $("#continueStory").attr("dbID"),
        mainText: $("#continueStory").text().trim() + " [.] " + $("#newStoryInput").val().trim(),
        recentText: $("#newStoryInput").val().trim(),
        storyCount: parseInt($("#numberStory").attr("storyCount")) + 1
    }
    console.log(story);
    
    // $.post("/api/new", story)
    // .then(console.log("story posted!"))
    // $("#newStoryInput").val("")

    $.ajax({
        url: "/api/update",
        data: story,
        type: 'PUT',
        success: function(res) {
            console.log("story extended!")
            alert("Story segment extended!")
            $("#newStoryInput").val("")
        }
    });
})