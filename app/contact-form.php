<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'assets/phpmailer/PHPMailerAutoload.php';

if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'Please fill out all required fields.');
        echo json_encode($data);
        exit;
    }
	
    if (empty($_POST['inputNumber'])){
	$_POST['inputNumber'] = '-';
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();
    $mail->CharSet="utf-8";
    $mail->isSendmail();
    //Set who the message is to be sent from
    $mail->setFrom('b.dyja@bdfinanse.pl', $_POST['inputName']);
    //Set an alternative reply-to address
    $mail->addReplyTo($_POST['inputEmail'], $_POST['inputName']);
    //Set who the message is to be sent to
    $mail->addAddress('b.dyja@bdfinanse.pl', 'Strona WWW');
    //Set the subject line
    $mail->Subject = 'Wiadomość ze strony www';
    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    $mail->msgHTML("<p>Imię: {$_POST['inputName']}</p> <p>Email: {$_POST['inputEmail']}</p>  <p>Wiadomość: {$_POST['inputMessage']}</p>");
    // //Replace the plain text body with one created manually
    // $mail->AltBody = $_POST['inputEmail'];


    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Dziękujemy za wiadomość.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}
