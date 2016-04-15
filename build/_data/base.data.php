<?php

    class BaseDataLayer
    {
        private $connection;

        function __construct()
        {
            include("../db.cred.inc");
            $this->connection = @new mysqli("127.0.0.1", $user, $password, $db);
            if($this->connection->connect_error) {
                echo "Error connecting to database, please check settings in {projectRoot}/db.cred.inc and make sure " .
                    "that mysql is running";
            }
        }

        function getConn()
        {
            return $this->connection;
        }
    }