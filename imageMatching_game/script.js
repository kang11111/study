//도형모양에 따라 1 또는 2 번호가 부여되어있고 순서에 따라 또 번호가 있음
//사용자 버튼 클릭 1 또는 2
//사용자가 누른 버튼 == 도형모양번호
//눌린 도형 사라지고 그 다음 도형이 앞으로 와서 0번 번호 부여받기

const imageContainer = document.getElementById('image_container')

let imageArr = new Array(); //랜덤으로 지정된 도형 모양에 따른 번호를 저장하는 배열
let image = '';
let imageNum;
let userBtn = '';
// let userArr = new Array(); //사용자가 누른 버튼 번호를 저장하는 배열
const lastNum = 4; //노출되는 도형 개수

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
  if(e.code == 'ArrowLeft'){
    userBtn = 1;
  }else if(e.code == 'ArrowRight'){
    userBtn = 2;
  }
  console.log(imageArr)
  console.log(imageArr[0])
  console.log(userBtn)
  if(imageArr[0] == userBtn){ //도형배열 0번와 사용자입력번호가 일치하면
    console.log('버튼과 배열 내용이 일치');
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
  }
});
