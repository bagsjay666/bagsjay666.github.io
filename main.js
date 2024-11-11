if(! "webkitSpeechRecognition" in window){
    alert("not avaliable");
};

const btn_start = document.querySelector("#btn-start");
const btn_stop = document.querySelector("#btn-stop");
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

let printtext = (textResult)=>{
    textarea.innerText = textResult;
    textarea.scrollTop = textarea.scrollHeight;
};

recognition.onresult = function (event){
    let textResult = '';

    for(let i=0;i<event.results.length; i++){
        textResult += event.results[i][0].transcript;
    };
    if(typeof printtext === 'function'){
        printtext(textResult);
    };
};

recognition.onend = function(){
    recognition.start();
    console.log("restarted");
};

btn_start.addEventListener("click", ()=>{
    console.log("started");
    recognition.start();
    /* btn_start.parentNode.removeChild(btn_start); */
});

btn_stop.addEventListener("click", ()=>{
    console.log("forced to stop printing text");
    printtext = undefined;
});

/* document.querySelector("#stop").addEventListener("click", ()=>{
    recognition.stop();
}) */
