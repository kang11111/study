const imageContainer = document.getElementById('image_container')
let imageArr = new Array(); //랜덤으로 지정된 도형 모양에 따른 번호를 저장하는 배열
let image = '';
let imageNum;
let userBtn = '';
const lastNum = 7; //노출되는 도형 개수
const arrowLeft = document.querySelector("#arrow_container button:nth-child(1)");
const arrowRight = document.querySelector("#arrow_container button:nth-child(3)");
let score = 0;
let combo = 0;
const scoreContainer = document.getElementById('score');
const comboContainer = document.getElementById('combo');
let time = 30;
const timeContainer = document.getElementById('time');
let totalScore = 0;
const gameOverContainer = document.getElementById('gameOver');
const totalScoreContainer = document.querySelector('#gameOver > p:nth-child(2)');
const resetButton = document.querySelector('#gameOver > button');

//imageNum = Math.floor((Math.random() * 3+1)) //도형 번호를 랜덤으로 1~3까지 추출

// circle = document.createElement("img");
// circle.setAttribute('class','circle_img');
// circle.setAttribute('src',`./img/circle${circleNum}.png`);
// circle.setAttribute('alt','');
// circleContainer.appendChild(circle);

//위 코드 다섯줄과 같은 의미
// circleContainer.innerHTML = `<img class="circle_img" src="./img/circle${circleNum}.png" alt="">`

for(let i=0;i<lastNum;i++){ //도형 4개 생성
  imageNum = Math.floor((Math.random()*2+1)) //도형 번호를 랜덤으로 추출(범위 1~2)
  image += `<img class="img" src="./img/image${imageNum}.png" alt="">`;
  imageArr[i] = imageNum; //도형번호를 배열에 저장
}
imageContainer.innerHTML = image;

window.addEventListener("keydown", (e) => { //화살표 버튼을 눌렀을 때 사용자가 누른 버튼 번호 저장
  if(time <= 0){ //시간초과가 되면 키보드 안 눌리게 함
    e.preventDefault();
  }else{
    if(e.code == 'ArrowLeft'){
      userBtn = 1;
    }else if(e.code == 'ArrowRight'){
      userBtn = 2;
    }
  }
  matching();
});

arrowLeft.addEventListener("click", ()=>{
  userBtn = 1;
  matching();
})
arrowRight.addEventListener("click", ()=>{
  userBtn = 2;
  matching();
})

resetButton.addEventListener("click", ()=>{ //다시 시작
  location.reload();
})

function matching() {
  if(imageArr[0] == userBtn && time > 0){ //도형배열 0번와 사용자입력번호가 일치하면
    if(combo > 25){ //콤보 25점 이후에는 콤보 점수 추가
      totalScore = score + combo * 1;
    }else{
      totalScore = score;
    }
    score += 10; //점수 10점 추가
    combo += 1; //1콤보 추가
    scoreContainer.innerHTML = `${totalScore}점`;
    comboContainer.innerHTML = `${combo}콤보`;
    imageArr.shift(); //도형배열 0번 삭제
    imageNum = Math.floor((Math.random() * 2+1)); //이미지번호 1개를 랜덤으로 추출
    imageArr.push(imageNum); //도형번호배열에 랜덤으로 추출한 1개 이미지 번호를 넣기
    //부모요소 잡아서 img 태그 삭제
    const imgParent = document.querySelector('#image_container');
    const imgFirst = document.querySelector('#image_container img');
    imgParent.removeChild(imgFirst);
    //도형 초기화 시켜주고 4개 다시 그리기
    imageContainer.innerHTML = '';
    image = '';
    for(let j=0;j<lastNum;j++){
      image += `<img class="img" src="./img/image${imageArr[j]}.png" alt="">`;
    }
    imageContainer.innerHTML = image;
  }else if(imageArr[0] != userBtn && time > 0){ //일치하지않으면
    combo = 0;
    comboContainer.innerHTML = `${combo}콤보`;
  }
}//fn end

let timeInterval = setInterval(() => { //1초가 지날 때마다 실행됨
  time -= 1;
  timeContainer.innerHTML = `${time}초`;
  if(time == 0){ //0초가 되면
    clearInterval(timeInterval);
    totalScoreContainer.innerHTML = `총점 : ${totalScore}`;
    arrowLeft.disabled = true; //화살표 버튼 눌러도 안 눌리게 함
    arrowRight.disabled = true;
    arrowLeft.style.cursor = "default"; //커서 모양 변경
    arrowRight.style.cursor = "default";
    gameOverContainer.style.display = "block";
  }
}, 1000);