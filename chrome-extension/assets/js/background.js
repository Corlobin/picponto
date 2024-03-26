chrome.alarms.create("checkTime", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "checkTime") {
        chrome.storage.local.get(['startTime', 'endTime'], function(result) {
            const now = new Date();
            const startTime = new Date();
            const endTime = new Date();
            let message = '';
            
            const [startHours, startMinutes] = result.startTime.split(':');
            const [endHours, endMinutes] = result.endTime.split(':');
            
            startTime.setHours(startHours, startMinutes, 0);
            endTime.setHours(endHours, endMinutes, 0);

            console.log(now);
            console.log(startTime);
            console.log(new Date(now.getTime() + 60000));
            console.log(endTime);

            if (now < startTime && new Date(now.getTime() + 60000) >= startTime) {
                message = 'A hora de bater o ponto para a entrada esta chegando.\nClique Aqui';
            } else if (now >= startTime && now <= new Date(startTime.getTime() + 60000)) {
                message = 'Lembre-se de bater o ponto de entrada.\nClique Aqui';
            } else if (now < endTime && new Date(now.getTime() + 60000) > endTime) {
                message = 'Lembre-se de bater o ponto da saída.\nClique aqui';
            }

            if(message){
                const notificationOptions = {
                    type: 'basic',
                    iconUrl: '/icon48.png',
                    title: 'PicPonto',
                    message: message,
                    requireInteraction: true
                };
                chrome.notifications.create(null, notificationOptions, function(notificationId) {
                    chrome.notifications.onClicked.addListener(function(clickedNotificationId) {
                        if (clickedNotificationId === notificationId) {
                            chrome.tabs.create({ url: "https://adp.picpay.com" });
                        }
                    });
                });
            }

        });
    }
});