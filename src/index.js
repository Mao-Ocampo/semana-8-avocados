/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price)

  return newPrice;
};

//web api fetch
//pasos

//1. conectarnos al server
window.fetch(`${baseUrl}/api/avo`)
//2. procesar respuesta
//3. convertir a Json
.then(respuesta => respuesta.json())
//4. json ->data -> renderizar info
.then(responseJson => {
    const todosLosItems = [];
    responseJson.data.forEach(item => {
        //crear imagen
        const imagen = document.createElement('img');
        imagen.src = `${baseUrl}${item.image}`;
        imagen.className = 'h-16 w-16 md:h24 md_w-24 rounded-full mx-auto md:mx-0 md:mr-6'
        //crear titulo
        const title = document.createElement('h2');
        title.textContent = item.name;
        title.className = 'text-lg';
        //crear precio
        const price = document.createElement('div');
        price.textContent = formatPrice(item.price);
        price.className = 'text-gray-600'

        const priceAndTitle = document.createElement("div");
        priceAndTitle.className = "text-center md:text-left";
        priceAndTitle.appendChild(title);
        priceAndTitle.appendChild(price);

        const card = document.createElement("div");
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
        card.appendChild(imagen);
        card.appendChild(priceAndTitle);

        todosLosItems.push(card);
    });
    appNode.append(...todosLosItems);
});