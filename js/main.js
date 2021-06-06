const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const speakIt = document.querySelector('#speak-it');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const volume = document.querySelector('#volume');
const volumeValue = document.querySelector('#volume-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

let voices =[];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
  voiceSelect.selectedIndex = 3;
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

const speak = () => {
    if (synth.speaking) {
        console.error('already speaking...');
        return;
    }
    if (textInput.value !== '') {
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e => {
            console.log('done speaking');
        }
        speakText.onerror = e => {
            console.error('something went wrong');
        }
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        speakText.rate =rate.value;
        speakText.pitch= pitch.value;
        speakText.volume= volume.value;
        synth.speak(speakText)
    }
}

textForm.addEventListener('submit', e =>{
    e.preventDefault()
    speak()
    textInput.getBoundingClientRect()
})
textInput.addEventListener("keydown", e => { 
    if (e.ctrlKey && e.keyCode == 13) {
        e.preventDefault()
        speak()
        textInput.getBoundingClientRect()
    }
});

rate.addEventListener('change', e => rateValue.textContent = rate.value)
pitch.addEventListener('change', e => rateValue.textContent = pitch.value)
volume.addEventListener('change', e => volumeValue.textContent = volume.value)
voiceSelect.addEventListener('change', e => speak())

