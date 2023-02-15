// user가 버튼을 눌러서 입력
//    버튼 : 0~9 clear, 연산자(+, -, /, *), =, backspace

// 입력값을 저장할 배열이 빈 값인가 확인 ( 사용자가 버튼을 처음 눌렀을 경우 )
//    빈 값인 경우, 입력값이 연산자, = 일 때는 alert 창을 띄워서 제대로 입력해달라고 하기
//    빈 값이 아닌 경우, 숫자, 괄호 일 때에는 배열에 저장

// 확인할 것 : 위와 같이 저장할 경우 : 숫자, 괄호, 연산자 등은 어떤 형태로 저장되는지 확인

// 배열에 user가 누른 입력값을 차례로 저장하다가 = 값이 나오면 equal_calc() 함수 실행
//    equal_calc() : 배열의 0 ~ 배열.length-1까지 꺼내는데, if문으로 *, /, +, - 를 거르기

// result 값이 나온 후에 또 연산자를 사용하면 다시 반복되기

const monitor = document.querySelector('#calc_container>input');
const userClickBtn = document.querySelectorAll('button.num');
// const userClickBtn = document.getElementsByClassName('num');
const resultBtn = document.getElementById('result');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('del');
let inputList = []; //입력값을 저장할 배열 초기화
let addNum;
let stack = []; //스택으로 사용할 배열 초기화
let convertTemp = []; //후위표기식으로 변환된 스택을 저장할 임시 배열
let numTemp = ""; //숫자가 두자리 이상이면 하나씩 저장할 임시 변수

//클릭 한 번
userClickBtn.forEach(btnClick => { //숫자, 연산자, 괄호 버튼 각각 아래 함수 실행
  btnClick.addEventListener('click', () => { //버튼이 클릭이 되었을 때
    // console.log("어떤버튼"+typeof(btnClick.dataset.btn)); //string 타입으로 배열에 저장됨
    if(inputList == "" && (btnClick.dataset.btn == "+" || btnClick.dataset.btn == "-" 
      || btnClick.dataset.btn == "*" || btnClick.dataset.btn == "/")){ //배열이 빈 값인데 첫 값으로 연산자가 들어왔을 때
        
      alert("유효하지 않은 계산식입니다.") //alert로 경고

    }else{ //숫자, 괄호가 들어왔을 때, 첫 값이 아닌 연산자가 들어왔을 때
      inputList.push(btnClick.dataset.btn); //배열 안에 html에서 미리 각각에 만들어놓은 data-btn 속성을 넣어줌
      addNum = inputList.join(''); //배열에 들어온 입력값을 중위 표기식으로 합치기
      // addNum = addNum.replace(/(\s*)/g,""); //공복 제거)
      monitor.value = addNum; //화면에 입력하는 값을 실시간으로 보여줌
    }
  }); //click end
}); //forEach end

resultBtn.addEventListener('click',() => { // equal버튼을 클릭했을 때
  rearPriority();
  monitor.value = stack; //화면에 결과값을 보여줌
  console.log('시작')
  console.log("inputList",inputList)
  console.log("addNum",addNum)
  console.log("convertTemp",convertTemp)
  console.log("numTemp",numTemp)
  console.log("stack",stack)
}); //click end

clearBtn.addEventListener('click',function () { //clear 버튼을 클릭했을 때
  monitor.value = '';
  inputList = []; //입력한 모든 값이 저장된 배열 초기화
  addNum = '' //입력된 값을 하나의 식으로 합친 변수 초기화
  convertTemp = []; //후위 표기식으로 변환된 값을 임시 저장한 배열 초기화
  numTemp = '' //숫자를 임시로 저장했던 변수 초기화
  stack = []; //결과값이 저장된 배열 초기화
}); //click end

delBtn.addEventListener("click",() => { //backspace 버튼을 클릭했을 때
  inputList.pop();
  addNum = addNum.substr(0, addNum.length -1);
  monitor.value = addNum;
}); //click end

//중위 표기식 > 후위 표기식 변환하기
function rearPriority() { // =버튼을 클릭했을 때 실행되는 계산 함수
  function calcPriority(pri) { //우선순위 반환 함수
    switch(pri) { //괄호, 연산자의 우선순위 정하기
      case '(' :
      case ')' :
          return 0;
      case '+' :
      case '-' :
          return 1;
      case '*' :
      case '/' :
          return 2;
    }
      return 999;
  };

  console.log("addNum :" + addNum)

  for(let i=0; i<addNum.length; i++) {
    const char = addNum.charAt(i); //addNum에 있는 문자를 순서대로 하나씩 확인
    switch(char) {
      case '(' : //문자가 괄호면
        stack.push(char); //스택으로 사용할 배열에 넣기
        break;
      case '+' : case '-' : case '*' : case '/' : //문자가 연산자이면
        while(stack[stack.length-1]!=null && (calcPriority(char) <= calcPriority(stack[stack.length-1]))){ //스택에 이전 값이 있고 이전 값의 우선순위가 크거나 같을 때
          console.log(stack)
          numTemp+=stack.pop();
          if(isNaN(stack[stack.length-1])) {
            convertTemp.push(numTemp);
            numTemp = ""                    
          }
        }
        stack.push(char);
        break;
      case ')':
        let returned_op = stack.pop();
        while(returned_op != '(') {
          numTemp+=returned_op;
          returned_op = stack.pop();

          if(isNaN(stack[stack.length-1])) {
            convertTemp.push(numTemp);
            numTemp = ""                    
          }
        }
        break;
      default : 
      numTemp+=char;
      if(isNaN(addNum.charAt(i+1)) || (i+1 == addNum.length) ) {
        convertTemp.push(numTemp);
        numTemp = ""
      }
      break;
    }
    console.log("convertTemp : "+convertTemp)
  }
  while(stack.length != 0) {
    convertTemp.push(stack.pop());
  }
  let result = "";
  for(let i in convertTemp) {
      result+=convertTemp[i];
      result+=" "; 
  }
  console.log(addNum);
  console.log(result);

  // 후위 표기식 계산 시작
  for(let i in convertTemp) {
    // 숫자인 경우 스택에 푸쉬해준다.
    if(!isNaN(convertTemp[i])) {
      stack.push(convertTemp[i]);
    }
    // 숫자가 아닌(연산자인) 경우 스택에서 두 값을 pop한다.
    // 그리고 계산 결과를 다시 stack에 push한다.
    else{
      const b = parseFloat(stack.pop());
      const a = parseFloat(stack.pop());
      switch(convertTemp[i]) {
          case '+':
              stack.push(a+b);
              break;
          case '-':
              stack.push(a-b);
              break;
          case '*':
              stack.push(a*b);
              break;
          case '/':
              stack.push(a/b);
              break;
      }
    }
  }

  // 후위 표기식 변환 결과 출력
  result = "";
  for(let i in convertTemp) {
    result+=convertTemp[i];
    result+=" "; 
  }
  console.log(addNum);
  console.log(result)
  // 최종적으로 stack에 남아있는 값이 결과값이 된다. 
  console.log("Result = " + stack);
}; //rearPriority end
//(5*2)+( 200 + 25 )/2
//5 2 * 200 25 + 2 / + 