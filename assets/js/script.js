import quizArr from "./allQuiz.js"

// front page function

let quizQusNo = 0
let quizScore = 0

// selectors
const rulesElm = document.querySelector('.rules')
const rulsBtnElm = document.querySelector('.rulsButton button')
const gameStartSecElm = document.querySelector('.frontGameBtn')
const gameStartBtnElm = document.querySelector('.playStart')
const quizSecElm = document.querySelector('.quizSection')
const quizTimeElm = document.querySelector('.timeSec')


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
        quizTimeElm.style.display = 'block'
        
        quizTimeFunc()
        quizQuesShowInUi(quizArr[quizQusNo])
        
    })
}

gameFrontPageRulsFunc()



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
        
        if(quizMin == 59){
            quizQusNo++
            quizMin = 0
            console.log(quizQusNo);
            quizQuesShowInUi(quizArr[quizQusNo])
        }
    }

    
}

// radio button validation

// selectors


function radioValid () {
    const radioBtn = document.querySelectorAll('.quizSection form .singleOption input')
    
    for(let i = 0; i < radioBtn.length; i++){

        radioBtn[i].addEventListener('click', e => {
            if(radioBtn[i].className === 'op1'){
               document.getElementById('op1').checked = true
            }else{
                document.getElementById('op1').checked = false
            }

            if(radioBtn[i].className === 'op2'){
                document.getElementById('op2').checked = true
             }else{
                 document.getElementById('op2').checked = false
             }

             if(radioBtn[i].className === 'op3'){
                document.getElementById('op3').checked = true
             }else{
                 document.getElementById('op3').checked = false
             }

             if(radioBtn[i].className === 'op4'){
                document.getElementById('op4').checked = true
             }else{
                 document.getElementById('op4').checked = false
             }
        })

    }
}



// selectors


function quesNextSkip() {
    const skipBtn = document.querySelector('.skipBtn')

    skipBtn.addEventListener('click', (e) => {
        document.querySelector('.rightAns').innerHTML = ''
        quizQusNo++;
        
        if(quizQusNo === quizArr.length){
            quizQusNo = 0
            document.querySelector('.quizSection').style.display = 'none'
            document.querySelector('.quizSecButtons').style.display = 'none'
            quizScoreFunc()
            document.querySelector('.quizScoreSec button').addEventListener('click', () => {
                window.location.reload()
            })
            quizTimeElm.style.display = 'none'
            
        }
        
        quizQuesShowInUi(quizArr[quizQusNo])
        quizMin = 0,
        quizSec = 0
        
    }) 
}

quesNextSkip()


// quizScore 
function quizScoreFunc(){
    document.querySelector('.quizScoreSec').style.display = 'block'
    document.querySelector('.quizScoreSec #score').textContent = quizScore
}

/// question show in ui

// selector


function quizQuesShowInUi (ques)  {

    let quizPlaceElm = document.querySelector('.quizSection form')
    quizPlaceElm.innerHTML = ''
    let htmlElm = `
            <div class="singleQuiz">
            <div class="quizQus">
                <P><Span>${ques.id}</Span>. ${ques.QuizQues}</P>
            </div>
            <div class="quizOption">
                <div class="singleOption">
                    <input type="radio" value="${ques.Option1}" class="op1" id="op1">
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
        <div class="formBtn">
            <button class="id-${ques.id}">Submit</button>
        </div>

    `

    // quizPlaceElm.innerHTML = htmlElm
    quizPlaceElm.insertAdjacentHTML('beforeend', htmlElm)
    radioValid()
    
}

// form button disable 
function buttonDisable(){
    document.querySelector('form button').addEventListener('click', ()=> {
        document.querySelector('form button').setAttribute('disabled', '')
    })
}

function gettingAnswerFromQuiz (){
    const quizOp = document.querySelectorAll('.singleOption')

    console.log(quizOp[1].querySelector('input'));
}

let formAns ;

function formValue(){
    if(document.querySelector('.quizSection form')){
        document.querySelector('.quizSection form').addEventListener('submit', e => {
            e.preventDefault()
            const id = getId(document.querySelector('form button'))

            buttonDisable()
            const quizQus = document.querySelectorAll('.quizSection form .singleOption input')
            for(let i = 0; i < quizQus.length; i++){
                if(quizQus[i].checked){
                    formAns = quizQus[i].value
                    matchAns(id)
                    // getValueFromOp()
                    
                }
            }
        }) 

    }
}

formValue()



// get answer from id
function matchAns(id) {
    if(formAns === quizArr[id].RightAnswer){
        quizScore++
    }else{
        document.querySelector('.rightAns').innerHTML = `<p>Right Answer is : <br> <b>${quizArr[id].RightAnswer}</b></p>`
    }
    
}

// get id
function getId(idTarget){
    // console.log(idTarget.classList[0].split('-')[1]);
    return idTarget.classList[0].split('-')[1]-1
}


