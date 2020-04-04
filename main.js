const canvas = document.querySelector(".canvas");
const generateArrayButton = document.querySelector("#generateArray");
const currentValueText = document.querySelector("#currentValue");
const timerValue = document.querySelector(".timer");
const sizeSlider = document.querySelector("#slider");
let arraySize = 50;
let time = 0;
let arr = [];

sizeSlider.addEventListener('input', () => {
    arraySize = sizeSlider.value;
    currentValueText.innerText = sizeSlider.value;
});

timerValue.addEventListener('input', () => {
    time = timerValue.value;
});

generateArrayButton.addEventListener('click', () => {
    arr = generateArray(arraySize);
    draw(arr);
});



function generateArray(size) {
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * 500 + 1);
    }
    return (arr);
}

function draw(arr) {
    canvas.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let col = document.createElement('div');
        col.style.height = `${arr[i]}px`;
        col.style.width = `${1000/arr.length}px`;
        col.classList.add(`col`);
        col.classList.add(`col-${i}`);
        canvas.appendChild(col);
    }
}

function swap(arr, j, i) {
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Sorting Algorithms */



let swaps = 0;

function getBubbleSortAnimations(arr) {
    let animatedArray = []
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            animatedArray.push({
                indexI: i,
                indexJ: i + 1,
                state: 'compare',
            })
            if (arr[i] > arr[i + 1]) {
                animatedArray.push({
                    indexI: i,
                    indexJ: i + 1,
                    state: 'swap',
                })
                swap(arr, i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);
    return animatedArray;
}
async function bubbleSort() {

    let columns = Array.from(canvas.children);
    let animatedArray = getBubbleSortAnimations(arr);
    let previous;

    for (let i = 0; i < animatedArray.length; i++) {
        await sleep(time);
        if (previous) {
            columns[previous.indexI].style.backgroundColor = "white";
            columns[previous.indexJ].style.backgroundColor = "white";
        }
        const animation = animatedArray[i];

        if (animation.state === 'compare') {
            columns[animation.indexI].style.backgroundColor = "red";
            columns[animation.indexJ].style.backgroundColor = "green";
        } else {
            columns[animation.indexI].style.backgroundColor = "green";
            columns[animation.indexJ].style.backgroundColor = "red";
            await sleep(time);
            const tempHeight = columns[animation.indexI].style.height;
            columns[animation.indexI].style.height = columns[animation.indexJ].style.height;
            columns[animation.indexJ].style.height = tempHeight;
        }

        previous = animation;
    }

    if (previous) {
        columns[previous.indexI].style.backgroundColor = "white";
        columns[previous.indexJ].style.backgroundColor = "white";
    }
}



function getSelectionSortAnimations(arr) {
    let animatedArray = [];
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        animatedArray.push({
            min: i,
            status: 'select-min',
        });
        for (let j = i + 1; j < arr.length; j++) {
            animatedArray.push({
                min,
                j,
                status: 'compare'
            });
            if (arr[min] > arr[j]) {
                animatedArray.push({
                    min: j,
                    status: 'select-min',
                });
                min = j;
            }
        }

        if (min !== i) {
            animatedArray.push({
                min,
                i,
                status: 'swap'
            });
            swap(arr, i, min);
        }
    }
    return animatedArray;
}

async function selectionSort() {
    let columns = Array.from(canvas.children);
    let animatedArray = getSelectionSortAnimations(arr);
    let previous;

    for (let i = 0; i < animatedArray.length; ++i) {
        await sleep(time);
        if (previous) {
            Number.isInteger(previous.min) && (columns[previous.min].style.backgroundColor = "white");
            Number.isInteger(previous.j) && (columns[previous.j].style.backgroundColor = "white");
            Number.isInteger(previous.i) && (columns[previous.i].style.backgroundColor = "white");
        }
        const animation = animatedArray[i];

        if (animation.status === 'compare') {
            columns[animation.min].style.backgroundColor = "green";
            columns[animation.j].style.backgroundColor = "green";
        } else if (animation.status === 'swap') {
            columns[animation.min].style.backgroundColor = "red";
            columns[animation.i].style.backgroundColor = "red";
            await sleep(time);
            const tempHeight = columns[animation.min].style.height;
            columns[animation.min].style.height = columns[animation.i].style.height;
            columns[animation.i].style.height = tempHeight;
        } else {
            columns[animation.min].style.backgroundColor = "yellow";
        }

        previous = animation;
    }

    if (previous) {
        Number.isInteger(previous.min) && (columns[previous.min].style.backgroundColor = "white");
        Number.isInteger(previous.j) && (columns[previous.j].style.backgroundColor = "white");
        Number.isInteger(previous.i) && (columns[previous.i].style.backgroundColor = "white");
    }
}