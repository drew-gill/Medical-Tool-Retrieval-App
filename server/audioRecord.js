
var recorder = require( "node-record-lpcm16");
var fs = require('fs');
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
var rec = 0;
const request = {
    config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
    },
    single_utterance: true,
    interimResults:false,
};
const checkRec = (recording) => {
    if(rec){
        setTimeout(function(){checkRec(recording)},50);
        
    }
    else{
        recording.stop();
    }
}

exports.stopAudio = async(req, res) =>{
    console.log('inside of stopAudio');
    
    rec = 0;
    return res.send({"data":1});
}

exports.recordAudio = async (req, res) => {
    console.log('in record audio');
    let str;
    rec = 1;
    const recognizeStream = client
    .streamingRecognize(request)
    .on('error',console.error)
    .on('end', () =>{
        console.log('recording ended');
        return res.send(str);
    })
    .on('data',data=>{
        
        str = data.results[0].alternatives[0].transcript;
        console.log(str);
    });
   
    const recording = recorder.record({
        sampleRateHerts: 16000,
        threshold:0,
        silence: '5.0',
        endOnSilence: true
    });
    recording.stream().pipe(recognizeStream);
    
    setTimeout(function(){checkRec(recording)},50);

    
    
}

  