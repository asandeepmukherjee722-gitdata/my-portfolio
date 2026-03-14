document.addEventListener("DOMContentLoaded",function(){
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click',function(){
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');

    });
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click',function(){
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.add('fa-times');

        });
    });
    const texts = ["Second year student","cse undergrad"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type(){
        const currentText = texts[textIndex];
        const typingElement = document.querySelector(".typing-text");
        if(isDeleting){
            typingElement.textContent = currentText.substring(0, charIndex-1);
            charIndex--;
            typingDelay = 50;
        }else{
            typingElement.textContent = currentText.substring(0, charIndex+1);
            charIndex++;
            typingDelay = 100;
        }
        if (!isDeleting && charIndex ===  currentText.length){
            isDeleting = true;
            typingDelay = 1500;
        }else if(isDeleting && charIndex === 0){
            isDeleting = false;
            textIndex = (textIndex+1) % texts.length;
            typingDelay = 500;
        }
        setTimeout(type,typingDelay);
    }
    setTimeout(type,1000);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click',function(e){
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior : 'smooth' 
                });

                
            }
        });
    });
    

});
const form = document.querySelector('.contact-form');

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.createElement("p"); // Create a status message
  const data = new FormData(event.target);
  
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your message! I'll get back to you soon.";
      status.style.color = "lightgreen";
      form.reset();
      form.appendChild(status);
    } else {
      status.innerHTML = "Oops! There was a problem submitting your form";
      status.style.color = "red";
      form.appendChild(status);
    }
  });
}

form.addEventListener("submit", handleSubmit);