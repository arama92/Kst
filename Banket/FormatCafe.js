//Редакирование дат в массиве КАФЕ и Календаря
function StartFirst() {
  SetMinMaxDate();
  for(let i = 0; i < Cafe.length; i++){
    Cafe[i].date = GetTableDate(Cafe[i].date);
  }
}

//Установка календаря
function SetMinMaxDate() {
   let _calendar = document.getElementById('text-0003-1');

   let _date = new Date();
   _month = _date.getUTCMonth();

   if(_month == 0)
      _month = 12;
  _calendar.min = _date.getUTCFullYear() + "-" + _month + "-" + "01";
  _calendar.max = _date.getUTCFullYear()+1 + "-" + "01" + "-" + "31";

}

//Замена тире в форме дат
function GetNormalDateForm(_date){
  return _date.replace(/-/g,'.');
}

//Формитирование дат
function GetTableDate(_date){
  temp = _date.split(' - ');
  LeftDate = temp[0].split('.');
  RightDate = temp[1].split('.');
  return `${LeftDate[2]}.${LeftDate[1]}.${LeftDate[0]} - ${RightDate[2]}.${RightDate[1]}.${RightDate[0]}`;
}

//запрет всего кроме цифр
function CheckInputNumber(){
    if (event.keyCode < 48 || event.keyCode > 57)
    event.returnValue= false;
}

window.onload = StartFirst;
