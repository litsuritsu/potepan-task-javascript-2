// --- HTML取得 ---

// 計算式や結果を表示する画面
const display = document.getElementById("display");

// 数字ボタン
const numberButtons = document.querySelectorAll(".number-button");

// 演算子ボタン
const operatorButtons = document.querySelectorAll(".operator-button");

// 小数点ボタン
const decimalButton = document.getElementById("decimal-button");

// ACボタン
const clearButton = document.getElementById("clear-button");

// =ボタン
const equalButton = document.getElementById("equal-button");

// --- 入力を保存する変数 ---

// 現在入力している数字
let displayedNumber = "0";

// 入力した計算式
let expression = ""

// 小数点が入力されたか
let hasDecimal = false;

// --- 計算に使用する変数 ---

// 最初に入力した数字
let firstNumber = 0;

// 選択した演算子
let selectedOperator = "";

// 次の数字を入力するか管理する変数
let isNewNumber = false;



// --- 各ボタンを押した時 ---

// 数字ボタン
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // 押したボタンの数字を取得
        const number = button.textContent;

        // 新しい数字を入力する場合
        if (isNewNumber === true || displayedNumber === "error") {
            displayedNumber = number;
            isNewNumber = false;
            hasDecimal = false;

            if (selectedOperator === "") {
                expression = "";
            }
        }
        // 表示が0の場合
        else if (displayedNumber === "0") {
            displayedNumber = number;
        }
        // それ以外の場合
        else {
            displayedNumber += number;
        }

        // 画面を更新
        display.textContent = expression + displayedNumber;
    });
});

// 小数点ボタン
decimalButton.addEventListener("click", () => {
    // 新しい数字を入力する場合
    if (isNewNumber === true || displayedNumber === "error") {
        displayedNumber = "0";
        isNewNumber = false;
        hasDecimal = false;

        if (selectedOperator === "") {
            expression = "";
        }
    }
 
    // 小数点がまだ入力されていない場合
    if (hasDecimal === false) {
        // 小数点を追加
        displayedNumber = displayedNumber + ".";

        // 小数点が入力された状態にする
        hasDecimal = true;
    }

    // 画面を更新
    display.textContent = expression + displayedNumber;
});

// --- 演算子ボタン ---
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // errorの場合は何もしない
        if (displayedNumber === "error") {
            return;
        }

        // 演算子の連続入力を防ぐ
        if (selectedOperator !== "" && isNewNumber === true) {
            return;
        }

        // すでに演算子がある場合は計算する
        if (selectedOperator !== "") {
            // 2つ目の数字を取得
            const secondNumber = Number(displayedNumber);

            // 計算する
            if (selectedOperator === "+") {
                firstNumber += secondNumber;
            }
            else if (selectedOperator === "-") {
                firstNumber -= secondNumber;
            }
            else if (selectedOperator === "*") {
                firstNumber *= secondNumber;
            }
            else if (selectedOperator === "/") {
                if (secondNumber === 0) {
                    displayedNumber = "error";
                    display.textContent = displayedNumber;
                    selectedOperator = "";
                    expression = "";
                    isNewNumber = true;
                    hasDecimal = false;
                    return;
                }

                firstNumber /= secondNumber;
            }
        }
        else {
            // 最初の数字を保存
            firstNumber = Number(displayedNumber);
        }

        // 押した演算子を取得
        selectedOperator = button.textContent;

        // 計算式に数字と演算子を追加
        expression = expression + displayedNumber + selectedOperator;

        // 計算式を表示
        display.textContent = expression;

        // 次の数字を入力できる状態にする
        isNewNumber = true;

        // 小数点の入力状態をリセット
        hasDecimal = false;
    });
});

// --- イコールボタン ---
equalButton.addEventListener("click", () => {
    // 演算子が選択されていない場合
    if (selectedOperator === "") {
        return;
    }

    // 2つ目の数字が入力されていない場合
    if (isNewNumber === true) {
        return;
    }

    // 2つ目の数字を取得
    const secondNumber = Number(displayedNumber);

    // 計算結果を保存する変数
    let result = 0;

    // 足し算
    if (selectedOperator === "+") {
        result = firstNumber + secondNumber;
    }
    // 引き算
    else if (selectedOperator === "-") {
        result = firstNumber - secondNumber;
    }
    // 掛け算
    else if (selectedOperator === "*") {
        result = firstNumber * secondNumber;
    }
    // 割り算
    else if (selectedOperator === "/") {
        if (secondNumber === 0) {
            displayedNumber = "error";
            display.textContent = displayedNumber;
            firstNumber = 0;
            selectedOperator = "";
            expression = "";
            isNewNumber = true;
            hasDecimal = false;
            return;
        }

        result = firstNumber / secondNumber;
    }

    // 計算結果を保存
    displayedNumber = String(result);

    // 画面を更新
    display.textContent = displayedNumber;

    // 計算に使用した変数をリセット
    firstNumber = 0;
    selectedOperator = "";
    expression = "";
    isNewNumber = true;
    hasDecimal = false;
});




// ACボタン
clearButton.addEventListener("click", () => {
    // 入力を初期状態に戻す
    displayedNumber = "0";

    // 小数点の入力状態をリセット
    hasDecimal = false;

    // 計算に使用する変数をリセット
    firstNumber = 0;
    selectedOperator = "";
    isNewNumber = false;

    // 計算式もリセット
    expression = "";

    // 表示を0に戻す
    display.textContent = displayedNumber;
});


