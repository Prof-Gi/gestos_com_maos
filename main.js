prediction1 = ""
prediction2 = ""

Webcam.set({
    width:380,
    height:290,
    imageFormat : 'png',
    pngQuality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function takeSnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Nw6bqCt-0/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Modelo carregado!');
  } /* Aula 111 vai até aqui */
  
function speak(){
  var synth = window.speechSynthesis;
  speakData1 = "A primeira previsão é " + prediction1;
  speakData2 = "E a segunda previsão é " + prediction2;
  var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
  synth.speak(utterThis);
}


  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("resultGestureName").innerHTML = results[0].label;
    document.getElementById("resultGestureName2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();
    if(results[0].label == "joinha")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#128077;";
    }
    if(results[0].label == "tocaAqui")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#129306;";
    }
    if(results[0].label == "vitoria")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#9996;";
    }

    if(results[1].label == "joinha")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#128077;";
    }
    if(results[1].label == "tocaAqui")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#129306;";
    }
    if(results[1].label == "vitoria")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#9996;";
    }
  }
}

