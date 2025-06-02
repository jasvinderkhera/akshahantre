<?php
header('Content-Type: application/json'); // Important for AJAX

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

if (isset($_POST['full_name'])) {

    $full_name     = $_POST['full_name'];
    $phone         = $_POST['phone'];
    $email         = $_POST['email'];
    $subject       = $_POST['subject'];
    $message       = $_POST['message'];

    require 'PHPmailer/Exception.php';
    require 'PHPmailer/SMTP.php';
    require 'PHPmailer/PHPMailer.php';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'jasvinderkhera02@gmail.com';
        $mail->Password   = 'password'; // App password
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;

        $mail->setFrom('jasvinderkhera02@gmail.com', 'Website Inquiry');
        $mail->addAddress('ankitkhera15@gmail.com', 'Website Admin');

        $mail->isHTML(true);
        $mail->Subject = 'New Travel Inquiry from Website';
        $mail->Body = "
            <strong>Full Name:</strong> $full_name <br>
            <strong>Email:</strong> $email <br>
            <strong>Phone:</strong> $phone <br>
            <strong>Subject:</strong> <br> $subject <br>
            <strong>Message:</strong> <br> $message
        ";

        $mail->send();
        echo json_encode(["type" => true, "msg" => "Your message has been sent successfully!"]);
    } catch (Exception $e) {
        echo json_encode(["type" => false, "error" => "Mailer Error: " . $mail->ErrorInfo]);
    }

} else {
    echo json_encode(["type" => false, "error" => "Invalid request."]);
}
