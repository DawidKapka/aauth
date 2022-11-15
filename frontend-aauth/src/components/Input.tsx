export default function Input(props) {
  return (
    <div>
      <input type={props.inputType} placeholder={props.placeholder} onKeyUp={event => props.setter(val => event.target.value)}/>
    </div>
  );
}
