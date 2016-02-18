
const TEST = 1;

function getTest() {
    if (true) return TEST;

    if (TEST == 5) {
        return TEST;
    }
}

getTest();