var Current; //Текщий набор выбора КАФЕ

function clickButton(clicked_id) {
    Current = {price: 0, maxPerson: 0, date: "", features: ''};

  CheckInput();
  ClearTable();
  switch (clicked_id){
    case 'btn1':{
      clickBut1();
      break;
    }
    case 'btn2':{
      clickBut2();
      break;
    }
    case 'btn3':{
      clickBut3();
      break;
    }
  }
}
// 1е изменение
//получение данных с полей ввода
function CheckInput(){

  let arrayWishes = [];
  elementsCheck = document.getElementById('checkboxes').children;
  for(let i = 0; i < elementsCheck.length; i++) {
    if(elementsCheck[i].children[0].checked)
      arrayWishes.push(elementsCheck[i].innerText);
  }

  Current.price = document.getElementById('text-0001').value;
  Current.maxPerson = parseInt(document.getElementById('text-0002').value);
  Current.features = arrayWishes.join(', ');
  Current.date = `${GetNormalDateForm(document.getElementById('text-0003-1').value)}`;
  if (!Current.date) {
    Current.date = 0;
  }
  return true;
}
// 2е изменение
//Полное совпадение
function clickBut1(){
  let _CurrLenght = GetLenghtArrayFeatures(Current.features);
  for (let i = 0; i < Cafe.length; i++) {

    if(parseInt(Cafe[i].price) > Current.price / Current.maxPerson)
      continue;
    if(parseInt(Cafe[i].maxPerson) < Current.maxPerson || isNaN(Current.maxPerson) || Current.maxPerson == 0)
        continue;

    if(Current.date != 0){
      let _CafeDate = Cafe[i].date.split(' - ');
      document.getElementById('errors').textContent ="БЕЗ ДАТ";
      if(new Date(_CafeDate[0]) > new Date(Current.date) || new Date(_CafeDate[1]) < new Date(Current.date))
        continue;
    }

    let _CafeLenght = GetLenghtArrayFeatures(Cafe[i].features);
    if(_CurrLenght == 0) {
        PrintInTable(Cafe[i].name, Cafe[i].price, Cafe[i].maxPerson, Cafe[i].date, Cafe[i].features);
    }
    else if(_CurrLenght > 0) {
      let _CurrMatch = GetCountMatch(Cafe[i].features, _CafeLenght, Current.features, _CurrLenght);
      if (_CafeLenght == _CurrLenght && _CurrLenght == _CurrMatch) {
        PrintInTable(Cafe[i].name, Cafe[i].price, Cafe[i].maxPerson, Cafe[i].date, Cafe[i].features);
      }
    }
  }
}

//Частичное совпадение
function clickBut2(){
  let _CurrLenght = GetLenghtArrayFeatures(Current.features);
  for (let i = 0; i < Cafe.length; i++) {
    let statusPrint = false;

    if(parseInt(Cafe[i].price) <= Current.price)
      statusPrint = true;

    if(parseInt(Cafe[i].maxPerson) >= Current.maxPerson && Current.maxPerson > 0)
      statusPrint = true;

    let _CafeDate = Cafe[i].date.split(' - ');
    if(new Date(Current.date) >= new Date(_CafeDate[0]) && new Date(Current.date) <= new Date(_CafeDate[1]))
      statusPrint = true;

    if(statusPrint){
      PrintInTable(Cafe[i].name, Cafe[i].price, Cafe[i].maxPerson, Cafe[i].date, Cafe[i].features);
      continue;
    }

    let _CafeLenght = GetLenghtArrayFeatures(Cafe[i].features);
    if(_CurrLenght == 0  ) {//?? || _CafeLenght == 0
        PrintInTable(Cafe[i].name, Cafe[i].price, Cafe[i].maxPerson, Cafe[i].date, Cafe[i].features);
    }
    else if(_CurrLenght > 0) {
      let _CurrMatch = GetCountMatch(Cafe[i].features, _CafeLenght, Current.features, _CurrLenght);
      if (_CurrMatch > 0) {
        PrintInTable(Cafe[i].name, Cafe[i].price, Cafe[i].maxPerson, Cafe[i].date, Cafe[i].features);
      }
    }
  }
}

//Все предложения
function clickBut3(){
  for (let i = 0; i < Cafe.length; i++) {
    PrintInTable(Cafe[i].name, Cafe[i].price, Cafe[i].maxPerson, Cafe[i].date, Cafe[i].features);
  }
}

//Очистка таблицы
function ClearTable() {
  let _Table = document.getElementById('MainTable').children[0];
  while(_Table.children.length > 1) {
      _Table.removeChild(_Table.children[1]);
  }
}

//Вывод результа в таблицу
function PrintInTable(name, price, person, date, features){
  features = features.split(',');
  let _features = "";
  for (let i = 0; i < features.length; i++) {
    _features += features[i] + "<br>"
  }
  let _Table = document.getElementById('MainTable').children[0];
  _Table.innerHTML +=
  `<tr>
    <td>${name}</td>
    <td>${price}</td>
    <td>${GetTableDate(date)}</td>
    <td>${_features}</td>
    <td>${isNaN(price * Current.maxPerson) ? "" : price * Current.maxPerson}</td>
  </tr>`;
//<td>${person}</td>
}

//Получить длину пожеланий
function GetLenghtArrayFeatures(_array){
    return _array.length > 0 ? _array.split(', ').length : 0;
}

//Получить количество совпадений 2х массивов
function GetCountMatch(arra1, countArray1, arra2, countArray2) {
  arra1 = arra1.split(', ');
  arra2 = arra2.split(', ');
  countMatch = 0;
  for (let i = 0; i < countArray1; i++) {
    for (let j = 0; j < countArray2; j++) {
      if(arra1[i] == arra2[j]){
        countMatch++;
      }
    }
  }
  return countMatch;
}
