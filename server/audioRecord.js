
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



exports.recordAudio = async () => {
    console.log("abc");
    
    const recognizeStream = client
    .streamingRecognize(request)
    .on('error',console.error)
    .on('data',data=>
    console.log(data.results[0].alternatives[0].transcript));
   
    const recording = recorder.record({
        sampleRateHerts: 16000,
        threshold:0,
        silence: '5.0',
    });
    recording.stream().pipe(recognizeStream);
    console.log("listening, press Ctrl+C to stop");
 
    

}

  