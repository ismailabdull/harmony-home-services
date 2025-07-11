<?php
// Contact Form Handler for Harmony Home Services
// This file handles form submissions and sends emails

// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

// Get form data
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$county = $_POST['county'] ?? '';
$service = $_POST['service'] ?? '';
$urgency = $_POST['urgency'] ?? '';
$message = $_POST['message'] ?? '';

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($county) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// Prepare email content
$to = 'info@harmonyhousingss.com'; // Your email address
$subject = 'New Contact Form Submission - Harmony Home Services';

$emailBody = "
New contact form submission received:

Name: {$firstName} {$lastName}
Email: {$email}
Phone: {$phone}
County: {$county}
Service Needed: {$service}
Urgency Level: {$urgency}

Message:
{$message}

---
This message was sent from the Harmony Home Services contact form.
Submitted on: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = [
    'From: noreply@harmonyhomeservices.org',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

// Log submission to file (optional)
$logEntry = date('Y-m-d H:i:s') . " | {$firstName} {$lastName} | {$email} | {$county} | {$service}\n";
file_put_contents('contact_submissions.log', $logEntry, FILE_APPEND | LOCK_EX);

// Send response
if ($mailSent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message! We will contact you within 24 hours.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    ]);
}
?> 