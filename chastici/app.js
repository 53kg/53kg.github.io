particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 140,
        "density": {
          "enable": true,
          "value_area": 90
        }
      },
      "color": {
        "value": "#589983", //random // #FFFFFF
      },
      "shape": {
        "type": "star", // circle edge triangle polygon star 
        "stroke": {
          "width": 3,
          "color": "#ffffd9"
        },
        "polygon": {
          "nb_sides": 4
        }
      },
      "opacity": {
        "value": 0.9,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 9,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 5,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance":3,
        "color": "#ffffff",
        "opacity": 42,
        "width": 900
      },
      "move": {
        "enable": true,
        "speed": 130,
        "direction": "bottom-left", // none top top-right right bottom-right bottom bottom-left left top-left
        "random": true,
        "straight": true,
        "out_mode": "out", // out bounce
        "attract": {
          "enable": true,
          "rotateX": 1200,
          "rotateY": 1000
        }
      }
    },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "bubble" //grab bubble repulse
      },
      "onclick": {
        "enable": true,
        "mode": "bubble" // push remove bubble repulse
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 900,
        "line_linked": {
          "opacity": 0.7
        }
      },
      "bubble": {
        "distance": 700,
        "size": 90,
        "duration": 0.6,
        "opacity": 2,
        "speed": 1
      },
      "repulse": {
        "distance": 900,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 7
      },
      "remove": {
        "particles_nb": 2
      }
    }
  }
  }

);