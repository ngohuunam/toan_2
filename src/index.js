import './style'
import { Component } from 'preact'

export default class App extends Component {
  state = { len: 49 }

  constructor() {
    super()
    this.numberOfFormulas = 49
    this.numberOfPages = 1
  }

  randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  onInput = event => {
    const name = event.target.name
    const value = event.target.value
    switch (name) {
      case 'formulas':
        this.numberOfFormulas = Number(value)
        break
      case 'pages':
        this.numberOfPages = Number(value)
        break
    }
  }

  btnClick = event => {
    event.preventDefault()
    switch (event.target.name) {
      case 'submit_formulas':
        this.setState({ len: this.numberOfFormulas })
        break
      case 'submit_pages':
        this.setState({ len: this.numberOfPages * 49 })
        break
    }
  }

  createNumber = (max, needHigher) => {
    let stNumber = this.randomInteger(11, max)
    let ndNumber = this.randomInteger(1, max - 1)
    if (needHigher) {
      while (ndNumber > stNumber) {
        stNumber = this.randomInteger(11, 100)
        ndNumber = this.randomInteger(11, 100)
      }
    }
    return { st: stNumber, nd: ndNumber }
  }

  createFomular = max => {
    const operation = ['+', '-']
    const operationIndex = this.randomInteger(0, 1)
    const num = this.createNumber(max, operationIndex)
    // console.log(num)
    return (
      <div class="formula">
        <div class="stNum">{num.st}</div>
        <div class="operation">{operation[operationIndex]}</div>
        <div class="ndNum">{num.nd}</div>
        <div class="break"></div>
        <div class="result"></div>
      </div>
    )
  }

  createFomulars = (max, len) => {
    const array = Array(len).fill(0)
    // console.log(array)
    return <div class="container">{array.map((_, i) => this.createFomular(max, i))}</div>
  }

  render({}, { len }) {
    return (
      <div>
        <h1 class="no-print">Hello, Do your Excercies!</h1>
        <label for="formulas" class="no-print">
          Số bài toán
        </label>
        <input
          class="no-print"
          type="number"
          name="formulas"
          min="1"
          max="500"
          value={this.numberOfFormulas}
          placeholder="Số bài toán"
          onInput={this.onInput}
        />
        <button name="submit_formulas" onClick={this.btnClick} class="no-print">
          TẠO
        </button>
        <label for="pages" class="no-print">
          Số trang
        </label>
        <input
          class="no-print"
          type="number"
          name="pages"
          min="1"
          max="50"
          value={this.numberOfPages}
          placeholder="Số trang x 49 bài"
          onInput={this.onInput}
        ></input>
        <button name="submit_pages" onClick={this.btnClick} class="no-print">
          TẠO
        </button>
        <button name="print" onClick={() => window.print()} class="no-print">
          IN
        </button>
        {this.createFomulars(100, len)}
      </div>
    )
  }
}
