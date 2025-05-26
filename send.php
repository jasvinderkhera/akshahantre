<?php
header('Content-Type: application/json'); // Important for AJAX

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

if (isset($_POST['full_name'])) {

    $full_name     = $_POST['full_name'];
    $phone         = $_POST['phone'];
    $email         = $_POST['email'];
    $trip_type     = $_POST['trip_type'];
    $from_location = $_POST['from_location'];
    $to_location   = $_POST['to_location'];
    $from_date     = $_POST['from_date'];
    $to_date       = $_POST['to_date'];
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
            <strong>Trip Type:</strong> $trip_type <br>
            <strong>From:</strong> $from_location <br>
            <strong>To:</strong> $to_location <br>
            <strong>From Date:</strong> $from_date <br>
            <strong>To Date:</strong> $to_date <br>
            <strong>Message:</strong> <br> $message
        ";

        $today = date('Y-m-d');

        if ($from_date < $today) {
            echo json_encode(["type" => false, "error" => "From Date cannot be earlier than today."]);
            exit;
        }

        if ($to_date < $from_date) {
            echo json_encode(["type" => false, "error" => "To Date cannot be earlier than From Date."]);
            exit;
        }

        $mail->send();
        echo json_encode(["type" => true, "msg" => "Your message has been sent successfully!"]);
    } catch (Exception $e) {
        echo json_encode(["type" => false, "error" => "Mailer Error: " . $mail->ErrorInfo]);
    }

} else {
    echo json_encode(["type" => false, "error" => "Invalid request."]);
}
