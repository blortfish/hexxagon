<!DOCTYPE html>
<html lang="en">
<head>
    <title>checkers (turns working, logic not)</title>
    <style type="text/css">
        #background {
            fill: #666;
            stroke: black;
            stroke-width: 2px;
        }

        .player0 {
            fill: #990000;
            stroke: white;
            stroke-width: 1px;
        }

        .player1 {
            fill: green;
            stroke: red;
            stroke-width: 1px;
        }

        .htmlBlock {
            position: absolute;
            top: 200px;
            left: 300px;
            width: 200px;
            height: 100px;
            background: #ffc;
            padding: 10px;
            display: none;
        }

        body {
            padding: 0px;
            margin: 0px;
        }

        .cell_white {
            fill: white;
            stroke-width: 2px;
            stroke: red;
        }

        .cell_black {
            fill: black;
            stroke-width: 2px;
            stroke: red;
        }

        .cell_alert {
            fill: #336666;
            stroke-width: 2px;
            stroke: red;
        }

        .name_black {
            fill: black;
            font-size: 18px
        }

        .name_orange {
            fill: orange;
            font-size: 24px;
        }
    </style>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="js/Objects/Cell.js" type="text/javascript"></script>
    <script src="js/Objects/Piece.js" type="text/javascript"></script>
    <script src="js/gameFunctions.js" type="text/javascript"></script>
    <script src="js/ajaxFunctions.js" type="text/javascript"></script>
    <script type="text/javascript">
        var gameId =<?php echo $_GET['gameId'] ?>;
        var player = "<?php echo $_GET['player']?>";
        //alert(playerId);
        initGameAjax('start', gameId);
    </script>
</head>
<body>

</body>
</html>