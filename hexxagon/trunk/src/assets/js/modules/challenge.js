$(document).on('click', '.challenge-decision', function () {
    sendDecision(this);
});

function setChallenger(challenger) {
    var challengeBox =
        "<div class='challenge-box animated shake'>Challenge From:<br>" +
            "<span>" + challenger + "</span>" +
            "<div class='choices'><div class='button gray accept challenge-decision'>Accept</div><div class='button red reject challenge-decision'>Reject</div></div>" +
            "</div>";
    onlinePlayersModule.find('h2').after(challengeBox);
}

function sendDecision(decision) {
    if ($(decision).hasClass('accept')) {
        ajaxCall("POST", {method: 'respondToChallenge', challengeResponse: true}, function (gameData) {
            window.location = '/';
        });
    } else if ($(decision).hasClass('reject')) {
        ajaxCall("POST", {method: 'respondToChallenge', challengeResponse: false});
    }
    $('.challenge-box').remove();
}
