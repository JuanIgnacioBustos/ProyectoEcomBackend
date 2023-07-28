let sendMsgBtn = document.getElementById("send-message-btn")
let messageInput = document.getElementById("message-input")

messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMsgBtn.click();
    }
})

sendMsgBtn.addEventListener('click', () => {
    console.log("Hola")
})