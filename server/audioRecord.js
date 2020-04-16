
var recorder = require( "node-record-lpcm16");
var fs = require('fs');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
const request = {
    config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
    },
    single_utterance: true,
    interimResults:false,
};



exports.recordAudio = async (req, res) => {
    
    let str;

    const recognizeStream = client
    .streamingRecognize(request)
    .on('error',console.error)
    .on('end', () =>{
        return res.send(str);
    })
    .on('data',data=>{

        str = data.results[0].alternatives[0].transcript;
      
    });
   
    const recording = recorder.record({
        sampleRateHerts: 16000,
        threshold:0,
        silence: '5.0',
        endOnSilence: true
    });
    recording.stream().pipe(recognizeStream);
    
 
    setTimeout(() => {
        recording.stop();
      }, 5000)
    
}

  