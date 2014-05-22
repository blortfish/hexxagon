<?php
//DON'T USE!
    $user = $_GET['username'];
    $pass = $_GET['password'];

//Yes, you will have to put in YOUR db info...
    $dbLink = mysql_connect("localhost", "", "");

    if (!dbLink) {
        echo 'db link fail';
    }

//and put in YOUR db name...
    mysql_select_db("");

//See the sql.txt file to create the table
    $theQuery = "select * from testUsers WHERE username='$user' AND password='$pass'";
    echo 'The query: ' . $theQuery;
    $theResult = mysql_query($theQuery);

    if ($theResult) {
        while ($row = mysql_fetch_array($theResult, MYSQL_ASSOC)) {
            $records[] = $row;
        }
    }
    echo '<br/><br/>The Result:<br/>';
    $v_result = '<table border="1">';
    foreach ($records as $v_CurrentRecord) {
        $v_result .= '<tr>';
        foreach ($v_CurrentRecord as $v_index => $v_CurrentField) {
            $v_result .= '<td valign = "top">' . $v_CurrentField . '</td>';
        }
        $v_result .= '</tr>';
    }
    $v_result .= '</table>';
    echo $v_result;

?>