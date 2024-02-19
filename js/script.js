// function to scroll to paribahan section
function scrollToParibahan() {
    const paribahan = document.getElementById('paribahan');
    paribahan.scrollIntoView({ behavior: 'smooth' });
}

/* ============= Utility Function ============= */

// check for duplicate
function isDupli(value) {
    const paras = document.querySelectorAll('#append-container > div > p');
    if(paras) {
        for(const para of paras) {
            if(para.innerText === value) {
                return true;
            }
        }
        return false;
    }
    else {
        return false;
    }
}



/* ============= MAIN CODE ============= */

const seatColumn = document.querySelectorAll('#seat-column p');
const seatAmount = document.getElementById('seat-amount');
const seatLeft = document.getElementById('seat-left');
const appendContainer = document.getElementById('append-container');
const totalPrice = document.getElementById('total-price');
const discountAmount = document.getElementById('discount-amount')
const couponBtn = document.getElementById('coupon-btn');
const couponInput = document.getElementById('coupon-input');
const couponCheckContainer = document.getElementById('coupon-check-container');
const grandTotal = document.getElementById('grand-total');
const nextButton = document.getElementById('next-button');

let seatCounter = 0;
let leftSeat = 40;

for (const seat of seatColumn) {
    seat.addEventListener('click', function (e) {

        //check if the element was clicked before or not
        if(!isDupli(seat.innerText)) {
            if(seatCounter < 4) {
                // color changes when clicked
                seat.style.backgroundColor = '#1DD100';
                seat.style.color = '#fff';
        
                // seat booking number increases
                seatCounter++;
                seatAmount.innerText = seatCounter;
        
                // amount of seats decreases
                leftSeat--;
                seatLeft.innerText = leftSeat;
        
                // append code
                const div = document.createElement('div');
                div.classList.add('flex', 'justify-between', 'mt-4', 'mb-4');
                div.innerHTML = `<p>${seat.innerText}</p>
                <p>Economy</p>
                <p>550</p>`;
                appendContainer.appendChild(div);
        
                // Total price calculation
                totalPrice.innerText = parseInt(totalPrice.innerText) + 550;

                // Grand total price calculation
                grandTotal.innerText = parseInt(grandTotal.innerText) + 550;

                // remove disable from coupon input & button
                if(seatCounter === 4) {
                    couponInput.removeAttribute('disabled');
                    couponBtn.removeAttribute('disabled');
                }

                // remove disable from next button
                nextButton.removeAttribute('disabled');
            }
            else {
                alert('You have reached seat limit!');
            }
        }
    })
}

couponBtn.addEventListener('click', function() {
    if(couponInput.value === 'NEW15') {
        let currPrice = parseInt(grandTotal.innerText);
        let discountedAmount = parseInt(currPrice * .15);
        let newTotal = currPrice - discountedAmount;
        grandTotal.innerText = newTotal;

        // discount section update & input field hide
        const item = document.querySelectorAll('#discount-amount span');
        item[0].innerText = 15;
        item[1].innerText = discountedAmount;
        discountAmount.classList.remove('hidden');
        couponCheckContainer.classList.add('hidden');

    }
    else if(couponInput.value === 'Couple 20') {
        let currPrice = parseInt(grandTotal.innerText);
        let discountedAmount = parseInt(currPrice * .20);
        let newTotal = currPrice - discountedAmount;
        grandTotal.innerText = newTotal;
        
        // discount section update & input field hide
        const item = document.querySelectorAll('#discount-amount span');
        item[0].innerText = 20;
        item[1].innerText = discountedAmount;
        discountAmount.classList.remove('hidden');
        couponCheckContainer.classList.add('hidden');
    }
    else {
        alert('Invalid Coupon Code!')
    }
})