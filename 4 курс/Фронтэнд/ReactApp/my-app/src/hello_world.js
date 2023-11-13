import React from 'react'
const HelloWorld = ({ name, age }) => {
  const sayHello = (name, age) => alert(`Привет, ${name}. Тебе ${age} лет!`)
  return <button onClick={sayHello('Кирилл', 21)}>Нажми меня!</button>
}
export default HelloWorld