const makeGETRequest = (url) => {
	return new Promise((resolve, reject) => {
		var xhr;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(xhr.responseText);
				}
				else {
					reject('Error');
				}
			}
		}

		xhr.open('GET', url, true);
		xhr.send();
	})
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
	constructor(product_name, price) {
		this.title = product_name;
		this.price = price;
	}
	render() {
		return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
		this.filteredGoods = [];
	}

	fetchGoods() {
		return new Promise((resolve, reject) => {
			makeGETRequest(`${API_URL}/catalogData.json`)
				.then((goods) => {
					this.goods = JSON.parse(goods);
					this.filteredGoods = JSON.parse(goods);
					resolve();
				})
				.catch(reject);
		});
	}

	render() {
		let listHtml = '';
		this.filteredGoods.forEach(good => {
			const goodItem = new GoodsItem(good.product_name, good.price);
			listHtml += goodItem.render();
		});
		document.querySelector('.goods-list').innerHTML = listHtml;
	}

	filterGoods(value) {
		const regexp = new RegExp(value, 'i');
		this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
		this.render();
	}
}

class Basket {
	constructor() {
		this.items = [];
	}
	fetchGoods() {
		makeGETRequest(`${API_URL}/getBasket.json`)
			.then((goods) => {

				JSON.parse(goods).contents.forEach((item) => {
					let goodsItem = new GoodsItem(item.product_name, item.price);
					let basketItem = new BasketItem(goodsItem, item.quantity);
					this.items.push(basketItem);
				})
			})
	}
	addItem(goodsItem, count) {
		const newItem = new BasketItem(goodsItem, count);
		this.items.push(newItem);
	}
	removeItem(goodsItem) {
		let index = this.items.indexOf(s => s.goodItem === goodsItem);
		if (index > 1) {
			this.items.slice(index, 1);
		}
	}

	getSummCost() {
		const result = 0;
		this.items.reduce((item, index, array) => {
			result += item.goodItem.price * item.count;
		})

		return result;
	}
}

class BasketItem {
	constructor(goodsItem, quantity) {
		this.googsItem = goodsItem;
		this.quantity = quantity;
	}

	addItem() {
		this.quantity++;
	}
	removeItem() {
		this.quantity--;
	}
}

const list = new GoodsList();
const basket = new Basket();



const text = `Повседневная aren't практика показывает, что рамки и место обучения кадров способствует подготовки и реализации направлений прогрессивного развития. Не следует, однако забывать, что новая модель организационной деятельности представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. С другой стороны начало повседневной работы по формированию позиции в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач.

'Задача организации, в особенности же' консультация с широким активом способствует подготовки и реализации систем массового участия. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности требуют определения и уточнения форм развития. С другой стороны консультация с широким активом позволяет выполнять важные задания по разработке систем массового участия.

Таким образом рамки и место обучения кадров представляет собой интересный эксперимент проверки форм развития. Не следует, однако забывать, что постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке модели развития.

Значимость этих проблем настолько очевидна, что 'начало повседневной работы' по формированию позиции позволяет оценить значение дальнейших направлений развития. С другой стороны реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации существенных финансовых и 'административных условий.'

Не следует, однако забывать, что новая модель организационной деятельности требуют определения и уточнения форм развития. Разнообразный и богатый опыт дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки позиций, занимаемых участниками в отношении поставленных задач. С другой стороны начало повседневной работы по формированию позиции требуют определения и уточнения соответствующий условий активизации. Таким образом рамки и место обучения кадров представляет собой интересный эксперимент проверки направлений прогрессивного развития. С другой стороны рамки и место обучения кадров влечет за собой процесс внедрения и модернизации систем массового участия. Равным образом постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке 'систем массового участия'.`;

//1 - е задание
const regexp = new RegExp('\'', 'g');
//console.log(text.replace(regexp, '"'));

//	2 - е задание
const regexp1 = new RegExp('\'(?![а-яА-Яa-zA-Z])|(?<![а-яА-Яa-zA-Z])\'', 'g');
let result = text.replace(regexp1, '"');

console.log(result);


//основной код работы
list.fetchGoods().then(() => list.render());

basket.fetchGoods();

let searchInput = document.querySelector(".goods-search");

function filterOnClick() {
	const value = searchInput.value;
	list.filterGoods(value);
};