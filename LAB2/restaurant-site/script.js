/* -----------------------------*/
// HIGHLIGHT AN ACTIVE PAGE
/* -----------------------------*/
function highlightActivePage(){
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        const linkPage = link.getAttribute("href");
        if(linkPage === currentPage){
            link.classList.add("active");
        }
    });
}
/* -----------------------------*/
// DOM MENU DATA
/* -----------------------------*/
const MENU_ITEMS = [
    {id:1, name:"Pancake Stack", description:"Fluffy pancakes with maple syrup", price:8.99, category:"Breakfast",image:"./images/fluffy-pancakes.jpg"},
    {id:2, name:"Steak & Eggs", description:"Grilled steak with eggs and toast", price:14.99, category:"Breakfast",image:"./images/grilled-steak-egg-n-toast.jpg"},
    {id:3, name:"French Toast", description:"Classic cinnamon french toast", price:9.99, category:"Breakfast",image:"./images/Cinnamon-French-Toast.jpg"},
    {id:4, name:"Caesar Salad", description:"Romaine lettuce, parmesan, croutons", price:10.99, category:"Lunch",image:"./images/caesar-salad61.jpg"},
    {id:5, name:"Steakhouse Wings", description:"Grilled wings with smoky BBQ glaze", price:12.99, category:"Lunch",image:"./images/steakhouse-wings.jpg"},
    {id:6, name:"Loaded Tater Skins", description:"Cheddar, bacon, sour cream", price:11.99, category:"Lunch",image:"./images/loaded-potato-skins.jpg"},
    {id:7, name:"12oz Ribeye", description:"Prime ribeye grilled over open flame", price:34.99, category:"Dinner",image:"./images/12oz-ribeye.jpg"},
    {id:8, name:"Filet Mignon", description:"Center cut filet with herb butter and fries", price:39.99, category:"Dinner",image:"./images/filet_mignon_steak.jpg"},
    {id:9, name:"French Onion Soup", description:"Beef broth, caramelized onions", price:9.99, category:"Dinner",image:"./images/french-onion-soup.jpg"},
    {id:10, name:"Chocolate Cake", description:"Warm molten chocolate dessert", price:9.99, category:"Dinner",image:"./images/chocolate-cake.jpg"},
    {id:11, name:"House Cabernet", description:"Premium cabernet sauvignon", price:12.99, category:"Dinner",image:"./images/premium-cabernet-sauvignon.jpg"},
    {id:12, name:"Old Fashioned", description:"Bourbon, bitters, orange peel", price:14.99, category:"Dinner",image:"./images/old-fashioned3.jpg"}

];
/* -----------------------------*/
// DOM MENU RENDERING
/* -----------------------------*/
/* -----------------------------*/
// RENDER MENU FUNCTION
/* -----------------------------*/
let currentCategory = "All";
let searchQuery = "";

function renderMenu() {

    const container = document.getElementById("menu-container");
    if (!container) return;
    container.innerHTML = "";
    // FORMAT PRICES
    const money = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    let filtered = MENU_ITEMS.filter(item => {
        const matchesCategory =
            currentCategory === "All" || item.category === currentCategory;
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
            <div class="card h-100">
            ${item.image ? `<img src="${item.image}" class="card-img-top" alt="${item.name}">` : ""}
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="fw-bold">${money.format(item.price)}</p>
                    <span class="badge bg-dark">${item.category}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
/* -----------------------------*/
//IMPLEMENTING SEARCH LISTENER
/* -----------------------------*/
function enableSearch(){
    const searchInput = document.getElementById("menu-search");
    if(!searchInput) return;
    searchInput.addEventListener("input", function(){
        searchQuery = this.value.toLowerCase();
        renderMenu();
    });
}
/* -----------------------------*/
// FILTER BUTTONS
/* -----------------------------*/
function enableMenuFilters(){
    const buttons = document.querySelectorAll(".menu-filter");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentCategory = btn.dataset.category;
            renderMenu();
        });
    });
}

/* -----------------------------*/
// RESERVATION VALIDATION
/* -----------------------------*/

function enableReservationForm(){
    const form = document.querySelector("form");
    if(!form) return;
    form.addEventListener("submit", function(e){
        e.preventDefault();//PREVENTING DEFAULT ON SUBMIT
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const party = document.getElementById("party").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const notes = document.getElementById("notes").value.trim();
        const newsletter = document.getElementById("myCheckbox").checked;
        const seating = document.querySelector('input[name="seating"]:checked');

        let errors = [];
        if(name === "" || name.length > 20)
            errors.push("-Name is required and must be under 20 characters.");
        if(email === "" || !email.includes("@"))
            errors.push("-Valid email is required.");
        if(party === "")
            errors.push("-Party size is required.");
        if(date === "")
            errors.push("-Reservation date required.");
        if(time === "")
            errors.push("-Reservation time required.");
        if(!seating)
            errors.push("-Please select seating preference.");
        if(notes.length > 30)
            errors.push("-Dietary notes must be 30 or less characters.");
        /* ---------------------------------------*/
        //DISPLAYING RESERVATION FORM ERROR RESULTS
        /* ---------------------------------------*/
        const alertContainer = document.getElementById("form-alert");

        if(errors.length > 0){
            alertContainer.innerHTML =
                `<div class="alert alert-danger">
                ${errors.join("<br>")}
            </div>`;
            return;
        }
        const reservation = {
            name:name,
            email:email,
            partySize:party,
            date:date,
            time:time,
            seating:seating.value,
            dietaryNotes:notes,
            newsletter:newsletter
        };
        console.log(reservation);//LOGGING FORM VALUES TO THE CONSOLE
        /* -----------------------------------------*/
        //DISPLAYING RESERVATION FORM SUCCESS RESULTS
        /* -----------------------------------------*/
        alertContainer.innerHTML =
            `<div class="alert alert-success">
            Reservation request submitted successfully!
        </div>`;
        form.reset();
    });
}
/* -----------------------------*/
// RESET PAGES UPON LOAD
/* -----------------------------*/
document.addEventListener("DOMContentLoaded",()=>{
    renderMenu();
    enableMenuFilters();
    enableSearch();
    enableReservationForm();
    highlightActivePage();
});