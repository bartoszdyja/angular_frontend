<?php
require_once('config/config.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli(DB_HOSTNAME, DB_LOGIN, DB_PASS, DB_DATABASE);
mysqli_set_charset($conn,"utf8");
$y = $_GET['id'];
$result = $conn->query("SELECT * FROM articles WHERE Id = {$y};");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Id":"'  . $rs["id"] . '",';
    $outp .= '"Title":"'  . $rs["title"] . '",';
    $outp .= '"Content":"'   . $rs["content"]     . '",';
    $outp .= '"Created At":"'   . $rs["created_at"]     . '"}';
}
$outp ='{"articles":['.$outp.']}';
$conn->close();

echo($outp);

?>
