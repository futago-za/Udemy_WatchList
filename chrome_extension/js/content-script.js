chrome.runtime.onMessage.addListener((request, sender, callback) => {
    const showMoreButton = document.querySelector(".curriculum--curriculum-show-more--1UKkv");
    if (showMoreButton) {
        showMoreButton.click();
    }

    const imagePath = document.querySelector("[class^='intro-asset--img-aspect--']").childNodes[0].src;

    const title = document.querySelector(".clp-lead__title").innerText;
    const url = location.href;
    const courseInfo = document.querySelector("[class^='curriculum--content-length--']").innerHTML;
    const sessionNum = courseInfo.match(/セクションの数: ([0-9]+)/)[1];
    const lectureNum = courseInfo.match(/レクチャーの数: ([0-9]+)/)[1];
    const fulltimeText = courseInfo.match(/総時間: <span>(.+)<\/span><\/span>/)[1];

    const sections = [];
    const sectionsSpans = document.querySelectorAll(".ud-accordion-panel-title");
    for(let item of sectionsSpans) {
        if (item.childNodes.length !== 2) continue;
        const sectionTitle = item.childNodes[0].innerText;
        const content = item.childNodes[1].innerHTML;
        const lectureNumInSection = content.match(/(.+)個のレクチャー/)[1];
        const timeText = content.match(/<span>(.+)<\/span>/)[1];
        sections.push({ title: sectionTitle, total_lecture: lectureNumInSection, total_time: timeText})
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