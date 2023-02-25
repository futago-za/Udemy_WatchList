'use strict'
{
    chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {}, (responseData) => {
            if (responseData) {
                const registerCourse = () => {
                    $('#btn').attr("disabled", true);
                    $('#right-col').append('<div id="loading" class="spinner-border text-primary float-end" role="status"><span class="visually-hidden>Loading...</span></div>');

                    const payload = {
                        "title": responseData.title,
                        "url": responseData.url,
                        "image_path": responseData.imagePath,
                        "total_time": responseData.fulltimeText,
                        "sort_order": 0,
                        "sections": responseData.sections
                    }

                    chrome.runtime.sendMessage({payload}, {}, (response) => {
                        $('#loading').remove();
                        $('#btn').remove();
                        if (response) {
                            $('#right-col').append('<p class="lead text-primary fw-bold">registered!</p>');
                        } else {
                            $('#right-col').append('<p class="lead text-danger fw-bold">Failed!</p>');
                        }
                    });
                }

                $('#result').append(`<h1 class="title">${responseData.title}</h1>`)
                $('#result').append('<div id="container" class="container"></div>');
                $('#container').append('<div id="row" class="row">');
                $('#row').append('<div id="left-col" class="col-6">');
                $('#row').append('<div id="right-col" class="col-6">');
                $('#left-col').append(`<img src="${responseData.imagePath}">`)
                $('#right-col').append(`<a href="${responseData.url}">リンク</a><br/>`)
                $('#right-col').append(`<p>セクションの数: ${responseData.sessionNum}</p>`)
                $('#right-col').append(`<p>レクチャーの数: ${responseData.lectureNum}</p>`)
                $('#right-col').append(`<p>総時間: ${responseData.fulltimeText}</p>`)
                $('#right-col').append('<button id="btn" type="button" class="btn btn-primary float-start">ウォッチリストに登録する</button>')
                $('#right-col').on('click', '#btn', registerCourse);
            } else {
                $('#result').append('<h1 class="text-danger">Error</h1>');
            }
        });
    });
}