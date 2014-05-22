function handleGameFunctions(jsonData) {
    if (window.location.pathname != '/game.php') window.location = "/game.php";
    boardJson = jsonData;

    if(jsonData.allData.turn == 0){
        LastGame = jsonData;
        gameOver();
    }
    else{
        isYourTurn = jsonData.allData.for == jsonData.allData.turn;

        $('.chat-window__wrapper').data('chatId', jsonData.id);
        boardWrapper.data('player', "player" + jsonData.allData.for);
        if (isYourTurn) boardWrapper.addClass(boardWrapper.data('player'));
        else boardWrapper.removeClass('player1').removeClass('player2');

        renderBoard(jsonData.allData.board);
        renderGameInfo(jsonData.allData);
    }
}

function gameOver(){
    renderBoard(LastGame.allData.board);
    renderGameInfo(LastGame.allData);
}


function selectSpace(ele) {
    if (isYourTurn) {
        var selectionId = ele.id;
        if (ele.classList.contains(boardWrapper.data('player'))) {
            startMove = selectionId;
            moveFrom(selectionId);
        }
        else if (!ele.classList.contains("occupied"))
            moveTo(ele.id);
    }
}

function moveFrom(id) {
    startMove = id;
    var space = document.getElementsByClassName('start-move')[0];
    if (space) space.classList.remove('start-move');
    document.getElementById(id).classList.add('start-move');
    var col = parseInt(id.split('_')[0]);
    var row = parseInt(id.split('_')[1]);
    activeSpace(row, col);
}

function moveTo(id) {
    var ele = document.getElementById(id);
    if((ele.getAttributeNS(null, 'fill') == 'yellow' ||ele.getAttributeNS(null, 'fill') == 'orange') ){
        clearActives();
        ele.setAttributeNS(null, 'style', 'fill:url(#'+boardWrapper.data('player')+')');
        var send = startMove;
        startMove = "";
        ajaxCall("POST", {method: 'sendMove', moveFrom: send, moveTo: id}, function (res) {
            //run but dont queue
            if(res) ajaxCall("POST", {method: 'getBundle'}, function(jsonData){initBundler(jsonData, false);}); //run but dont queue
        });
    }
}

//TODO: more math so you are not such an idiot; this took way longer than it should have
//dis iz goud logik
function activeSpace(r, c) {
    clearActives();
    var row = parseInt(r);
    var col = parseInt(c);
    var colLens = [5, 6, 7, 8, 9, 8, 7, 6, 5];
    var thisColLen = colLens[col];

    var possibleJumps = [];
    var possibleDupes = [];

    //gimmies
    possibleJumps.push(col + '_' + (row - 2));
    possibleJumps.push(col + '_' + (row + 2));
    possibleDupes.push(col + '_' + (row - 1));
    possibleDupes.push(col + '_' + (row + 1));
    possibleDupes.push(col + '_' + (row - 1));
    possibleDupes.push(col + '_' + (row + 1));
    //here we go

    //two columns away
    if (thisColLen > colLens[col - 2]) {
        possibleJumps.push(col - 2 + '_' + (row));
        possibleJumps.push(col - 2 + '_' + (row - 1));
        possibleJumps.push(col - 2 + '_' + (row - 2));
    } else if(thisColLen == colLens[col - 2]){
        possibleJumps.push(col - 2 + '_' + (row));
        possibleJumps.push(col - 2 + '_' + (row - 1));
        possibleJumps.push(col - 2 + '_' + (row + 1));
    }else {
        possibleJumps.push(col - 2 + '_' + (row));
        possibleJumps.push(col - 2 + '_' + (row + 1));
        possibleJumps.push(col - 2 + '_' + (row + 2));
    }
    if (thisColLen > colLens[col + 2]) {
        possibleJumps.push(col + 2 + '_' + (row));
        possibleJumps.push(col + 2 + '_' + (row - 1));
        possibleJumps.push(col + 2 + '_' + (row - 2));
    } else if(thisColLen == colLens[col + 2]){
        possibleJumps.push(col + 2 + '_' + (row));
        possibleJumps.push(col + 2 + '_' + (row - 1));
        possibleJumps.push(col + 2 + '_' + (row + 1));
    } else {
        possibleJumps.push(col + 2 + '_' + (row));
        possibleJumps.push(col + 2 + '_' + (row + 1));
        possibleJumps.push(col + 2 + '_' + (row + 2));
    }
    //end two columns away

    //one column away
    //handles duplicate and jump
    if (thisColLen > colLens[col - 1]) {
        possibleJumps.push(col - 1 + '_' + (row - 2));
        possibleJumps.push(col - 1 + '_' + (row + 1));

        possibleDupes.push(col - 1 + '_' + (row));
        possibleDupes.push(col - 1 + '_' + (row - 1));
    } else {
        possibleJumps.push(col - 1 + '_' + (row - 1));
        possibleJumps.push(col - 1 + '_' + (row + 2));

        possibleDupes.push(col - 1 + '_' + (row));
        possibleDupes.push(col - 1 + '_' + (row + 1));
    }
    if (thisColLen > colLens[col + 1]) {
        possibleJumps.push(col + 1 + '_' + (row + 1));
        possibleJumps.push(col + 1 + '_' + (row - 2));

        possibleDupes.push(col + 1 + '_' + (row));
        possibleDupes.push(col + 1 + '_' + (row - 1));
    } else {
        possibleJumps.push(col + 1 + '_' + (row - 1));
        possibleJumps.push(col + 1 + '_' + (row + 2));

        possibleDupes.push(col + 1 + '_' + (row));
        possibleDupes.push(col + 1 + '_' + (row + 1));
    }
    //end one column away


    for (var z = 0; z < possibleJumps.length; z++) {
        space = document.getElementById(possibleJumps[z]);
        if (space && !space.classList.contains('occupied')  && possibleJumps[z] != startMove) {
            space.setAttributeNS(null, 'fill', "orange");
            space.setAttributeNS(null, 'opacity', 0.7);
        }
    }

    for (var x = 0; x < possibleDupes.length; x++) {
        var space = document.getElementById(possibleDupes[x]);
        if (space && !space.classList.contains('occupied') && possibleDupes[x] != startMove) {
            space.setAttributeNS(null, 'fill', "yellow");
            space.setAttributeNS(null, 'opacity', 0.7);
        }
    }

}

function clearActives() {
    var spaces = document.getElementById('board-spaces').getElementsByTagName('rect');
    for (var i = 0; i < spaces.length; i++) {
        if (!spaces[i].classList.contains('occupied')) {
            spaces[i].setAttributeNS(null, 'fill', "#efefef");
            spaces[i].setAttributeNS(null, 'opacity', 1.0);
        }
    }
}