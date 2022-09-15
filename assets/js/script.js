import quizArr from "./allQuiz.js"

// front page function

// selectors
const rulesElm = document.querySelector('.rules')
const rulsBtnElm = document.querySelector('.rulsButton button')
const gameStartSecElm = document.querySelector('.frontGameBtn')
const gameStartBtnElm = document.querySelector('.playStart')
const quizSecElm = document.querySelector('.quizSection')
const loadingbarElm = document.querySelector('.loadingBar')
const quizTimeElm = document.querySelector('.timeSec')

let quizQusNo = 0

//function
const gameFrontPageRulsFunc = () => {
    rulsBtnElm.addEventListener('click', () => {
        rulesElm.style.display = 'none'
        gameStartSecElm.style.display = 'block'
    })

    gameStartBtnElm.addEventListener('click', () => {
        gameStartSecElm.style.display = 'none'
        quizSecElm.style.display = 'block'
        quizTimeElm.style.display = 'block'
        loadingBarInc()
        quizTimeFunc()
        gettingQuizQues()
    })
}

gameFrontPageRulsFunc()

// loading bar function
const loadingBarInc = () => {
    loadingbarElm.classList.toggle('incLoadingBar')
}

// stopwatch time generate

// selectors
let quizMin = 0,
quizSec = 0,
interVal;
const quizMinsShow = document.querySelector('.min')
const quizSecShow = document.querySelector('.sec')

const quizTimeFunc = () => {
    setInterval(startTime, 10)
    
}

const startTime = () => {
    quizSec++
    if(quizSec <= 9){
        quizSecShow.innerHTML = '0' + quizSec
    }else{
        quizSecShow.innerHTML = quizSec
    }
    if(quizMin <= 9){
        quizMinsShow.innerHTML = "0" + quizMin
    }else{
        quizMinsShow.innerHTML = quizMin
    }
    if(quizSec > 99){
        quizMin++
        quizSecShow.innerHTML = quizSec
        quizSec = 0
        quizMinsShow.innerHTML = quizMin
        // console.log(quizMin);kk
        if(quizMin == 59){
            quizQusNo++
            quizMin = 0
            gettingQuizQues(quizQusNo)
            quizQuesShowInUi(quizArr[quizQusNo])
        }
    }
    
    // console.log(quizSec);
}

// radio button validation

// selectors
const singleOption = document.querySelectorAll('.singleOption input')

// document.querySelectorAll('.singleOption input')[1].checked = true




function radioValid (radioBtn) {
    console.log(radioBtn);
    for(let i = 0; i < singleOption.length; i++){
    
        singleOption[i].addEventListener('click', e => {
            if(singleOption[i].className === 'op1'){
               document.getElementById('op1').checked = true
            }else{
                document.getElementById('op1').checked = false
            }
    
            if(singleOption[i].className === 'op2'){
                document.getElementById('op2').checked = true
             }else{
                 document.getElementById('op2').checked = false
             }
    
             if(singleOption[i].className === 'op3'){
                document.getElementById('op3').checked = true
             }else{
                 document.getElementById('op3').checked = false
             }
    
             if(singleOption[i].className === 'op4'){
                document.getElementById('op4').checked = true
             }else{
                 document.getElementById('op4').checked = false
             }
        })
        
    }
}


const gettingQuizQues = () => {
    // for(let i = 0; i < quizArr.length; i++){
    //     console.log(quizArr[1]);
    // }
    quizQuesShowInUi(quizArr[quizQusNo])
    
    console.log(quizArr[quizQusNo])
    
}

// selectors 
const quizSecBtnELm = document.querySelector('.quizSecButtons')

// const quesNextBtn = document.querySelector('.nextBtn')
// const quesSkipBtn = document.querySelector('.skipBtn')

function quesNextSkip (btns) {
    // quesNextBtn.addEventListener('click', ()=> {
    //     quizQusNo++
    // })
    // quesSkipBtn.addEventListener('click', () => {
    //     quizQusNo++
    // })

    console.log(btns);
}

    


/// question show in ui

// selector


function quizQuesShowInUi (ques)  {
    const quizPlaceElm = document.querySelector('.quizSection')
    // document.querySelector('.quizSection').innerHTML = ''
    console.log(ques);
    let htmlElm = `
        <div class="singleQuiz">
            <div class="quizQus">
                <P><Span>${ques.id}</Span>. ${ques.QuizQues}</P>
            </div>
            <div class="quizOption">
                <div class="singleOption">
                    <input type="radio" value=${ques.Option1} class="op1" id="op1">
                    <label for="fOp">${ques.Option1}</label>
                </div>

                <div class="singleOption">
                    <input type="radio" value="${ques.Option2}" class="op2" id="op2">
                    <label for="fOp">${ques.Option2}</label>
                </div>

                <div class="singleOption">
                    <input type="radio" value="${ques.Option3}" class="op3" id="op3">
                    <label for="fOp">${ques.Option3}</label>
                </div>

                <div class="singleOption">
                    <input type="radio" value="${ques.Option4}" class="op4" id="op4">
                    <label for="fOp">${ques.Option4}</label>
                </div>
            </div>
        </div>

            <div class="quizSecButtons">
                <button class="skipBtn">Skip</button>
                <button class="nextBtn">Next</button>
            </div>
       
    `

    

    quizPlaceElm.insertAdjacentHTML('beforeend', htmlElm)
    
    // console.log(document.querySelector('.quizSecButtons'));
    console.log(document.querySelectorAll('.singleOption input'));
    radioValid(document.querySelectorAll('.singleOption input'))
    quesNextSkip(document.querySelector('.quizSecButtons'))
    
}




