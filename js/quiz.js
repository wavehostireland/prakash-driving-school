/* =====================================================================
   PRAKASH DRIVING SCHOOL — QUIZ JAVASCRIPT (quiz.js)
   -----------------------------------------------------------------
   A 15-question multiple-choice practice quiz based on general
   Ireland Category B (car) learner driver knowledge - speed limits,
   the rules of the road, signs, and safe driving practice.
   This is a STUDY AID only, not the official RSA theory test.

   HOW TO EDIT THE QUESTIONS:
   Scroll down to the "quizQuestions" array below. Each question is
   one object with:
     question    - the question text
     options     - an array of exactly 4 possible answers
     answerIndex - the position (0, 1, 2 or 3) of the CORRECT answer
                   in the options array above
     explanation - a short note shown after the visitor answers
   Add, remove, or edit any question by editing that array - nothing
   else in this file needs to change.
===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    var quizCard = document.getElementById("quiz-card");
    if (!quizCard) return; // this script only runs on quiz.html, safely does nothing elsewhere

    /* -----------------------------------------------------------
       THE QUESTION BANK - edit/add/remove questions here
    ----------------------------------------------------------- */
    var quizQuestions = [
        {
            question: "What is the default speed limit on an Irish motorway?",
            options: ["100 km/h", "120 km/h", "80 km/h", "130 km/h"],
            answerIndex: 1,
            explanation: "Unless signposted otherwise, the default motorway speed limit in Ireland is 120 km/h."
        },
        {
            question: "What is the default speed limit on a regional or local road in Ireland?",
            options: ["50 km/h", "60 km/h", "80 km/h", "100 km/h"],
            answerIndex: 2,
            explanation: "The default speed limit on regional and local roads is 80 km/h unless a sign shows a different limit."
        },
        {
            question: "How many Essential Driver Training (EDT) lessons must a first-time learner permit holder complete?",
            options: ["6 lessons", "8 lessons", "10 lessons", "12 lessons"],
            answerIndex: 3,
            explanation: "First-time learner permit holders must complete 12 EDT lessons with an Approved Driving Instructor (ADI)."
        },
        {
            question: "A solid white line in the centre of the road means:",
            options: [
                "You may overtake if it's safe",
                "You must not cross or straddle it to overtake",
                "It marks a cycle lane only",
                "It only applies at night"
            ],
            answerIndex: 1,
            explanation: "A solid white centre line means you must not cross or straddle it, except to enter a premises or turn off the road."
        },
        {
            question: "At a junction with a 'Yield' (give way) sign, you must:",
            options: [
                "Stop completely every time",
                "Give way to traffic on the main road and proceed only when safe",
                "Sound your horn before proceeding",
                "Only give way to buses"
            ],
            answerIndex: 1,
            explanation: "A Yield sign means you must give way to traffic already on the road you are joining, proceeding only when it is safe to do so."
        },
        {
            question: "When can a learner permit holder drive unaccompanied?",
            options: [
                "Never - a qualified driver must always be present",
                "After completing 6 EDT lessons",
                "Once they turn 21",
                "As soon as they pass the theory test"
            ],
            answerIndex: 0,
            explanation: "A learner permit holder must always be accompanied by a qualified driver who has held a full licence for at least 2 years."
        },
        {
            question: "What does a triangular road sign generally indicate?",
            options: ["A command you must obey", "A warning", "Information only", "A speed limit"],
            answerIndex: 1,
            explanation: "Triangular signs are warning signs, alerting drivers to hazards ahead such as bends, junctions, or pedestrians."
        },
        {
            question: "What is the legal minimum tread depth for car tyres in Ireland?",
            options: ["1.0 mm", "1.6 mm", "2.5 mm", "3.0 mm"],
            answerIndex: 1,
            explanation: "Tyres must have a minimum tread depth of 1.6 mm across the central three-quarters of the tread, around the entire circumference."
        },
        {
            question: "When approaching a pedestrian crossing with people waiting to cross, you should:",
            options: [
                "Speed up to pass before they step out",
                "Slow down and be prepared to stop",
                "Sound your horn to warn them",
                "Only slow down if a Garda is present"
            ],
            answerIndex: 1,
            explanation: "Drivers must slow down and be ready to stop for pedestrians at or waiting to use a crossing."
        },
        {
            question: "What should you do if you see a school warden sign displayed?",
            options: [
                "Ignore it if no children are visible",
                "Reduce speed and watch for children crossing",
                "It only applies during summer",
                "Sound your horn continuously"
            ],
            answerIndex: 1,
            explanation: "School warden signs warn that children may be crossing nearby; reduce speed and stay alert."
        },
        {
            question: "In Ireland, seatbelts are required:",
            options: [
                "Only for the driver",
                "Only on motorways",
                "For the driver and all passengers, front and rear",
                "Only for journeys longer than 10 minutes"
            ],
            answerIndex: 2,
            explanation: "By law, the driver and every passenger, front and rear, must wear a seatbelt if one is fitted."
        },
        {
            question: "What is the purpose of the 'Essential Driver Training' (EDT) programme?",
            options: [
                "To replace the driving test entirely",
                "To build safe driving skills and habits with a qualified instructor before the test",
                "It is only required for automatic cars",
                "To teach motorway driving only"
            ],
            answerIndex: 1,
            explanation: "EDT is a structured programme of 12 lessons designed to build safe, competent driving skills before sitting the driving test."
        },
        {
            question: "A continuous white line along the edge of the motorway marks:",
            options: [
                "The hard shoulder boundary",
                "A cycle lane",
                "A pedestrian footpath",
                "An overtaking lane"
            ],
            answerIndex: 0,
            explanation: "The solid white line along the left marks the boundary of the hard shoulder, which should only be used in an emergency or as directed."
        },
        {
            question: "Before starting a lesson or driving test, why is a 'cockpit drill' (mirrors, seat, seatbelt check) important?",
            options: [
                "It is not necessary if you know the car",
                "It ensures the car is set up safely before moving off",
                "It is only done in automatic cars",
                "It is only required at the test centre"
            ],
            answerIndex: 1,
            explanation: "Checking mirrors, seat position, and seatbelts before moving off is a basic safety routine every driver should follow every time."
        },
        {
            question: "What should a learner driver do if they feel nervous before their driving test?",
            options: [
                "Skip breakfast and lessons that day",
                "Practise mock tests and familiar routes with an instructor beforehand",
                "Avoid driving until test day",
                "There is nothing that can help with nerves"
            ],
            answerIndex: 1,
            explanation: "Mock tests and practice on realistic routes with an instructor help build confidence and reduce test-day nerves."
        }
    ];

    /* -----------------------------------------------------------
       STATE VARIABLES - track progress through the quiz
    ----------------------------------------------------------- */
    var currentQuestion = 0;   // index of the question currently on screen
    var score = 0;             // number of correct answers so far
    var answered = false;      // prevents clicking multiple answers on the same question
    var PASS_PERCENT = 80;     // EDIT HERE to change the pass mark percentage

    var progressLabel = document.getElementById("quiz-progress-label");
    var progressFill = document.getElementById("quiz-progress-fill");
    var questionBox = document.getElementById("quiz-question-box");
    var resultBox = document.getElementById("quiz-result-box");

    /* -----------------------------------------------------------
       renderQuestion()
       Builds the HTML for the current question and its 4 answer
       buttons, and resets the "answered" flag for the new question.
    ----------------------------------------------------------- */
    function renderQuestion() {
        answered = false;
        var q = quizQuestions[currentQuestion];

        progressLabel.textContent = "Question " + (currentQuestion + 1) + " of " + quizQuestions.length;
        progressFill.style.width = (((currentQuestion) / quizQuestions.length) * 100) + "%"; // ANIMATION - progress bar grows

        var optionsHtml = "";
        q.options.forEach(function (option, i) {
            optionsHtml += '<div class="quiz-option" data-index="' + i + '">' + option + "</div>";
        });

        questionBox.innerHTML =
            '<div class="quiz-question">' + (currentQuestion + 1) + ". " + q.question + "</div>" +
            '<div class="quiz-options">' + optionsHtml + "</div>" +
            '<div class="quiz-explanation" id="quiz-explanation">' + q.explanation + "</div>" +
            '<button class="btn btn-blue" id="quiz-next-btn" style="display:none;">Next Question</button>';

        // attach a click handler to every answer option
        var optionEls = questionBox.querySelectorAll(".quiz-option");
        optionEls.forEach(function (el) {
            el.addEventListener("click", function () { selectAnswer(el, optionEls); });
        });

        var nextBtn = document.getElementById("quiz-next-btn");
        nextBtn.addEventListener("click", nextQuestion);
    }

    /* -----------------------------------------------------------
       selectAnswer(el, allOptions)
       Runs when the visitor clicks one of the 4 answer options.
       Colours the chosen answer green (correct) or red (incorrect),
       always reveals the correct answer in green, shows the
       explanation box, and reveals the "Next Question" button.
    ----------------------------------------------------------- */
    function selectAnswer(el, allOptions) {
        if (answered) return; // ignore extra clicks once this question has been answered
        answered = true;

        var chosenIndex = parseInt(el.getAttribute("data-index"), 10);
        var correctIndex = quizQuestions[currentQuestion].answerIndex;

        allOptions.forEach(function (opt) { opt.classList.add("disabled"); }); // stops further clicks on this question

        if (chosenIndex === correctIndex) {
            el.classList.add("correct");   // COLOUR - green, this was the right answer
            score++;                        // increases the running score
        } else {
            el.classList.add("incorrect"); // COLOUR - red, this was the wrong answer
            allOptions[correctIndex].classList.add("correct"); // also shows which one WAS correct, in green
        }

        document.getElementById("quiz-explanation").classList.add("show"); // reveals the explanation text
        document.getElementById("quiz-next-btn").style.display = "inline-flex"; // reveals the "Next Question" button
    }

    /* -----------------------------------------------------------
       nextQuestion()
       Moves on to the next question, or shows the final results
       screen once every question has been answered.
    ----------------------------------------------------------- */
    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            renderQuestion();
        } else {
            showResults();
        }
    }

    /* -----------------------------------------------------------
       showResults()
       Calculates the final score/percentage, decides pass or fail,
       and swaps the question card for the results card.
    ----------------------------------------------------------- */
    function showResults() {
        progressFill.style.width = "100%";
        progressLabel.textContent = "Quiz Complete";

        var percent = Math.round((score / quizQuestions.length) * 100);
        var passed = percent >= PASS_PERCENT;

        questionBox.style.display = "none";
        resultBox.style.display = "block";
        resultBox.innerHTML =
            '<div class="quiz-result">' +
                '<div class="score-circle' + (passed ? "" : " fail") + '">' +
                    '<span class="score-number">' + percent + '%</span>' +
                    '<span>' + score + " / " + quizQuestions.length + '</span>' +
                '</div>' +
                '<h3 class="' + (passed ? "pass-badge" : "fail-badge") + '">' + (passed ? "PASS - Well Done!" : "Keep Practising") + '</h3>' +
                '<p style="margin:14px 0 26px;color:var(--color-mid-grey);">' +
                    (passed
                        ? "Great result! You clearly know your rules of the road - keep this up for your real theory test."
                        : "You need " + PASS_PERCENT + "% to pass this practice quiz. Review the explanations above and try again.") +
                '</p>' +
                '<button class="btn btn-yellow" id="quiz-restart-btn">Restart Quiz</button>' +
            '</div>';

        document.getElementById("quiz-restart-btn").addEventListener("click", restartQuiz);
    }

    /* -----------------------------------------------------------
       restartQuiz()
       Resets all state variables back to the start and re-renders
       the very first question, so the visitor can try again.
    ----------------------------------------------------------- */
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        answered = false;
        questionBox.style.display = "block";
        resultBox.style.display = "none";
        resultBox.innerHTML = "";
        renderQuestion();
    }

    /* Kick off the quiz by rendering the first question on page load */
    renderQuestion();
});
