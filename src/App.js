import { useState } from "react";
import "./App.css";

function Logo() {
  return <h1 className="logo">Grocery Shop</h1>;
}

function Sidebar({ page, onSetPage }) {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <div
            onClick={() => onSetPage("Shop")}
            className="Sidebar_Page"
            style={page === "Shop" ? { textDecoration: "underline" } : {}}
          >
            Shop
          </div>
        </li>
        <li>
          <div
            onClick={() => onSetPage("Cart")}
            className="Sidebar_Page"
            style={page === "Cart" ? { textDecoration: "underline" } : {}}
          >
            Cart
          </div>
        </li>
      </ul>
    </div>
  );
}

function ListItems({ items, onAddToCart }) {
  const [seekItem, setSeekItem] = useState("");
  const [sortBy, setSortBy] = useState("All");
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="ListItems">
      <form className="Search" onSubmit={(e) => handleSubmit(e)}>
        <span>🔍</span>
        <input
          type="text"
          value={seekItem}
          onChange={(e) => setSeekItem(e.target.value)}
        />
      </form>
      <div className="Filter">
        <span>Sort by</span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="All">All</option>
          <option value="Fruit">Fruits</option>
          <option value="Veg">Vegatables</option>
          <option value="Meat">Meats</option>
          <option value="Clean">Washing chemicals</option>
        </select>
      </div>
      <div className="Items">
        {seekItem
          ? items.map(
              (item) =>
                item.name.includes(seekItem) &&
                (sortBy === "All" ? (
                  <Item
                    name={item.name}
                    img={item.img}
                    price={item.price}
                    key={item.name}
                    category={item.category}
                    onAddToCart={onAddToCart}
                  />
                ) : (
                  item.category === sortBy && (
                    <Item
                      name={item.name}
                      img={item.img}
                      price={item.price}
                      key={item.name}
                      category={item.category}
                      onAddToCart={onAddToCart}
                    />
                  )
                ))
            )
          : items.map((item) =>
              sortBy === "All" ? (
                <Item
                  name={item.name}
                  img={item.img}
                  price={item.price}
                  key={item.name}
                  category={item.category}
                  onAddToCart={onAddToCart}
                />
              ) : (
                item.category === sortBy && (
                  <Item
                    name={item.name}
                    img={item.img}
                    price={item.price}
                    key={item.name}
                    category={item.category}
                    onAddToCart={onAddToCart}
                  />
                )
              )
            )}
      </div>
    </div>
  );
}

function Item({ name, img, category, price, onAddToCart }) {
  const [amount, setAmount] = useState(1);
  function handleAddItemToCart() {
    const newItem = [
      {
        name,
        price,
        amount,
      },
    ];
    onAddToCart(newItem[0]);
  }

  return (
    <div className="Item">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>{price} $</p>
      <button className="amount" onClick={() => setAmount((curr) => curr - 1)}>
        -
      </button>
      <input type="text" value={amount} readOnly />
      <button className="amount" onClick={() => setAmount((curr) => curr + 1)}>
        +
      </button>
      <button className="AddItem" onClick={handleAddItemToCart}>
        Add
      </button>
    </div>
  );
}

function Cart({ cart, onCleanCart }) {
  if (cart.length === 0) return <h1>Cart is empthy</h1>;
  const total = cart?.reduce((acc, item) => {
    return acc + Number(item.price);
  }, 0);
  const listOfItemsInCart = cart?.map((item) => (
    <li>{`${item.name} ${item.amount}x   ${item.price}`}</li>
  ));
  return (
    <div className="Cart">
      <h1>your cart</h1>
      <ul className="SelectedItems">{listOfItemsInCart}</ul>
      <h2>
        TOTAL: <span>{total}$</span>
      </h2>
      <div className="buttons">
        <button
          className="Pay"
          onClick={() => alert("Vise or MasterCart?", "Vise", "MasterCart")}
        >
          Choose the payment
        </button>
        <button className="Clean" onClick={() => onCleanCart([])}>
          Clean cart
        </button>
      </div>
    </div>
  );
}

const shopItems = [
  {
    img: "https://media.post.rvohealth.io/wp-content/uploads/2020/09/AN313-Tomatoes-732x549-Thumb-732x549.jpg",
    name: "Tomato",
    price: 5,
    category: "Veg",
  },
  {
    img: "https://www.nutritionadvance.com/wp-content/uploads/2017/05/lamb-meat.jpg",
    name: "Meat",
    price: 25,
    category: "Meat",
  },
  {
    img: "https://hips.hearstapps.com/hmg-prod/images/group-of-oyster-mushroom-on-wooden-table-royalty-free-image-1706736226.jpg?crop=0.532xw:1.00xh;0.383xw,0&resize=980:*",
    name: "Mushroom",
    price: "7",
    category: "Veg",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ54ss8brXiaLJOxdVLaKOuCaO9EYDGYcDnLA&s",
    category: "Veg",
    name: "Potato",
    price: "4",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/1200px-Onion_on_White.JPG",
    name: "Onion",
    price: "6",
    category: "Veg",
  },
];

function App() {
  const [isPage, setIsPage] = useState("Shop");
  const [cart, setCart] = useState([]);

  function handleSetPage(value) {
    setIsPage(value);
  }

  function handleOnAddItem(newItem) {
    if (cart.filter((item) => item.name === newItem.name).length > 0) {
      alert("You have already added this item");
      return;
    }
    console.log(newItem);
    console.log(cart);
    setCart([...cart, newItem]);
    console.log(cart);
  }

  return (
    <div className="App">
      <Logo />
      <Sidebar page={isPage} onSetPage={handleSetPage} />
      {isPage === "Shop" ? (
        <ListItems onAddToCart={handleOnAddItem} items={shopItems} />
      ) : (
        <Cart cart={cart} onCleanCart={setCart} />
      )}
    </div>
  );
}

export default App;
