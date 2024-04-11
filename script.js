let api_url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let dataArray = [];
fetch(api_url).then((response) => response.json()).then((result) => { console.log(result) }).catch((error)=>{console.log(error)});

async function fetchData(){
    let response = await fetch(api_url);
    let data = await response.json();
    dataArray = [...data];
    renderData(dataArray)
    console.log(dataArray)
}
fetchData();

function renderData(dataArray){
    let table = document.getElementById("cryptoTable");
    table.innerHTML = "";

    dataArray?.forEach((element,index)=>{
        let row = document.createElement("tr");
        row.setAttribute("class","padding_class");
        row.innerHTML = `
        <td id="first_cell">
            <div><img src=${element.image} alt="img"></div>
            <span>${element.id.charAt(0).toUpperCase() + element.id.slice(1)}</span>
        </td>
        <td>${element.symbol.toUpperCase()}</td>
        <td class="text_align_end">${"$"+element.current_price}</td>
        <td class="text_align_end">${"$"+element.total_volume}</td>
        <td class="text_align_end padding_left" id=${element.price_change_percentage_24h > 0?"green_text":"red_text"}>${element.price_change_percentage_24h+"%"}</td>
        <td id="last_cell" class="text_align_end">Mkt Cap:${"$"+element.market_cap}</td>
        `;

        table.append(row);
    })
}

document.getElementById("btn_mkt_cap").addEventListener("click",()=>{
    let newArray = [...dataArray];

    newArray = newArray.sort((a,b)=>{
        if(a.market_cap > b.market_cap){
            return 1;
        }
        else if(a.market_cap < b.market_cap){
            return -1;
        }
        else{
            return 0;
        }
    });

    renderData(newArray)
});

document.getElementById("btn_percentage").addEventListener("click",()=>{
    let newArray = [...dataArray];

    newArray = newArray.sort((a,b)=>{
        if(a.price_change_percentage_24h > b.price_change_percentage_24h){
            return 1;
        }
        else if(a.price_change_percentage_24h < b.price_change_percentage_24h){
            return -1;
        }
        else{
            return 0;
        }
    });

    renderData(newArray)
});

document.getElementById("search_input").addEventListener("input",()=>{
    let searchValue = document.getElementById("search_input").value;

    searchValue = searchValue.toLowerCase();
    
    let filteredArray = dataArray.filter((element)=>element.symbol.toLowerCase().includes(searchValue) || element.id.toLowerCase().includes(searchValue) )
    
    renderData(filteredArray)

})
console.log("sfaf");