import './style.css';
import {Map, View} from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';


//Title screen
const startButton = document.querySelector("#start-button");
const gameCanvas = document.querySelector("#game-canvas");
startButton.addEventListener("click", () => {
  gameCanvas.style.display = "block";
  document.querySelector("#title-screen").style.display = "none";
});

//Marker overlay used for explaining the answer
var markerOverlay = new Overlay({
  element: document.getElementById('marker-container')
});

let view;
document.addEventListener('DOMContentLoaded', function(){
  view = new View({
    center: fromLonLat([0, 0]),
    zoom: 2
});
var question, optionsHtml,markerExplain;
optionsHtml = '';

//Setting up the map
var map = new Map({
  target: 'map',
  layers: [
    new Tile({
      source: new OSM()
    })
  ],
  });
  map.setView(view);
  map.addOverlay(markerOverlay);

  var points = 0; //Used for counting number of questions the player got right
  var askedQuestions = [];  //To prevent duplicate questions
  
  //21 Questions in total
  var questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin'],
      correctAnswer: 'Paris',
      coordinates: [2.3522, 48.8566],
      explain: 'Paris is the capital and most populous city of France. It is located in the Île-de-France region and is considered one of the most important cultural and tourist centers of the world.'
    },
    {
      question: 'What is the highest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Makalu'],
      correctAnswer: 'Mount Everest',
      coordinates: [86.925278, 27.988056],
      explain: 'Mount Everest is the highest mountain in the world, with a peak elevation of 8,848 meters (29,029 ft) above sea level. It is located in the Mahalangur range of the Himalayas, on the border of Nepal and Tibet.'
    },
    {
      question: 'Which ocean is the largest in the world?',
      options: ['Atlantic', 'Pacific', 'Indian'],
      correctAnswer: 'Pacific',
      coordinates: [0,0],
      explain: 'The Pacific Ocean is the largest ocean in the world, covering an area of about 165.25 million square kilometers.'
    },
    {
      question: 'Which river is the longest in the world?',
      options: ['Nile', 'Amazon', 'Yangtze'],
      correctAnswer: 'Nile',
      coordinates: [31.23, 29.9],
      explain: 'The Nile is the longest river in the world, stretching about 4,135 miles (6,650 kilometers) from its source in Burundi to the Mediterranean Sea in Egypt.'
    },
    {
      question: 'What is the capital of China?',
      options: ['Beijing', 'Shanghai', 'Hong Kong'],
      correctAnswer: 'Beijing',
      coordinates: [116.39723, 39.9075],
      explain: 'Beijing is the capital of China, and one of the most populous cities in the world, with over 21 million inhabitants.'
    },
    {
      question: 'Which country is known as the "land of fire and ice"?',
      options: ['Russia', 'Finland', 'Iceland'],
      correctAnswer: 'Iceland',
      coordinates: [-19.0208,64.9631],
      explain: 'Iceland is known as the "land of fire and ice" due to its unique combination of glaciers, ice caps, and volcanic activity.'
    },
    {
      question: 'What is the smallest country in the world by land area?',
      options: ['Vatican City', 'Monaco', 'Nauru'],
      correctAnswer: 'Vatican City',
      coordinates: [12.45, 41.9],
      explain: 'Vatican City is the smallest country in the world by land area, covering an area of just 44 hectares (110 acres).'
    },
    {
      question: 'What is the capital of Australia?',
      options: ['Sydney', 'Canberra', 'Melbourne'],
      correctAnswer: 'Canberra',
      coordinates: [149.1280, -35.2835],
      explain: 'Canberra is the capital city of Australia and is located in the Australian Capital Territory in southeastern Australia. It was chosen as the capital city in 1908 as a compromise between Sydney and Melbourne, which were the two largest cities at the time.'
    },
    {
      question: 'What is the highest peak in North America?',
      options: ['Mount Denali', 'Mount Logan', 'Mount Orizaba'],
      correctAnswer: 'Mount Denali',
      coordinates: [-151.0063,63.0695],
      explain: 'Mount Denali, also known as Mount McKinley, is the highest peak in North America, with a summit elevation of 20,310 feet (6,190 meters) above sea level. It is located in the Alaska Range, in the U.S. state of Alaska.'
    },
    {
      question: 'Which country is the largest in Africa by land area?',
      options: ['Sudan', 'Algeria', 'Democratic Republic of Congo'],
      correctAnswer: 'Algeria',
      coordinates: [3.054278, 36.752887],
      explain: 'Algeria is the largest country in Africa by land area, with a total area of 2.38 million square kilometers.'
    },
    {
      question: 'What is the capital of Italy?',
      options: ['Rome', 'Florence', 'Venice'],
      correctAnswer: 'Rome',
      coordinates: [12.496366, 41.902783],
      explain: 'Rome is the capital of Italy and is located in the Lazio region of central Italy. It is known for its rich history and cultural heritage, including famous landmarks such as the Colosseum, the Roman Forum, and the Pantheon.'
    },
    {
      question: 'What is the capital of Canada?',
      options: ['Ottawa', 'Toronto', 'Vancouver'],
      correctAnswer: 'Ottawa',
      coordinates: [-75.69, 45.4208],
      explain: 'Ottawa is the capital of Canada and is located in the province of Ontario in the eastern part of the country. It is also the fourth largest city in Canada, with a population of over a million people.'
    },
    {
      question: 'Which mountain range is the highest in Europe?',
      options: ['Alps', 'Pyrenees', 'Caucasus'],
      correctAnswer: 'Alps',
      coordinates: [7.6667,46.5],
      explain: 'The Alps are the highest mountain range in Europe, stretching 1,200 kilometers (750 miles) across eight Alpine countries: France, Switzerland, Italy, Monaco, Liechtenstein, Austria, Germany, and Slovenia. The highest peak in the Alps is Mont Blanc, standing at 4,810 meters (15,780 ft).'
    },
    {
      question: 'What is the deepest ocean trench in the world?',
      options: ['Mariana Trench', 'Kermadec Trench', 'Tonga Trench'],
      correctAnswer: 'Mariana Trench',
      coordinates: [142.8, 11],
      explain: 'The Mariana Trench, also known as the Challenger Deep, is the deepest ocean trench in the world. It is located in the western Pacific Ocean and has a maximum depth of about 11,034 meters (36,070 feet).'
    },
    {
      question: 'Which desert is the largest in the world?',
      options: ['Sahara', 'Arabian', 'Antarctica'],
      correctAnswer: 'Sahara',
      coordinates: [15.5, 22],
      explain: 'The Sahara is the largest desert in the world, covering an area of about 3.6 million square miles (9.4 million square kilometers). It stretches across 11 countries in North Africa and is known for its hot and arid conditions.'
    },
    {
      question: 'What is the capital of Brazil?',
      options: ['Rio de Janeiro', 'São Paulo', 'Brasília'],
      correctAnswer: 'Brasília',
      coordinates: [-47.9292, -15.7801],
      explain: 'Brasília is the capital of Brazil and is located in the center-western region of the country. It was founded in 1960 and was designed as a new capital for Brazil by Lúcio Costa and Oscar Niemeyer.'
    },
    {
      question: 'Which country has the most number of time zones?',
      options: ['France', 'United States', 'Russia'],
      correctAnswer: 'France',
      coordinates: [2.3388, 48.8606],
      explain: 'France has the most number of time zones with a total of 12. This is because France has overseas territories that are spread out over a large area, including parts of South America, the Caribbean, and the Pacific. The mainland of France uses Central European Time (CET) or Central European Summer Time (CEST) during standard and daylight saving time respectively.'
    },
    {
      question: 'Which country is the largest in South America by land area?',
      options: ['Brazil', 'Argentina', 'Chile'],
      correctAnswer: 'Brazil',
      coordinates: [-51.92528, -14.23500],
      explain: 'Brazil is the largest country in South America by land area, with a total area of 8.515 million square kilometers.'
    },
    {
      question: 'Which country is known as the "land of the rising sun"?',
      options: ['Japan', 'China', 'South Korea'],
      correctAnswer: 'Japan',
      coordinates: [139.6917, 35.6895],
      explain: 'Japan is known as the "land of the rising sun" due to its location in the eastern hemisphere, where the sun rises.'
    },
    {
      question: 'What is the capital of Spain?',
      options: ['Madrid', 'Barcelona', 'Valencia'],
      correctAnswer: 'Madrid',
      coordinates: [-3.70256, 40.4165],
      explain: 'Madrid is the capital and largest city of Spain, it is known for its rich history, cultural heritage and famous landmarks such as the Prado Museum, Retiro Park and the Royal Palace.'
    },
    {
      question: 'Which river is the longest in Europe?',
      options: ['Volga', 'Danube', 'Rhine'],
      correctAnswer: 'Volga',
      coordinates: [44.5,48.5],
      explain: 'The Volga is the longest river in Europe, stretching about 3,692 miles (5,568 kilometers) from its source in the Valdai Hills of Russia to the Caspian Sea. It is also the largest river in Europe by discharge and drainage basin.'
    }
  ];
  

  function startGame() {
    // reset the map and the game interface
    map.getView().setCenter(fromLonLat([0, 0]));
    map.getView().setZoom(2);
    document.getElementById('question').innerHTML = '';
    document.getElementById('options').innerHTML = '';
    document.getElementById('result').innerHTML = '';

    //End game condition
    if (askedQuestions.length === 10) {
      document.getElementById('result').innerHTML = '<div class="result">Total points: ' + points+'/10 </div>';
      if(points>5){
        document.getElementById('rank').innerHTML = '<div class="rank"> 4.0 GPA </div>';
        document.getElementById('replay-button').innerHTML = '<button style="background:#3630a3;color:white; width: 90%; height: 3rem;" onClick="window.location.reload();">Replay</button>';
      }
      else if(points === 5){
        document.getElementById('rank').innerHTML = '<div class="rank">Decent</div>';
        document.getElementById('replay-button').innerHTML = '<button style="background:#3630a3;color:white; width: 90%; height: 3rem;" onClick="window.location.reload();">Replay</button>';
      }
      else{
        document.getElementById('rank').innerHTML = '<div class="rank">Fail </div>';
        document.getElementById('replay-button').innerHTML = '<button style="background:#3630a3;color:white; width: 90%; height: 3rem;" onClick="window.location.reload();">Replay</button>';
      }
      return;
    }
    //Picks a random question and puts it in another list (prevent duplicate questions)
    question = questions[Math.floor(Math.random() * questions.length)];
    while (askedQuestions.includes(question)) {
      question = questions[Math.floor(Math.random() * questions.length)];
    }
    askedQuestions.push(question);
  
    // display the question and the options
    document.getElementById('question').innerHTML = '<div class="question">' + question.question + '</div>';
    optionsHtml = '<div class="options">';
    for (var i = 0; i < question.options.length; i++) {
      optionsHtml += '<div class="option"><button style="background:#3630a3;color:white; width: 90%; height: 3rem;" onclick="checkAnswer(' + i + ')">' + question.options[i] + '</button></div>';
    }
    optionsHtml += '</div>';
    document.getElementById('options').innerHTML = optionsHtml;
  }


  //Displays the explaination
  document.getElementById('options').addEventListener('click', function(event) {
    var coordinates = question.coordinates;
    var explain = question.explain;
    markerOverlay.setPosition(fromLonLat(coordinates));
    markerExplain = document.getElementById('marker-explain');
    markerExplain.innerHTML = explain;
    markerExplain.style.display = 'block';
    markerOverlay.setPosition(fromLonLat(coordinates));
    markerOverlay.set('projection', view.getProjection());
    markerOverlay.getElement().style.display = 'block';
  });


  //Checks to see if the answer is correct or not and then outputs the result
window.checkAnswer = function(selectedOption) {
  if (question.options[selectedOption] === question.correctAnswer) {
    document.getElementById('result').innerHTML = '<div class="result">Correct!</div>';
    points++;
  } else {
    document.getElementById('result').innerHTML = '<div class="result">Incorrect. The correct answer was: ' + question.correctAnswer + '</div>';
  }
    map.getView().setCenter(fromLonLat(question.coordinates));
    map.getView().animate({
      center: fromLonLat(question.coordinates),
      zoom: 6,
      duration: 1000
      });
  
  
  // start the next round
  setTimeout(startGame, 7000);
  setTimeout(function(){ 
    markerOverlay.getElement().style.display = 'none';
    markerExplain.style.display = 'none';
}, 6000);
}

// start the game
startGame();
});