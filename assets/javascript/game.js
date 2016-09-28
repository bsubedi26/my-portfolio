$(document).ready(function() {
    var allow = false; //Global boolean
    function main() {
        $("#choices").empty();
        //Declare variables
        var correct = 0;
        var incorrect = 0;
        var unanswered = 0;
        var questions = [{
                question: "Which of the following is used to roll sushi?",
                choices: ["Edible seaweed", "Tobacco Leaf", "Rolling Papers"],
                correctAnswer: 0
            }, {
                question: "Which of these people averaged one patent for every three weeks of his life?",
                choices: ["Bill Nye the Science Guy",
                    "Bill Gates", "Nikola Tesla"],
                correctAnswer: 2
            }, {
                question: "If you had Lafite-Rothchild on your dinner table, what would it be?",
                choices: ["Alcohol", "Wine", "Vegetable"],
                correctAnswer: 1
            }, {
                question: "Who is the current prime minister of India?",
                choices: ["Ramesh Koirala", "Ram Gopal",
                    "Narendra Modi"
                ],
                correctAnswer: 2
            }, {
                question: "Who is the current attorney general of the federal government?",
                choices: ["Loretta Banks", "Judge Judy",
                    "Eric Holder"
                ],
                correctAnswer: 0
            }, {
                question: "Who is the current governor of Florida?",
                choices: ["Judge Judy", "Rick Scott", "David Keltner"],
                correctAnswer: 1
            }]
            //function to get a random object property

        function randomProperty(obj) {
            var keys = Object.keys(obj)
            return obj[keys[Math.floor(Math.random() * keys.length)]];
        }
        var randomQuestion = randomProperty(questions);
        var oldQuestions = [];
        oldQuestions.push(randomQuestion);
        //Append the random question
        $("#question").append(randomQuestion.question + "<br>");
        var multipleChoice = randomQuestion.choices;
        //Loop thru the choices array and add it to a list to display it better
        for (var i = 0; i < randomQuestion.choices.length; i++) {
            $("#choices").append('<button>' + randomQuestion.choices[
                i] + '</button>');
        }
        $("#choices button").on("click", function() {
                //Gets user answer guess
                var userAnswer = $(this).text();
                if (multipleChoice.indexOf(userAnswer) ==
                    randomQuestion.correctAnswer) {
                    correct++;
                    console.log("right");
                    allow = true;
                    $("#question").empty();
                    $("#choices").html("You are correct!")
                    setTimeout(reset, 2000);
                } else {
                    incorrect++;
                    console.log("wrong");
                    allow = true;
                    $("#question").empty();
                    $("#choices").html(
                        "You are wrrrrrrooooonnngggggg! The correct answer: " +
                        randomQuestion.choices[
                            randomQuestion.correctAnswer])
                    setTimeout(reset, 2000);
                }
            })
            // Countdown Timer
        var count = 30;
        var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
        function timer() {
                count = count - 1;
                $("#time").html("Time Left: " + count);
                if (count <= 0) {
                    clearInterval(counter); //Stop counting
                    unanswered++;
                    console.log("Time ran out!")
                    $("#choices").html(
                        "You ran out of time! The correct answer: " +
                        randomQuestion.choices[randomQuestion.correctAnswer]
                    )
                    setTimeout(ending, 2000);
                }
                if (correct + incorrect + unanswered >= 5) {
                    clearInterval(counter)
                    return false;
                }
            }
            //Function that runs after all the questions have been answered

        function ending() {
            $("#time").empty();
            $("#question").empty();
            $("#choices").empty();
            console.log("end")
            var audio = new Audio(
                'https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90'
            );
            audio.play();
            $("#choices").html("All done, heres how you did!" +
                "<br>" + "Correct Answers: " + correct +
                "<br>" + "Incorrect Answers: " + incorrect +
                "<br>" + "Unanswered: " + unanswered);
            $("#correct").append(
                "<button id='startover'>Start Over?</button>"
            )
            $("#startover").on("click", function() {
                audio.pause();
                $("button").remove();
                main();
            })
        }

        function reset() {
                $("#time").empty();
                $("#question").empty();
                $("#choices").empty();
                count = 30;
                timer();
                //End questions and display correct/incorrect answers
                if (correct + incorrect + unanswered === 5) {
                    ending();
                    return
                }
                //Remove the question that was displayed in order to avoid any duplicate questions
                for (var i = 0; i < oldQuestions.length; i++) {
                    for (var j = 0; j < questions.length; j++) {
                        if (oldQuestions[i] == questions[j]) {
                            delete questions[j];
                        }
                    }
                }
                randomQuestion = randomProperty(questions);
                oldQuestions.push(randomQuestion);
                //Append the random question
                $("#question").append(randomQuestion.question +
                    "<br>");
                var multipleChoice = randomQuestion.choices;
                //Loop thru the choices array and add it to a list to display it better
                for (var i = 0; i < randomQuestion.choices.length; i++) {
                    $("#choices").append('<button>' +
                        randomQuestion.choices[i] + '</button>'
                    );
                }
                $("#choices button").on("click", function() {
                    //Gets user answer guess
                    var userAnswer = $(this).text();
                    if (multipleChoice.indexOf(userAnswer) ==
                        randomQuestion.correctAnswer) {
                        correct++;
                        console.log("right");
                        allow = true;
                        $("#question").empty();
                        $("#choices").html(
                            "You are correct!")
                        setTimeout(reset, 2000);
                    } else {
                        incorrect++;
                        console.log("wrong");
                        allow = true;
                        $("#question").empty();
                        $("#choices").html(
                            "You are wrrrrrrooooonnngggggg! The correct answer: " +
                            randomQuestion.choices[
                                randomQuestion.correctAnswer
                            ])
                        setTimeout(reset, 2000);
                    }
                })
            }
            //main closer
    }
    $(".btn").on("click", function() {
        //Remove start button
        $('#button').remove();
        $("p").empty();
        main();
        //button on click closer
    });
    //ready function closer
})