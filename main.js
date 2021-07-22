prediction1 = "";
prediction2 = "";

Webcam.set({
    width : 350,
    height : 280,
    crop_width: 350,
    crop_height: 262,
    crop_width: 350,
    crop_height: 269,
    image_format : 'jpeg',
    jpeg_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("picture").innerHTML = '<img src = "'+data_uri+'" id = "cap_img">'
    });
}

console.log('ml5_version',ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/kwhxisPpE/model.json",modelLoaded);
function modelLoaded()
{
    console.log('modelLoaded successfully!');
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "The First Prediction Is" + prediction1;
    speak_data2 = "The Second Prediction Is" + prediction2;
    var utterthis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterthis);
}

function check()
{
    img = document.getElementById("cap_img");
    classifier.classify(img,gotResult);
}

function gotResult(error,result)
{
    if (error)
    {
        console.log(error);
    }
  else
  {
      console.log(result);
  }

  document.getElementById("result_emotion_name1").innerHTML = result[0].label;
  document.getElementById("result_emotion_name2").innerHTML = result[1].label;

  prediction1 = result[0].label;
  prediction2 = result[1].label;
 speak();

 if(result[0].label == "Happy"){
     document.getElementById("update_emoji1").innerHTML = "&#128522;";
 }
 if(result[0].label == "Sad"){
    document.getElementById("update_emoji1").innerHTML = "&#128532;";
}
if(result[0].label == "Angry"){
    document.getElementById("update_emoji1").innerHTML = "&#128544;";
}
if(result[0].label == "Crying"){
    document.getElementById("update_emoji1").innerHTML = "&#128557;";
}
// result of 1
if(result[1].label == "Happy"){
    document.getElementById("update_emoji2").innerHTML = "&#128522;";
}
if(result[1].label == "Sad"){
   document.getElementById("update_emoji2").innerHTML = "&#128532;";
}
if(result[1].label == "Angry"){
   document.getElementById("update_emoji2").innerHTML = "&#128544;";
}
if(result[1].label == "Crying"){
   document.getElementById("update_emoji2").innerHTML = "&#128557;";
}
}