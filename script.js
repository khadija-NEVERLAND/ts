// Utilisation de l'élément audio pour la synthèse vocale
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const audio = new Audio();
    audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
    audio.play();
}

// Utilisation de l'élément textarea pour la reconnaissance vocale
function listen() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = function(event) {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        document.getElementById("convert_to_text").innerText = transcript;
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event);
        alert('Error occurred in speech recognition: ' + event.error);
    };

    recognition.start();
}

// Ajoutez des gestionnaires d'événements pour appeler les fonctions ci-dessus

document.querySelector("button").addEventListener("click", () => {
    speak(document.querySelector("textarea").value);
});

document.getElementById("click_to_convert").addEventListener('click', () => {
    listen();
});
