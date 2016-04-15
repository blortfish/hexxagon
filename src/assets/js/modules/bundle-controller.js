ajaxCall("POST", {method: 'getBundle'},
    function (jsonData) {
        initBundler(jsonData, true);
        if(jsonData.game){
            chatId = jsonData.game.id;
        }
    });

function initBundler(jsonData, startPoll) {
    deBundle(jsonData);
    if (startPoll) bundlePoll();
}

function bundlePoll() {
    setTimeout(function () {
        ajaxCall("POST", {method: 'getBundle'}, function (jsonData) {
            if (jsonData) deBundle(jsonData);
        });
        bundlePoll();
    }, 2000);
}

function deBundle(jsonData) {
    if (jsonData.online) updatePlayersOnline(jsonData.online);
    if (jsonData.challenge) setChallenger(jsonData.challenge);
    if (jsonData.game && jsonData.game.id != '0') handleGameFunctions(jsonData.game);
}