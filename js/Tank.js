function createTank(scene)
{

    var tank = new BABYLON.MeshBuilder.CreateBox("Tank",{height: 1, depth:6, width:6},scene); //Make Mesh (Box) for our tank (shape is still a simple box)
    tank.position = new BABYLON.Vector3(0,0,0); // box position in the scene
    tank.speed = 2.5; //the tank speed
    tank.frontVector = new BABYLON.Vector3(0,0,1); //front vector, the viewpoint that we use for the tank is from the Z point 
    tank.isVisible = false;
    BABYLON.SceneLoader.ImportMesh("", "Models/Tank/", "vehicle-ifv-dmm08.babylon", scene, //we import the tank model
        function(newMesh)
        {
            newMesh[0].scaling = new BABYLON.Vector3(4,4,4);
            newMesh[0].rotation.y = 3.15; 
            newMesh[0].parent = tank;
    });

    tank.move = function () //how to move the tank using the W,S,A,D key in keyboard
    {
        if(W)
        {
            tank.moveWithCollisions(tank.frontVector.multiplyByFloats(tank.speed,tank.speed,tank.speed));
        }

        if(S)
        {
            tank.moveWithCollisions(tank.frontVector.multiplyByFloats(-1*tank.speed, -1*tank.speed, -1*tank.speed));
        }

        if(A)
        {
            tank.rotation.y -= .03;
            tank.frontVector = new BABYLON.Vector3(Math.sin(tank.rotation.y),0,Math.cos(tank.rotation.y));
        }

        if(D)
        {
            tank.rotation.y += .03;
            tank.frontVector = new BABYLON.Vector3(Math.sin(tank.rotation.y),0,Math.cos(tank.rotation.y));
        }
    }

    tank.canFire = true;
    tank.fire = function () //function to make the cannonball bullet go out
    {
        var tank = this;
        if (!B) return; // if the user did not press B (key for fire the cannonball bullet) then the function will not run it will return
        if (!tank.canFire) return;
        tank.canFire = false;

        setTimeout(function () //we set a timeout so that everytime the user pressed B it only release 1 cannonball (so it will not overload)
        {
            tank.canFire = true;
        }, 500);

        var cannonBall = new BABYLON.Mesh.CreateSphere("cannonBall", 32, 2, scene); //create the cannonball bullet Mesh shape
        cannonBall.material = new BABYLON.StandardMaterial("Fire", scene);
        cannonBall.material.diffuseTexture = new BABYLON.Texture("images/Fire.jpg", scene); //apply the texture to make it like a cannonball bullet


        var pos = tank.position;

        cannonBall.position = new BABYLON.Vector3(pos.x, pos.y + 1, pos.z); //position for the cannonball when they come out
        cannonBall.position.addInPlace(tank.frontVector.multiplyByFloats(5, 5, 5));

        cannonBall.physicsImpostor = new BABYLON.PhysicsImpostor(cannonBall,
            BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene); //the mass of the cannonball 
        var fVector = tank.frontVector;
        var force = new BABYLON.Vector3(fVector.x * 100 , (fVector.y+ .1) * 100 , fVector.z * 100); //the force that applied to the cannonball
        cannonBall.physicsImpostor.applyImpulse(force, cannonBall.getAbsolutePosition());

        cannonBall.actionManager = new BABYLON.ActionManager(scene);

        scene.dudes.forEach(function(dude) //function code where everytime a cannonball bullet touch the Soldier they will dispose
        {
            cannonBall.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                {
                    trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                    parameter : dude.Dude.bounder
                },
                function () {
                    dudeDie.play();
                    dude.Dude.bounder.dispose();
                    dude.dispose();
                    x+=1;
                }
            ));
            
        });

        setTimeout(function () {

            cannonBall.dispose();
        }, 3000);
    }

    
    return tank;

}