(function () {
  "use strict";

  $(".numBtn").click(function () {
    assignValue(parseInt($(this).html()));
    displayValue();
  });

  var operatorsBeforeEqualsClicked = 0; // Used in part to determine progress of equation
  $(".addSubMultDiv").click(function () {
    assignOperator($(this).html());
    operatorsBeforeEqualsClicked++;
    $(".screen").html($(this).html());
    $(".screen").css("font-size", "2.75em"); // Located here fixes bug where rapid clicking #equals makes displayed numbers overflow
    limitDisplayLength();
  });

  var firstVal = "";
  var secondVal = "";
  var equationOperator = "";

  function assignValue(val) {
    if (operatorsBeforeEqualsClicked === 0) {
      firstVal += val;
    } else {
      secondVal += val;
    }
    //  console.log("assignValue: " + firstVal, equationOperator, secondVal);
  }

  function assignOperator(val) {
    if (operatorsBeforeEqualsClicked > 0) {
      firstVal = solveEquation();
    }
    equationOperator = val;
    secondVal = "";
    //  console.log("assignOperator: " + firstVal, equationOperator, secondVal);
  }

  function displayValue() {
    var valToDisplay = operatorsBeforeEqualsClicked === 0 ? firstVal : secondVal;
    $(".screen").html(valToDisplay);
    $(".screen").css("font-size", "2.75em");
    limitDisplayLength();
  }

  function limitDisplayLength() {
    var fontSize = $(".screen").css("font-size").slice(0, -2);
    while ($(".screen")[0].scrollWidth > $(".screen").innerWidth() && fontSize > 1) {
      fontSize--;
      $(".screen").css("font-size", fontSize + "px");
    }
  }

  $("#point").click(function () {
    var valToCheck = operatorsBeforeEqualsClicked === 0 ? firstVal : secondVal;
    if (valToCheck.indexOf(".") === -1) {
      assignValue(".");
      displayValue();
    }
  });

  $("#equals").click(function () {
    var result = solveEquation();
    $(".screen").html(result).hide().slideDown(250);
    limitDisplayLength();
    firstVal = result;
    //  console.log("beforeEqualsClicked: " + operatorsBeforeEqualsClicked);
    operatorsBeforeEqualsClicked = 0;
    //  console.log("equals: " + firstVal, equationOperator, secondVal);
  });

  function solveEquation() {
    firstVal = parseFloat(firstVal);
    secondVal = parseFloat(secondVal);
    // console.log("solveEquation: " + firstVal, equationOperator, secondVal);
    switch (equationOperator) {
      case "+":
        return firstVal + secondVal;
      case "-":
        return firstVal - secondVal;
      case "x":
        return firstVal * secondVal;
      case "÷":
        return firstVal / secondVal;
      case "√":
        if (isNaN(secondVal)) {
          return "syntax error";
        }
        return Math.sqrt(secondVal);
    }
  }

  $("#plusMinus").click(function () {
    if (operatorsBeforeEqualsClicked === 0) {
      firstVal = negativize(firstVal);
    } else {
      secondVal = negativize(secondVal);
    }
    displayValue();
  });

  function negativize(val) {
    val += "";
    if (val === "") {
      return "-";
    } else if (val[0] === "-") {
      return val.slice(1);
    } else {
      return "-" + val;
    }
  }

  $("#percent").click(function () {
    if (operatorsBeforeEqualsClicked === 0) {
      firstVal = firstVal / 100;
    } else {
      secondVal = firstVal * (secondVal / 100);
    }
    displayValue();
  });

  var mrc = "";
  $("#mrc").click(function () {
    if (typeof mrc === "number") {
      $(".screen").html(mrc).hide().slideDown(250);
      clearFirstSecondValuesAndEquationOperator();
      firstVal = mrc;
      mrc = "";
    } else {
      $(".screen").html("nothing in memory");
    }
    limitDisplayLength();
  });

  $("#mMinus").click(function () {
    if (typeof mrc !== "number") {
      mrc = 0;
    }
    var valToStore = operatorsBeforeEqualsClicked === 0 ? firstVal : secondVal;
    mrc -= parseFloat(valToStore);
    $(".screen").fadeOut("slow", function () {
      $(this).html("").show();
    });
    clearFirstSecondValuesAndEquationOperator();
  });

  $("#mPlus").click(function () {
    if (typeof mrc !== "number") {
      mrc = 0;
    }
    var valToStore = operatorsBeforeEqualsClicked === 0 ? firstVal : secondVal;
    mrc += parseFloat(valToStore);
    $(".screen").fadeOut("slow", function () {
      $(this).html("").show();
    });
    clearFirstSecondValuesAndEquationOperator();
  });

  $("#onClear").click(function () {
    clearFirstSecondValuesAndEquationOperator();
    $(".screen").html("");
    operatorsBeforeEqualsClicked = 0;
    mrc = "";
  });

  function clearFirstSecondValuesAndEquationOperator() {
    firstVal = "";
    secondVal = "";
    equationOperator = "";
  }
})();
