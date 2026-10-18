/*
   MOBILE NAVIGATION */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("show");

});


/* Close mobile menu after clicking link */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

    });

});


/*
   DESTINATION FILTER */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const destinationCards =
    document.querySelectorAll(".destination-card");

const destinationFilter =
    document.getElementById("destinationFilter");


function filterDestinations() {

    const searchText =
        destinationFilter.value.toLowerCase();

    const activeButton =
        document.querySelector(".filter-btn.active");

    const selectedRegion =
        activeButton.dataset.region;


    destinationCards.forEach(function (card) {

        const name =
            card.dataset.name.toLowerCase();

        const region =
            card.dataset.region;


        const matchesSearch =
            name.includes(searchText);

        const matchesRegion =
            selectedRegion === "all" ||
            region === selectedRegion;


        if (matchesSearch && matchesRegion) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        filterDestinations();

    });

});


destinationFilter.addEventListener(
    "input",
    filterDestinations
);


/*
   FAVORITE BUTTON */

const heartButtons =
    document.querySelectorAll(".heart-btn");

heartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");

            button.textContent = "♡";

        } else {

            button.classList.add("liked");

            button.textContent = "♥";

        }

    });

});


/*
   HOTEL FILTER */

const hotelFilters =
    document.querySelectorAll(".hotel-filter");

const hotelCards =
    document.querySelectorAll(".hotel-card");


hotelFilters.forEach(function (button) {

    button.addEventListener("click", function () {

        hotelFilters.forEach(function (btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        const selectedType =
            button.dataset.type;


        hotelCards.forEach(function (card) {

            if (
                selectedType === "all" ||
                card.dataset.type === selectedType
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/*
   GALLERY LIGHTBOX */

const galleryItems =
    document.querySelectorAll(".gallery-item img");

const galleryModal =
    document.getElementById("galleryModal");

const modalImage =
    document.getElementById("modalImage");

const closeModal =
    document.getElementById("closeModal");

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");


let currentImage = 0;


function showGalleryImage(index) {

    if (index < 0) {

        index = galleryItems.length - 1;

    }

    if (index >= galleryItems.length) {

        index = 0;

    }

    currentImage = index;

    modalImage.src =
        galleryItems[currentImage].src;

    modalImage.alt =
        galleryItems[currentImage].alt;

}


galleryItems.forEach(function (image, index) {

    image.parentElement.addEventListener(
        "click",
        function () {

            currentImage = index;

            showGalleryImage(currentImage);

            galleryModal.classList.add("show");

        }
    );

});


galleryNext.addEventListener("click", function () {

    showGalleryImage(currentImage + 1);

});


galleryPrev.addEventListener("click", function () {

    showGalleryImage(currentImage - 1);

});


closeModal.addEventListener("click", function () {

    galleryModal.classList.remove("show");

});


galleryModal.addEventListener("click", function (event) {

    if (event.target === galleryModal) {

        galleryModal.classList.remove("show");

    }

});


/* Keyboard Gallery Controls */

document.addEventListener("keydown", function (event) {

    if (!galleryModal.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {

        galleryModal.classList.remove("show");

    }

    if (event.key === "ArrowRight") {

        showGalleryImage(currentImage + 1);

    }

    if (event.key === "ArrowLeft") {

        showGalleryImage(currentImage - 1);

    }

});


/*
   BOOK PACKAGE BUTTON */

const packageButtons =
    document.querySelectorAll(".book-package");

const bookingSection =
    document.getElementById("booking");

const bookingPackage =
    document.getElementById("bookingPackage");


packageButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const packageName =
            button.dataset.package;

        const price =
            button.dataset.price;


        if (packageName.includes("Bali")) {

            bookingPackage.value = "24999";

        } else if (packageName.includes("Dubai")) {

            bookingPackage.value = "39999";

        } else if (packageName.includes("Paris")) {

            bookingPackage.value = "74999";

        }


        updateTotal();

        bookingSection.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/*
   BOOKING PRICE CALCULATOR */

const travelers =
    document.getElementById("travelers");

const totalPrice =
    document.getElementById("totalPrice");


function updateTotal() {

    let people =
        parseInt(travelers.value);


    if (isNaN(people) || people < 1) {

        people = 1;

    }


    if (people > 20) {

        people = 20;

        travelers.value = 20;

    }


    const packagePrice =
        parseInt(bookingPackage.value);


    const total =
        packagePrice * people;


    totalPrice.textContent =
        "₹" + total.toLocaleString("en-IN");

}


travelers.addEventListener(
    "input",
    updateTotal
);

bookingPackage.addEventListener(
    "change",
    updateTotal
);


/*
   SET MINIMUM DATE */

const bookingDate =
    document.getElementById("bookingDate");

const heroDate =
    document.getElementById("heroDate");


const today =
    new Date().toISOString().split("T")[0];


bookingDate.min = today;

heroDate.min = today;


/*
   BOOKING FORM */

const bookingForm =
    document.getElementById("bookingForm");

const successModal =
    document.getElementById("successModal");

const successText =
    document.getElementById("successText");

const closeSuccess =
    document.getElementById("closeSuccess");


bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const destination =
            document.getElementById(
                "bookingDestination"
            ).value;

        const people =
            document.getElementById(
                "travelers"
            ).value;


        successText.textContent =
            `Thank you ${name}! Your ${destination} trip for ${people} traveler(s) has been submitted successfully.`;


        successModal.classList.add("show");


        bookingForm.reset();

        travelers.value = 1;

        updateTotal();

    }
);


closeSuccess.addEventListener(
    "click",
    function () {

        successModal.classList.remove("show");

    }
);


successModal.addEventListener(
    "click",
    function (event) {

        if (event.target === successModal) {

            successModal.classList.remove("show");

        }

    }
);


/*
   FAQ ACCORDION */

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const currentItem =
            question.parentElement;


        document
            .querySelectorAll(".faq-item")
            .forEach(function (item) {

                if (item !== currentItem) {

                    item.classList.remove("open");

                    item.querySelector(
                        ".faq-question span"
                    ).textContent = "+";

                }

            });


        currentItem.classList.toggle("open");


        const icon =
            question.querySelector("span");


        if (currentItem.classList.contains("open")) {

            icon.textContent = "−";

        } else {

            icon.textContent = "+";

        }

    });

});


/*
   HERO SEARCH */

const heroSearchBtn =
    document.getElementById("heroSearchBtn");


heroSearchBtn.addEventListener(
    "click",
    function () {

        const search =
            document
                .getElementById(
                    "destinationSearch"
                )
                .value
                .trim();


        if (search === "") {

            document
                .getElementById(
                    "destinations"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

            return;

        }


        destinationFilter.value =
            search;


        document
            .getElementById(
                "destinations"
            )
            .scrollIntoView({
                behavior: "smooth"
            });


        filterDestinations();

    }
);


/*
   BACK TO TOP */

const topBtn =
    document.getElementById("topBtn");


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});


topBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/*
   ACTIVE NAVIGATION */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener("scroll", function () {

    let current = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 120;


        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/*
   INITIAL PRICE */

updateTotal();