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
let timerText = document.getElementById("timer");
let wordList = [];
let time = 20; // 타이머 기준 초
let i = 1; //n번째 계속 증가하는 것 방지
let flag = 0; //flag = 0일때 : 시작단어 표시되어있을 때, flag =1은 넘버링 진행중일 때

//flag 초기값 설정.
if(flag == 0) {
userTurnText2.textContent = '누가누가 잘하나?';
}

//resetBtn.addEventListener("click",reset);//초기화 버튼
resetBtn.addEventListener("click",function(){
location.reload();
})
userBtn.addEventListener("click",howManyPeople); //인원수 입력후 입력버튼 클릭
userNum.addEventListener("keyup", (e)=>{ //인원수를 입력 후 엔터를 입력했을 때
if(e.key === 'Enter'){
    howManyPeople();
}
});

userTurnBtn.addEventListener('click',function(){ // 단어입력 버튼 클릭 시
flag = 1;
userTurnText2.textContent = `${i++}번째 사람 순서!`;
checkTheWords();
userTurnWord.value = ""; //입력값을 비우기
});
userTurnWord.addEventListener("keyup", (e)=>{ //단어입력 후 엔터를 쳤을때
if(e.key === 'Enter'){
    flag = 1;
    userTurnText2.textContent = `${i++}번째 사람 순서!`;
    checkTheWords();
    userTurnWord.value = "";//입력값을 비우기
}
});

function checkTheWords(){
//단어 비교, 체크하기  
let userNumValue = userNum.value; // 인원수 값

//n번째가 인원수보다 클 때
if(i>userNumValue){ //순번초기화
    i = 1;
}

//입력 단어 나누기
// let word = userTurnWord.value; //교실, 입력칸의 입력 내용 변수
// let wordArr = word.split(''); //교, 실, 입력 단어를 분리 시키기
// let wordFirst = wordArr[0]; //교, 입력단어의 첫번째 글자 변수로 지정
// let comparedWord = wordArr[wordArr.length-1]; //실 -> 'O'으로 시작하는 단어에 필요한 변수
//이전 단어 나누기
// let lastWordArr = wordList[wordList.length-2].split(''); //학, 교
// let lastWord = lastWordArr[lastWordArr.length-1]; //교

//mission
//input의 벨류 값 = word, 이전 단어 값 = prevWord로 변수지정
//word의 첫번째 값을 wordFirst, 이전단어의 마지막 값 prevWordLast로 지정
//+

let word = userTurnWord.value; //교실, 입력칸의 입력 내용 변수

if(userNumValue == ""){ //check1 = 인원수가 없을때
    alert("인원수를 입력해주세요");
    reset(); // 인원수초기화 및 단어입력칸초기화 + 멘트 변경                                      
} else if(userTurnText.textContent == "시작 단어"){ //check2 = 인원수 있음, user_turn의 span 글자가 시작단어일때, 이전단어 x
    if(word == ""){ //입력 단어가 없을때
    alert("단어 입력 안 함!! YOU LOST!!");
    timeLimit();
    location.reload();
    }else if (word != ''){ // 첫번쨰 차례에 단어를 입력했을 때  // 이전 단어가 존재하지 x
    //비교대상 x, 아무거나 입력 한 상태
    // 현재 단어내에서 구동해야함. 고로 word의 value값이랑 , word의 끝단어를 사용
    let wordLast = word.substr(word.length-1,1); // word의 끝단어, 이전단어가 없을 때에 사용
    userTurnResult.textContent = `${word} -> ?` //입력칸의 단어가 result 값으로 들어온다.
    userTurnText.textContent = `${wordLast}(으)로 시작하는 단어?` //다음사람에게 제시 단어 보여주기
    wordList.push(word) //학교, //입력칸의 내용을 단어 배열에 넣어주기.
    }
} else{ //check3 = 인원이 존재하고, span의 글자가 시작단어가 아닐때 = n번째 사람 차례일때, 이전단어 존재
    let wordFirst = word.substr(0,1); // 현재단어의 첫단어
    let prevWord = wordList[wordList.length-1]; // 이전 단어
    let prevWordLast = prevWord.substr(prevWord.length-1,1); //이전단어의 끝단어, 이전단어가 있을 때 사용 가능
    userTurnText.textContent = `${prevWordLast}(으)로 시작하는 단어?` // 두번째부터 해당
    //입력 단어 끝 글자와 이전 단어 첫 글자 비교
    if(wordFirst === prevWordLast){ //첫단어와 끝단어가 일치할때 
    if(wordList.includes(word) == false){ //단어 배열안에 입력값이 존재하는가? 아닐 때 단어 배열에 넣기
        wordList.push(word)
    }else{ //단어 배열안에 입력값이 존재 할 때
        alert("중복 단어 입력!! YOU LOST!!");
        timeLimit();
        location.reload();
    }
    userTurnResult.innerHTML = `${wordList[wordList.length-2]} -> ${word}! <br> 성공~`
    } else if(word == '') { //단어 word의 value 자체가 없을 때
    alert("단어 입력 안 함!! YOU LOST!!");
    timeLimit();
    location.reload();                                                                                                                        
    } else if(wordFirst !== prevWordLast){ //단어 비교 불일치, 끝단어와 첫단어가 일치하지 않을 때
    alert("끝 단어 틀리게 입력!! YOU LOST!!");
    timeLimit();
    location.reload();
    }
};

timeLimit();
};
function timeLimit(){
//시간 초과 함수
time = 20;
timerText.textContent = time + '초';

const handler = () => {
    time = time -1;
    timerText.textContent = time + '초';
    if(time < 0) { //time이 음수 일 경우 == 시간초과
    if(userTurnWord.value == '') { //시간이 끝났고, 단어 미입력시
        alert('응, 너 시간초과');
        clearInterval(timeInterval);
        location.reload();
    }
    } 
    if(userTurnWord.value != ''){
    console.log('인풋입력 했다');
    clearInterval(timeInterval);
    }
}

const timeInterval = setInterval(handler,1000);


//한 번만 반복하게 한다
//클릭할 때, 시간초 감소 / 사용자가 입력 같이 진행

//1초마다 time이 1씩 줄어야함
//그걸 timerText에 표시해야함

//만약에 time 멈춘 시간 -> 20초, 20초 이하 1초 이상, 0초
//20초 : reset, time도 20, 버튼을 누른 다음 바로, time 하나씩 줄어야함
//20초 이하 1초 이상 : reset, time 20초, 단어 비교
//0초 : reset, time 20초, 입력 못 해서 / 입력했어도 제시간에 못 써서 game over


};

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
    flag = 1;
}else{
    alert("인원수를 입력해주세요");
    flag = 0;
}
};

// function reset(){
//   //인원수 초기화하기
//   userInfo.style.background = "";
//   userNum.style.display = 'inline-block';
//   userBtn.style.display = 'inline-block';
//   document.querySelector("#user_info>span").style.display = 'inline-block';
//   userNumText.style.display = 'none';
//   resetBtn.style.display = 'none';
//   userNum.value = "";

//   //i값이랑 flag 초기화
//   time=5;
//   i=1;
//   flag = 0;
//   if(flag == 0) {
//     userTurnText2.textContent = '누가누가 잘하나?';
//   }

//   //단어 초기화
//   wordList = [];
//   userTurnText.textContent = "시작 단어";
//   userTurnWord.value = "";
//   userTurnResult.textContent = "결과";
//   timerText.textContent = '';  
// };


// let timerInterval;
// let timerTimeout; 
// let timerInterval_1s;
//1초 마다 반복할 것
// clearInterval(timerInterval_1s);
// let time = 20;

// timerInterval_1s = setInterval(() => {
//   if(time<0){
//     time = 0;
//   }
//   timerText.textContent = `${time--}초`;
// }, 1000);

// if(time <= 0){ //시간이 0초 이하
//   if(userTurnWord.value = ""){ //입력단어 없을 때
//     alert("1 시간 초과")
//     time = 20;
//     reset();
//   }else{ //입력단어 있을 때
//     alert("2 시간 초과")
//     time = 20;
//     reset();
//   }
// } else if(time<20 || time>0){ //시간이 1~19초
//   if(userTurnWord.value = ""){ //입력단어 없을 때
//     alert("3 시간 초과")
//     time = 20;
//     reset();
//   }else{ //입력단어 있을 때
//     alert(time+"4 시간 초과 아님")
//     time = 20;
//     console.log(time)
//   }
// }else{ //시간이 20초 이상

// }


// //버튼 눌리면 클리어 할 것
// timerInterval =  setInterval(() => {
//   if(time>0){ //아직 타이머가 돌아가는데 또 단어 입력 버튼이 눌리면 clear타이머
//     clearInterval(timerInterval);
//     // clearInterval(timerInterval_1s);
//     time = 20;
//     timerText.textContent = `${time--}초`;
//     // if(userTurnWord.value = ""){
//     //   clearInterval(timerInterval);
//     //   clearTimeout(timerTimeout);
//     // }else{
//     //   clearInterval(timerInterval)
//     // }
//   }else if(time = 0){
//     clearInterval(timerInterval);
//     clearInterval(timerInterval_1s);
//     alert("시간 초과!! YOU LOST!!");
//     reset();
//     time = 20;
//   }
//   // console.log(userTurnWord.value)
//   // if(userTurnWord.value = ""){
//   //   clearInterval(timerInterval)
//   // }else{
//   //   clearInterval(timerInterval)
//   // }
// }, 1000);

// //20초 후에 실행될 것
// timerTimeout = setTimeout(() => {
//   timerText.textContent = "0초";
//   clearInterval(timerInterval);
//   alert("시간 초과!! YOU LOST!!");
//   reset();
//   time = 20;
//   timerText.textContent = "20초";
// }, 20000);