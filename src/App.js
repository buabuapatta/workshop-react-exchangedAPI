import { useEffect, useState } from 'react';
import './App.css';
import CurrencyComponent from './components/CurrencyComponent';
import Money from './img/Money.png'

//ข้อมูลแอพประกอบด้วย 4 ส่วน ได้แก่ 
//amoutจำนวนเงิน
//fromสกุลเงินต้นทาง
//toสกุลเงินปลายทาง
//rateอัตราการแลกเปลี่ยน

function App() {
  //usestate เขียนในรูปแบบ array ([]) เวลาเอาข้อมูลจะไปใช้ใส่...
  //เป็นสกุลเงินที่ดึงข้อมูลมาจากAPIเรียบร้อยแล้ว
  const [currencyChoice, setCurrencyChoice] = useState([])

  //กำหนดสกุลเงินเริ่มต้น
  const [fromCurrency, setFromCurrency] = useState("THB")
  //กำหนดสกุลเงินปลายทาง
  const [toCurrency, setToCurrency] = useState("USD")
  //เราต้องทำการpropข้อมูลไปทำงานในcurrencycomponent

  const [amount, setAmount] = useState(1)
  const [rate, setRate] = useState(0)

  //สร้างตัวแปรมาเพื่อเก็บข้อมูล
  let fromAmount, toAmount
  //สร้างstate มาเพื่อเก็บข้อมูลจากช่องที่กรอก
  const [checkfromCurrency, setCheckFromCurrency] = useState(true)

  if (checkfromCurrency) {
    fromAmount = amount
    toAmount = (amount * rate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount / rate).toFixed(2)
  }
  //tofixed คือการกำหนดค่าทศนิยม
  //เราต้องโยนค่าตัวนี่ไปที่ component currency ที่ input/ทำการ props ข้อมูล

  // currencychoiceจะทำการ fetch ข้อมูลตลอดเวลา เราจึงต้อง
  //check แล้ว fetch ข้อมูลแค่ครั้งเดียวใช้ ,[] จะให้เกิดการทำงานต้องใส่ fromcurrency ด้วย
  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    //ใช้ fetchเพื่อร้องขอและส่งrequestไปยังurl 
    //แต่จะเกืดขึ้นเมื่อเรา render component app มา
    //ดังนั้นเราจึงต้องใช้ useeffect เข้ามาร่วมด้วย
    //เพิ่มrates เพื่อให้มีการเปลี่ยนแปลงโดยอ้างอิงข้อมูลจาก tocurrency
    //เพื่อให้มีการเปลี่ยนแปลงค่าในstateของสกุลเงินปลายทาง หลังจากนั้นค่อยไปทำการคำนวณต่อ
    //โดยจะมีการเปลี่ยนทั้งสองทาง ได้แก่ จากต้นทางไปปลาย และ จากปลายไปต้น
    //from =amount/rate
    //to = amountxrate
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCurrencyChoice([...Object.keys(data.rates)])
        setRate(data.rates[toCurrency])
      })
  }, [fromCurrency, toCurrency])

  //สร้างเพื่อรับค่าตัวแปรจากcurrency component
  const amountFromCurrency = (e) => {
    setAmount(e.target.value)
    setCheckFromCurrency(true)
    //เพื่อบอกว่าตัวนี้มาจากสกุลเงินต้นทางเพราะว่าหากเราไม่ใส่แล้วเปลี่ยนค่าปลายทางจะไม่ได้มันจะเก็บเป็นของต้นทาง
  }
  const amountToCurrency = (e) => {
    setAmount(e.target.value)
    setCheckFromCurrency(false)
  }

  return (
    <div>
      <img src={Money} alt="Logo" className='money-img' />
      <h1>Exchange App (API)</h1>
      <div className='container'>

        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency}
        />
        <div className='equal'>=</div>

        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
    </div>
  )
}

export default App;

      //prop ข้อมูลไปเราจึงนำสกุลเงินไปใช้ใน CurrencyComponent
//เรานำข้อมูลจากAPI เข้ามาทำงานใน state และทำการ props currencychoice 
//ให้ไปทำงาน currencycomponent
//currencyconponent รับข้อมูลทั้งหมดมาใช้งานและเก็บในcurrencychoiceอีกทีหนึ่ง