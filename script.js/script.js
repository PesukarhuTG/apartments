const homeImageContainer = document.querySelector('.home-image');
const floorImages = homeImageContainer.querySelectorAll('path');
const buttonUp = document.querySelector('.counter-up');
const buttonDown = document.querySelector('.counter-down');
const counter = document.querySelector('.counter');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal-close-button');
const modalCounter = document.querySelector('.modal-counter');
const buttonViewFlats = document.querySelector('.view-flats');

let currentFloor = 2;
let allFloorNumber = floorImages.length; //17

//hide an inactive floor image
const hideFloorImg = (num, direction) => {
    floorImages[num - 2].removeAttribute('style'); //delete opacity=1

    if (direction === 'up') {
        if (num === 2) {
            floorImages[allFloorNumber - 1].removeAttribute('style');
        }
    } else if (direction === 'down') {
        if (num === allFloorNumber + 1) {
            floorImages[0].removeAttribute('style');
        }
    }
};

function showCurrentData(num = 2) {
    counter.textContent = (currentFloor < 10) ? `0${currentFloor}` : currentFloor;
    floorImages[num - 2].style.opacity = 1; //show an active floor image
}

// choose the floor by mouse clicking
homeImageContainer.addEventListener('mouseover', e => {
    hideFloorImg(currentFloor);

    if (e.target.closest('path')) {
        currentFloor = e.target.dataset.floor;
        showCurrentData(currentFloor);
    }
})

buttonUp.addEventListener('click', () => {
    if (currentFloor < allFloorNumber + 1) {
        hideFloorImg(currentFloor, 'up'); //example, hide 2
        ++currentFloor; //3
        showCurrentData(currentFloor); //show 3
    } else {
        currentFloor = 2;
        hideFloorImg(currentFloor, 'up'); //hide 18
        showCurrentData(currentFloor); // show 2
    }
})

buttonDown.addEventListener('click', () => {
    if (currentFloor > 2) {
        hideFloorImg(currentFloor, 'down'); //example, hide 5
        --currentFloor; //4
        showCurrentData(currentFloor); //show 4
    } else {
        currentFloor = allFloorNumber + 1;
        hideFloorImg(currentFloor, 'down'); //hide 2
        showCurrentData(currentFloor); //show 18
    }
})

//open a modal window
floorImages.forEach(item => {
    item.addEventListener('click', e => {
        modal.classList.toggle('is-open');
        modalCounter.textContent = e.target.dataset.floor;
    })
})

modalCloseButton.addEventListener('click', () => {
    modal.classList.toggle('is-open');
})

buttonViewFlats.addEventListener('click', () => {
    modalCounter.textContent = currentFloor;
    modal.classList.toggle('is-open');

})

showCurrentData();