
let todoInput = document.querySelector('.todoInput');
let searchInput = document.querySelector('.searchInput');
let darkMode = document.getElementById('darkMode');
let lightMode = document.getElementById('lightMode');
let body= document.getElementsByTagName("BODY")[0];
let doneUl = document.querySelector('.doneUl');
let doneLi = document.getElementsByClassName('doneLi');
let todosUl = document.querySelector('.todosUl');
let todosLi = document.getElementsByClassName('todosLi');
let header = document.querySelector('.headers');
let todoImageDiv = document.querySelector('.todoImageDiv');
let doneImageDiv = document.querySelector('.doneImageDiv');
let clear = document.querySelector('.clear');
let addBar = document.querySelector('.addBar');











  darkMode.addEventListener('click', function ()  {
    darkMode.style.display = 'none';
    lightMode.style.display = 'block';
    body.style.backgroundImage = 'url(dark_bakground.svg)';
    header.style.backgroundColor = '#052734';
    todoInput.style.backgroundColor = '#7B7B7B';
    todoInput.style.color = 'white';
    todosUl.style.backgroundColor = '#7B7B7B' ;
    searchInput.style.backgroundColor = '#7B7B7B';
    searchInput.style.color = 'white';
    doneUl.style.backgroundColor = '#676666';

  });

    lightMode.addEventListener('click', () => {
    darkMode.style.display = 'block';
    lightMode.style.display = 'none';
    body.style.backgroundImage = 'url(light_bakground.svg)';
    header.style.backgroundColor = '#9DE4FF';
    todoInput.style.backgroundColor = '#F5F5F5';
    todosUl.style.backgroundColor = '#F5F5F5' ;
    searchInput.style.backgroundColor = '#F5F5F5';
    doneUl.style.backgroundColor = '#F5F5F5';
    searchInput.style.color = 'gray';
    todoInput.style.color = 'gray';



  });
function addToDO() {
  let value = todoInput.value;
  if (value !== '') {
    let text = `<li class="todosLi">${value}<div class="iconDiv">
                        <img class="deleteIcon" src="images/trash.png" alt="">
                        </div></li>`;
    todosUl.insertAdjacentHTML('beforeend', text);
    todoInput.value = "";
  }
}

function checkIfEmpty() {
  if (!todosLi.length) {
    todoImageDiv.style.display = "flex";

  } else {
    todoImageDiv.style.display = "none";

  }
  if (!doneLi.length) {
    doneImageDiv.style.display = "flex";
  } else {
    doneImageDiv.style.display = "none";

  }
}
function hideClear() {
  if (!doneLi.length) {
    clear.style.display = "none";
  }else {
    clear.style.display = "block";

  }

}

addBar.addEventListener('click', function() {
  addToDO();
  checkIfEmpty();

})

todoInput.addEventListener('keypress',function(event) {
  if (event.which == 13) {
    addToDO();
    checkIfEmpty();
  }
})

$('.todosUl').on('click', '.iconDiv', function() {
  let value = $(this).parent().text();

  $('.doneUl').prepend(`<li class="doneLi"><a>${value}</a><div class="restoreDiv">
                            <img class="restoreIcon" src="images/restore.png" alt="restore">
                            </div>
                            </li>`)
  $(this).parent().remove();
  checkIfEmpty();
  hideClear();


})

$('.doneUl').on('click', '.restoreDiv', function() {
  let value = $(this).parent().text();

  $('.todosUl').prepend(`<li class="todosLi"><a>${value}</a><div class="iconDiv">
                          <img class="deleteIcon" src="images/trash.png" alt="">
                          </div></li>`)
  $(this).parent().remove();
  hideClear();
  checkIfEmpty();
})

function checkIfAllHiden(){
  let list = $(".done li:visible").length;
    if (list) {
    $('.noResultDiv').removeClass('noResultDivShow');
    $('.noResultDiv').addClass('noResultDivHide');
    }
else {
  console.log('div is showed', list);
  $('.noResultDiv').removeClass('noResultDivHide');
  $('.noResultDiv').addClass('noResultDivShow');
}
}

function searchFunc() {
  var input,
    filter,
    ul,
    li,
    a,
    i,
    txtValue;
  inp = $('.searchInput').val();
  filter = inp.toUpperCase();
  ul = $(".doneUl");
  li = $('.doneLi');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";

    }
  }

  if ($(".doneUl li").length) {
  checkIfAllHiden();
  }
}
$(".searchInput").keyup(function() {
  searchFunc();
});
$(".searchBar").click(function() {
  searchFunc();
});
$('.clear').click(() => {

  $(".doneLi").remove();
  hideClear();
  checkIfEmpty();
});
