document.addEventListener("DOMContentLoaded", ()=>{

	const startButton = document.querySelector(".js-start_button");
	const background = document.querySelector(".js-click-miss");
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
	const birdDirection = [
		"bird__item--ani",
		"bird__item--ani--back",
	]

	class BirdsElement {
		constructor (container) {
			this.element = new Image(); 
			this.element.src = birdIcon[Math.floor(birdIcon.length * Math.random())];
			this.element.innerHTML = " ";
			this.element.classList.add("bird__item");
			this.element.classList.add(birdDirection[Math.floor(birdDirection.length * Math.random())]);
			container.appendChild (this.element);

			const birdElementClick = (event) => {
				event.stopPropagation();
				birdClick();
				this.cleanTimer();
				this.element.style.left = (getOffset(this.element).left + "px");
				this.element.classList.remove('bird__item--ani');
				this.element.src = makeBang;

				setTimeout((() => this.element.src = fallBird),2000);

				this.element.classList.add("bird__item--scaling");

				setTimeout(() => this.element.style.top = (getOffset(this.element).top + 350 + "px"),2000);

				this.element.removeEventListener("click", birdElementClick);
			}

			this.element.addEventListener ("click", birdElementClick);
			this.timer = setTimeout (this.deleteBird.bind(this), 8000);
		}
		deleteBird () {
			this.element.remove();
			this.element.removeEventListener("click", this.birdElementClick);
			missClick();
		}
		cleanTimer () {
			clearTimeout(this.timer);
		}
	}

	const birdConteiner = {
		birdList: [],
		birdsContainer: document.querySelector(".js-bird-conteiner"),
		create() {
    		const bird = new BirdsElement (this.birdsContainer);
    		this.birdList.push(bird)
  		},
  		createIteration () {
  			this.creationInterval = setInterval(() => {
				birdConteiner.create();
			} , 4000);
			this.timer = setTimeout(() => { clearInterval(this.creationInterval);}, 50000);
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
		constructor (value, selector, diff) {
			this.val = value;
			this.elem = document.querySelector(selector);
			this.diff = diff;
		}	
		setStartVal () {
			console.log(this)
			this.elem.style.width = this.val + '%';
		}
		update() {
			this.val += this.diff;
			this.elem.style.width = this.val + '%';
		}
 	};

	const scoreIndex = new Index(0, '.js-score', +10);
	const healthIndex = new Index(100, '.js-health', -10);

	const win = function () {
		console.log("win");
		birdConteiner.clean();
		winButton.style.display = "block";
		scoreIndex.val = 0;
		healthIndex.val = 100;
	};

	const gameOver = function () {
		console.log("lose");
		birdConteiner.clean();
		loseButton.style.display = "block";
		healthIndex.val = 100;
		scoreIndex.val = 0;
	}; 

	const final = function (value) {
		if (value === 0) {
			gameOver();
		}
		if (value === 100) {
			win();
		}
	}

	function birdClick () {
		scoreIndex.update();
		final(scoreIndex.val);
	};

	function missClick () {
		healthIndex.update();
		final(healthIndex.val);
	}


	startButton.addEventListener ("click", (event) => {
		birdConteiner.createIteration ();
		startButton.style.display = "none";
		event.stopPropagation();
		scoreIndex.setStartVal();
		healthIndex.setStartVal();
		background.addEventListener("click", missClick);
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