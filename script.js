document.addEventListener("DOMContentLoaded", ()=>{

	const startButton = document.querySelector(".js-start_button");
	const backgroundClick = document.querySelector(".js-click-miss");
	const winButton =  document.querySelector(".js-over_win");
	const loseButton =  document.querySelector(".js-over_lose");
	const makeBang = "./jpg/bang.png";
	const fallBird = "./jpg/5.png";

	const getOffset = function (el) {
		const space = el.getBoundingClientRect();
		return {
			left: space.left + window.scrollX,
	    	top: space.top + window.scrollY
		};
	}

	const birdIcon = [
		 "./jpg/1.png",
		 "./jpg/2.png",
		 "./jpg/3.png",
		 "./jpg/4.png",
	];

	class BirdsElement {
		constructor (container) {
			this.element = new Image(); 
			this.element.src = birdIcon[Math.floor(birdIcon.length * Math.random())];
			console.log(birdIcon);
			this.element.innerHTML = " ";
			this.element.classList.add("bird__item");
			this.element.classList.add("bird__item--ani");
			container.appendChild (this.element);
			this.element.addEventListener ("click", (event) => {
				event.stopPropagation();
				scoreIndex.click();
				this.cleanTimer();
				console.log(getOffset(this.element).left, "this place");
				this.element.style.left = (getOffset(this.element).left + "px");
				this.element.classList.remove('bird__item--ani');
				this.element.src = makeBang;

				setTimeout((() => this.element.src = fallBird),2000);

				this.element.classList.add("bird__item--scaling");

				setTimeout(() => this.element.style.top = (getOffset(this.element).top + 350 + "px"),2000);

			})
			this.timer = setTimeout (this.deleteBird.bind(this), 8000);
		}
		deleteBird () {
			this.element.remove();
		}
		cleanTimer () {
			clearTimeout(this.timer);
		}
	}

	const birdConteiner = {
		birdList: [],
		birdsContainer: document.querySelector(".js-bird-conteiner"),
		create() {
			console.log(this.birdsContainer);
    		const bird = new BirdsElement (this.birdsContainer);
    		this.birdList.push(bird)
  		},
  		createIteration () {
  		this.creationInterval = setInterval(() => {
			console.log('go');
			birdConteiner.create();
		} , 4000);
		thistimer = setTimeout(() => { clearInterval(someCreate);}, 40000);
  		},
  		clean() {
  			this.birdList.forEach(function(item) {
  				item.deleteBird();
  				item.cleanTimer();
  			})
  			clearInterval(this.creationInterval);
  			clearTimeout(this.timer);
  		},	
	}

	class Index {
		constructor (value, selector) {
			this.val = value;
			this.elem = document.querySelector(selector);
		}	
		setStartVal () {
			console.log(this)
			this.elem.style.width = this.val + '%';
		}
		update(value) {
			this.val += value;
			this.elem.style.width = this.val + '%';
		}
 	};

	class ScoreIndex extends Index {
		constructor() {
			super(0, '.js-score');
			this.setStartVal = super.setStartVal.bind(this);
		}
		click() {
			this.update(10);
			if (this.val === 100) {
				this.win();
			}
		}
		win() {
			birdConteiner.clean();
			winButton.style.display = "block";
			this.val = 0;
			healthIndex.val = 100;
		}

	};

	class HealthIndex extends Index {
		constructor() {
			super(100, '.js-health');
			this.setStartVal = super.setStartVal.bind(this);
		}
		click() {
			this.update(-10);
			if (this.val === 0) {
				this.gameOver();
			}
		}
		gameOver() {
			birdConteiner.clean();
			loseButton.style.display = "block";
			this.val = 100;
			scoreIndex.val = 0;
		}
	};

	const scoreIndex = new ScoreIndex();
	const healthIndex = new HealthIndex();

	const clickToBackground = function () {
		healthIndex.click();
	};


	startButton.addEventListener ("click", (event) => {
		birdConteiner.createIteration ();
		startButton.style.display = "none";
		event.stopPropagation();
		scoreIndex.setStartVal();
		healthIndex.setStartVal();
		backgroundClick.addEventListener("click", clickToBackground)
	})

	winButton.addEventListener ("click", (event) => {
		winButton.style.display = "none";
		startButton.style.display = "block";
		event.stopPropagation();
	})

	loseButton.addEventListener ("click", (event) => {
		loseButton.style.display = "none";
		startButton.style.display = "block";
		event.stopPropagation();
	})

});