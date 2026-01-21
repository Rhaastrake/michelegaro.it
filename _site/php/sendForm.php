<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Metodo non consentito';
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/vendor/autoload.php';
require __DIR__ . '/config.php';

function clean($value) {
    return htmlspecialchars(trim($value ?? ''), ENT_QUOTES, 'UTF-8');
}

function safeNum($value) {
    return filter_var($value ?? '', FILTER_SANITIZE_NUMBER_INT);
}


$formType               = clean($_POST['formType'] ?? '');

//Basic informations
$details                = clean($_POST['details'] ?? '');
$name                   = clean($_POST['name'] ?? '');
$phoneNumber            = safeNum($_POST['phoneNumber'] ?? '');
$city                   = clean($_POST['city'] ?? '');

//Assistance
$serviceSpecification   = clean($_POST['serviceSpecification'] ?? '');
$pcType                 = clean($_POST['pcType'] ?? '');

//Purchase Guide
$useType                = clean($_POST['useType'] ?? '');
$priceRange             = clean($_POST['priceRange'] ?? '');
$secondHand             = clean($_POST['secondHand'] ?? '');
$display                = clean($_POST['display'] ?? '');


$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = MAIL_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = MAIL_USERNAME;
    $mail->Password   = MAIL_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = MAIL_PORT;
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';+

    $mail->setFrom(MAIL_USERNAME, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_USERNAME, 'Michelegaro.it');

    $mail->isHTML(true);

    $body  = "<h2>Nuova richiesta dal sito Michelegaro.it</h2>";

    
    //Basic informations
    if (!empty($details)) {
        $body .= "<h3>Dettagli aggiuntivi:</h3><p>$details</p>";
    }
    if (!empty($name)) {
        $body .= "<h3>Nome:</h3><p>$name</p>";
    }
    if (!empty($phoneNumber)) {
        $body .= "<h3>Telefono:</h3><p>$phoneNumber</p>";
    }
    if (!empty($city)) {
        $body .= "<h3>Città:</h3><p>$city</p>";
    }

    //Assistance
    if (!empty($serviceSpecification)) {
        $body .= "<h3>Servizio richiesto:</h3><p>$serviceSpecification</p>";
    }
    if (!empty($pcType)) {
        $body .= "<h3>Tipo PC:</h3><p>$pcType</p>";
    }

    //Purchase Guide
    if (!empty($useType)) {
        $body .= "<h3>Tipo di utilizzo:</h3><p>$useType</p>";
    }
    if (!empty($priceRange)) {
        $body .= "<h3>Range di prezzo:</h3><p>$priceRange</p>";
    }
    if (!empty($secondHand)) {
        $body .= "<h3>Componenti usati:</h3><p>$secondHand</p>";
    }
    if (!empty($display)) {
        $body .= "<h3>Display:</h3><p>$display</p>";
    }

    //Discord Server
    
    //Application

    $mail->Subject = match($formType) {
        'assistance'    => 'Richiesta assistenza | Michelegaro.it',
        'purchaseGuide' => 'Richiesta nuovo PC | Michelegaro.it',
        'discord'       => 'Richiesta server discord | Michelegaro.it',
        'application'   => 'Richiesta applicazione | Michelegaro.it',
        'bugReport'     => 'Segnalazione bug | Michelegaro.it',
        default         => 'Richiesta generica | Michelegaro.it',
    };

    $mail->Body    = $body;
    $mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));

    $mail->send();

    http_response_code(200);
    echo "✅ Dati inviati con successo";

} catch (Exception $e) {
    http_response_code(500);
    echo "❌ Errore: {$mail->ErrorInfo}";
}
