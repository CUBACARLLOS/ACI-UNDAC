const input = document.querySelector(".chat-input input");

const button = document.querySelector(".chat-input button");

const chatBox = document.querySelector(".chat-box");


button.addEventListener("click", async () => {

    const message = input.value;

    if(message.trim() === "") return;


    // MENSAJE USUARIO

    const userMessage = document.createElement("div");

    userMessage.classList.add("message", "user");

    userMessage.innerHTML = `<p>${message}</p>`;

    chatBox.appendChild(userMessage);


    // LIMPIAR INPUT

    input.value = "";


    // MENSAJE IA TEMPORAL

    const iaMessage = document.createElement("div");

    iaMessage.classList.add("message", "ia");

    iaMessage.innerHTML = `<p>Escribiendo...</p>`;

    chatBox.appendChild(iaMessage);


    // SCROLL AUTOMATICO

    chatBox.scrollTop = chatBox.scrollHeight;


    try{

        const response = await fetch(
            "/.netlify/functions/chat",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    message
                })
            }
        );

        const data = await response.json();


        iaMessage.innerHTML =
        `<p>${data.reply}</p>`;


        chatBox.scrollTop =
        chatBox.scrollHeight;

    }

    catch(error){

        iaMessage.innerHTML =
        `<p>Error al conectar con la IA.</p>`;

        console.error(error);
    }

});