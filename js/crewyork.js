const els = document.getElementsByClassName("social-item");

Array.prototype.forEach.call(els, function(el) {
    el.addEventListener("mouseover", function(e) {
        e.target.getElementsByTagName('i')[0].classList.add("fa-bounce");;
        
    });
    el.addEventListener("mouseout", function(e) {
        e.target.getElementsByTagName('i')[0].classList.remove("fa-bounce");;
    });
})
