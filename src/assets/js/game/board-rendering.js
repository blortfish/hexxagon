function renderBoard(gameBoard) {
    board.empty();
    var boardSize = gameBoard.length;

    for (var x = 0; x < boardSize; x++) {
        var currentArray = gameBoard[x];
        var currentDistanceX = 11 * x;
        for (var y = 0, l = currentArray.length; y < l; y++) {
            var currentDistanceY = (((9 - l) / 9) * 100 / 2) + (11 * y);
            var boardSpace = document.createElementNS(svgns, 'rect');
            var currentId = x + "_" + y;
            boardSpace.setAttributeNS(null, 'width', '10%');
            boardSpace.setAttributeNS(null, 'height', '10%');
            boardSpace.setAttributeNS(null, 'fill', '#efefef');
            boardSpace.setAttributeNS(null, 'stroke', '#9a9a9a');
            boardSpace.setAttributeNS(null, 'stroke-width', '1');
            boardSpace.setAttributeNS(null, 'rx', '1%');
            boardSpace.setAttributeNS(null, 'ry', '1%');
            boardSpace.setAttributeNS(null, 'x', currentDistanceX + '%');
            boardSpace.setAttributeNS(null, 'y', +currentDistanceY + '%');
            boardSpace.setAttributeNS(null, 'id', currentId);
            boardSpace.classList.add("board-space");
            boardSpace.onclick = function(){selectSpace(this)};
            if (currentArray[y] == 1) {
                boardSpace.setAttributeNS(null, 'fill', 'red');
                boardSpace.classList.add("occupied");
                boardSpace.classList.add("player1");
                boardSpace.setAttributeNS(null, 'style', 'fill:url(#player1)');
            }
            else if (currentArray[y] == 2) {
                boardSpace.setAttributeNS(null, 'fill', 'blue');
                boardSpace.classList.add("occupied");
                boardSpace.classList.add("player2");
                boardSpace.setAttributeNS(null, 'style', 'fill:url(#player2)');
            }
            if (currentId != "4_3" && currentId != "3_4" && currentId != "5_4") board.append(boardSpace);
        }
    }
    if(startMove){
        document.getElementById(startMove).classList.add('start-move');
        activeSpace(parseInt(startMove.split('_')[1]), parseInt(startMove.split('_')[0])) ;
    }
}

function renderGameInfo(jsonData){
    var scoreBoard = $('.score-board');
    var currentScores = calcScores(jsonData.board);

    scoreBoard.find('.player1-score .name').text(jsonData.player1);
    scoreBoard.find('.player2-score .name').text(jsonData.player2);

    scoreBoard.find('.player1-score .score').text(currentScores.player1);
    scoreBoard.find('.player2-score .score').text(currentScores.player2);
    if(jsonData.turn == 0){
        var winner = "Game ended in a tie."
        if(jsonData.player1 < jsonData.player2) winner = jsonData.player1 + " is the Winner!";
        else winner = jsonData.player2 + " is the Winner!";
        scoreBoard.find('.message').html("This game is over, <a href='/hexxagon'>Return to lobby.</a><h3 style='text-align: center'>"+winner+"</h3>");

        ajaxCall("POST", {method: 'freeUser'}, function(data){
            console.log(data);
        });
    }
    else{
        if(isYourTurn) scoreBoard.find('.message').text("It's your turn!");
        else scoreBoard.find('.message').text("Wait for other player's move.");
    }
}

function calcScores(board){
    var scores = {};
    scores.player1 = 0;
    scores.player2 = 0;
    for(var i = 0, l = board.length; i < l; i++){
        var currentArr = board[i];
        for(var j = 0, il = currentArr.length; j < il; j++){
            if(currentArr[j] == 1) scores.player1++;
            else if(currentArr[j] == 2) scores.player2++;
        }
    }
    return scores;
}