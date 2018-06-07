//create scene is to create the whole world of the game
var createScene = function ()
{
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    var ground = CreateGround(scene);
    var sky = createSky(scene);
    var tree = createTrees(scene);
    var freeCamera = createFreeCamera(scene);
    var tank = createTank(scene);
    var followCamera = createFollowCamera(scene,tank);
    scene.activeCamera = followCamera;
    createLights(scene);
    createHeroDude(scene);
    createScore();
    return scene;
};

//this is to create the ground as well as applying its physics
function CreateGround(scene)
{
    var ground = new BABYLON.Mesh.CreateGroundFromHeightMap("ground","images/hmap1.png",2000,2000,20,0,100,scene,false,OnGroundCreated);
    function OnGroundCreated() {
        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial",scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("images/grass.jpg",scene);
        ground.material = groundMaterial;
        ground.checkCollisions = true;
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor,{mass:0}, scene);
    }
    return ground;

}

//this is to create the score
function createScore(){
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    
    rect1 = new BABYLON.GUI.Rectangle();
    rect1.adaptWidthToChildren = true;
    rect1.height = "40px";
    rect1.cornerRadius = 20;
    rect1.color = "Orange";
    rect1.thickness = 4;
    rect1.background = "green";
    advancedTexture.addControl(rect1);

    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "Score: "+x;
    text1.color = "white";
    text1.width = "150px";
    text1.fontSize = 24;
    rect1.addControl(text1);
}

//this is to create the sky box and set it in to day time
function createSky(scene){
    var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 2000, scene);
    skybox.position = new BABYLON.Vector3(0,-50,0);
    skybox.material = skyMaterial;

    var setSkyConfig = function (property, from, to) {
            var keys = [
                { 
                    frame: 0, 
                    value: from 
                },
                { 
                    frame: 5, 
                    value: to 
                }
            ];
        
            var animation = new BABYLON.Animation("animation", property, 5, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            animation.setKeys(keys);
        
            scene.stopAnimation(skybox);
            scene.beginDirectAnimation(skybox, [animation], 0, 5, true);
        };

        setSkyConfig("material.inclination", skyMaterial.inclination, 0);
}

//creating individual trees
function createTrees(scene){
    var tree1 = new BABYLON.MeshBuilder.CreateBox("box1", {height: 10, depth:1, width:1}, scene);
    var tree2 = new BABYLON.MeshBuilder.CreateBox("box2", {height: 10, depth:1, width:1}, scene);
    var tree3 = new BABYLON.MeshBuilder.CreateBox("box3", {height: 10, depth:1, width:1}, scene);
    var tree4 = new BABYLON.MeshBuilder.CreateBox("box4", {height: 10, depth:1, width:1}, scene);
    var tree5 = new BABYLON.MeshBuilder.CreateBox("box5", {height: 10, depth:1, width:1}, scene);
    var tree6 = new BABYLON.MeshBuilder.CreateBox("box6", {height: 10, depth:1, width:1}, scene);
    var tree7 = new BABYLON.MeshBuilder.CreateBox("box7", {height: 10, depth:1, width:1}, scene);
    var tree8 = new BABYLON.MeshBuilder.CreateBox("box8", {height: 10, depth:1, width:1}, scene);
    var tree9 = new BABYLON.MeshBuilder.CreateBox("box9", {height: 10, depth:1, width:1}, scene);
    var tree10 = new BABYLON.MeshBuilder.CreateBox("box10", {height: 10, depth:1, width:1}, scene);
    var tree11 = new BABYLON.MeshBuilder.CreateBox("box11", {height: 10, depth:1, width:1}, scene);
    var tree12 = new BABYLON.MeshBuilder.CreateBox("box12", {height: 10, depth:1, width:1}, scene);

    tree1.isVisible = false;
    tree2.isVisible = false;
    tree3.isVisible = false;
    tree4.isVisible = false;
    tree5.isVisible = false;
    tree6.isVisible = false;
    tree7.isVisible = false;
    tree8.isVisible = false;
    tree9.isVisible = false;
    tree10.isVisible = false;
    tree11.isVisible = false;
    tree12.isVisible = false;


    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-un.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(20,-60,20);
            newMesh[0].scaling = new BABYLON.Vector3(10,10,10);
            newMesh[0].parent = tree1;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-05.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(400,0,400);
            newMesh[0].scaling = new BABYLON.Vector3(1,1,1);
            newMesh[0].parent = tree2;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-un.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(-200,-60,-200);
            newMesh[0].scaling = new BABYLON.Vector3(10,10,10);
            newMesh[0].parent = tree3;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-05.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(-320,0,-100);
            newMesh[0].scaling = new BABYLON.Vector3(1,1,1);
            newMesh[0].parent = tree4;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-un.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(200,-60,-500);
            newMesh[0].scaling = new BABYLON.Vector3(10,10,10);
            newMesh[0].parent = tree5;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-05.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(150,0,-250);
            newMesh[0].scaling = new BABYLON.Vector3(1,1,1);
            newMesh[0].parent = tree6;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-un.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(-500,-60,-200);
            newMesh[0].scaling = new BABYLON.Vector3(10,10,10);
            newMesh[0].parent = tree7;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-05.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(100,0,200);
            newMesh[0].scaling = new BABYLON.Vector3(1,1,1);
            newMesh[0].parent = tree8;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-un.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(180,-60,130);
            newMesh[0].scaling = new BABYLON.Vector3(10,10,10);
            newMesh[0].parent = tree9;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-05.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(420,0,-700);
            newMesh[0].scaling = new BABYLON.Vector3(1,1,1);
            newMesh[0].parent = tree10;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-un.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(580,-60,0);
            newMesh[0].scaling = new BABYLON.Vector3(10,10,10);
            newMesh[0].parent = tree11;
    });

    BABYLON.SceneLoader.ImportMesh("", "Models/Tree/", "tree-05.babylon", scene,
        function(newMesh)
        {
            newMesh[0].position = new BABYLON.Vector3(260,0,100);
            newMesh[0].scaling = new BABYLON.Vector3(1,1,1);
            newMesh[0].parent = tree12;
    });
}

//create camera
function createFreeCamera(scene)
{
    var camera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas);
    camera.position.y = 50;
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera.keysDown.push(83);
    return camera;
}

//create lights
function createLights(scene)
{
    var light0 = new BABYLON.DirectionalLight('dir0', new BABYLON.Vector3(-.1,-1,0),scene);
    var light1 = new BABYLON.DirectionalLight('dir1', new BABYLON.Vector3(-1,-1,0),scene);

}

//to make the camera follow the tank
function createFollowCamera(scene,target)
{
    var camera = new BABYLON.FollowCamera("tankFollowCamera",target.position, scene, target);
    camera.radius = 80;
    camera.heightOffset = 30;
    camera.rotationOffset = 180;
    camera.rotationAccelartion = 0.5;
    camera.maxCameraSpeed = 50;
    return camera;
}

window.addEventListener('resize',function(){
    engine.resize();
});

function modifySettings()
{
    scene.onPointerDown = function ()
    {
        canvas.requestPointerLock();
    }

}