const canvas = document.querySelector(".canvas");
const generateArrayButton = document.querySelector("#generateArray");
const currentValueText = document.querySelector("#currentValue");
const timerValue = document.querySelector(".timer");

const selectionSortButton = document.querySelector("#selectionSort");

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
    console.log(arr);
    draw(arr);
});

selectionSortButton.addEventListener('click', () => {
    arr = selectionSort(arr);
    console.log(arr);
    draw(arr);
});


function generateArray(size) {
    let arr = [];
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

/* Sorting Algorithms */


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
            columns[animation.indexI].style.backgroundColor = "red";
            columns[animation.indexJ].style.backgroundColor = "green";
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

function selectionSort(arr) {
    let n = arr.length;
    let minIndex;
    for (i = 0; i < n - 1; i++) {
        minIndex = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                swaps++;
            }
        }
        let temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    console.log(`The Selection Sort did ${swaps} comparisons.`);
    return arr;
}