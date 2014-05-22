<?php



//hit a db using prepared statements!
    $mysqli = new mysqli('localhost', 'root', 'midnite23', 'def6054');
    //(host, user, pass, db);
    if (mysqli_connect_errno()) {
        print('connection failed: ' . mysqli_connect_error());
        exit();
    }
//Move ALL of above outside pub
    $user = $_GET['username'];
    $pass = $_GET['password'];

//create a prepared statement!
    if ($stmt = $mysqli->prepare("select * from testusers where username=? and password =?")) {
        //bind params (s-string, i-int, d-double, b-blob)
        $stmt->bind_param("ss", $user, $pass);
        $data = returnJson($stmt);
        if ($data != 'null') {
            print($data);
            $json_output = json_decode($data, true);
            print_r("<br>" . $json_output[0]['username']);
        } else {
            header('Location:login.html');
        }

        /* BEFORE USING HELPER
        $stmt->bind_param("ss", $user, $pass);
        $stmt->execute();
        $stmt->bind_result($priv);
        $stmt->fetch();
        print($user."'s priv is ".$priv);
        $stmt->close();
        */
    }
    $mysqli->close();
