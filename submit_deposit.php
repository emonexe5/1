<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $amount = $_POST["amount"];
    $sender_number = $_POST["sender_number"];
    $transaction_id = $_POST["transaction_id"];
    $username = $_POST["username"];

    // **ডাটা txt ফাইলে সংরক্ষণ**
    $file = "../info/deposits.txt";
    $data = "Username: $username, Amount: $amount, Sender: $sender_number, Transection Id: $transaction_id\n";
    file_put_contents($file, $data, FILE_APPEND);

    // **Telegram Bot API ব্যবহার করে নোটিফিকেশন পাঠানো**
    $bot_token = "7886525261:AAF6qg-ZbGqheGKRwm5ShXmKuW6ZI5HKFdY"; // 🔴 তোমার BotFather থেকে নেওয়া Token বসাও
    $chat_id = "6821381444"; // 🔴 তোমার Telegram User ID বসাও
    $message = "New Deposit Request check your nagad\n\nUsername: $username\nAmount: $amount\nSender: $sender_number\nTransaction ID: $transaction_id";
    $url = "https://api.telegram.org/bot$bot_token/sendMessage?chat_id=$chat_id&text=" . urlencode($message) . "&parse_mode=Markdown";

    file_get_contents($url);

    echo "✔ Submitted Successfully! Wait 2 Minutes.";
} else {
    echo "❌ Invalid Request!";
}
?>