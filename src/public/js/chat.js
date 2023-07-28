const socket = io();

let sendMsgBtn = document.getElementById("send-message-btn")
let messageInput = document.getElementById("message-input")

// Socket.on

socket.on("update-messages", (messages) => {
    let chatContainer = document.getElementById("chat-container")
    chatContainer.innerHTML = ""

    for (message of messages) {
        let messageElement = document.createElement("p")
        messageElement.innerHTML = `${message.user}: ${message.message}`

        chatContainer.appendChild(messageElement)
    }
})

// Event listeners

messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMsgBtn.click(); // Al apretar enter, se esta realizando un "click" sobre ese boton
    }
})

sendMsgBtn.addEventListener('click', () => {
    socket.emit("new-message", messageInput.value)
})