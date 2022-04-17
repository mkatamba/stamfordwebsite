var openingTimesInfo = document.getElementById("OpeningTimesInfo");
//openingTimesInfo.style.display = "none";

const OpeningTimes = document.querySelectorAll(".OpeningTime");

OpeningTimes.forEach(function(OpeningTime) {
    OpeningTime.innerHTML = "Closed";
});

const TopNav = document.querySelector(".TopNav");

TopNav.innerHTML = `
    <ul>
    <li><a href="index.html"><i class="fas fa-home"></i> HOME</a></li>
    <li><a href="food.html"><i class="fas fa-utensils"></i> FOOD & DRINK</a></li>
    <li><a href="places.html"><i class="fas fa-city"></i> PLACES TO VISIT</a></li>
    <li><a href="history.html"><i class="fas fa-history"></i> HISTORY</a></li>
    <li><a href="things.html"><i class="fas fa-users"></i> THINGS TO DO</a></li>
    <li><a href="contact.html"><i class="fas fa-comment"></i> CONTACT US</a></li>
    <li><a href="video.html"><i class="fa-solid fa-video"></i> CAPTURE A MOMENT</a></li>
    <li class="icon">
        <a id="MenuToggleButton" href="#" class="iconButton">
            <i class="fas fa-bars"></i>
        </a>
    </li>
    </ul>`;


const GridItems = document.querySelectorAll(".GridItem");
GridItems.forEach(function(GridItem) {
    if(GridItem.innerHTML.indexOf("loyalty") !== -1) {
        GridItem.addEventListener("mouseover", showHackedAlert, false);
    }
});

function showHackedAlert() {
    alert("Our rewards scheme has been hacked and all your points have been lost. Please contact 0191 1234567 and provide your account details ASAP!");
}