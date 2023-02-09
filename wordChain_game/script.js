// v1. 끝말잇기 인원수 입력
// v2. 끝말잇기 단어 입력, 확인 버튼
// v3. 처음 단어는 무조건 ok
// v3-2. 했던 단어 중복 금지, 끝말잇기가 제대로 되었는지 확인
// v4-1. 끝말잇기가 제대로 안 되었으면 게임 끝
// v4-2. 제대로 되었으면 2.로 넘어감
// v5. 초기화 버튼
// 6. 성공 / 실패 안내
// v7. n번째 사람 순서 알림
// v7-1. 시작 단어를 클릭한 후에 실행
// v7-2. 입력을  1번 누르면 2번째 / 2번 누르면 3번째 ....
// v7-3. 인원수보다 커지면 다시 1번째로 돌아가야함
// v인원수 없이 단어 입력 버튼만 눌렀을 때, alert
// v단어없이 단어 입력 버튼만 눌렀을 때, alert
// 시간초과 -> 시간초과 되면 실패, alert

// 하고 싶은 것 : 아래 두 개를 alert 쓸 때, 단어 입력 버튼을 클릭했을 때 사용하고 싶다.
// 아니 reset()에 아래 두 개를 넣어서 초기화 될 때 같이 되게 하고 싶다.
// clearTimeout(timerTimeout);
// clearInterval(timerInterval);

let userInfo = document.getElementById("user_info");
let userNum = document.querySelector("#user_info>input");
let userBtn = document.querySelector("#user_info>button");
let userNumText = document.querySelector("#user_info>p");
let resetBtn = document.getElementById("reset_btn");
let userTurn = document.getElementById("user_turn");
let userTurnText = document.querySelector("#user_turn>span");
let userTurnText2 = document.querySelector("#user_turn>i");
let userTurnWord = document.querySelector("#user_turn>input");
let userTurnBtn = document.querySelector("#user_turn>button");
let userTurnResult = document.querySelector("#user_turn>p");
let wordList = [];
let i = 1;
//n번째 계속 증가하는 것 방지
let flag = 0;

resetBtn.addEventListener("click",reset);
userBtn.addEventListener("click",howManyPeople);
userTurnBtn.addEventListener('click',function(){
  // clearTimeout(timerTimeout);
  // timeLimit();
  userTurnText2.textContent = `${i++}번째 사람 순서!`;
  checkTheWords();
  userTurnWord.value = ""
});

//input에서 엔터 쳤을 때 이벤트
userNum.addEventListener("keyup", (e)=>{
  if(e.key === 'Enter'){
    howManyPeople();
  }
});
userTurnWord.addEventListener("keyup", (e)=>{
  if(e.key === 'Enter'){
    userTurnText2.textContent = `${i++}번째 사람 순서!`;
    checkTheWords();
    userTurnWord.value = "";
  }
});

function howManyPeople(){
  //인원수 입력하기
  
  let userNumValue = userNum.value;

  if(userNumValue>0){
    userInfo.style.background = "#75ff00";
    userNum.style.display = 'none';
    userBtn.style.display = 'none';
    document.querySelector("#user_info>span").style.display = 'none';
    userNumText.textContent = `${userNumValue}명이서 게임을 진행합니다!`;
    userNumText.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';
    console.log(i+"인원수입력")
    userTurnText2.textContent = `${i++}번째 사람 순서!`;
  }else{
    alert("인원수를 입력해주세요");
    flag = 1;
  }
};

function checkTheWords(){
  //단어 비교, 체크하기

  let userNumValue = userNum.value;

  //n번째가 인원수보다 클 때
  if(i>userNumValue){
    i = 1;
  }
  
  //입력 단어 나누기
  let word = userTurnWord.value; //교실
  let wordArr = word.split(''); //교, 실
  let wordFirst = wordArr[0]; //교
  let comparedWord = wordArr[wordArr.length-1]; //실

  if(userNumValue == ""){ //check1 = 인원수가 없을때
    alert("인원수를 입력해주세요");
    reset();                                      
  }else if(userTurnText.textContent == "시작 단어"){ //check2 = 인원수 있음, 시작 단어 체크
    timeLimit();
    if(word == ""){
      //입력 단어가 없을때
      alert("단어 입력 안 함!! YOU LOST!!");
      flag = 1;
      reset();
    }else{ 
      //입력 단어가 있을때
      userTurnResult.textContent = `${word} -> ?`
      userTurnText.textContent = `${comparedWord}(으)로 시작하는 단어?`
      wordList.push(word) //학교
    }
  }else{ //check3 = 이 외
    timeLimit();
    userTurnText.textContent = `${comparedWord}(으)로 시작하는 단어?`
    
    //입력 단어가 전에 입력했던 단어인지 확인 (단어중복)
    if(wordList.includes(word) == false){
      wordList.push(word)

      //이전 단어 나누기
      let lastWordArr = wordList[wordList.length-2].split(''); //학, 교
      let lastWord = lastWordArr[lastWordArr.length-1]; //교
      
      //입력 단어 끝 글자와 이전 단어 첫 글자 비교
      if(wordFirst === lastWord){
        userTurnResult.innerHTML = `${wordList[wordList.length-2]} -> ${word}! <br> 성공~`
      }else{
        alert("끝 단어 틀리게 입력!! YOU LOST!!");
        flag = 1;
        reset();
      }
      
    }else{
      alert("중복 단어 입력!! YOU LOST!!");
      flag = 1;
      reset();
    }
  }
};

function reset(){

  //인원수 초기화하기
  userInfo.style.background = "";
  userNum.style.display = 'inline-block';
  userBtn.style.display = 'inline-block';
  document.querySelector("#user_info>span").style.display = 'inline-block';
  userNumText.style.display = 'none';
  resetBtn.style.display = 'none';
  userNum.value = "";
  i = 1;
  
  //단어 초기화
  wordList = [];
  userTurnText.textContent = "시작 단어";
  userTurnWord.value = "";
  userTurnResult.textContent = "결과";
  if(flag = 1){
    userTurnText2.textContent = "누가누가 잘하나?";
    i = 1;
  }
};

function timeLimit(){
  //시간 초과 함수
  let timerText = document.getElementById("timer");
  let timerInterval;
  let timerTimeout;

  //시간 초과
  let time = 20;

  clearTimeout(timerTimeout);
  //1초 마다 반복할 것
  timerInterval =  setInterval(() => {
    timerText.textContent = `${time--}초`;
    if(time>0){ //아직 타이머가 돌아가는데 또 단어 입력 버튼이 눌리면 clear타이머
      userTurnBtn.addEventListener('click',function(){
        clearTimeout(timerTimeout);
        clearInterval(timerInterval);
      });
      userTurnWord.addEventListener("keyup", (e)=>{
        if(e.key === 'Enter'){
          clearTimeout(timerTimeout);
          clearInterval(timerInterval);
        }
      });
    }
  }, 1000);

  //20초 후에 실행될 것
  timerTimeout = setTimeout(() => {
    timerText.textContent = "0초";
    clearInterval(timerInterval);
    alert("시간 초과!! YOU LOST!!");
    reset();
    time = 20;
    timerText.textContent = "20초";
  }, 22000);
};