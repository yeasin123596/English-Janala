// const { createElement } = require("react");

const lessonLevels = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then( res => res.json())
    .then( lesson => displayLevels(lesson.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url =`https://openapi.programming-hero.com/api/level/${id}`;
    fetch (url)
    .then( res => res.json() )
    .then( word => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWords(word.data)
    } )
} 

const loadWordDetail= async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);

}

const displayWordDetails = (word) => {
    const detailBox = document.getElementById("details-container");
    detailBox.innerHTML =` 
                <div>
                    <h2 class="text-2xl font-bold ">
                        ${word.word}(<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})
                    </h2>
                </div>
                <div>
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2 class="font-bold font-bangla">সমার্থক শব্দ গুলো</h2>
                    <span>Syn1</span>
                    <span>Syn2</span>
                    <span>Syn3</span>
                </div>
    
    `;
    document.getElementById("word_modal").showModal();
}

const displayLevelWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if( words.length == 0) {
        wordContainer.innerHTML = `
            <div class="text-center  col-span-full space-y-6 p-10">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-[#292524] text-4xl font-medium font-bangla">নেক্সট Lesson এ যান</h2>
            </div>
        `;
        return;
    }
    
    words.forEach( (word) => {
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
            <div class="rounded-xl px-5 py-10 text-center bg-white space-y-5  ">
                <h2 class="font-bold text-3xl">${
                    word.word ? word.word : "শব্দ পাওয়া যায়নি "
                }</h2>
                <p class=" font-medium  text-xl text-">Meaning /Pronunciation</p>
                <div class="font-bangla text-3xl font-semibold text-[#18181B] ">
                    "${
                        word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "
                    } / ${
                        word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি "
                    }"
                </div>
                <div class="icons flex justify-between ">
                    <button onclick="loadWordDetail(${word.id})" class="bg-[#1a90ff15] hover:bg-[#1a90ff80] p-4 rounded-xl"><i class="fa-solid fa-circle-info text-2xl"></i></button>
                    <button class="bg-[#1a90ff15] hover:bg-[#1a90ff80] p-4 rounded-xl"><i class="fa-solid fa-volume-high text-2xl"></i></button>
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
            <button id="lesson-btn-${level.level_no}" onclick = "loadLevelWord(${level.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i>
                Lesson - ${level.level_no}
            </button>
        `

        levelContainer.append(btnDiv)
    }
}

lessonLevels();