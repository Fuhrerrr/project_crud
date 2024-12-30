document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donation-form');
    const donors = []; // Array to store donor information

  
    // Function to render the donor list
    function renderDonorList() {
      const topDonorsBody = document.getElementById('top-donors-body');
      topDonorsBody.innerHTML = ''; // Clear existing rows
  
      donors.forEach((donor, index) => {
        const row = document.createElement('tr');
        row.classList.add('donor-row');
        if (index >= 10) row.classList.add('hidden'); // Hide rows beyond top 10
  
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${donor.name}</td>
          <td>${donor.amount} DH</td> <!-- Display amount with DH -->
          <td>${donor.association}</td>
        `;
        topDonorsBody.appendChild(row);
      });
  
      // Show or hide the "Show More" button based on the number of donors
      const showMoreBtn = document.getElementById('show-more-btn');
      if (donors.length > 10) {
        showMoreBtn.style.display = 'block';
      } else {
        showMoreBtn.style.display = 'none';
      }
    }
  
    // Function to toggle the visibility of donor rows
    window.toggleDonorList = function() {
      const hiddenRows = document.querySelectorAll('.donor-row.hidden');
      const showMoreBtn = document.getElementById('show-more-btn');
  
      hiddenRows.forEach(row => {
        row.classList.toggle('hidden');
      });
  
      // Update button text based on visibility
      if (showMoreBtn.innerText === 'Show More') {
        showMoreBtn.innerText = 'Show Less';
      } else {
        showMoreBtn.innerText = 'Show More';
      }
    };
  
    // Handle form submission
    donationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const donorName = document.getElementById('donor-name').value;
      const donationAmount = parseFloat(document.getElementById('donation-amount').value);
      const associationSelect = document.getElementById('association');
      const associationValue = associationSelect.value;
      const associationText = associationSelect.options[associationSelect.selectedIndex].text;
  
      // Add new donor to the array
      donors.push({
        name: donorName,
        amount: donationAmount.toFixed(2), // Ensure two decimal places
        association: associationText
      });
  
      // Sort donors by amount in descending order
      donors.sort((a, b) => b.amount - a.amount);
  
      // Re-render the donor list
      renderDonorList();
  
      // Clear the form
      donationForm.reset();
  
      // Redirect to the appropriate association page
      switch (associationValue) {
        case 'ataa':
          window.location.href = 'ATAA.html';
          break;
        case 'rawae':
          window.location.href = 'RAWAE.html';
          break;
        case 'yatimi':
          window.location.href = 'YATIMI.html';
          break;
        default:
          // If no valid association is selected, stay on the current page
          break;
      }
    });
  
    // Initial render
    renderDonorList();
    renderList();
  });
  