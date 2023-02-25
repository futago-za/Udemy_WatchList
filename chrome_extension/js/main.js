'use strict'

chrome.storage.sync.get(['hostname', 'port'], (result) => {
    $("#hostname").val(result.hostname);
    $("#port").val(result.port);
});

chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {}, (responseData) => {
        if (responseData) {
            const registerCourse = () => {
                $('#btn').attr("disabled", true);
                $('#container').append('<div id="loading" class="spinner-border text-primary float-end" role="status"><span class="visually-hidden>Loading...</span></div>');

                const hostname = $("#hostname").val();
                const port = $("#port").val();

                const payload = {
                    "title": responseData.title,
                    "url": responseData.url,
                    "image_path": responseData.imagePath,
                    "total_time": responseData.fulltimeText,
                    "sort_order": 0,
                    "sections": responseData.sections
                };

                chrome.runtime.sendMessage({hostname, port, payload}, {}, (response) => {
                    $('#loading').remove();
                    $('#btn').remove();
                    if (response) {
                        $('#container').append('<p class="lead text-primary fw-bold">registered!</p>');
                    } else {
                        $('#container').append('<p class="lead text-danger fw-bold">Failed!</p>');
                    }
                });
                chrome.storage.sync.set({ hostname, port })
            }

            let button = document.getElementById('btn');
            button.addEventListener('click', registerCourse);
        } else {
            $('#result').append('<h1 class="text-danger">Error</h1>');
        }
    });
});
