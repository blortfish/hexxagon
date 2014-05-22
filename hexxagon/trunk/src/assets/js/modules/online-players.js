initChallengeSystem();

function initChallengeSystem() {
    $(document).on('click', '.online-players__module > .player', function () {
        var which = $(this);
        ajaxCall("POST", {method: 'sendChallenge', challengeUser: which.find('strong').text()}, function (data) {
            if (JSON.parse(data))which.addClass('animated flash');
        });
    });
}

function updatePlayersOnline(playersJson) {
    onlinePlayersModule.data('players', JSON.stringify(playersJson));
    onlinePlayersModule.find('div').remove();

    for (var i = 0, l = playersJson.length; i < l; i++) {
        onlinePlayersModule.append(
            '<div class="player">' +
                '<i class="fa fa-crosshairs"></i><div class="info">' +
                '<strong>' + playersJson[i].username + '</strong>' +
                '<span class="record">' + playersJson[i].wins + ' Wins ' + playersJson[i].losses + ' Losses</span>' +
                '</div>' +
                '</div>');
    }
}