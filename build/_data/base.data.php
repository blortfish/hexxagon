<?php

    class BaseDataLayer
    {
        private $connection;

        function __construct()
        {
            include("../../db.cred.inc");
            $this->connection = new mysqli("thoughtfulbadger.com", $user, $password, $db);
        }

        function getConn()
        {
            return $this->connection;
        }
    }