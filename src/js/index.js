/* */



// Fetch stock data and create charts
fetch('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=t5XMgWtXf1pC4Zp4DKMlAhxOsKipUfsY')
    .then(response => response.json())
    .then(data => {
        const historicalData = data.historical.slice(0, 10); // Last 10 days
        const dates = historicalData.map(item => item.date); 
        const prices = historicalData.map(item => item.close); 
        const volumes = historicalData.map(item => item.volume);
        const changes = historicalData.map(item => item.change); 
        const high = historicalData.map(item => item.high); 
        const low= historicalData.map(item => item.low);  

        

        // Chart data for stock prices
        const priceChartData = {
            labels: dates, 
            datasets: [{
                label: 'Stock Price', 
                data: prices, 
                backgroundColor: 'rgba(254, 58,57)',
                borderColor: 'rgba(254, 40, 57)',
                borderWidth: 1,
            }]
        };
        

        const volumeChartData = {
            labels: dates, 
            datasets: [{
                label: '', 
                data: volumes, 
                borderWidth: 1,
            }]
        };

        // Chart data for changes in stock prices
        const changeChartData = {
            labels: dates,  
            datasets: [{
                label: 'Change Of The Stock',
                data: changes,
                borderWidth: 1,
            }]
        };

        // Chart data for trading volumes
        const highChartData = {
            labels: dates, 
            datasets: [{
                label: 'High Price', 
                data: high,
                backgroundColor: 'rgba(25, 54, 200,0.7)',
                borderColor: 'rgba(22, 50, 700,0.7)', 
                borderWidth: 1
            }]
        };

        const lowChartData = {
            labels: dates, 
            datasets: [{
                label: 'Low Price', 
                data: low, 
                backgroundColor: 'rgba(254, 58, 0.2,0.8)',
                borderColor: 'rgba(254, 40, 5,0.8)',
                borderWidth: 1
            }]
        };

        // Create charts
        createChart('stockChart', priceChartData, 'line');
        createChart('volumeChart',volumeChartData , 'pie');
        createChart('changeChart', changeChartData, 'doughnut');
        createChart('highChart', highChartData, 'bar');
        createChart('lowChart', lowChartData, 'bar');


    })
    .catch(error => console.error('Error fetching stock data:', error));

function createChart(canvasId, data, type) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    new Chart(ctx, {
        type: type,  
        data: data,
        options: {
            responsive: true, 
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false 
                }
            }
        }
    });
}



const sidebar = document.getElementById('sidebar');
const sidebarBtn = document.getElementById('sidebar-btn');

// Toggle sidebar visibility
sidebarBtn.onclick = function(event) {
    sidebar.classList.toggle('-translate-x-full');
    event.stopPropagation(); // Stop event bubbling to prevent sidebar from closing immediately
};

// Close sidebar when clicking outside of it
document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnSidebarBtn = sidebarBtn.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnSidebarBtn) {
        sidebar.classList.add('-translate-x-full');
    }
});
