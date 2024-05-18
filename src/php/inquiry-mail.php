<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

$mail = new PHPMailer(true);
// Oprava překlepů v názvech proměnných
$firstName = isset($_POST['first_name']) ? $_POST['first_name'] : '';
$lastName = isset($_POST['last_name']) ? $_POST['last_name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$messageContent = isset($_POST['message']) ? $_POST['message'] : '';

if (empty($firstName) || empty($lastName) || empty($email) || empty($messageContent)) {
    header("Location: ../../index.html");
    exit;
}

try {
    // Nastavení serveru
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    // Uživatelské nastavení
    $mail->Username = 'martinek.svrcek@gmail.com';
    $mail->Password = 'bvuh xlfj rlmv nfuh'; // Pro bezpečnost je lepší použít proměnnou prostředí

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Příjemci
    $mail->setFrom("martin.svrcek06@gmail.com", "Nad roklemi");
    $mail->addAddress('martin.svrcek06@gmail.com'); // Adresa, kam mají chodit emaily
    $mail->isHTML(true);

    // Obsah emailu
    $mail->Subject = 'Nad roklemi | Dotaz';
    $mail->Body = "Dotaz od: " . htmlspecialchars($firstName) . " " . htmlspecialchars($lastName) . "<br>" . "Email: " . htmlspecialchars($email) . "<br><br>" . nl2br(htmlspecialchars($messageContent));
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();

    header("Location: ../../index.html");
    exit;
} catch (Exception $e) {
    echo "Zpráva nemohla být odeslána. Chyba maileru: {$mail->ErrorInfo}";
}

