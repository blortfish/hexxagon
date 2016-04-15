<?php
    require_once('_data/base.data.php');

    class UserData
    {
        private $mysqli, $base;

        function __construct()
        {
            include_once("_data/base.data.php");
            $this->base = new BaseDataLayer();
            $this->mysqli = $this->base->getConn();
        }

        static function updateUserData()
        {
            $q = "UPDATE hex_users SET isonline = 0 WHERE last_active < (NOW() - 60)";
            $mysqli = (new BaseDataLayer())->getConn();
            if ($stmt = mysqli_prepare($mysqli, $q)) @$stmt->execute();
        }

        function doesUserExist($user)
        {
            $q = "SELECT username FROM hex_users WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $user);
                $user = json_decode(Lib::returnJson($stmt));
                if (!empty($user) && isset($user[0]->username)) return true;
            }
            return false;
        }

        //TODO: learn sql things...
        function createUser($username, $password, $email)
        {
            $q = "INSERT INTO hex_users VALUES (?, ?, ?, ?, ?, ?, NOW(), '0')";
            if ($stmt1 = mysqli_prepare($this->mysqli, $q)) {
                $p1 = Lib::createSalt();
                $p2 = hash("sha512", ($password . $p1));
                $currentGame = '0';
                $isOnline = 0;
                $stmt1->bind_param("sssssi", $username, $email, $p1, $p2, $currentGame, $isOnline);
                $stmt1 = $stmt1->execute();
            }
            $q = "INSERT INTO hex_record VALUES (?, ?, ?)";
            if ($stmt2 = mysqli_prepare($this->mysqli, $q)) {
                $zero = 0;
                $stmt2->bind_param("sii", $username, $zero, $zero);
                $stmt2 = $stmt2->execute();
            }
            if ($stmt1 && $stmt2) return true;
            return false;
        }

        function setLoginStatus($username, $yepNope)
        {
            $q = "UPDATE hex_users SET isonline = ? WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("is", $yepNope, $username);
                @$stmt->execute();
            }
        }

        function setLastActive($username)
        {
            $q = "UPDATE hex_users SET last_active = NOW() WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $username);
                @$stmt->execute();
            }
        }

        function setGameId($username, $gameId)
        {
            $q = "UPDATE hex_users SET current_game = ? WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("ss", $gameId, $username);
                @$stmt->execute();
            }
        }

        function getOnlinePlayersWithRecord()
        {
            $q = "SELECT hex_users.username, wins, losses FROM hex_users JOIN hex_record
        ON hex_users.username = hex_record.username
        WHERE hex_users.isonline = 1";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                return json_decode(Lib::returnJson($stmt));
            }
        }

        function playerIsAvailable($username)
        {
            $q = "SELECT challenge_from FROM hex_users WHERE username = ? AND current_game = '0'";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $username);
                $challenge = json_decode(Lib::returnJson($stmt));
                if ($challenge[0]->challenge_from == '0') return true;
                return false;
            }
        }

        function setChallenger($challengeFrom, $challengeTo)
        {
            $q = "UPDATE hex_users SET challenge_from = ? WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("ss", $challengeFrom, $challengeTo);
                $stmt->execute();
                return true;
            }
        }

        function getChallenge($username)
        {
            $q = "SELECT challenge_from FROM hex_users WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $username);
                return json_decode(Lib::returnJson($stmt))[0]->challenge_from;
            }
        }

        function unsetChallenger($username)
        {
            $q = "UPDATE hex_users SET challenge_from = '0' WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $username);
                $stmt->execute();
                return true;
            }
        }

        function getUserLoginData($username)
        {
            $q = "SELECT p1, p2 FROM hex_users WHERE username = ?";
            if ($stmt = mysqli_prepare($this->mysqli, $q)) {
                $stmt->bind_param("s", $username);
                return Lib::returnJson($stmt);
            }
            return false;
        }
    }