function submitform() {
  // Reseting the values, so the old results do not appear
  setDisplay('temp', 'none');
  setDisplay('weather', 'none');
  setDisplay('city', 'none');
  setDisplay('error', 'none');
  document.getElementById('image').src = getGif('');

  // Breaking the url into a couple of lines for readability
  const api = 'f2133e0ed028db55fd112d98aca0ca3a';
  const location = document.getElementById('inputLocation').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`;

  // Calls for Ajax
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url);
  xmlhttp.send();

  // Turns results into json
  xmlhttp.responseType = 'json';

  xmlhttp.onload = function () {
    const data = xmlhttp.response;
    //Error check
    if (data.message) {
      setText('error', `${location} not found please enter another location`);
      document.getElementById('error').classList.add('bg-danger');
      document.getElementById('error').classList.add('text-white');
      setDisplay('error', 'flex');
    } else {
      //Display Results
      // For some reason it returns temperature in Kelvin
      const temp = Math.floor((9 / 5) * (data.main.temp - 273) + 32);
      setText('city', `In ${location}`);
      setText(
        'weather',
        `You look at the sky and you will see ${data.weather[0].main}`
      );
      setText('temp', `The temperature is ${temp} degrees Fahrenheit`);
      document.getElementById('image').src = getGif(data.weather[0].main);
      document.getElementById('image').lat = 'gif about weather';
      setDisplay('temp', 'flex');
      setDisplay('weather', 'flex');
      setDisplay('city', 'flex');
    }
  };
}

function setDisplay(id, display) {
  document.getElementById(id).style.display = display;
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function getGif(sky) {
  // Return Gifs based on weather
  switch (sky) {
    case 'Clouds':
      return 'https://media.giphy.com/media/KGSBvyvyC3XbmDCsAD/giphy.gif';
    case 'Clear':
      return 'https://media.giphy.com/media/HvYdoLbPqSdNu/giphy.gif';
    case 'Rain':
      return 'https://media.giphy.com/media/13juRqPzSYGLT2/giphy.gif';
    case 'Snow':
      return 'https://media.giphy.com/media/26tneSGWphvmFlUju/giphy.gif';
    case 'Extreme':
      return 'https://media.giphy.com/media/26AHvzmzuafxhBnBC/giphy.gif';
    default:
      return '';
  }
}
