import './CurrencyComponent.css'

const CurrencyComponent = (props) => {
  //CurrencyComponentจะมึข้อมูลทั้งหมดที่ถูกส่งมาจากAPIของเรา 
  //currencycomponent รับprop มาใช้งานและทำการวนloopสร้างเป็นตัวเลือกขึ้นมา
  //โดยให้app component ทำงานข้อมูลดังกล่าว
  //หลังจากนั้นเราทำการ map ข้อมูล จาก currencychoice เพราะเป็นarray
  const { currencyChoice, selectCurrency, changeCurrency, amount, onChangeAmount } = props
  return (
    <div className="currency">
      <select value={selectCurrency} onChange={changeCurrency}>
        {currencyChoice.map((choice) =>
          <option key={choice} value={choice}>{choice}</option>)}
      </select>
      <input type="number"
        value={amount}
        onChange={onChangeAmount}
      />
    </div>
  )

}
export default CurrencyComponent

//ตอนแรกเป็นoption ปกติ แต่ข้อมูลของเรามีหลายตัวเลือกและแต่ละตัวเลือก
//มี keys ที่ไม่ซ้ำกัน เราจึงต้องระบุใน option


//ใช้buttom up เป็นการส่งค่าจากcomponent ลูกไปยังแม่ โดยการเขียน event ที่select popup
//เราจะสร้างchangeCurrency อยู่ใน app component และให้ currencycomponent เป็นตัวเรียกใช้ผ่านการpropsข้อมูล
//onchangeจะส่งevent ไป พร้อมกับค่า ที่เราเลือกภายในselect เราก็จะเอาส่งไป