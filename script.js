//Select id hamburger-menu,exit-button, class vertical-navbar-links
var verticalnavbarlinks=document.querySelector(".vertical-navbar-links")
var hamburgermenu=document.getElementById("hamburger-menu")
var exitbutton=document.getElementById("exit-button")

hamburgermenu.addEventListener("click",function(event){
    event.preventDefault()
    verticalnavbarlinks.style.left="0"
})
exitbutton.addEventListener("click",function(event){
    event.preventDefault()
    verticalnavbarlinks.style.left="-300px"
})

//To change image while hover in product descrption page.
//Select id descp-img-1,descp-img-2,descp-img-3,descp-img-4 and class main-img



//To open and close cart 
//select the id cart-open,cart-exit,cart-open-vertical class cart-main-container

var cartopen=document.getElementById("cart-open")
var cartopenvertical=document.getElementById("cart-open-vertical")
var cartexit=document.getElementById("cart-exit")
var cartmaincontainer=document.querySelector(".cart-main-container")

cartopen.addEventListener("click",function(event){
    event.preventDefault()
    cartmaincontainer.style.right="0"
})
cartopenvertical.addEventListener("click",function(event){
    event.preventDefault()
    cartmaincontainer.style.right="0"
})
cartexit.addEventListener("click",function(){
    cartmaincontainer.style.right="-300px"
})

//CART CODE

document.addEventListener("DOMContentLoaded",loadinfo);

function loadinfo(){
    loadContent();
}

function loadContent(){
    //remove items from cart
    var trashitems=document.querySelectorAll("#items-trash")
    trashitems.forEach((btn)=>{
        btn.addEventListener('click',removedata);
    });

    //product item number change event
    var qtyelements=document.querySelectorAll(".qty-product")
    qtyelements.forEach((input)=>{
        input.addEventListener('change',qtychange);
    });

    //Add Product
    var addcart=document.querySelectorAll(".section3-shop-button");
    addcart.forEach((btn)=>{
        btn.addEventListener('click',addcartitems);
    });

    addtotal();
    
}


//remove data

function removedata(){
    if(confirm('Are you sure to remove!')){
        let pdttitle=this.parentElement.querySelector('.pdt-cart-title').innerHTML;
        itemlist=itemlist.filter(el=>el.pdttitle!=pdttitle)
        this.parentElement.remove()
        loadContent()
    }
}

//change quantity

function qtychange(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}
 var itemlist=[];

//add cart items
function addcartitems(){
    var product=this.parentElement.parentElement;
    var pdttitle=product.querySelector('.product-title').innerHTML;
    var pdtcost=product.querySelector('.product-price').innerHTML;
    var imgsrc=product.querySelector('.pdt-image').src;
    var newproduct={pdttitle,pdtcost,imgsrc}
    //check pdt already exist
    if(itemlist.find((el)=>el.pdttitle==newproduct.pdttitle)){
        alert("pdt already in cart!")
        return;
    }else{
        itemlist.push(newproduct)
    }
    var newpdt=createcartpdt(pdttitle,pdtcost,imgsrc);
    var element=document.createElement("div")
    element.innerHTML=newpdt;
    var cartbasket=document.querySelector(".cart-main-container")
    cartbasket.append(element);
    loadContent();
    
    
}

//function to create cartpdt

function createcartpdt(pdttitle,pdtcost,imgsrc){
    return `<div class="cart-container">
        <div class="cart-img">
            <img src="${imgsrc}" alt="">
        </div>
        <div class="cart-text">
            <h2 class="pdt-cart-title">${pdttitle}</h2>
            <h4 class="pdt-cost">${pdtcost}</h4>
            <input type="number" value="1" class="qty-product">
        </div>
        <i class="fa-solid fa-trash" id="items-trash"></i>
    </div>`
    

}


//to add total

function addtotal(){
    const cartitems=document.querySelectorAll(".cart-container")
    const totalval=document.querySelector(".total-price")

    let total=0
    cartitems.forEach(product=>{
        let priceelement=product.querySelector(".pdt-cost")
        let price=parseFloat(priceelement.innerHTML.replace("$",""))
        let qtycal=product.querySelector(".qty-product").value
        total+=(price*qtycal)
    })
    totalval.innerHTML='Total Amount=$'+total

    //to increase cart count

    var cartverticalcount=document.querySelector(".cart-vertical-count")
    let countvertical=itemlist.length
    cartverticalcount.innerHTML=countvertical
    
    var cartcount=document.querySelector(".cart-count")
    let count=itemlist.length
    cartcount.innerHTML=count
}

//Search functionality

var searchmain=document.querySelector(".products-search")
var search=document.getElementById("search-items")
var pdtlist=searchmain.querySelectorAll(".section3-image")

search.addEventListener("keyup",function(){
    var enteredvalue=event.target.value.toUpperCase()

    for(count=0;count<pdtlist.length;count=count+1){
        var pdtname=pdtlist[count].querySelector("h3").textContent
        
        if(pdtname.toUpperCase().indexOf(enteredvalue)<0)
        {
            pdtlist[count].style.display="none"
        }
        else{
            pdtlist[count].style.display="block"
        }
    }
})