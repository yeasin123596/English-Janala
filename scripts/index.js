const lessonLevels = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then( res => res.json())
    .then( lesson => displayLevels(lesson.data))
}



const displayLevels = (levels) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for(let level of levels) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>
                Lesson - ${level.level_no}
            </button>
        `

        levelContainer.append(btnDiv)
    }
}

lessonLevels();