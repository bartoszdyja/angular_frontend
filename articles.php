<?php
require_once('config/config.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// $servername = "http://bdfinanse.home.pl/sql/";
// $username = "05665128_0000001";
// $password = "bazadanych1234";
// $dbname = "05665128_0000001";

// $conn = new mysqli($servername, $username, $password, $dbname);
$conn = new mysqli(DB_HOSTNAME, DB_LOGIN, DB_PASS, DB_DATABASE);
mysqli_set_charset($conn,"utf8");
$result = $conn->query("SELECT * FROM articles ORDER BY created_at DESC LIMIT 7;");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Title":"'  . $rs["title"] . '",';
    $outp .= '"Content":"'   . $rs["content"]     . '"}';
}
$outp ='{"articles":['.$outp.']}';
$conn->close();

echo($outp);

?>
