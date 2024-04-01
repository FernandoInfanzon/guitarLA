import Guitar from './components/Guitar.jsx';
import Header from './components/Header.jsx';
import { useCart } from './hooks/useCart.js';

function App() {
    const {data, cart, addCart, removeCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal} = useCart();

  return (
    <>
    <Header cart={cart} removeCart={removeCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart} isEmpty={isEmpty} cartTotal={cartTotal}/> 
    <main className="container-xl mt-5">
        <h2 className="text-center">Our collection</h2>

        <div className="row mt-5">
            {data.map(guitar => 
                <Guitar
                    key={guitar.id}
                    guitar={guitar}
                    addCart={addCart}
                />
            )}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Copyright</p>
        </div>
    </footer>

      
    </>
  )
}

export default App
