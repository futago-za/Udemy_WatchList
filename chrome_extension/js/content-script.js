console.log("content script");

chrome.runtime.onMessage.addListener((request, sender, callback) => {
    let showMoreButton = document.querySelector(".curriculum--curriculum-show-more--1UKkv");
    if (showMoreButton) {
        showMoreButton.click();
    }

    let imagePath = document.querySelector("[class^='intro-asset--img-aspect--']").childNodes[0].src;

    let title = document.querySelector(".clp-lead__title").innerText;
    let url = location.href;
    let courseInfo = document.querySelector("[class^='curriculum--content-length--']").innerHTML;
    let sessionNum = courseInfo.match(/セクションの数: ([0-9]+)/)[1];
    let lectureNum = courseInfo.match(/レクチャーの数: ([0-9]+)/)[1];
    let fulltimeText = courseInfo.match(/総時間: <span>(.+)<\/span><\/span>/)[1];

    let sections = [];
    let sectionsSpans = document.querySelectorAll(".ud-accordion-panel-title");
    for(let item of sectionsSpans) {
        if (item.childNodes.length !== 2) continue;
        let sectionTitle = item.childNodes[0].innerText;
        let timeText = item.childNodes[1].innerHTML.match(/<span>(.+)<\/span>/)[1];
        sections.push({ title: sectionTitle, time: timeText})
    }

    callback({
        url,
        title,
        imagePath,
        sessionNum,
        lectureNum,
        fulltimeText,
        sections
    });
    return true;
})