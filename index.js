function IpAddress(){
    const Ip = "https://api.ipify.org/?format=json";
    const data = fetch(Ip)
    data
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data);
//document.getElementById("IP").innerText = `MY Public IP ADDRESS : ${data.ip}`;

})
}
IpAddress();

