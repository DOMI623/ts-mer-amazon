import { useState } from "react";
import "./App.css";
import { sampleProducts } from "./data";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <header>RD Amazon</header>
      <main>
        <ul>
          {sampleProducts.map((product) => (
            <li key={product.slug}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>RD${product.price}</p>
            </li>
          ))}
        </ul>
      </main>
      <footer>Todos los derechos reservados</footer>
    </div>
  );
}

export default App;
