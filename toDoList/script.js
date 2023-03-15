let addInput = document.getElementById('add_input');
let addBtn = document.getElementById('add_btn');
let tabs = document.querySelectorAll('ul#tab_box li');
let listArr = [];
let filterArr = [];
let mode = 'all';

// localStorage.clear();
window.localStorage; //로컬스토리지 사용
listArr = JSON.parse(localStorage.getItem('listArr')); //시작하자마자 로컬스토리지에 있는 값 가져와서 저장하기
if(!listArr){
  listArr = [];
}
render(); //그리기

addBtn.addEventListener("click",addList); //버튼을 클릭하면
addInput.addEventListener("keydown",function (e) { //엔터를 입력해도
  if(e.key == 'Enter'){
    addList();
  }
});

for(let i=0;i<tabs.length;i++){
  tabs[i].addEventListener("click",function (event) {
    filter(event);
  });
  tabs[i].addEventListener("click",handleClick); //클릭된 tab만 이벤트
}

function addList() { //리스트 추가하기
  let listObj = {
    id : newID(),
    content : addInput.value,
    isComplete : false, //초기값:진행중
  };

  if(addInput.value.length == 0){
    alert("할 일을 입력해주세요");
  }else{
    listArr.unshift(listObj); //배열에 저장
    if(mode == "ongoing"){
      filterArr.unshift(listObj); //탭을 변경한 상태에서도 추가됨
    }
    localStorage.setItem('listArr',JSON.stringify(listArr)); //로컬스토리지에도 저장
    render();
  }
  addInput.value = '';
}//fn end

function render() { //리스트 그리기
  let list = [];
  if(mode == 'all'){
    list = listArr;
  }else if(mode == 'ongoing' || mode == 'done'){
    list = filterArr;
  }
  let resultHtml = '';
  for(let i=0;i<list.length;i++){
    if(list[i].isComplete == true){ //진행완료일때
      resultHtml += `<div class="work">
      <div class = "done_work">${list[i].content}</div>
      <button class = "check_btn" onclick="toggleClick('${list[i].id}')"><img src="./img/check-solid.svg" alt=""></button>
      <button onclick="toggleClick('${list[i].id}')"><img src="./img/arrow-rotate-left-solid.svg" alt=""></button>
      <button onclick="deleteClick('${list[i].id}')"><img src="./img/trash-can-solid.svg" alt=""></button>
      </div>`;
    }else{ //진행중일때
      resultHtml += `<div class="work">
      <div>${list[i].content}</div>
      <button onclick="toggleClick('${list[i].id}')"><img src="./img/check-solid.svg" alt=""></button>
      <button class = "reset_btn" onclick="toggleClick('${list[i].id}')"><img src="./img/arrow-rotate-left-solid.svg" alt=""></button>
      <button onclick="deleteClick('${list[i].id}')"><img src="./img/trash-can-solid.svg" alt=""></button>
      </div>`;
    }
  }//for end
  document.getElementById('work_box').innerHTML = resultHtml;
}//fn end

let newID = ()=>{ //고유 id 값 추출해주는 함수
  return Math.random().toString(36).substring(2, 16);
};

function toggleClick(id) { //check 버튼, reset 버튼 눌렀을 때
  for(let i=0;i<listArr.length;i++){
    if(listArr[i].id == id){
      listArr[i].isComplete = !listArr[i].isComplete;
      localStorage.setItem('listArr',JSON.stringify(listArr));
      break;
    }
  }
  render();
}//fn end

function deleteClick(id) { //delete 버튼 눌렀을 때
  for(let i=0;i<listArr.length;i++){
    if(listArr[i].id == id){
      listArr.splice(i,1);
      localStorage.setItem('listArr',JSON.stringify(listArr));
      break;
    }
  }
  for(let i=0;i<filterArr.length;i++){ //탭을 변경한 상태에서도 삭제됨
    if(filterArr[i].id == id){
      filterArr.splice(i,1);
      break;
    }
  }
  render();
}

function filter(event) { //전체, 진행중, 진행완료 나눠서 배열에 저장하고 보여주기
  mode = event.target.id;
  filterArr = [];
  if(mode == 'all'){
    render();
  }else if(mode == 'ongoing'){
    for(let i=0;i<listArr.length;i++){
      if(listArr[i].isComplete == false){
        filterArr.push(listArr[i]);
      }
    }
    render();
  }else if(mode == 'done'){
    for(let i=0;i<listArr.length;i++){
      if(listArr[i].isComplete == true){
        filterArr.push(listArr[i]);
      }
    }
    render();
  }
}//fn end

function handleClick(event) {
  tabs.forEach((e) => {
    e.classList.remove("active");
  });
  event.target.classList.add("active");
}//fn end