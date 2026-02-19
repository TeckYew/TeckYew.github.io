<template>
  <div class="wrapper">
    <!-- welcome page -->
    <div v-show="!startQuiz" class="landingPage">
      <div class="landingPage-contents">
        <div class="landingPage-img">
          <!-- WAD2 logo image removed -->
        </div>
        <div class="landingPage-text">
          <h1>QUIZ APP</h1>
          <p>
            You are presented with questions and four options, you have 30 seconds to answer each
            question. Failure to select an answer within the time limit will result in a loss of
            points. At the end of the quiz, your total score will be displayed. Good luck!!
          </p>
          <button @click="handleStartQuiz()">Start Quiz</button>
        </div>
      </div>
    </div>

    <!-- start quiz page -->
    <div class="question_container" v-show="startQuiz">
      <div class="question-contents">
        <p class="question-no">Question {{ currentQuestion }} of {{ questions.length }}</p>
        <h3 :class="countDown < 10 ? 'warning' : 'count-down'">
          {{ countDown }}
        </h3>
        <p class="question">
          {{ questions[currentQuestion - 1].question }}
        </p>
        <div class="options-container">
          <button
            type="button"
            v-for="(item, index) in options"
            :key="index"
            @click="correctAnswer(item.isCorrect, item.answer)"
          >
            {{ item.answer }}
          </button>
        </div>
        <div class="btn">
          <button class="submit-btn" @click="revealAnswer()">Submit Answer</button>
          <button
            class="next-btn"
            v-show="currentQuestion < questions.length"
            @click="handleNextQuestion()"
            :disabled="!isNextEnabled"
          >
            Next
          </button>

          <button
            class="submit-quiz-btn"
            v-show="currentQuestion === questions.length"
            @click="displayResult()"
          >
            Submit
          </button>
        </div>
        <div class="correctAns">{{ answerReveal }}</div>
      </div>
    </div>

    <!-- display result -->
    <TotalPoints v-show="showResult" :totalPoints="points" :totalQuestions="questions.length" />
  </div>
</template>

<script>
import TotalPoints from './QuizResults.vue'
import QuestionData from '../../assets/questionData.json'
import { shuffle } from 'lodash'
import axios from 'axios'

export default {
  name: 'QuizApp',
  props: ['totalPoints', 'totalQuestions', 'countDownTimerFn'],
  data() {
    return {
      isSubmitEnabled: true,
      isNextEnabled: false,
      isCurrentlyCorrect: false,
      currentQuestion: 1,
      points: null,
      answersArray: [],
      arr: null,
      countDown: 30,
      timer: null,
      startQuiz: false,
      showResult: false,
      questions: [],
      options: shuffle(QuestionData[0].options),
      answerReveal: ''
    }
  },
  created() {
    console.log('ok')
    axios
      .get('https://dracknor420.pythonanywhere.com/api', {
        params: {
          description: 'cars'
        }
      })
      .then((response) => {
        console.log(response.data)
        let jsonString = response.data.responses
        var cleanedJsonString = jsonString.replace(/\\n/g, '').replace(/`/g, '')
        cleanedJsonString = cleanedJsonString.replace(/^```json|```$/g, '')
        // Parse the JSON string to a JavaScript object
        var jsonData = JSON.parse(cleanedJsonString)
        console.log(jsonData)
        this.questions = jsonData
        console.log(this, this.questions)
      })
      .catch((error) => {
        console.error(error)
      })
  },

  methods: {
    handleStartQuiz() {
      this.startQuiz = true
      this.countDownTimer()
    },

    correctAnswer(isCorrect, answer) {
      if (isCorrect) {
        this.answersArray.push(answer)
        this.arr = new Set(this.answersArray)
        this.isCurrentlyCorrect = true
      } else {
        this.isCurrentlyCorrect = false
      }
    },

    revealAnswer() {
      this.isSubmitEnabled = false
      if (this.isCurrentlyCorrect == true) {
        this.answerReveal = 'You are right!'
      } else {
        let options = this.options
        for (var i in options) {
          console.log(options[i])
          if (options[i].isCorrect == true) {
            this.answerReveal = `Correct answer is ${options[i].answer}`
          }
        }
      }
      this.isNextEnabled = true
    },

    countDownTimer() {
      if (this.countDown > 0) {
        this.timer = setTimeout(() => {
          this.countDown--
          this.countDownTimer()
        }, 1000)
      } else if (this.countDown === 0) {
        if (this.currentQuestion === this.questions.length) {
          this.displayResult()
        } else {
          this.handleNextQuestion()
        }
      }
    },

    handleNextQuestion() {
      this.isSubmitEnabled = true
      this.isNextEnabled = false
      this.answerReveal = ''
      clearTimeout(this.timer)
      this.options = this.questions[this.currentQuestion].options
      this.options = shuffle(this.options)
      this.currentQuestion += 1
      this.countDown = 30
      this.countDownTimer()
    },

    displayResult() {
      this.showResult = true
      this.countDown = 1
      this.points = this.arr.size
    }
  },

  components: {
    TotalPoints
  }
}
</script>

<style scoped>
@import '../../assets/quizQuestionStyle.css';
</style>
