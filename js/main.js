var canvas;
var engine;
var scene;
var rect1;
var x = 0;
var W = false;
var S = false;
var A = false;
var D = false;
var B = false;
var tankTrack;
var tankFire;
var dudeDie;

document.addEventListener("DOMContentLoaded", startGame);

function  startGame() {
    canvas = document.getElementById('renderCanvas');
    engine = new BABYLON.Engine(canvas,true);
    scene = createScene();

    var tank = scene.getMeshByName('Tank');

    var bgMusic = new BABYLON.Sound("Tank", "Sound/BackgroundMusic.mp3", scene, null, {loop: true, autoplay: true});
    tankTrack = new BABYLON.Sound("Tank", "Sound/TankMove.mp3", scene, null, {loop: true, autoplay: true});
    tankFire = new BABYLON.Sound("Fire", "Sound/TankFire.mp3", scene, null, {loop: false, autoplay: false});
    dudeDie = new BABYLON.Sound("Die", "Sound/Die.mp3", scene, null, {loop: false, autoplay: false});

    bgMusic.setVolume(1.5);
    dudeDie.setVolume(0.05);

    tankTrack.attachToMesh(tank);
    tankTrack.setVolume(2);
    tankFire.setVolume(0.2);

    modifySettings();
    var toRender = function ()
    {
        tank.move();
        tank.fire();
        moveHeroDude();
        moveOtherDudes();
        /*createScore();*/
        scene.render();
    }


    engine.runRenderLoop(toRender);
}



document.addEventListener("keydown", function(event)
{
    if(event.key == "w" || event.key == "W")
    {
        W = true;
    }
    if(event.key == "s" || event.key == "S")
    {
        S = true;
    }
    if(event.key == "a" || event.key == "A")
    {
        A = true;
    }
    if(event.key == "d" || event.key == "D")
    {
        D = true;
    }

    if(event.key == "b" || event.key == "B")
    {
        tankFire.play();
        B = true;
    }
    
});

document.addEventListener("keyup", function(event)
{
    if(event.key == "w" || event.key == "W")
    {
        W = false;
    }
    if(event.key == "s" || event.key == "S")
    {
        S = false;
    }
    if(event.key == "a" || event.key == "A")
    {
        A = false;
    }
    if(event.key == "d" || event.key == "D")
    {
        D = false;
    }

    if(event.key == "b" || event.key == "B")
    {
        B = false;
    }

});