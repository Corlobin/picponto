chrome.alarms.create("checkTime", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "checkTime") {
        chrome.storage.local.get(['startTime', 'endTime'], function(result) {
            const now = new Date();
            const startTime = new Date();
            const endTime = new Date();
            
            const [startHours, startMinutes] = result.startTime.split(':');
            const [endHours, endMinutes] = result.endTime.split(':');
            
            startTime.setHours(startHours, startMinutes, 0);
            endTime.setHours(endHours, endMinutes, 0);

            const notificationOptions = {
                type: 'basic',
                iconUrl: '/icon48.png',
                title: 'PicPonto',
                message: 'Lembre de bater o ponto',
                requireInteraction: true
            };
            console.log(now);
            console.log(startTime);
            console.log(new Date(now.getTime() + 60000));
            console.log(endTime);

            if (now < startTime && new Date(now.getTime() + 60000) >= startTime) {
                notificationOptions.message = 'A hora de bater o ponto para a entrada esta chegando.';
            } else if (now >= startTime && now <= new Date(startTime.getTime() + 60000)) {
                notificationOptions.message = 'Lembre-se de bater o ponto de entrada.';
            } else if (now < endTime && new Date(now.getTime() + 60000) > endTime) {
                notificationOptions.message = 'Lembre-se de bater o ponto da saída.';
            }

            chrome.notifications.create(null, notificationOptions, function(notificationId) {
                // Adiciona um evento de clique à notificação após a criação
                chrome.notifications.onClicked.addListener(function(clickedNotificationId) {
                    if (clickedNotificationId === notificationId) {
                        // Abre a URL desejada em uma nova aba
                        chrome.tabs.create({ url: "https://adp.picpay.com" });
                    }
                });
            });
        });
    }
});