const url = 'categories.json';
let response = fetch(url);

const getData = async(url) =>{
    let response = await fetch(url);
    if(response.status == "200") {
        let data = await response.json();
        return data;
    } else {
        console.log(response.status);
    }
}
