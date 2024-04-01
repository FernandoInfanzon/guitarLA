import Guitar from './components/Guitar.jsx';
import Header from './components/Header.jsx';
import {db} from './data/db.js';
import { useEffect, useState } from 'react';

function App() {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addCart = (item) => {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);

        if(itemExist !== -1) {
            increaseQuantity(item.id);
        } else {
            item.quantity = 1;
            setCart( (prevCart) => [...prevCart, item]);
        }
    }

    function removeCart(id) {
        const updatedCart = cart.filter(guitar => guitar.id !== id);
        setCart(updatedCart);
    }

    function increaseQuantity(id) {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(guitar => guitar.id === id);
        if (updatedCart[itemIndex].quantity < MAX_ITEMS) {
            updatedCart[itemIndex].quantity++;
        }
        setCart(updatedCart);
    }

    function decreaseQuantity(id) {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(guitar => guitar.id === id);
        if(updatedCart[itemIndex].quantity > MIN_ITEMS) {
            updatedCart[itemIndex].quantity--;
            setCart(updatedCart);
        } else {
            removeCart(id);
        }
    }

    function clearCart(){
        setCart([]);
    }

  return (
    <>
    <Header cart={cart} removeCart={removeCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart}/> 
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
