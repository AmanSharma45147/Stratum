// Ensure the "Let's Get Started" button navigates to the dashboard
document.getElementById('started').addEventListener('click', function () {
    window.location.href = 'dashboard.html';
});


// Selecting all sections
const sections = document.querySelectorAll('.scroll-section');
let currentSection = 0;

// Show the first section initially
sections[currentSection].style.opacity = 1;

// Scroll behavior
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) { // Scrolling down
        if (currentSection < sections.length - 1) {
            // Hide the current section
            sections[currentSection].style.opacity = 0;

            // Show the next section
            currentSection++;
            sections[currentSection].style.opacity = 1;
        }
    } else if (event.deltaY < 0) { // Scrolling up
        if (currentSection > 0) {
            // Hide the current section
            sections[currentSection].style.opacity = 0;

            // Show the previous section
            currentSection--;
            sections[currentSection].style.opacity = 1;
        }
    }
});

// Trigger animations on scroll and on page load
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', () => {
    handleScrollAnimations();
});

// Smooth scrolling to next section on wheel scroll
let isScrolling = false;

window.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    isScrolling = true;

    const scrollSections = document.querySelectorAll('.scroll-section');
    const currentSectionIndex = Array.from(scrollSections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });

    if (event.deltaY > 0 && currentSectionIndex < scrollSections.length - 1) {
        scrollSections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        scrollSections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
        isScrolling = false;
    }, 1000); // Duration of scroll animation
});


// Connect wallet and enable Mine button if wallet connects successfully
document.getElementById('connect-wallet').addEventListener('click', async function () {
    try {
        const isConnected = await connectWallet(); // Defined in wallet.mjs

        if (isConnected) {
            console.log('Wallet connected!');
            // Update UI (optional)
            document.getElementById('wallet-status').innerText = 'Connected';
            // Enable Mine button (if necessary)
            document.getElementById('mine-btn').disabled = false;
        } else {
            console.error('Failed to connect wallet');
            // Handle connection failure (optional)
            alert('Failed to connect wallet. Please try again.');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        // Handle errors (optional)
        alert('An error occurred while connecting wallet.');
    }
});

async function connectWallet() {
    // ... existing code for wallet setup (myNearWallet, selector)

    // Trigger wallet selection modal
    const isConnected = await selector.signIn();

    return isConnected;
}

// Mine button functionality
document.getElementById('mine-btn').addEventListener('click', () => {
    const minedAmount = (Math.random() * 10).toFixed(2);
    document.getElementById('crypto-mined').innerText = minedAmount;

    // Log mined crypto in activity log
    const activityList = document.getElementById('activity-list');
    const newItem = document.createElement('li');
    newItem.innerText = `Mined ${minedAmount} Stratum`;
    activityList.appendChild(newItem);
});

// Claim button functionality
document.getElementById('claim-btn').addEventListener('click', async function () {
    const minedAmount = document.getElementById('crypto-mined').innerText;

    if (minedAmount && minedAmount !== "000000000000") {
        try {
            // Simulate transfer by sending mined amount to wallet
            const success = await transferToWallet(minedAmount);

            if (success) {
                alert(`Successfully claimed ${minedAmount} Stratum to wallet!`);
                document.getElementById('crypto-mined').innerText = "000000000000"; // Reset mined amount
            } else {
                alert('Claim failed, please try again.');
            }
        } catch (error) {
            console.error('Failed to claim mined crypto:', error);
        }
    } else {
        alert('No mined crypto to claim.');
    }
});

// Function to simulate crypto transfer to wallet
async function transferToWallet(amount) {
    console.log(`Transferring ${amount} Stratum to wallet...`);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Transferred ${amount} Stratum to wallet`);
            resolve(true);
        }, 1000); // Simulate network delay
    });
}
