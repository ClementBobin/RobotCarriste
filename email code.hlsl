<?php
if (isset($_POST["message"])) {
  // Get the message from the AJAX request
  $message = $_POST["message"];

  // Set the recipient email address
  $to = "recipient@example.com";

  // Set the email subject and message
  $subject = "Test Email";
  $message = "Random text: " . $message;

  // Set additional headers
  $headers = "From: sender@example.com\r\n";
  $headers .= "Reply-To: sender@example.com\r\n";

  // Send the email
  if(mail($to, $subject, $message, $headers)){
      echo "Email sent successfully!";
  } else {
      echo "Error: Unable to send email.";
  }

  exit; // Stop executing the script after sending the email
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Send Email</title>
</head>
<body>
  <form>
    <button type="button" onclick="sendEmail()">Send Email</button>
  </form>

  <script>
    function sendEmail() {
      // Generate a random string of length 10
      var message = "";
      var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (var i = 0; i < 10; i++) {
        message += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      // Send an AJAX request to the same file
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
      };
      xhttp.open("POST", "<?php echo $_SERVER['PHP_SELF']; ?>", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("message=" + message);
    }
  </script>
</body>
</html>
