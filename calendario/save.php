<?php
$data = file_get_contents("php://input");
file_put_contents("calendarNotes.json", $data);
echo "OK";
?>
