import style from './App.module.css'
import { cards } from './assets/mock/cards'
import { Menu } from './components/menu'

function App() {
  return (
    <>
     <Menu option01='viacep'/>
     <main>
      <section id='s1' className={style.s1}>
        {cards.map((item, index) => {
          return(
            <div key={index} className={style.crdzao}>
              <h5>{item.text}</h5>
              <p>{item.maiscoisa}</p>
              <img src={item.img} alt={item.text} width={200} height={"auto"}/>
            </div>
          )
        })}
      </section>
     </main>
    </>
  )
}

export default App