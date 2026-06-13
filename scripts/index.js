// const { createElement } = require("react");

const lessonLevels = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then( res => res.json())
    .then( lesson => displayLevels(lesson.data))
}

const loadLevelWord = (id) => {
    const url =`https://openapi.programming-hero.com/api/level/${id}`;
    fetch (url)
    .then( res => res.json() )
    .then( word => displayLevelWords(word.data) )
} 

const displayLevelWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    
    words.forEach( (word) => {
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
            <div class="rounded-xl px-5 py-10 text-center bg-white space-y-5  ">
                <h2 class="font-bold text-3xl">${word.word}</h2>
                <p class=" font-medium  text-xl text-">Meaning /Pronunciation</p>
                <div class="font-bangla text-3xl font-semibold text-[#18181B] ">
                    "${word.meaning} / ${word.pronunciation}"
                </div>
                <div class="icons flex justify-between ">
                    <div class="bg-[#1a90ff15] hover:bg-[#1a90ff80] p-4 rounded-xl"><i class="fa-solid fa-circle-info text-2xl"></i></div>
                    <div class="bg-[#1a90ff15] hover:bg-[#1a90ff80] p-4 rounded-xl"><i class="fa-solid fa-volume-high text-2xl"></i></div>
                </div>
            </div>
        `
    wordContainer.append(wordCard);
   });
}


const displayLevels = (levels) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for(let level of levels) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button onclick = "loadLevelWord(${level.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>
                Lesson - ${level.level_no}
            </button>
        `

        levelContainer.append(btnDiv)
    }
}

lessonLevels();