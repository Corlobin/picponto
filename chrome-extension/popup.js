document.getElementById('saveButton').addEventListener('click', () => {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    chrome.storage.local.set({startTime, endTime}, () => {
        window.close();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['startTime', 'endTime'], function(result) {
        if (result.startTime) {
            document.getElementById('startTime').value = result.startTime;
        }
        if (result.endTime) {
            document.getElementById('endTime').value = result.endTime;
        }
    });
});