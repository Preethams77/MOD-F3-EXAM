function IpAddress() {
    const Ip = "http://api.ipify.org/?format=json";
    const data= fetch(Ip)
    data
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            document.getElementById("IP").innerText = `MY Public IP ADDRESS : ${data.ip}`;
            var ip = data.ip;
            info(ip);
        })
}
IpAddress();


async function info(ip) {
    const lat = 16.5033382;
    const long = 80.6487529;
    
    navigationMap(lat,long);
    const apiurl = `https://ipinfo.io/${ip}?token=8e7a09cea7ce24`
    try {
        const response = await fetch(apiurl);
        const pin=520004;
        if (response.status !== 200)
            throw new Error("unable to fetch the data")
        const fetchdata = await response.json();
        console.log(fetchdata);
        
        const latElement= document.getElementById("lat").innerHTML = `Lat: ${fetchdata.loc}`
        const longElement= document.getElementById("long").innerHTML = `Long: ${fetchdata.loc}`
        document.getElementById("city").innerHTML = `City: ${fetchdata.city}`
        document.getElementById("reg").innerHTML = `Region: ${fetchdata.region}`
        document.getElementById("Org").innerHTML = `Organisation: ${fetchdata.org}`
        document.getElementById("Host").innerHTML = ` Hostname: ${fetchdata.org}`
        document.getElementById("time").innerHTML = `Time zone: ${fetchdata.timezone}`
        const pin_Code = document.getElementById("pin")
        pin_Code.innerHTML = `Pincode: ${fetchdata.postal}`
        
        postalData(pin);
    }

    catch (err) {
        console.log(err.message);
    }
}

function navigationMap(lat,long) {
    const dis = document.getElementById("targetFrame");

    dis.src = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`
  
    dis.style.width = "1200px"
    dis.style.height = "550px"
}

async function postalData(pin_Code) {
  
    const postalApi = `https://api.postalpincode.in/pincode/${pin_Code}`;

    try {
        const response = await fetch(postalApi);
        if (response.status !== 200)
            throw new Error("unable to fetch the Postal data")
        const data = await response.json();
        console.log(data);
        document.getElementById("pinmsg").innerHTML = `Message: ${data[0].Message}`
        document.getElementById("name1").innerHTML = `Name: ${data[0].PostOffice[0].Name}`
        document.getElementById("branchtype1").innerHTML = `Branch Type: ${data[0].PostOffice[0].BranchType}`
        document.getElementById("delivery1").innerHTML = `Delivery Status: ${data[0].PostOffice[0].DeliveryStatus}`
        document.getElementById("district1").innerHTML = `District: ${data[0].PostOffice[0].District}`
        document.getElementById("division1").innerHTML = `Division: ${data[0].PostOffice[0].Division}`
        
    
     document.getElementById("name2").innerHTML = `Name: ${data[0].PostOffice[1].Name}`
        document.getElementById("branchtype2").innerHTML = `Branch Type: ${data[0].PostOffice[1].BranchType}`
        document.getElementById("delivery2").innerHTML = `Delivery Status: ${data[0].PostOffice[1].DeliveryStatus}`
        document.getElementById("district2").innerHTML = `District: ${data[0].PostOffice[1].District}`
        document.getElementById("division2").innerHTML = `Division: ${data[0].PostOffice[1].Division}`
    }
    catch (err) {
        console.log(err.message);
    }
}
