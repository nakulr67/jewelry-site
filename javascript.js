// ============navbar js==============
$(document).ready(function () {
    $('#navbarNav').on('show.bs.collapse', function () {
        $('.navbar-toggler').attr('aria-expanded', 'true');
    });

    $('#navbarNav').on('hide.bs.collapse', function () {
        $('.navbar-toggler').attr('aria-expanded', 'false');
    });
});

// ======================hero section javascript============
const rings = document.querySelectorAll('.ring');

function getPositions() {
    if (window.innerWidth <= 768) {
        return {
            1: { top: '2%', left: '20%', transform: 'translateX(-50%) ' },
            2: { top: '15%', left: '50%', transform: 'translate(-50%, -50%) ' },
            3: { top: '1%', right: '10%', transform: 'translateX(30%) ' }
        };
    } else if (window.innerWidth <= 1024) { // iPad screens
        return {
            1: { top: '5%', left: '30%', transform: 'translateX(-50%)' },
            2: { top: '25%', left: '55%', transform: 'translate(-50%, -50%)' },
            3: { top: '5%', right: '15%', transform: 'translateX(30%)' }
        };
    } else {
        return {
            1: { top: 0, left: '50%', transform: 'translateX(-50%)' },
            2: { top: '50%', right: 0, left: '65%', transform: 'translate(100%, -50%) rotate(0deg)' },
            3: { top: '50%', left: 0, transform: 'translate(0, -50%) rotate(-0deg)' }
        };
    }
}

function rotateRings() {
    const positions = getPositions();

    rings.forEach(ring => {
        let currentPos = parseInt(ring.getAttribute('data-position'));
        let newPos = currentPos === 3 ? 1 : currentPos + 1;

        ring.style.top = positions[newPos].top;
        ring.style.left = positions[newPos].left;
        ring.style.right = positions[newPos].right;
        ring.style.transform = positions[newPos].transform;

        ring.setAttribute('data-position', newPos);
    });
}

document.querySelectorAll('.ring').forEach(ring => {
    ring.addEventListener('click', function () {
        rotateRings();

        const watermark = document.getElementById('dynamicWatermark');
        const vintageText = document.getElementById('vintageText');
        const ringEra = document.getElementById('ringEra');
        const title = document.getElementById('ringTitle');
        const price = document.getElementById('ringPrice');
        const description = document.getElementById('ringDescription');

        const productDetails = document.querySelector('.product-details');
        productDetails.classList.add('hidden');

        setTimeout(() => {
            const centerRing = Array.from(rings).find(r => r.getAttribute('data-position') === '2');

            watermark.textContent = centerRing.getAttribute('data-watermark');
            vintageText.textContent = centerRing.getAttribute('data-vintage-text');
            ringEra.textContent = centerRing.getAttribute('data-vintage-era');
            title.textContent = centerRing.getAttribute('data-name');
            price.textContent = `$${centerRing.getAttribute('data-price')}`;
            description.textContent = centerRing.getAttribute('data-description');

            productDetails.classList.remove('hidden');
        }, 500);
    });
});

window.addEventListener('resize', rotateRings);

// ===============Explore Loose Diamonds==============
const cards = document.querySelectorAll('.card1');
const dots = document.querySelectorAll('.dot');
let activeIndex = 0;

function updateCarousel() {
    cards.forEach((card, index) => {
        const offset = (index - activeIndex + cards.length) % cards.length;
        card.classList.remove('active', 'left', 'left-2', 'left-3', 'right', 'right-2', 'right-3');

        if (offset === 0) {
            card.classList.add('active');
        } else if (offset === 1 || offset === 2 || offset === 3) {
            card.classList.add(`right${offset > 1 ? '-' + offset : ''}`);
        } else {
            const leftOffset = cards.length - offset;
            card.classList.add(`left${leftOffset > 1 ? '-' + leftOffset : ''}`);
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function handleCardClick(clickedIndex) {
    const offset = clickedIndex - activeIndex;

    if (offset < -3 || offset > 3) {
        // For wrap-around logic
        activeIndex = clickedIndex;
    } else {
        // Move right if clicking left-side cards (positions 1-3)
        // Move left if clicking right-side cards (positions 5-7)
        activeIndex = clickedIndex;
    }

    updateCarousel();
}

function moveToCard(index) {
    activeIndex = index;
    updateCarousel();
}

// Add click event listeners to cards
cards.forEach((card, index) => {
    card.addEventListener('click', () => handleCardClick(index));
});

// Initialize carousel
updateCarousel();

