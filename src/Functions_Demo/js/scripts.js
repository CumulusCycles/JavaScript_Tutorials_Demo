"use strict";

/*
    * This fuction displays the dots on the page.
    *
    * @param   pointsArray - Array containing the [top,left] dot positions
    * @param   colorsArray - Array of Colors
    * @param   maxDots     - max number of Array elements
    */
function displayDots(pointsArray, colorsArray, maxDots) {
    let container = document.getElementById('container');
    container.innerHTML = "";

    for (let i = 0; i < maxDots; i++) {
        // get current element from the Array
        let element = pointsArray[i]; 
        let top     = element[0];     // first element in Array
        let left    = element[1];     // second element
        
        // get color
        let color = colorsArray[i];

        // create new div element
        let dot = document.createElement('div');

        // assign attribute prop to new div element
        dot.id = "dot_" + i;
        dot.style.top  = top + "px";
        dot.style.left = left + "px";
        dot.className = "dot";
        dot.style.backgroundColor = color;

        // create new textNode
        let txtNode = document.createTextNode(i + 1);

        // add textNode to div
        dot.appendChild(txtNode);

        // add new div element to the container element
        container.appendChild(dot);
    }
}

/*
    * This fuction populates the pointsArray top/left positions
    * for the number of dots passed in the maxDots param.
    *
    * @param   maxDots     - max number of Array elements
    * @return  dotsArray   - Array containing maxDots number of [top, left] positions in Array
    */
function getDots(maxDots) {
    let dotsArray = [];
    const TOP_MAX   = 250;
    const LEFT_MAX  = 1000;

    for (let i = 0; i < maxDots; i++) {
        let top  = Math.floor((Math.random() * TOP_MAX));
        let left = Math.floor((Math.random() * LEFT_MAX));

        dotsArray.push([top, left]);
    }

    return dotsArray;
}


/*
    * This fuction generates random colors
    *
    * @param   maxDots     - max number of Array elements
    * @return  colorsArray - Array containing colors
    */
function getColors(maxDots) {
    let colorsArray = [];
    let MAX = 255;

    for (let i = 0; i < maxDots; i++) {
        let r = Math.floor((Math.random() * MAX));
        let g = Math.floor((Math.random() * MAX));
        let b = Math.floor((Math.random() * MAX));

        let color = 'rgb(' + r + ',' + g + ',' + b + ')';

        colorsArray.push(color);
    }

    return colorsArray;
}

/*
    * This function generates a random number up between 1 and the max param limit
    * and returns it to the calling function.
    * 
    * @param   max - max value of random numbers
    * @return  the random generated number
    */
function getMaxDots(max) {
    return Math.floor(Math.random() * max + 1);
}


/*
    * This is the main processing fuction.
    *
    * @param   maxDots - Random number indicating how many dots to display on page
    */
function process(maxDots) {
    let pointsArray = [];
    let colorsArray = [];
    console.log('maxDots: ' + maxDots);

    // call function to populate the pointsArray with position of dots to be displayed
    pointsArray = getDots(maxDots);
    console.log('pointsArray:');
    console.log(pointsArray);

    // call function to populate the colorsArray with random r/g/b values
    colorsArray = getColors(maxDots);
    console.log('colorsArray:');
    console.log(colorsArray);
    
    // call function to display dots in the pointsArray on the page
    displayDots(pointsArray, colorsArray, maxDots);
}


/*
    * Call process() function to start processing,
    * passing a random number to indicate how many dots to display on the page.
    */
window.onload = function() {
    const MAX = 100;
    const TIMER_INTERVAL = 3000;
    process(getMaxDots(MAX)); // calls getMaxDots() function, and passes the value retuned to the process() function

    const mylet = setInterval(myTimer, TIMER_INTERVAL);
    function myTimer() {
        console.clear();
        process(getMaxDots(MAX)); // calls getMaxDots() function, and passes the value retuned to the process() function
    }
}
