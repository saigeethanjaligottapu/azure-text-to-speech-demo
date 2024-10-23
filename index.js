import dotenv from 'dotenv';
dotenv.config();

import { SpeechConfig, AudioConfig, SpeechSynthesizer } from "microsoft-cognitiveservices-speech-sdk";

const audioFile = "output.wav";
const {
  SPEECH_KEY,
  SPEECH_REGION
} = process.env;

const speechConfig = SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
const audioConfig = AudioConfig.fromAudioFileOutput(audioFile);
let synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

const textEng = `
<speak xml:lang="en-us" version="1.0">
  <voice name="en-US-AmandaMultilingualNeural">
    <lang xml:lang="en-US">
      <p>This is a sample text to speech demo using Microsoft Azure Text to Speech service.</p>
    </lang>
  </voice>
</speak>
`;
synthesizer.speakSsmlAsync(textEng,
  (result) => {
    console.log(result)
    synthesizer.close();
    synthesizer = null;
  },
  (err) => {
    console.trace("err - " + err);
    synthesizer.close();
    synthesizer = null;
  });
console.log("Now synthesizing to: " + audioFile);
