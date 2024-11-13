if(! "webkitSpeechRecognition" in window){
    alert("not avaliable");
};

const lang_opt = document.querySelector("#language-option");
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

let onend_func = function(){
    recognition.start();
    console.log("restarted");
};

recognition.onend = function(){
    if(typeof onend_func === 'function'){
        onend_func();
    };
};

btn_start.addEventListener("click", ()=>{
    recognition.lang = lang_opt.value;
    console.log(langopt.value);
    console.log("started");
    recognition.start();
});

btn_stop.addEventListener("click", ()=>{
    console.log("aborted, everything will be cleaned");
    printtext = undefined;
    onend_func = undefined;
    recognition.stop();
    document.body.innerHTML = '';
});
