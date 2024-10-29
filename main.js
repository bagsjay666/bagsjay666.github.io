if(! "webkitSpeechRecognition" in window){
    alert("not avaliable");
};

const btn_start = document.querySelector("#btn-start");
const textarea = document.querySelector("#textarea");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = true;

/* recognition.onstart = ()=>{
    console.log('start');
};

recognition.onend = ()=>{
    console.log('end');
}; */

recognition.onresult = function (event){
    let textResult = '';

    for(let i=0;i<event.results.length; i++){
        textResult += event.results[i][0].transcript;
    };
    textarea.innerHTML = textResult;
};

recognition.onend = function(){
    recognition.start();
};

btn_start.addEventListener("click", ()=>{
    recognition.start();
    btn_start.parentNode.removeChild(btn_start);
})

/* document.querySelector("#stop").addEventListener("click", ()=>{
    recognition.stop();
}) */
