particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    retina_detect: true,
  });
  document.addEventListener("DOMContentLoaded", function(event) {

    
    const dayNightInput = document.querySelector(".day-night input");
    
    if (dayNightInput) {
      dayNightInput.addEventListener("change", () => {
        document.body.classList.add("toggle");
        setTimeout(() => {
          document.body.classList.toggle("light");
          setTimeout(() => {
            document.body.classList.remove("toggle");
          }, 10);
        }, 5);
      });
    }
  });
  
  let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Purple Jean Jacket',
        image: '1.JPG',
        price: 120000
    },
    {
        id: 2,
        name: 'Hand Painted Jacket',
        image: '2.JPG',
        price: 120000
    },
    {
        id: 3,
        name: 'Creative Jean Jacket',
        image: '3.JPG',
        price: 220000
    },
    {
        id: 4,
        name: 'Painted Short',
        image: '4.JPG',
        price: 123000
    },
    {
        id: 5,
        name: 'Painted Jean',
        image: '5.JPG',
        price: 320000
    },
    {
        id: 6,
        name: 'painted jean',
        image: '6.JPG',
        price: 120000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}


initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}



var current_fs, next_fs, previous_fs; 
var left, opacity, scale; 
var animating; 

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	

	next_fs.show(); 
	
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			
			scale = 1 - (1 - now) * 0.2;
			
			left = (now * 50)+"%";
			
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	
	previous_fs.show(); 
	
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			
			scale = 0.8 + (1 - now) * 0.2;
			
			left = ((1-now) * 50)+"%";
			
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

let canvas = new fabric.Canvas("tshirt-canvas");

function updateTshirtImage(imageURL) {
  fabric.Image.fromURL(imageURL, function (img) {
    img.scaleToHeight(300);
    img.scaleToWidth(300);
    canvas.centerObject(img);
    canvas.add(img);
    canvas.renderAll();
  });
}


document.getElementById("tshirt-color").addEventListener(
  "change",
  function () {
    document.getElementById("tshirt-div").style.backgroundColor = this.value;
  },
  false
);


document.getElementById("tshirt-design").addEventListener(
  "change",
  function () {
   
    updateTshirtImage(this.value);
  },
  false
);

// When the user clicks on upload a custom picture
document.getElementById("tshirt-custompicture").addEventListener(
  "change",
  function (e) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;

      // When the picture loads, create the image in Fabric.js
      imgObj.onload = function () {
        var img = new fabric.Image(imgObj);

        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
      };
    };

    // If the user selected a picture, load it
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  },
  false
);

// When the user selects a picture that has been added and press the DEL key
// The object will be removed !
document.addEventListener(
  "keydown",
  function (e) {
    var keyCode = e.keyCode;

    if (keyCode == 46) {
      console.log("Removing selected element on Fabric.js on DELETE key !");
      canvas.remove(canvas.getActiveObject());
    }
  },
  false
);
