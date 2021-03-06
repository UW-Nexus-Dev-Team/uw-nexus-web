import { useSelector } from "react-redux";
import "./CustomTextBox.css";

const CustomTextBox = (props) => {

  let text = useSelector((state) => state[props.reducer]);

  if (text) {
    text = text[props.name];
  }

  const handleChange = (e) => {
    props.onChange(e);
  }

  return (
    <input className={props.className} 
          type="text"
          name={props.name} 
          value={text ? text : props.value}
          placeholder={props.placeholder}
          onKeyPress={props.onKeyPress}
          onChange={props.onChange ? handleChange : () => {}}
          maxLength={50}>
    </input>

  )
}

export default CustomTextBox;