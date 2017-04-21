// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize your application here.
                showme.addEventListener("click", showMessage, true);
                //start.addEventListener("click", initGame, true);
            } else {
                // TODO: This application was suspended and then terminated.
                // To create a smooth user experience, restore application state here so that it looks like the app never stopped running

            }

            var boxes1 = new Array();
            var boxes2 = new Array();
            var faces = new Array("Images/face.gif", "Images/face1.png", "Images/face2.png", "Images/face3.png", "Images/face4.png", "Images/face5.png", "Images/face6.png");
            var color = new Array("white", "yellow", "green", "blue", "pink", "cyan", "red");
            var x = 0, y = 0, p = 0, num = 100, currpos = 0, check = 0, comcurrpos = 0, a, b;

            var myCanvas = document.getElementById("can1");
            var myContext = myCanvas.getContext("2d");
            var size = myCanvas.height / 10;
            var imgobj = document.getElementById("banner");
            var comobj = document.getElementById("computer");
            document.getElementById("showme").bgcolor = "red";
            function randomnumbergen(max) {
                // max dictates that the random number will fall between 0-max
                var rnd = Math.floor(Math.random() * (max + 1));

                if (rnd == 0) {
                    rnd = 1;
                }
                return rnd;
            }

            A();

            function A() {

                for (var row = 1; row <= 10; row++) {
                    y = y + p;
                    x = 0;


                    for (var col = 1; col <= 10; col++) {
                        var e = randomnumbergen(6);
                        myContext.fillStyle = color[e];

                        myContext.fillRect(x, y, x + size, y + size);
                        myContext.rect(x, y, x + size, y + size);
                        myContext.stroke();

                        myContext.fillStyle = "black";
                        myContext.font = "15pt sans-serif 5pt";
                        myContext.fillText(num, x + (size - 40), y + (size - 10));

                        boxes1[num] = x;
                        boxes2[num] = y;


                        if ((row % 2) == 1)
                        { num = num - 1; }
                        else
                        { num = num + 1; }
                        x = x + size;
                    }
                    if ((row % 2) == 1)
                    { num = num - 9; }
                    else
                    { num = num - 11; }
                    p = size;

                }


            }
            snakeladderpos();
            function snakeladderpos() {

                var img1 = new Image()
                img1.onload = function () {
                    myContext.drawImage(img1, 66, 23);
                }
                img1.src = "Images/SnakeA.gif";

                var img2 = new Image()
                img2.onload = function () {
                    myContext.drawImage(img2, 56, 130);
                }
                img2.src = "Images/SnakeB.gif";

                var img5 = new Image()
                img5.onload = function () {
                    myContext.drawImage(img5, 15, 240);
                }
                img5.src = "Images/SnakeC.gif";

                var img6 = new Image()
                img6.onload = function () {
                    myContext.drawImage(img6, 200, 440);
                }
                img6.src = "Images/SnakeD.gif";

                var img3 = new Image()
                img3.onload = function () {
                    myContext.drawImage(img3, 57, 146);
                }
                img3.src = "Images/LadderA.gif";

                var img4 = new Image()
                img4.onload = function () {
                    myContext.drawImage(img4, 356, 366);
                }
                img4.src = "Images/LadderB.gif";

                var img7 = new Image()
                img7.onload = function () {
                    myContext.drawImage(img7, 300, 40);
                }
                img7.src = "Images/LadderC.gif";

                var imgcup = new Image()
                imgcup.onload = function () {
                    myContext.drawImage(imgcup, -3, 0);
                }
                imgcup.src = "Images/cup.gif";

            }


            args.setPromise(WinJS.UI.processAll());

        }





        function randomnumbergen(max) {
            // max dictates that the random number will fall between 0-max
            var rnd = Math.floor(Math.random() * (max + 1));

            if (rnd == 0) {
                rnd = 1;
            }
            return rnd;
        }

        /*--------------------------------------------------------------------------------------------------------------------*/


        drawme(a, b);

        function drawme(a, b) {

            setTimeout(function () { imgobj.style.left = a + 115 + "px"; imgobj.style.top = b + 35 + "px"; }, 4000);


        }

        function drawcom(a, b) {

            setTimeout(function () { comobj.style.left = a + 115 + "px"; comobj.style.top = b + 38 + "px"; }, 10000);

        }

        function showMessage() {

            var rad = randomnumbergen(6);
            if ((currpos + rad) <= 100) {
                currpos = currpos + rad;
            }

            document.getElementById("rolldice").src = faces[0];
            setTimeout(function () {
                document.getElementById("current").innerText = "You Move To" + " : " + currpos;
                document.getElementById("rolldice").src = faces[rad];
            }, 2000);


            if (currpos == 7)
                currpos = 34;
            else if (currpos == 24)
                currpos = 6;
            else if (currpos == 39)
                currpos = 79;
            else if (currpos == 58)
                currpos = 40;
            else if (currpos == 66)
                currpos = 95;
            else if (currpos == 72)
                currpos = 2;
            else if (currpos == 99)
                currpos = 29;
            else if (currpos >= 101) {
                var meg = new Windows.UI.Popups.MessageDialog("Try a another move");
                meg.showAsync();
            }

            var coor1 = boxes1[currpos];
            var coor2 = boxes2[currpos];

            drawme(coor1, coor2);


            if (currpos == 100) {
                var msg = new Windows.UI.Popups.MessageDialog("You won!!");
                msg.showAsync();

                //initGame();
            }
            /*----------------------------------------------------computer's turn------------------------------------*/


            var comrad = randomnumbergen(6);
            if ((comcurrpos + comrad) <= 100) {
                comcurrpos = comcurrpos + comrad;
            }
           

            setTimeout(function () { document.getElementById("comaudio").play(); document.getElementById("turnup").innerText = "Computer Turn"; }, 6000);

            if (comcurrpos == 7)
                comcurrpos = 34;
            else if (comcurrpos == 24)
                comcurrpos = 6;
            else if (comcurrpos == 39)
                comcurrpos = 79;
            else if (comcurrpos == 58)
                comcurrpos = 40;
            else if (comcurrpos == 66)
                comcurrpos = 95;
            else if (comcurrpos == 72)
                comcurrpos = 2;
            else if (comcurrpos == 99)
                comcurrpos = 29;
            else if (comcurrpos >= 101) {
                var meg = new Windows.UI.Popups.MessageDialog("Try a another move");
                meg.showAsync();
            }

            var comcoor1 = boxes1[comcurrpos];
            var comcoor2 = boxes2[comcurrpos];

            setTimeout(function () { document.getElementById("rolldice").src = faces[0]; }, 7000);


            setTimeout(function () {
                document.getElementById("current").innerText = "Computer Move To" + " : " + comcurrpos;
                document.getElementById("rolldice").src = faces[comrad];
            }, 8000);

            drawcom(comcoor1, comcoor2);
            if (comcurrpos == 100) {
                var msg = new Windows.UI.Popups.MessageDialog("Computer won!!");
                msg.showAsync();

            }

            setTimeout(function () { document.getElementById("myaudio").play(); document.getElementById("turnup").innerText = "Your Turn"; }, 11000);

        }



    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
        // You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
        // If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
    };

    app.start();




})();



