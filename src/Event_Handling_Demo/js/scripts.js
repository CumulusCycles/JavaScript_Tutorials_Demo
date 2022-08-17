"use strict";

let theForm = document.getElementById('theForm');
let userName = document.getElementById('userName');
let password = document.getElementById('password');
let confirm = document.getElementById('confirm');
let age = document.getElementById('age');
let msg = document.getElementById('msg');

window.onload = function() {
    function valid() {
        let isValid = true;
        
        if (password.value != confirm.value) {
            msg.innerHTML = 'Passwords must match.'
            confirm.value = '';
            confirm.focus();
            isValid = false;
        }
        
        return isValid; 
    }

    userName.addEventListener('blur', function(e) {
        if (this.value.trim() == '') {
            msg.innerHTML = 'User Name is required.';
            this.focus();
        } else {
            msg.innerHTML = '';
        }
    });

    age.addEventListener("input", function () {
        if (!this.validity.valid) {
            if (this.validity.rangeOverflow) {
                msg.innerHTML = 'Age is too high.';
            } else if (this.validity.rangeUnderflow) {
                msg.innerHTML = 'Age is too low.';
            } // else ignore because age is valid
        } else{
            msg.innerHTML = '';
        }
    });

    theForm.addEventListener('submit', function(e) {
        // prevent form from submitting
        e.preventDefault();
    
        if (valid()) {
            alert('Registration confirmed!');
            msg.innerHTML = '';
            this.reset();
        }
    });

    theForm.addEventListener('reset', function(e) {
        userName.focus();
    });
}