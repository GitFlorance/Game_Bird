document.addEventListener("DOMContentLoaded", ()=>{

	class Index {
		constructor (value, selector) {
			this.val = value;
			this.elem = document.querySelector(selector);
		}	
		update(value) {
			this.val += value;
			this.elem.style.width = this.val + '%';
		}
 	};

	class ScoreIndex extends Index {
		consructor() {
			this.super(0, '.js-score');
		}
		click() {
			this.update(10)
		}
		win() {

		}
	};

	class HealthIndex extends Index {
		constructor() {
			super(100, '.js-health');
		}
		click() {
			this.update(-10);
		}
		gameOver() {

		}
	};

	const soreIndex = new ScoreIndex();
	const healthIndex = new HealthIndex();

	const birdIcon = [
		 "./jpg/1.png",
		 "./jpg/2.png",
		 "./jpg/3.png",
		 "./jpg/4.png",
		 "./jpg/5.png",
	];

	class BirdsElement {
		constructor (container) {
			this.element = document.createElement('img')
			this.element.scr = birdIcon[Math.floor(Math.random()*birdIcon.lenght)];
			//this.element.innerHTML = " ";
			this.element.className = ".birdsAnimation__item";
			container.appendChild (this.element);
			this.element.addEventListener ("click", () => {
				scoreIndex.click();
			})
			setTimeout (this.delete.bind(this), 8000);
		}
		delete () {
			this.element.remove();
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
  		chenge() {
		    const someBird = this.birdList.filter((item,index) => (index % 2 === 0));
		    someBird.forEach((item) => item.colorBlue());        
		},
	}

	const someCreate = setInterval(() => {
		console.log('go');
		birdConteiner.create();
	} , 4000);
	setTimeout(() => { clearInterval(someCreate);}, 40000);

	const startButton = document.querySelector(".js-start_button");

	startButton.addEventListener ("click", () => {

	})

});