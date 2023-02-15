const monitor = document.querySelector('#calc_container>input');
const userClickBtn = document.querySelectorAll('button.num');
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
  if(inputList == ''){ //입력값이 없이 버튼을 눌렀을 때
    alert("유효하지 않은 계산식입니다.") //alert로 경고
  }else{
    rearPriority();
    monitor.value = stack; //화면에 결과값을 보여줌
    console.log('시작')
    console.log("inputList",inputList)
    console.log("addNum",addNum)
    console.log("convertTemp",convertTemp)
    console.log("numTemp",numTemp)
    console.log("stack",stack)
  }
}); //click end

clearBtn.addEventListener('click',clear); //click end

delBtn.addEventListener("click",() => { //backspace 버튼을 클릭했을 때
  if(stack.length == 0){ //stack에 값이 없다면(equal버튼을 누르지않았다면)
    inputList.pop();
    addNum = addNum.substr(0, addNum.length -1);
    monitor.value = addNum;
  }else{ //stack에 값이 있다면
    clear();
  }
}); //click end

function clear() {
  monitor.value = '';
  inputList = []; //입력한 모든 값이 저장된 배열 초기화
  addNum = ''; //입력된 값을 하나의 식으로 합친 변수 초기화
  convertTemp = []; //후위 표기식으로 변환된 값을 임시 저장한 배열 초기화
  numTemp = ''; //숫자를 임시로 저장했던 변수 초기화
  stack = []; //결과값이 저장된 배열 초기화
}//fn clear end

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

  convertTemp = []; // 초기화
  for(let i=0; i<addNum.length; i++) {
    const char = addNum.charAt(i); //addNum에 있는 문자를 순서대로 하나씩 확인
    switch(char) {
      case '(' : //문자가 괄호면
        stack.push(char); //스택으로 사용할 배열에 넣기
        break;
      case '+' : case '-' : case '*' : case '/' : //문자가 연산자이면
        while(stack[stack.length-1]!=null && (calcPriority(char) <= calcPriority(stack[stack.length-1]))){ //스택에 이전 값이 있고 이전 값의 우선순위가 크거나 같을 때
          numTemp+=stack.pop();
          if(isNaN(stack[stack.length-1])) {
            convertTemp.push(numTemp);
            numTemp = ""                    
          }
        }
        stack.push(char);
        break;
      case ')':
        if(!stack.includes('(')){ // )클릭 이전에 (가 없을 때
          alert("유효하지 않은 계산식입니다."); //alert로 경고
          clear();
        }else{
          let returned_op = stack.pop();
          while(returned_op != '(') {
            numTemp+=returned_op;
            returned_op = stack.pop();
  
            if(isNaN(stack[stack.length-1])) {
              convertTemp.push(numTemp);
              numTemp = ""                    
            }
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
    }//switch end
    console.log("convertTemp : "+convertTemp)
    console.log("stack : "+stack)
  }
  while(stack.length != 0) {
    convertTemp.push(stack.pop());
  }
  let result = "";
  for(let i in convertTemp) {
      result+=convertTemp[i];
      result+=" ";
  }
  // console.log(addNum);
  console.log("result : ",result);
  // console.log(convertTemp);

  // 후위 표기식 계산 시작
  for(let i in convertTemp) {
    if(!isNaN(convertTemp[i])) { // 숫자인 경우 스택에 넣기
      stack.push(convertTemp[i]);
    }else{ // 연산자일 때 스택에서 두 값을 뽑아서 계산하고 그 값을 stack에 넣기
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
    if(stack == 'NaN'){ //계산식이 올바르지 않아서 값이 안 나올 때
      alert("유효하지 않은 계산식입니다."); //alert로 경고
      clear();
    }
  }//for end

  // 후위 표기식 변환 결과 출력
  result = "";
  for(let i in convertTemp) {
    result+=convertTemp[i];
    result+=" ";
  }
  // console.log(addNum);
  // console.log(result)
  console.log("Result = " + stack);
}; //fn rearPriority end

//(5*2)+( 200 + 25 )/2
//5 2 * 200 25 + 2 / +