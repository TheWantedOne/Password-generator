import {useState} from "react"
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from "./components/allCharacters"
import {COPY_SUCCESS, COPY_FAIL} from "./components/copyMessage"
import {CopyToClipboard} from 'react-copy-to-clipboard';




function App() {

  const [password, setPassword] = useState("")
  const [copy, setCopy] = useState(false)
  const [passwordLen, setPasswordLen] = useState("")
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)


  const toggleCopy = () => {
    setCopy(prevState => !prevState)
  }

  const handlePasswordGenerator = () => {

      //check if the password includes all these states
  if(!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols){
    console.log("Select at least one option to generate a password")
  }
  else{
    let charList = ""
    if(includeNumbers){
      charList = charList + numbers
    }
    if(includeUpperCase){
      charList = charList + upperCaseLetters
    }
    if(includeLowerCase){
      charList = charList + lowerCaseLetters
    }
    if(includeSymbols){
      charList = charList + specialCharacters
    }

    setPassword(createPassword(charList))
    console.log("Password has been created")
  }

  }

  const toggleUpperCase = () => {
    setIncludeUpperCase(prevState => !prevState)
  }
  const toggleLowerCase = () => {
    setIncludeLowerCase(prevState => !prevState)
  }
  const toggleNumbers = () => {
    setIncludeNumbers(prevState => !prevState)
  }
  const toggleSpecialChars = () => {
    setIncludeSymbols(prevState => !prevState)
  }


  const createPassword = (charList) => {
    setCopy(false)
    let finalPassword = ""
    const charListLen = charList.length
    for(let i = 0; i < passwordLen; i++){
      const charIndex = Math.round(Math.random() * charListLen)
      finalPassword = finalPassword + charList.charAt(charIndex)
    }
    console.log(finalPassword)
    return finalPassword
  }

  const handlePasswordLen = (e) => {
    setPasswordLen(e.target.value)
  }


  return (
    <div className="App">

     <div className="displayInfo">
        {password.length === 0 ? <p>Check one of the options to generate a password</p> : <p>{password}</p>}
        <CopyToClipboard text={password}>
        <p onClick={toggleCopy} className="styleCopyText">COPY</p>
        </CopyToClipboard>
      </div>
    
    <div className="displayButtons">
    <button className={includeUpperCase ? "activeBtn" : "notActiveBtn"} onClick={toggleUpperCase}>A</button>
    <button className={includeLowerCase ? "activeBtn" : "notActiveBtn"}  onClick={toggleLowerCase}>a</button>
    <button className={includeNumbers ? "activeBtn" : "notActiveBtn"}  onClick={toggleNumbers}>1</button>
    <button className={includeSymbols ? "activeBtn" : "notActiveBtn"}  onClick={toggleSpecialChars}>@</button>
    </div>


    <div className="displayFirstSection">
    <button 
    className="styleBtn"
    onClick={handlePasswordGenerator}>GENERATE BUTTON</button>
    <p>Password generator</p>
    </div>

    {copy ? 
    <div className="isCoppied">Coppied password:<span className="displaySpan">{password}</span></div>
     : <div className="notCoppied">No coppied password</div>}

    <div className="displayPasswordLen">
    <input 
    type="number"
    value={passwordLen}
    onChange={handlePasswordLen}
    className="stylePswLenInput"
    />
      <h2>Determine password length</h2>
    </div>

   


    </div>
  );
}

export default App;
