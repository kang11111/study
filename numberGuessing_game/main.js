//랜덤으로 번호 추출하기
//유저가 입력한 번호 받아오기
//유저가 입력한 번호와 랜덤으로 추출한 번호 비교(3가지)
//리셋으로 게임 초기화
//다섯번의 기회를 다 쓰면 버튼 비활성화
//유저가 범위 이외의 숫자를 입력하면 알려주고 기회를 안 깎음
//유저가 입력한 숫자를 또 입력하면 알려주고 기회를 안 깎음

let computerNum = 0;
let playBtn = document.getElementById("play_btn");
let userInput = document.getElementById("user_input");
let userArea = document.getElementById("user_area");
let resetBtn = document.getElementById("reset_btn");
let chances = 5;
// let gameOver = false;
let chanceArea = document.getElementById("chance_area");
let userValueList = [];

playBtn.addEventListener("click",play);
resetBtn.addEventListener("click",reset);
userInput.addEventListener("focus",function(){
  userInput.value = ""
})

function pickRandomNum(){
  //랜덤 숫자 선택
  computerNum = Math.floor(Math.random()*100)+1;
  console.log(computerNum);
}

function play(){
  //유저가 입력한 숫자 비교
  let userValue = userInput.value;

  if(userValue <1 || userValue >100){
    userArea.textContent = "1과 100 사이의 숫자를 입력해주세요";
    return;
  }

  if(userValueList.includes(userValue)){
    userArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
    return;
  }

  chances--;
  chanceArea.textContent = `남은 기회 ${chances}번`;

  if(userValue < computerNum){
    userArea.textContent = "UP!!";
  }else if(userValue > computerNum){
    userArea.textContent = "Down!!";
  }else{
    userArea.textContent = "Success!!";
    playBtn.disabled = true;
  }

  userValueList.push(userValue);
  console.log(userValueList)

  if(chances == 0){
    // gameOver = true;
    playBtn.disabled = true;
  }
}

function reset(){
  //리셋
  userInput.value = "";
  pickRandomNum();
  userArea.textContent = "결과값";
  chances = 5;
  chanceArea.textContent = "남은 기회 5번";
  userValueList = [];
  playBtn.disabled = false;
}


pickRandomNum();